import { NavLink, Link, Outlet } from "react-router-dom";
import { FiBookOpen, FiHome, FiHeart, FiUser } from "react-icons/fi";
import { useLearning } from "../context/dataContext";
import { useAccount } from "../context/authContext";
export default function Navbar() {
  const { syncStatus } = useLearning();
  const { user } = useAccount();
  return (
    <div className="app-shell">
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
          document.getElementById("main")?.scrollIntoView();
        }}
      >
        Đến nội dung
      </a>
      <aside className="sidebar">
        <Link className="brand" to="/" aria-label="ReadEasy Kids — Trang chủ">
          <span className="brand-mark">
            <FiBookOpen />
          </span>
          <span>
            ReadEasy<small>kids</small>
          </span>
        </Link>
        <nav aria-label="Điều hướng chính">
          <NavLink to="/" end>
            <FiHome /> Góc học tập
          </NavLink>
          <NavLink to="/lessons">
            <FiBookOpen /> Bài học của em
          </NavLink>
          <NavLink to="/guardian"><FiHeart /> Góc đồng hành</NavLink>
          <NavLink to={user ? "/account" : "/signup"}>
            <FiUser /> {user ? "Tài khoản" : "Tạo tài khoản"}
          </NavLink>
        </nav>
        <div className="sidebar-companion">
          <img src={`${import.meta.env.BASE_URL}images/cat.png`} alt="" />
          <h3>
            Từng chút một,
            <br />
            em sẽ tiến bộ.
          </h3>
          <p>Không cần vội. Hãy học theo nhịp của riêng em.</p>
        </div>
        <div className="sidebar-footer">
          <FiHeart />
          <span>
            Được tạo với sự quan tâm
            <br />
            <strong>Dự án sáng lập · Bản mẫu</strong>
          </span>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span className="demo-pill">
            <span /> {user ? "Đang học cùng tài khoản" : "Chế độ trải nghiệm"}
          </span>
          <Link className="session-label" to={user ? "/account" : "/login"}>
            {user ? "Tài khoản gia đình" : "Đăng nhập"}
          </Link>
          <Link
            className="session-avatar"
            to="/lessons"
            aria-label="Xem bài học"
          >
            <FiBookOpen />
          </Link>
        </header>
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <footer className="page-footer">
          <span>ReadEasy Kids · Học đọc bằng tiếng Việt</span>
          <span>
            {user ? syncStatus : "Bài mẫu · Tiến độ chỉ trong phiên này"}
          </span>
        </footer>
      </div>
    </div>
  );
}
