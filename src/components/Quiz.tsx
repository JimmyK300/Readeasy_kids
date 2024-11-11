import { useContext } from "react";
import DataContext from "../context/dataContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const {
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
  } = useContext(DataContext) as any;

  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column flex-grow-1 text-center p-3 text-light align-items-center justify-content-center">
      <div className="d-flex flex-grow-1 justify-content-between text-dark gap-md-3 align-items-center">
        {question.image && (
          <img
            style={{ maxHeight: "25vh", maxWidth: "50vw" }}
            src={question.image}
          />
        )}
        <h5 className="mb-2 fs-3 lh-base">{question?.question}</h5>
        <h5
          className="fs-3"
          style={{
            color: "#60d600",
            width: "100px",
            textAlign: "right",
          }}
        >
          {quizs.indexOf(question) + 1} / {quizs?.length}
        </h5>
      </div>

      <div className="d-flex vw-100 flex-wrap flex-grow-1 justify-content-evenly">
        {question?.options?.map((item: any, index: any) => (
          <button
            key={index}
            className={`${
              correctAnswer === item && "bg-success"
            } answer-wrapper bg-primary-app text-light fs-4 py-2 px-3 rounded align-self-stretch btn`}
            onClick={(event) => checkAnswer(event, item)}
          >
            {item}
          </button>
        ))}
      </div>

      {questionIndex + 1 !== quizs.length ? (
        <button
          className="bg-primary-app text-light btn py-2 w-50 mt-3 fw-bold p-5"
          onClick={nextQuestion}
          disabled={!selectedAnswer}
        >
          Next Question
        </button>
      ) : (
        <button
          className="bg-primary-app text-light btn py-2 w-50 mt-3 fw-bold p-5"
          onClick={() => navigate("../result", { relative: "route" })}
          disabled={!selectedAnswer}
        >
          Show Result
        </button>
      )}
    </div>
  );
};

export default Quiz;
