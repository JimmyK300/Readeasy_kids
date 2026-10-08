import LessonList from "../components/LessonList";
import { FiBookOpen } from "react-icons/fi";
export default function Lesson() {
  return (
    <div className="home-content library-content">
      <p className="welcome">
        <FiBookOpen /> Học đọc bằng tiếng Việt
      </p>
      <h1>Bài học của em</h1>
      <p className="page-description">
        Một câu chuyện ngắn. Một khoảng thời gian dành riêng cho em.
      </p>
      <LessonList />
      <section className="instruction-note">
        <h2>Bắt đầu nhẹ nhàng</h2>
        <p>
          Đọc từng câu. Có thể quay lại câu chuyện bất cứ lúc nào. Sau mỗi câu
          hỏi, em sẽ thấy lời giải thích để hiểu rõ hơn.
        </p>
        <p className="quiet-note">
          Thư viện hiện có một bài mẫu hoàn chỉnh. Nội dung và kết quả chỉ phục
          vụ trải nghiệm, không phải bài đánh giá chứng khó đọc.
        </p>
      </section>
    </div>
  );
}
