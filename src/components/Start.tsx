import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";

const Start = () => {
  const navigate = useNavigate();
  const { title } = useContext(DataContext) as any;
  return (
    <div className="d-flex flex-column flex-grow-1 text-center p-5 text-light align-items-center justify-content-center">
      <h1 className="fw-bold text-dark mb-4" style={{ fontSize: "50pt" }}>
        {title}
      </h1>
      <button
        onClick={() => navigate("quiz", { relative: "path" })}
        className="btn px-4 py-2 fw-bold text-light bg-primary-app"
      >
        Bắt đầu
      </button>
    </div>
  );
};

export default Start;
