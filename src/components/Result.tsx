import { useContext } from "react";
import DataContext from "../context/dataContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Result = () => {
  const { quizs, marks, startOver } = useContext(DataContext) as any;
  const navigate = useNavigate();

  const restartQuiz = () => {
    navigate("..", { relative: "route" });
    startOver();
  };

  return (
    <>
      <div
        className={`d-flex flex-column flex-grow-1 text-center p-5 text-light align-items-center justify-content-center ${
          marks > (quizs.length * 5) / 2 ? "bg-success" : "bg-danger"
        }`}
      >
        <h1 className="mb-2 fw-bold">
          {marks > (quizs.length * 5) / 2 ? "Awesome!" : "Oops!"}
        </h1>
        <h3 className="mb-3 fw-bold">
          Your score is {marks} out of {quizs.length * 5}
        </h3>
        <button
          onClick={() => restartQuiz()}
          className="btn py-2 px-4 btn-light fw-bold d-inline"
        >
          Start Over
        </button>
      </div>
    </>
  );
};

export default Result;
