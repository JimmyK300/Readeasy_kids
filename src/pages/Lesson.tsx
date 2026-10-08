import { useState } from "react";
import LessonList from "../components/LessonList";
import { FiBookOpen } from "react-icons/fi";
import { lessons } from "../content/lessons";
export default function Lesson() {
  const [level, setLevel] = useState("Tất cả");
  const visible = lessons.filter(
    (lesson) => level === "Tất cả" || lesson.level === level,
  );
  return (
    <div className="home-content library-content">
      <p className="welcome">
        <FiBookOpen /> Học đọc bằng tiếng Việt
      </p>
      <h1>Bài học của em</h1>
      <p className="page-description">
        Từ một góc nhà đến khu vườn. Chọn câu chuyện em muốn đọc hôm nay.
      </p>
      <div className="level-filters" aria-label="Chọn mức đọc">
        {["Tất cả", "Bắt đầu", "Đọc thêm"].map((value) => (
          <button
            key={value}
            aria-pressed={level === value}
            onClick={() => setLevel(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <p className="library-count" role="status">
        {visible.length} bài đọc ·{" "}
        {level === "Đọc thêm"
          ? "6 câu, luyện theo dõi sự việc và lý do"
          : "5–6 câu, mỗi bài 3 câu hỏi"}
      </p>
      <LessonList items={visible} />
      <section className="instruction-note">
        <h2>Bắt đầu nhẹ nhàng</h2>
        <p>
          Đọc từng câu. Có thể quay lại câu chuyện bất cứ lúc nào. Sau mỗi câu
          hỏi, em sẽ thấy lời giải thích và câu trong bài giúp tìm đáp án.
        </p>
        <p className="quiet-note">
          Bài mẫu được viết và biên soạn lại từ chủ đề từ vựng trong dự án gốc.
          Mức đọc chỉ gợi ý độ dài và cách đọc, không phải phân loại y khoa hay
          chương trình chuẩn hóa.
        </p>
      </section>
    </div>
  );
}
