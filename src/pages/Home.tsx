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
import { lessons } from "../content/lessons";
import { useAccount } from "../context/authContext";
import { stages, suggestLesson, stageFor } from "../content/journey";
export default function Home() {
  const { progress, attempts } = useLearning();
  const suggestion = suggestLesson(progress, attempts);
  const recommended = suggestion.lesson;
  const { user } = useAccount();
  const count = Object.keys(progress).length;
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
          <span className="lesson-tag">{stageFor(recommended.id).title}</span>
          <h2 id="hero-title">
            {recommended.title}
          </h2>
          <p>
            {suggestion.reason}
          </p>
          <Link className="button primary" to={`/learn/${recommended.id}`}>
            {suggestion.action} <FiArrowRight />
          </Link>
          <span className="hero-meta">
            <FiBookOpen /> {recommended.story.length} câu ngắn <span>•</span> 3 câu hỏi <span>•</span>{" "}
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
          <div className="stage-preview">{stages.map((stage, index) => <Link to="/lessons" key={stage.id}><span>{index + 1}</span><div><strong>{stage.title}</strong><small>{stage.ids.filter(id => progress[id]).length}/{stage.ids.length} bài hoàn thành</small></div><FiArrowRight /></Link>)}</div>
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
          <Link className="text-link" to="/guardian">Cùng người lớn nhìn lại <FiArrowRight /></Link>
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
