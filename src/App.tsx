import "./App.css";
import Navbar from "./LeftSideBar/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import { app } from "./Firebase/firebase";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import Quiz1 from "./Quizs/Quiz1";
import DataContext, { DataProvider } from "./context/dataContext";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import { useContext } from "react";
import Result from "./components/Result";
import QuizLayout from "./Quizs/QuizLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/home" element={<Home />}>
        <Route path="start" element={<Start />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="result" element={<Result />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="reports" element={<Reports />} />
      <Route path="testpage" element={<TestPage />} />
      <Route path="quiz" element={<QuizLayout />}>
        <Route index Component={Start} />
        <Route path="quiz" Component={Quiz} />
        <Route path="result" Component={Result} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      {/* <Router> */}
      <DataProvider>
        {/* <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/home" Component={Home}>
              <Route path="start" Component={Start} />
              <Route path="quiz" Component={Quiz} />
              <Route path="result" Component={Result} />
              <Route path="quiz1" Component={Quiz1} />
            </Route>
            <Route path="/login" Component={Login} />
            <Route path="/reports" Component={Reports} />
            <Route path="/testpage" Component={TestPage} />
          </Routes> */}
        <RouterProvider router={router} />
      </DataProvider>
      {/* </Router> */}
    </>
  );
}

export default App;
