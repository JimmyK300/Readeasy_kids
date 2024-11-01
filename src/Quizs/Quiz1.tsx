import Start from "../components/Start";
import Quiz from "../components/Quiz";
import Result from "../components/Result";
import { DataProvider } from "../context/dataContext";
import { Navigate, Route } from "react-router-dom";

const Quiz1 = () => {
  return (
    <>
      <Route path="" element={<Navigate replace to="start" />} />
      <Route path="start" index Component={Start} />
      <Route path="quiz" Component={Quiz} />
      <Route path="result" Component={Result} />
    </>
  );
};

export default Quiz1;
