import { useContext } from "react";
import DataContext from "../context/dataContext";
import { useNavigate } from "react-router-dom";

const Start = () => {
  // const { startQuiz, showStart } = useContext(DataContext) as any;
  const navigate = useNavigate();
  return (
    <section
      className="text-white text-center bg-dark"
      style={{ display: "block" }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <h1 className="fw-bold mb-4">Basic React JS Quiz</h1>
            <button
              onClick={() => navigate("quiz", { relative: "path" })}
              className="btn px-4 py-2 bg-light text-dark fw-bold"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Start;
