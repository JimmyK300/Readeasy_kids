import { findLesson } from "../content/lessons";
export interface SavedProgress {
  lessonId: string;
  score: number;
  total: number;
  completed: true;
}
export function progressPath(uid: string) {
  if (!uid || uid.includes("/"))
    throw new Error("A valid account UID is required");
  return `readingUsers/${uid}/progress`;
}
export function validProgress(value: unknown): value is SavedProgress {
  if (!value || typeof value !== "object") return false;
  const data = value as SavedProgress;
  const lesson = findLesson(data.lessonId);
  return (
    !!lesson &&
    data.completed === true &&
    data.total === lesson.questions.length &&
    Number.isInteger(data.score) &&
    data.score >= 0 &&
    data.score <= data.total
  );
}
