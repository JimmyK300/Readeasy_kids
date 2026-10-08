import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { FiCheck, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import { useLearning } from "../context/dataContext";
import { lessons, findLesson, firstLesson } from "../content/lessons";
import { useAccount } from "../context/authContext";
export default function Result() {
  const { lessonId } = useParams();
  const lesson = findLesson(lessonId ?? firstLesson.id);
  const { answers, completed, startOver, syncStatus, syncError, retrySave } =
    useLearning(lesson?.id);
  const { user } = useAccount();
  const navigate = useNavigate();
  if (!lesson) return <Navigate to="/lessons" replace />;
  if (!completed) return <Navigate to={`/learn/${lesson.id}`} replace />;
  const { questions } = lesson;
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];
  const score = answers.filter(
    (answer, index) => answer === questions[index].answer,
  ).length;
  return (
    <div className="exercise-page">
      <section className="result-panel">
        <div className="result-art">
          <img src={`${import.meta.env.BASE_URL}images/fox.png`} alt="" />
          <span>
            <FiCheck />
          </span>
        </div>
        <span className="lesson-tag">Đã hoàn thành · {lesson.title}</span>
        <h1>Em đã đi hết câu chuyện!</h1>
        <p>Dành thời gian đọc và tìm hiểu là một bước tiến đáng vui.</p>
        <div className="result-score">
          <strong>
            {score}
            <span> / 3</span>
          </strong>
          <span>Câu trả lời đúng trong lần đọc này</span>
        </div>
        <div className="result-review">
          <h2>Cùng nhớ lại nhé</h2>
          {questions.map((question, index) => (
            <div key={question.question}>
              <span className="review-check">
                <FiCheck />
              </span>
              <p>
                <strong>{question.answer}</strong>
                <span>{question.explanation}</span>
                {answers[index] !== question.answer && (
                  <small>Em đã chọn: {answers[index]}</small>
                )}
              </p>
            </div>
          ))}
        </div>
        <div className="result-actions">
          <button
            className="button primary"
            onClick={() => {
              startOver();
              navigate(`/learn/${lesson.id}/read`);
            }}
          >
            <FiRefreshCw /> Đọc và thử lại
          </button>
          <Link
            to={nextLesson ? `/learn/${nextLesson.id}` : "/lessons"}
            className="button secondary"
          >
            {nextLesson ? "Bài tiếp theo" : "Về thư viện"} <FiArrowRight />
          </Link>
        </div>
        <p className="quiet-note">
          {user
            ? syncStatus
            : "Tiến độ chỉ trong phiên này. Gia đình có thể tạo tài khoản để lưu bài đã hoàn thành."}
        </p>
        {syncError && (
          <div role="alert" className="form-error">
            <p>{syncError}</p>
            <button
              className="restart-link"
              onClick={() => retrySave(lesson.id)}
            >
              Thử lưu lại
            </button>
          </div>
        )}
        {!user && (
          <Link className="text-link" to="/signup">
            Tạo tài khoản
          </Link>
        )}
        <p className="quiet-note">
          Kết quả luyện đọc không dùng để chẩn đoán hay đánh giá chứng khó đọc.
        </p>
      </section>
    </div>
  );
}
