import "./App.css";
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
import { useContext } from "react";
import Navbar from "./LeftSideBar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import { DataProvider } from "./context/dataContext";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import QuizLayout from "./Quizs/QuizLayout";
import Lesson from "./pages/Lesson";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route path="/" element={<Home />}>
        <Route path="start" element={<Start />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="result" element={<Result />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="lessons" element={<Lesson />} />
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
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </>
  );
}

export default App;
