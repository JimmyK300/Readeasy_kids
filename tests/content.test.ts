import { describe, it, expect } from "vitest";
import { lessons } from "../src/content/lessons";
import { progressPath, validProgress } from "../src/Firebase/progress";
import { accountError } from "../src/Firebase/errors";
describe("Vietnamese lesson content", () => {
  it("has seven distinct lesson IDs and stories", () => {
    expect(lessons).toHaveLength(7);
    expect(new Set(lessons.map((l) => l.id)).size).toBe(7);
    expect(new Set(lessons.map((l) => l.story.join(" "))).size).toBe(7);
  });
  for (const lesson of lessons)
    it(`${lesson.id}: valid unambiguous keys with explicit source evidence`, () => {
      expect(lesson.story.length).toBeGreaterThanOrEqual(5);
      expect(lesson.questions).toHaveLength(3);
      expect(lesson.source).toMatch(/public\/quiz/);
      for (const question of lesson.questions) {
        expect(new Set(question.options).size).toBe(question.options.length);
        expect(
          question.options.filter((option) => option === question.answer),
        ).toHaveLength(1);
        expect(lesson.story[question.line]).toContain(question.evidence);
        expect(question.explanation.length).toBeGreaterThan(20);
      }
    });
});
describe("Progress boundary and errors", () => {
  it("requires an account UID and keeps the new namespace", () => {
    expect(progressPath("guardianA")).toBe("readingUsers/guardianA/progress");
    expect(() => progressPath("")).toThrow();
    expect(() => progressPath("other/user")).toThrow();
  });
  it("rejects unknown lesson IDs, impossible scores and incomplete records", () => {
    const valid = {
      lessonId: lessons[0].id,
      score: 2,
      total: 3,
      completed: true,
    };
    expect(validProgress(valid)).toBe(true);
    for (const bad of [
      { ...valid, lessonId: "unknown" },
      { ...valid, score: 4 },
      { ...valid, score: 1.5 },
      { ...valid, total: 4 },
      { ...valid, completed: false },
    ])
      expect(validProgress(bad)).toBe(false);
  });
  it("provides actionable auth/backend failures without exposing backend error text", () => {
    expect(accountError({ code: "auth/email-already-in-use" })).toContain(
      "đăng nhập",
    );
    expect(accountError({ code: "permission-denied" })).toContain(
      "lưu tiến độ",
    );
    expect(
      accountError({ code: "unknown", message: "secret detail" }),
    ).not.toContain("secret");
  });
});
