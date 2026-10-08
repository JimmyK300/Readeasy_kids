import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiCheck, FiBookOpen } from "react-icons/fi";
import { useLearning, questions, story } from "../context/dataContext";
export default function Quiz() {
  const state = useLearning();
  const navigate = useNavigate();
  const questionRef = useRef<HTMLHeadingElement>(null);
  const question = questions[state.questionIndex];
  const isCorrect = state.selectedAnswer === question.answer;
  useEffect(() => {
    questionRef.current?.focus({ preventScroll: state.questionIndex === 0 });
  }, [state.questionIndex]);
  return (
    <div className="exercise-page">
      <div className="exercise-top">
        <Link to="/lessons" className="back-link">
          <FiArrowLeft /> Bài học của em
        </Link>
        <span className="lesson-type">Bài mẫu · Không giới hạn thời gian</span>
      </div>
      <div className="exercise-title">
        <h1>An và khu vườn</h1>
        <p>Đọc câu chuyện, rồi chọn một câu trả lời.</p>
      </div>
      <div className="reading-layout">
        <section className="reading-panel" aria-labelledby="story-title">
          <div className="reading-toolbar">
            <h2 id="story-title">
              <FiBookOpen /> Câu chuyện
            </h2>
            <div className="reading-controls">
              <button
                aria-pressed={state.largeText}
                onClick={() => state.setLargeText(!state.largeText)}
              >
                Aa <span>Chữ lớn</span>
              </button>
              <button
                aria-pressed={state.spacedText}
                onClick={() => state.setSpacedText(!state.spacedText)}
              >
                <span>↕</span> Giãn dòng
              </button>
            </div>
          </div>
          <div
            className={`story-text ${state.largeText ? "large-text" : ""} ${state.spacedText ? "spaced-text" : ""}`}
          >
            {story.map((line, index) => (
              <p
                className={
                  state.selectedAnswer && question.line === index
                    ? "evidence-line"
                    : ""
                }
                key={line}
              >
                {line}
              </p>
            ))}
          </div>
          <p className="story-hint">Em có thể đọc lại để tìm câu trả lời.</p>
        </section>
        <section className="question-panel" aria-labelledby="question-title">
          <div className="question-progress">
            <span>
              Câu hỏi {state.questionIndex + 1} / {questions.length}
            </span>
            <div>
              {questions.map((_, index) => (
                <span
                  key={index}
                  className={index <= state.questionIndex ? "filled" : ""}
                />
              ))}
            </div>
          </div>
          <h2 id="question-title" ref={questionRef} tabIndex={-1}>
            {question.question}
          </h2>
          <div className="answer-options">
            {question.options.map((answer, index) => (
              <button
                key={answer}
                disabled={!!state.selectedAnswer}
                className={`answer-option ${state.selectedAnswer === answer ? (isCorrect ? "correct" : "selected-wrong") : ""} ${state.selectedAnswer && answer === question.answer ? "correct" : ""}`}
                onClick={() => state.chooseAnswer(answer)}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{answer}</span>
                {state.selectedAnswer && answer === question.answer && (
                  <FiCheck />
                )}
              </button>
            ))}
          </div>
          <div className="answer-feedback" aria-live="polite">
            {state.selectedAnswer ? (
              <>
                <strong>
                  {isCorrect
                    ? "Đúng rồi, em đã tìm ra!"
                    : "Cùng đọc lại một chút nhé."}
                </strong>
                <p>{question.explanation}</p>
              </>
            ) : (
              <p>Chọn câu trả lời em nghĩ là đúng. Mình sẽ cùng tìm hiểu.</p>
            )}
          </div>
          <button
            className="button primary next-button"
            disabled={!state.selectedAnswer}
            onClick={() => {
              state.nextQuestion();
              if (state.questionIndex === questions.length - 1)
                navigate("/quiz/result");
            }}
          >
            {state.questionIndex === questions.length - 1
              ? "Xem kết quả"
              : "Câu tiếp theo"}{" "}
            <FiArrowRight />
          </button>
        </section>
      </div>
    </div>
  );
}
