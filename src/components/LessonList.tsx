import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiCheck } from "react-icons/fi";
import { useLearning } from "../context/dataContext";
export default function LessonList() {
  const { completed } = useLearning();
  return (
    <Link to="/quiz" className="lesson-card">
      <div className="lesson-illustration" aria-hidden="true">
        <span className="plant-pot" />
        <span className="plant-stem" />
        <span className="plant-leaf plant-left" />
        <span className="plant-leaf plant-right" />
        <span className="plant-fruit" />
        <span className="plant-spark">✧</span>
      </div>
      <div className="lesson-card-copy">
        <span className="lesson-type">Đọc hiểu · Bài mẫu</span>
        <h3>An và khu vườn</h3>
        <p>Đọc chậm, tìm ý, hiểu câu chuyện.</p>
        <span className="lesson-card-meta">
          <FiBookOpen /> 5 câu ngắn <span>•</span> 3 câu hỏi
        </span>
      </div>
      <span className="lesson-arrow">
        {completed ? <FiCheck /> : <FiArrowRight />}
      </span>
    </Link>
  );
}
