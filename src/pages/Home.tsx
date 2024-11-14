import LessonList from "../components/LessonList";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { app } from "../Firebase/firebase";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

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

  return (
    <>
      <div
        className="d-flex flex-column p-4 align-items-center justify-content-around flex-grow-1"
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/images/bg.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="cards-container">
          <div className="cards align-items-center">
            <div
              className="d-flex flex-column justify-content-between align-items-center"
              style={{ height: "100%" }}
            >
              <img src="images/giraffe.png" alt="Kiểm tra đánh giá" />
              <h2>Kiểm tra đánh giá</h2>
              <p>Các bạn cùng mình thực hiện bài kiểm tra đánh giá nhé!</p>
              <button className="btn">Kiểm tra đánh giá</button>
            </div>
          </div>
          <div className="cards align-items-center">
            <div
              className="d-flex flex-column justify-content-between align-items-center"
              style={{ height: "100%" }}
            >
              <img src="images/fox.png" alt="Bài học đọc hiểu" />
              <h2>Bài học đọc hiểu</h2>
              <p>Các bài học thú vị và bổ ích đang chờ các bạn!</p>
              <button className="btn" onClick={() => navigate("/lessons")}>
                Bài học đọc hiểu
              </button>
            </div>
          </div>
          <div className="cards align-items-center">
            <div
              className="d-flex flex-column justify-content-between align-items-center"
              style={{ height: "100%" }}
            >
              <img src="images/cat.png" alt="Chatbot hỗ trợ" />
              <h2>Chatbot hỗ trợ</h2>
              <p>Bạn có thắc mắc gì? Tớ sẽ giải đáp giúp bạn!</p>
              <button className="btn">Chatbot hỗ trợ</button>
            </div>
          </div>
        </div>

        <div className="age-selection text-light">
          <h2>Lựa chọn bài học theo độ tuổi</h2>
          <div className="age-buttons">
            <button>
              <div className="d-inline h-100 w-100">7</div>
            </button>
            <button>
              <div className="d-inline h-100 w-100">8</div>
            </button>
            <button>
              <div className="d-inline h-100 w-100">9</div>
            </button>
            <button>
              <div className="d-inline h-100 w-100">10</div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
