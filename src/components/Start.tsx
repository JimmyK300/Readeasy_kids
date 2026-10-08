import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { findLesson, firstLesson } from "../content/lessons";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiSliders,
  FiMessageCircle,
} from "react-icons/fi";
import { useLearning } from "../context/dataContext";
import ReadingPractice from "./ReadingPractice";
import { stageFor } from "../content/journey";
export default function Start() {
  const { lessonId } = useParams();
  const lesson = findLesson(lessonId ?? firstLesson.id);
  const { startOver, answers, completed } = useLearning(lesson?.id);
  const navigate = useNavigate();
  if (!lesson) return <Navigate to="/lessons" replace />;
  return (
    <div className="exercise-page">
      <Link to="/lessons" className="back-link">
        <FiArrowLeft /> Bài học của em
      </Link>
      <section className="start-panel">
        <div className="start-art">
          <img
            src={`${import.meta.env.BASE_URL}images/fox.png`}
            alt="Bạn Cáo đang đọc sách"
          />
        </div>
        <div>
          <span className="lesson-tag">
            {lesson.level} · {lesson.topic}
          </span>
          <h1>{lesson.title}</h1>
          <p className="start-intro">{lesson.summary}</p>
          <p className="reading-goal"><strong>{stageFor(lesson.id).title}</strong> · {stageFor(lesson.id).goal}</p>
          <ul className="instruction-list">
            <li>
              <FiBookOpen />
              <span>Đọc {lesson.story.length} câu ngắn theo nhịp của em.</span>
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
              navigate(`/learn/${lesson.id}/read`);
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
                navigate(`/learn/${lesson.id}/read`);
              }}
            >
              Bắt đầu lại bài đọc
            </button>
          )}
          <p className="quiet-note">
            Không có đồng hồ đếm ngược. Em có thể đọc lại.
          </p>
        </div>
      </section>
      <ReadingPractice key={lesson.id} lesson={lesson} />
    </div>
  );
}
