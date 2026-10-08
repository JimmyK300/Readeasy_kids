import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./LeftSideBar/Navbar";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";
export default function App() {
  return (
    <DataProvider>
      <HashRouter>
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/lessons" element={<Lesson />} />
            <Route path="/quiz" element={<Start />} />
            <Route path="/quiz/quiz" element={<Quiz />} />
            <Route path="/quiz/result" element={<Result />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}
