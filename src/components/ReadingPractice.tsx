import { useState } from 'react';
import type { Lesson } from '../content/lessons';
import { practiceLines } from '../content/journey';
export default function ReadingPractice({ lesson }: { lesson: Lesson }) {
  const [choice, setChoice] = useState<number | null>(null);
  const [first, second] = practiceLines[lesson.id];
  return <section className="practice-panel" aria-labelledby="practice-title">
    <span className="lesson-type">Khởi động tùy chọn · Không tính điểm</span>
    <h2 id="practice-title">Việc nào xảy ra trước?</h2>
    <p>Đọc hai câu từ câu chuyện. Chọn việc xảy ra trước, rồi cùng nối hai việc.</p>
    <div className="practice-options">{[second, first].map(index => <button key={index} className="practice-choice" aria-pressed={choice === index} onClick={() => setChoice(index)}>{lesson.story[index]}</button>)}</div>
    <div aria-live="polite">{choice !== null && <p className="practice-feedback">{choice === first ? 'Đúng thứ tự rồi! ' : 'Cùng nhìn lại thứ tự nhé. '}Trước: {lesson.story[first]} Sau đó: {lesson.story[second]}</p>}</div>
    {choice !== null && <button className="restart-link" onClick={() => setChoice(null)}>Thử lại phần khởi động</button>}
    <p className="quiet-note">Đây là luyện đọc có gợi ý. Kết quả khởi động không được lưu vào tài khoản.</p>
  </section>;
}
