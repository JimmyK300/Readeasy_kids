import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiSliders,
  FiMessageCircle,
} from "react-icons/fi";
import { useLearning } from "../context/dataContext";
export default function Start() {
  const { startOver, answers, completed } = useLearning();
  const navigate = useNavigate();
  return (
    <div className="exercise-page">
      <Link to="/lessons" className="back-link">
        <FiArrowLeft /> Bài học của em
      </Link>
      <section className="start-panel">
        <div className="start-art">
          <img src="/images/fox.png" alt="Bạn Cáo đang đọc sách" />
        </div>
        <div>
          <span className="lesson-tag">Đọc hiểu · Bài mẫu</span>
          <h1>An và khu vườn</h1>
          <p className="start-intro">
            Một việc nhỏ có thể mang lại niềm vui.
            <br />
            Cùng đọc để tìm hiểu An đã làm gì nhé.
          </p>
          <ul className="instruction-list">
            <li>
              <FiBookOpen />
              <span>Đọc 5 câu ngắn theo nhịp của em.</span>
            </li>
            <li>
              <FiSliders />
              <span>Chọn cỡ chữ và giãn dòng cho dễ đọc.</span>
            </li>
            <li>
              <FiMessageCircle />
              <span>Trả lời 3 câu hỏi và xem lời giải thích.</span>
            </li>
          </ul>
          <button
            className="button primary"
            onClick={() => {
              if (completed) startOver();
              navigate("/quiz/quiz");
            }}
          >
            {answers.length && !completed ? "Tiếp tục đọc" : "Cùng đọc nào"}{" "}
            <FiArrowRight />
          </button>
          {answers.length > 0 && !completed && (
            <button
              className="restart-link"
              onClick={() => {
                startOver();
                navigate("/quiz/quiz");
              }}
            >
              Bắt đầu lại bài mẫu
            </button>
          )}
          <p className="quiet-note">
            Không có đồng hồ đếm ngược. Em có thể đọc lại.
          </p>
        </div>
      </section>
    </div>
  );
}
