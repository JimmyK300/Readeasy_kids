import { Link } from "react-router-dom";
import { FiArrowRight, FiBookOpen, FiCheck } from "react-icons/fi";
import { useLearning } from "../context/dataContext";
import { lessons, type Lesson } from "../content/lessons";
export default function LessonList({ items = lessons }: { items?: Lesson[] }) {
  const { progress, attempts } = useLearning();
  return (
    <div className="lesson-grid">
      {items.map((lesson) => (
        <Link
          to={`/learn/${lesson.id}`}
          className="lesson-card"
          key={lesson.id}
        >
          <div
            className={`lesson-symbol symbol-${lesson.topic}`}
            aria-hidden="true"
          >
            {lesson.symbol}
          </div>
          <div className="lesson-card-copy">
            <span className="lesson-type">
              {lesson.level} · {lesson.topic}
            </span>
            <h3>{lesson.title}</h3>
            <p>{lesson.summary}</p>
            <span className="lesson-card-meta">
              <FiBookOpen /> {lesson.story.length} câu <span>•</span> 3 câu hỏi
            </span>
            <span className="lesson-status">
              {progress[lesson.id]
                ? `Đã hoàn thành · ${progress[lesson.id].score}/3 câu đúng`
                : attempts[lesson.id]?.answers.length
                  ? "Đang đọc"
                  : "Sẵn sàng để đọc"}
            </span>
          </div>
          <span className="lesson-arrow">
            {progress[lesson.id] ? <FiCheck /> : <FiArrowRight />}
          </span>
        </Link>
      ))}
    </div>
  );
}
