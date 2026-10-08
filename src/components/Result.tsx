import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiCheck, FiArrowRight, FiRefreshCw } from "react-icons/fi";
import { useLearning, questions } from "../context/dataContext";
export default function Result() {
  const { answers, completed, startOver } = useLearning();
  const navigate = useNavigate();
  if (!completed) return <Navigate to="/quiz" replace />;
  const score = answers.filter(
    (answer, index) => answer === questions[index].answer,
  ).length;
  return (
    <div className="exercise-page">
      <section className="result-panel">
        <div className="result-art">
          <img src="/images/fox.png" alt="" />
          <span>
            <FiCheck />
          </span>
        </div>
        <span className="lesson-tag">Đã hoàn thành bài mẫu</span>
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
              navigate("/quiz/quiz");
            }}
          >
            <FiRefreshCw /> Đọc và thử lại
          </button>
          <Link to="/" className="button secondary">
            Về góc học tập <FiArrowRight />
          </Link>
        </div>
        <p className="quiet-note">
          Kết quả của bài mẫu chỉ nằm trong phiên này, không dùng để chẩn đoán
          hay đánh giá khả năng học tập.
        </p>
      </section>
    </div>
  );
}
