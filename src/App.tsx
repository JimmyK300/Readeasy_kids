import "./App.css";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./LeftSideBar/Navbar";
import Home from "./pages/Home";
import Lesson from "./pages/Lesson";
import Start from "./components/Start";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { DataProvider } from "./context/dataContext";
import { AccountProvider } from "./context/authContext";
import Account from "./pages/Account";
import Guardian from "./pages/Guardian";
export default function App() {
  return (
    <AccountProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lesson />} />
              <Route path="/guardian" element={<Guardian />} />
              <Route path="/account" element={<Account />} />
              <Route path="/signup" element={<Account mode="signup" />} />
              <Route path="/login" element={<Account mode="login" />} />
              <Route path="/learn/:lessonId" element={<Start />} />
              <Route path="/learn/:lessonId/read" element={<Quiz />} />
              <Route path="/learn/:lessonId/result" element={<Result />} />
              <Route path="/quiz" element={<Start />} />
              <Route path="/quiz/quiz" element={<Quiz />} />
              <Route path="/quiz/result" element={<Result />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </DataProvider>
    </AccountProvider>
  );
}
