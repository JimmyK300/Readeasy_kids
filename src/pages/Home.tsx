import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiSliders,
  FiSun,
  FiHeart,
} from "react-icons/fi";
import { useLearning } from "../context/dataContext";
import LessonList from "../components/LessonList";
import { firstLesson, lessons } from "../content/lessons";
import { useAccount } from "../context/authContext";
export default function Home() {
  const { progress } = useLearning();
  const { user } = useAccount();
  const count = Object.keys(progress).length;
  const completed = !!progress[firstLesson.id];
  return (
    <div className="home-content">
      <div className="page-heading">
        <div>
          <p className="welcome">
            <FiSun /> Chào em, cùng đọc nhé!
          </p>
          <h1>
            Mỗi trang sách,
            <br className="mobile-break" /> một bước nhỏ.
          </h1>
          <p>Một góc học tập nhẹ nhàng, để em tự tin theo nhịp của mình.</p>
        </div>
        <div className="small-stamp">
          <FiHeart />
          <span>
            Học theo nhịp
            <br />
            <strong>của riêng em</strong>
          </span>
        </div>
      </div>
      <section className="hero-panel" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="lesson-tag">Bài đọc hôm nay</span>
          <h2 id="hero-title">
            Một khu vườn nhỏ.
            <br />
            Một điều tốt đẹp.
          </h2>
          <p>
            Cùng bạn Cáo đọc câu chuyện về An,
            <br className="desktop-break" /> rồi khám phá những điều em hiểu.
          </p>
          <Link className="button primary" to={`/learn/${firstLesson.id}`}>
            {completed ? "Đọc lại câu chuyện" : "Bắt đầu đọc"} <FiArrowRight />
          </Link>
          <span className="hero-meta">
            <FiBookOpen /> 5 câu ngắn <span>•</span> 3 câu hỏi <span>•</span>{" "}
            Khoảng 5 phút
          </span>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-sun" />
          <span className="speech-bubble">Tớ đọc cùng em!</span>
          <div className="art-circle" />
          <img src={`${import.meta.env.BASE_URL}images/fox.png`} alt="" />
          <span className="art-leaf leaf-one" />
          <span className="art-leaf leaf-two" />
          <span className="art-star">✦</span>
        </div>
      </section>
      <div className="content-columns">
        <section className="lesson-section">
          <div className="section-heading">
            <div>
              <h2>Hành trình đọc của em</h2>
              <p>Bắt đầu từ một câu chuyện gần gũi.</p>
            </div>
            <Link to="/lessons" className="text-link">
              Xem bài học <FiArrowRight />
            </Link>
          </div>
          <LessonList items={lessons.slice(0, 2)} />
        </section>
        <aside className="progress-panel">
          <span className="progress-icon">
            <FiCheck />
          </span>
          <h2>Một bước nhỏ hôm nay</h2>
          <p>
            {count > 0
              ? "Em đã đi hết câu chuyện. Thật vui vì em đã dành thời gian học!"
              : "Đọc hết câu chuyện và trả lời ba câu hỏi. Chúng ta cùng thử nhé."}
          </p>
          <div className="progress-track">
            <div style={{ width: `${(count / lessons.length) * 100}%` }} />
          </div>
          <div className="progress-caption">
            <span>{user ? "Bài đã hoàn thành" : "Bài trong phiên này"}</span>
            <strong>
              {count} / {lessons.length}
            </strong>
          </div>
          <div className="progress-note">
            <FiSliders />
            <span>Em có thể tăng cỡ chữ và giãn dòng khi đọc.</span>
          </div>
        </aside>
      </div>
      <section className="founder-note">
        <FiHeart />
        <div>
          <h2>Được thiết kế cho nhiều cách học</h2>
          <p>
            ReadEasy Kids hướng tới một nền tảng học tiếng Việt lấy cảm hứng từ
            mô hình Khan Academy, dành cho trẻ gặp khó khăn khi đọc, bao gồm trẻ
            có chứng khó đọc. Đây là bản mẫu của dự án sáng lập; không liên kết
            với Khan Academy và chưa được kiểm chứng lâm sàng.
          </p>
        </div>
      </section>
    </div>
  );
}
