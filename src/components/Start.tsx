import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column flex-grow-1 text-center p-5 text-light align-items-center justify-content-center">
      <h1 className="fw-bold text-dark mb-4">Bài học 1</h1>
      <button
        onClick={() => navigate("quiz", { relative: "path" })}
        className="btn px-4 py-2 fw-bold text-light bg-primary-app"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Start;
