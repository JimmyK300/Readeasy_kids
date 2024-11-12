import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData.tsx";
import { IconContext } from "react-icons";
import { app } from "../Firebase/firebase.ts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../App.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      console.log(user);
      if (!user) {
        navigate("/login");
      }
      setUser(!!user);
    });

    return () => {
      unsubscribe();
    };
  }, [user, setUser, navigate]);

  function HandleSignOutButtonClick() {
    const auth = getAuth(app);
    auth.signOut();
  }
  console.log(user);

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <header>
          <IconContext.Provider value={{ color: "#fff" }}>
            <div className="navbar">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
              <div>
                <button
                  className="btn sign-out-button"
                  onClick={HandleSignOutButtonClick}
                >
                  Sign out
                </button>
              </div>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <Link to="#" className="menu-bars">
                    <AiIcons.AiOutlineClose />
                  </Link>
                </li>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </IconContext.Provider>
        </header>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
