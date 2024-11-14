import { useContext } from "react";
import { Outlet } from "react-router-dom";
import DataContext from "../context/dataContext";

export default function QuizLayout() {
  const { title } = useContext(DataContext) as any;
  return (
    <>
      {/* <div className="d-flex flex-column"> */}
      <div className="h1 fw-bold p-2 m-0 text-center">{title}</div>
      <Outlet />
      {/* </div> */}
    </>
  );
}
