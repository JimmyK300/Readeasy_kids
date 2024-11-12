import { Outlet } from "react-router-dom";

export default function QuizLayout() {
  return (
    <>
      {/* <div className="d-flex flex-column"> */}
      <div className="h1 fw-bold p-2 m-0 text-center">Quiz 1</div>
      <Outlet />
      {/* </div> */}
    </>
  );
}
