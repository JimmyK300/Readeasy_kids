import { lessons } from './lessons';
import type { SavedProgress } from '../Firebase/progress';

export const stages = [
  { id: 'details', title: 'Tìm chi tiết', goal: 'Tìm ai, đồ vật và nơi chốn trong câu.', support: 'Đọc câu hỏi trước. Cùng chỉ vào câu có tên người hoặc đồ vật cần tìm.', ids: ['an-va-khu-vuon', 'meo-ben-cua-so'] },
  { id: 'sequence', title: 'Theo dõi sự việc', goal: 'Nhớ việc xảy ra trước và sau.', support: 'Đọc chậm các từ “rồi”, “đọc xong”, “ăn xong”. Cùng kể lại hai việc theo thứ tự.', ids: ['quyen-sach-cua-lan', 'bua-sang-cua-bin', 'qua-bong-trong-san'] },
  { id: 'reasons', title: 'Hiểu lý do', goal: 'Tìm điều giúp giải thích một hành động.', support: 'Cùng tìm từ “vì”, “nên”, “để”. Hỏi: điều gì khiến nhân vật làm như vậy?', ids: ['chiec-non-cua-ba', 'sau-con-mua'] },
] as const;
export const stageFor = (id: string) => stages.find(stage => stage.ids.some(value => value === id)) ?? stages[0];
// Exact, manually reviewed story lines: the first action precedes the second.
export const practiceLines: Record<string, readonly [number, number]> = {
  'an-va-khu-vuon': [0, 3], 'meo-ben-cua-so': [3, 4],
  'quyen-sach-cua-lan': [0, 3], 'bua-sang-cua-bin': [0, 4],
  'qua-bong-trong-san': [4, 5], 'chiec-non-cua-ba': [2, 3], 'sau-con-mua': [0, 2],
};
export function suggestLesson(progress: Record<string, SavedProgress>, attempts: Record<string, { answers: string[]; completed: boolean }> = {}) {
  const resume = lessons.find(lesson => attempts[lesson.id]?.answers.length && !attempts[lesson.id].completed);
  if (resume) return { lesson: resume, reason: 'Tiếp tục câu chuyện em đang đọc.', action: 'Tiếp tục đọc' };
  const review = lessons.find(lesson => progress[lesson.id]?.score < 2);
  if (review) return { lesson: review, reason: 'Đọc lại cùng một gợi ý, rồi thử tìm câu trả lời.', action: 'Cùng luyện lại' };
  const next = lessons.find(lesson => !progress[lesson.id]);
  if (next) return { lesson: next, reason: stageFor(next.id).goal, action: 'Bắt đầu đọc' };
  const revisit = lessons.find(lesson => progress[lesson.id]?.score < 3) ?? lessons[0];
  return { lesson: revisit, reason: 'Em đã đi hết hành trình. Chọn một câu chuyện để đọc lại theo nhịp của mình.', action: 'Đọc lại câu chuyện' };
}
