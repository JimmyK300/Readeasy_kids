import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { accountError } from "../Firebase/errors";
import {
  progressPath,
  validProgress,
  type SavedProgress,
} from "../Firebase/progress";
import { firstLesson, findLesson } from "../content/lessons";
import { useAccount } from "./authContext";
interface Attempt {
  questionIndex: number;
  selectedAnswer: string;
  answers: string[];
  completed: boolean;
}
const emptyAttempt = (): Attempt => ({
  questionIndex: 0,
  selectedAnswer: "",
  answers: [],
  completed: false,
});
interface LearningStore {
  attempts: Record<string, Attempt>;
  progress: Record<string, SavedProgress>;
  largeText: boolean;
  spacedText: boolean;
  syncStatus: string;
  syncError: string;
  change: (id: string, transform: (attempt: Attempt) => Attempt) => void;
  complete: (id: string, attempt: Attempt) => void;
  retrySave: (id: string) => void;
  setLargeText: (value: boolean) => void;
  setSpacedText: (value: boolean) => void;
}
const DataContext = createContext<LearningStore | null>(null);
export function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useAccount();
  const uid = user?.uid ?? null;
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});
  const [progress, setProgress] = useState<Record<string, SavedProgress>>({});
  const [storeOwner, setStoreOwner] = useState<string | null>(uid);
  const [largeText, setLargeText] = useState(false);
  const [spacedText, setSpacedText] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const [syncError, setSyncError] = useState("");
  const currentUid = useRef<string | null>(null);
  currentUid.current = uid;
  useEffect(() => {
    setStoreOwner(uid);
    setAttempts({});
    setProgress({});
    setSyncError("");
    if (!uid || !db) {
      setSyncStatus("Tiến độ chỉ trong phiên này");
      return;
    }
    setSyncStatus("Đang tải tiến độ…");
    return onSnapshot(
      collection(db, progressPath(uid)),
      (snapshot) => {
        if (currentUid.current !== uid) return;
        const saved: Record<string, SavedProgress> = {};
        snapshot.forEach((item) => {
          const data = item.data();
          if (validProgress(data) && item.id === data.lessonId)
            saved[item.id] = data;
        });
        setProgress(saved);
        setSyncStatus("Tiến độ đã đồng bộ");
        setSyncError("");
      },
      (failure) => {
        if (currentUid.current === uid) {
          setSyncError(accountError(failure));
          setSyncStatus("Chưa tải được tiến độ");
        }
      },
    );
  }, [uid]);
  const save = async (value: SavedProgress) => {
    if (!user || !db) return;
    const uid = user.uid;
    setSyncStatus("Đang lưu tiến độ…");
    setSyncError("");
    try {
      await setDoc(doc(db, progressPath(uid), value.lessonId), {
        ...value,
        completedAt: serverTimestamp(),
      });
      if (currentUid.current === uid)
        setSyncStatus("Tiến độ đã lưu vào tài khoản");
    } catch (failure) {
      if (currentUid.current === uid) {
        setSyncError(accountError(failure));
        setSyncStatus("Bài đã xong; chưa lưu được tiến độ");
      }
    }
  };
  const complete = (id: string, attempt: Attempt) => {
    const lesson = findLesson(id);
    if (!lesson) return;
    const value: SavedProgress = {
      lessonId: id,
      score: attempt.answers.filter(
        (answer, index) => answer === lesson.questions[index].answer,
      ).length,
      total: lesson.questions.length,
      completed: true,
    };
    setProgress((current) => ({ ...current, [id]: value }));
    void save(value);
  };
  return (
    <DataContext.Provider
      value={{
        attempts: storeOwner === uid ? attempts : {},
        progress: storeOwner === uid ? progress : {},
        largeText,
        spacedText,
        syncStatus,
        syncError,
        setLargeText,
        setSpacedText,
        complete,
        change: (id, transform) =>
          setAttempts((current) => ({
            ...current,
            [id]: transform(current[id] ?? emptyAttempt()),
          })),
        retrySave: (id) => {
          if (progress[id]) void save(progress[id]);
        },
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
export function useLearning(id = firstLesson.id) {
  const store = useContext(DataContext);
  if (!store) throw new Error("Learning provider is missing");
  const lesson = findLesson(id) ?? firstLesson;
  const attempt = store.attempts[lesson.id] ?? emptyAttempt();
  return {
    ...store,
    ...attempt,
    lesson,
    chooseAnswer: (answer: string) =>
      store.change(lesson.id, (current) =>
        current.selectedAnswer ||
        !lesson.questions[current.questionIndex].options.includes(answer)
          ? current
          : {
              ...current,
              selectedAnswer: answer,
              answers: [...current.answers, answer],
            },
      ),
    nextQuestion: () => {
      if (!attempt.selectedAnswer || attempt.completed) return;
      if (attempt.questionIndex === lesson.questions.length - 1) {
        store.change(lesson.id, (current) => ({ ...current, completed: true }));
        store.complete(lesson.id, attempt);
      } else
        store.change(lesson.id, (current) => ({
          ...current,
          questionIndex: current.questionIndex + 1,
          selectedAnswer: "",
        }));
    },
    startOver: () => store.change(lesson.id, emptyAttempt),
  };
}
export default DataContext;
