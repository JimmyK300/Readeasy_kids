import "./App.css";
import Navbar from "./LeftSideBar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/reports" Component={Reports} />
          <Route path="/products" Component={Products} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
