import { beforeAll, afterAll, describe, it } from "vitest";
import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { readFileSync } from "node:fs";
// Run against Firestore emulator, never a production project.
describe.runIf(!!process.env.FIRESTORE_EMULATOR_HOST)(
  "UID-owned deployed rule behavior",
  () => {
    let environment: RulesTestEnvironment;
    beforeAll(async () => {
      environment = await initializeTestEnvironment({
        projectId: "demo-readeasy-tests",
        firestore: { rules: readFileSync("firestore.rules", "utf8") },
      });
    });
    afterAll(async () => {
      await environment.cleanup();
    });
    it("permits owner progress while denying other UID and anonymous access", async () => {
      const owner = environment.authenticatedContext("guardianA").firestore();
      const other = environment.authenticatedContext("guardianB").firestore();
      const anonymous = environment.unauthenticatedContext().firestore();
      const path = "readingUsers/guardianA/progress/an-va-khu-vuon";
      const value = {
        lessonId: "an-va-khu-vuon",
        score: 2,
        total: 3,
        completed: true,
        completedAt: serverTimestamp(),
      };
      await assertSucceeds(setDoc(doc(owner, path), value));
      await assertSucceeds(getDoc(doc(owner, path)));
      await assertFails(getDoc(doc(other, path)));
      await assertFails(setDoc(doc(other, path), value));
      await assertFails(getDoc(doc(anonymous, path)));
      await assertFails(setDoc(doc(anonymous, path), value));
      await assertFails(setDoc(doc(owner, path), { ...value, score: 4 }));
      await assertFails(
        setDoc(doc(owner, path), { ...value, childName: "must-not-store" }),
      );
    });
  },
);
