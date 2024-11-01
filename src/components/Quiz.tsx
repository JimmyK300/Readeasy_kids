import { useContext } from "react";
import DataContext from "../context/dataContext";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const {
    showQuiz,
    question,
    quizs,
    checkAnswer,
    correctAnswer,
    selectedAnswer,
    questionIndex,
    nextQuestion,
    showTheResult,
  } = useContext(DataContext) as any;

  const navigate = useNavigate();

  return (
    <section className="bg-dark text-white" style={{ display: "block" }}>
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div
              className="card p-4"
              style={{ background: "#3d3d3d", borderColor: "#646464" }}
            >
              <div className="d-flex justify-content-between gap-md-3">
                <h5 className="mb-2 fs-normal lh-base">{question?.question}</h5>
                <h5
                  style={{
                    color: "#60d600",
                    width: "100px",
                    textAlign: "right",
                  }}
                >
                  {quizs.indexOf(question) + 1} / {quizs?.length}
                </h5>
              </div>
              <div>
                {question?.options?.map((item: any, index: any) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      correctAnswer === item && "bg-success"
                    }`}
                    onClick={(event) => checkAnswer(event, item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {questionIndex + 1 !== quizs.length ? (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={nextQuestion}
                  disabled={!selectedAnswer}
                >
                  Next Question
                </button>
              ) : (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={() => navigate("../result", { relative: "route" })}
                  disabled={!selectedAnswer}
                >
                  Show Result
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;