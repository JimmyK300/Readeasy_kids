import { useState } from "react";
import LessonList from "../components/LessonList";
import { FiBookOpen } from "react-icons/fi";
import { lessons } from "../content/lessons";
import { stages } from "../content/journey";
import { useLearning } from "../context/dataContext";
export default function Lesson() {
  const [stageId, setStageId] = useState("all");
  const { progress } = useLearning();
  const visible = stages.filter(stage => stageId === "all" || stage.id === stageId);
  return <div className="home-content library-content">
    <p className="welcome"><FiBookOpen /> Học đọc bằng tiếng Việt</p>
    <h1>Hành trình đọc của em</h1>
    <p className="page-description">7 câu chuyện, 3 chặng nhỏ. Đi theo thứ tự gợi ý hoặc chọn bài em thích; mọi bài đều mở.</p>
    <div className="level-filters" aria-label="Chọn chặng đọc">{[{id:'all', title:'Tất cả'}, ...stages].map(stage => <button key={stage.id} aria-pressed={stageId === stage.id} onClick={() => setStageId(stage.id)}>{stage.title}</button>)}</div>
    <p className="library-count" role="status">{visible.reduce((sum, stage) => sum + stage.ids.length, 0)} bài đọc · Mỗi bài 5–6 câu và 3 câu hỏi</p>
    <div className="journey-path">{visible.map(stage => <section className="journey-stage" key={stage.id} aria-labelledby={`stage-${stage.id}`}>
      <div className="stage-heading"><span className="stage-number">{stages.indexOf(stage) + 1}</span><div><span className="lesson-type">Chặng {stages.indexOf(stage) + 1} · {stage.ids.filter(id => progress[id]).length}/{stage.ids.length} bài hoàn thành</span><h2 id={`stage-${stage.id}`}>{stage.title}</h2><p>{stage.goal}</p></div></div>
      <LessonList items={lessons.filter(lesson => stage.ids.some(id => id === lesson.id))}/>
    </section>)}</div>
    <section className="instruction-note"><h2>Bắt đầu nhẹ nhàng</h2><p>Thử nối hai việc trước–sau trong phần khởi động. Khi đọc, em có thể xin gợi ý tìm câu, tăng cỡ chữ và quay lại câu chuyện. Lời giải thích luôn đi cùng câu trong bài.</p><p className="quiet-note">Các chặng là gợi ý luyện đọc, không phải mức thành thạo hay chương trình chuẩn hóa. Nội dung mẫu được viết và biên soạn lại từ chủ đề từ vựng trong dự án gốc.</p></section>
  </div>;
}
