export interface Question {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  line: number;
  evidence: string;
}
export interface Lesson {
  id: string;
  title: string;
  summary: string;
  level: "Bắt đầu" | "Đọc thêm";
  topic: string;
  symbol: string;
  story: string[];
  questions: Question[];
  source: string;
}
const q = (
  question: string,
  options: string[],
  answer: string,
  line: number,
  evidence: string,
  explanation: string,
): Question => ({ question, options, answer, line, evidence, explanation });
export const lessons: Lesson[] = [
  {
    id: "an-va-khu-vuon",
    title: "An và khu vườn",
    summary: "Một việc nhỏ mang lại niềm vui.",
    level: "Bắt đầu",
    topic: "Thiên nhiên",
    symbol: "🌱",
    source: "Bài đọc gốc của bản mẫu; chủ đề cây và nước từ public/quiz1.json.",
    story: [
      "Sáng chủ nhật, An ra vườn cùng bà.",
      "An thấy một cây cà chua nhỏ.",
      "Đất quanh cây đã khô.",
      "An lấy bình nước và tưới nhẹ vào gốc cây.",
      "Bà mỉm cười: “Cảm ơn An đã chăm sóc khu vườn.”",
    ],
    questions: [
      q(
        "An ra vườn cùng ai?",
        ["Cùng bà", "Cùng bạn", "Cùng bố"],
        "Cùng bà",
        0,
        "cùng bà",
        "Câu đầu kể: “An ra vườn cùng bà.”",
      ),
      q(
        "Vì sao An tưới nước cho cây?",
        ["Vì trời đang mưa", "Vì đất quanh cây đã khô", "Vì An muốn hái quả"],
        "Vì đất quanh cây đã khô",
        2,
        "Đất quanh cây đã khô",
        "Đất đã khô. An tưới nước để chăm sóc cây.",
      ),
      q(
        "An đã làm gì để chăm sóc khu vườn?",
        ["Ngắt lá cây", "Chạy quanh vườn", "Tưới nhẹ vào gốc cây"],
        "Tưới nhẹ vào gốc cây",
        3,
        "tưới nhẹ vào gốc cây",
        "An lấy bình nước và tưới nhẹ vào gốc cây.",
      ),
    ],
  },
  {
    id: "meo-ben-cua-so",
    title: "Mèo bên cửa sổ",
    summary: "Tìm bạn nhỏ trong một buổi sáng.",
    level: "Bắt đầu",
    topic: "Con vật",
    symbol: "🐈",
    source: "Viết mới từ nhóm từ mèo, mặt trời, nhà trong public/quiz1.json.",
    story: [
      "Buổi sáng, Mai mở cửa sổ.",
      "Nắng chiếu vào nhà.",
      "Chú mèo nằm trên tấm thảm.",
      "Mai đặt bát nước cạnh tấm thảm.",
      "Chú mèo đứng dậy uống nước.",
    ],
    questions: [
      q(
        "Mai mở gì vào buổi sáng?",
        ["Cửa sổ", "Quyển sách", "Chiếc hộp"],
        "Cửa sổ",
        0,
        "mở cửa sổ",
        "Mai mở cửa sổ để đón buổi sáng.",
      ),
      q(
        "Chú mèo nằm ở đâu?",
        ["Trên bàn", "Trên tấm thảm", "Ngoài vườn"],
        "Trên tấm thảm",
        2,
        "trên tấm thảm",
        "Câu chuyện nói chú mèo nằm trên tấm thảm.",
      ),
      q(
        "Mai đặt gì cạnh tấm thảm?",
        ["Bát nước", "Quả bóng", "Chiếc nón"],
        "Bát nước",
        3,
        "bát nước",
        "Mai đặt bát nước, rồi chú mèo uống nước.",
      ),
    ],
  },
  {
    id: "quyen-sach-cua-lan",
    title: "Quyển sách của Lan",
    summary: "Giữ gìn đồ dùng sau khi đọc.",
    level: "Bắt đầu",
    topic: "Đồ dùng",
    symbol: "📖",
    source:
      "Viết mới từ nhóm từ sách, bàn, ghế trong public/quiz1.json; không dùng ảnh bàn/ghế bị đảo khóa.",
    story: [
      "Lan ngồi trên ghế và đọc sách.",
      "Trong sách có một bức tranh con cá.",
      "Lan chỉ bức tranh cho em xem.",
      "Đọc xong, Lan đặt sách lên bàn.",
      "Hai chị em cùng xếp gọn góc đọc.",
    ],
    questions: [
      q(
        "Lan đang làm gì lúc đầu?",
        ["Đọc sách", "Tưới cây", "Đá bóng"],
        "Đọc sách",
        0,
        "đọc sách",
        "Lan ngồi trên ghế và đọc sách.",
      ),
      q(
        "Bức tranh trong sách vẽ gì?",
        ["Con gà", "Con cá", "Con mèo"],
        "Con cá",
        1,
        "con cá",
        "Trong sách có một bức tranh con cá.",
      ),
      q(
        "Đọc xong, Lan đặt sách ở đâu?",
        ["Dưới ghế", "Ngoài sân", "Lên bàn"],
        "Lên bàn",
        3,
        "lên bàn",
        "Câu thứ tư kể Lan đặt sách lên bàn.",
      ),
    ],
  },
  {
    id: "bua-sang-cua-bin",
    title: "Bữa sáng của Bin",
    summary: "Đọc để nhớ món ăn và việc làm.",
    level: "Bắt đầu",
    topic: "Gia đình",
    symbol: "🍎",
    source:
      "Viết mới từ táo trong public/quiz1.json và sữa, bánh trong public/quiz2.json; chuyển thành đọc hiểu, không sử dụng bản ghi âm.",
    story: [
      "Bin rửa tay trước bữa sáng.",
      "Trên bàn có bánh mì và một cốc sữa.",
      "Mẹ cắt quả táo thành những miếng nhỏ.",
      "Bin ăn bánh mì rồi uống sữa.",
      "Ăn xong, Bin mang cốc vào bếp.",
    ],
    questions: [
      q(
        "Bin làm gì trước bữa sáng?",
        ["Rửa tay", "Đọc sách", "Đi ngủ"],
        "Rửa tay",
        0,
        "rửa tay",
        "Câu đầu cho biết Bin rửa tay trước bữa sáng.",
      ),
      q(
        "Mẹ cắt quả gì?",
        ["Quả cam", "Quả táo", "Quả chuối"],
        "Quả táo",
        2,
        "quả táo",
        "Mẹ cắt quả táo thành những miếng nhỏ.",
      ),
      q(
        "Ăn xong, Bin mang cốc đi đâu?",
        ["Ra vườn", "Vào phòng ngủ", "Vào bếp"],
        "Vào bếp",
        4,
        "vào bếp",
        "Bin mang cốc vào bếp sau khi ăn xong.",
      ),
    ],
  },
  {
    id: "qua-bong-trong-san",
    title: "Quả bóng trong sân",
    summary: "Theo dõi việc xảy ra trước và sau.",
    level: "Đọc thêm",
    topic: "Bạn bè",
    symbol: "⚽",
    source: "Viết mới từ bóng, nhà, cây trong public/quiz1.json.",
    story: [
      "Nam và Hà chơi bóng trong sân.",
      "Quả bóng lăn đến gần gốc cây.",
      "Nam nhặt bóng rồi đưa cho Hà.",
      "Hà thấy dây giày của Nam bị tuột.",
      "Hà giữ bóng để Nam buộc lại dây giày.",
      "Buộc xong, Nam cùng Hà chơi tiếp.",
    ],
    questions: [
      q(
        "Quả bóng lăn đến đâu?",
        ["Gần gốc cây", "Vào bếp", "Lên mái nhà"],
        "Gần gốc cây",
        1,
        "gần gốc cây",
        "Quả bóng lăn đến gần gốc cây trong sân.",
      ),
      q(
        "Vì sao Hà giữ bóng?",
        ["Để mang bóng về nhà", "Để Nam buộc lại dây giày", "Để tưới cây"],
        "Để Nam buộc lại dây giày",
        4,
        "để Nam buộc lại dây giày",
        "Hà giữ bóng để bạn có thời gian buộc lại dây giày.",
      ),
      q(
        "Sau khi buộc dây giày, Nam làm gì?",
        ["Đi ngủ", "Cùng Hà chơi tiếp", "Cất bóng vào bếp"],
        "Cùng Hà chơi tiếp",
        5,
        "chơi tiếp",
        "Câu cuối kể Nam cùng Hà chơi tiếp.",
      ),
    ],
  },
  {
    id: "chiec-non-cua-ba",
    title: "Chiếc nón của bà",
    summary: "Tìm đồ vật và lý do trong câu chuyện.",
    level: "Đọc thêm",
    topic: "Gia đình",
    symbol: "👒",
    source:
      "Viết mới từ nón, gió, bông trong public/quiz2.json; đọc hiểu thay cho bài nghe chưa xác minh.",
    story: [
      "Bà chuẩn bị ra vườn hái hoa.",
      "Bà tìm chiếc nón trên kệ.",
      "Vy nhìn thấy chiếc nón treo cạnh cửa.",
      "Vy lấy nón và đưa cho bà.",
      "Ngoài vườn có nắng, nên bà đội nón.",
      "Hai bà cháu cùng ngắm những bông hoa.",
    ],
    questions: [
      q(
        "Bà chuẩn bị đi đâu?",
        ["Ra vườn", "Đến lớp", "Ra biển"],
        "Ra vườn",
        0,
        "ra vườn",
        "Bà chuẩn bị ra vườn hái hoa.",
      ),
      q(
        "Vy thấy chiếc nón ở đâu?",
        ["Trên bàn", "Dưới ghế", "Treo cạnh cửa"],
        "Treo cạnh cửa",
        2,
        "treo cạnh cửa",
        "Vy nhìn thấy chiếc nón treo cạnh cửa.",
      ),
      q(
        "Vì sao bà đội nón?",
        ["Vì ngoài vườn có nắng", "Vì bà đi ngủ", "Vì nón ở trên kệ"],
        "Vì ngoài vườn có nắng",
        4,
        "có nắng",
        "Câu chuyện nói ngoài vườn có nắng, nên bà đội nón.",
      ),
    ],
  },
  {
    id: "sau-con-mua",
    title: "Sau cơn mưa",
    summary: "Quan sát thiên nhiên qua từng câu.",
    level: "Đọc thêm",
    topic: "Thiên nhiên",
    symbol: "🌦️",
    source: "Viết mới từ mây, trời xanh, hoa, bướm trong public/quiz1.json.",
    story: [
      "Cơn mưa vừa dừng lại.",
      "Mây thưa dần và một khoảng trời xanh hiện ra.",
      "Linh bước ra hiên cùng bố.",
      "Trên lá cây còn những giọt nước.",
      "Một con bướm đậu trên bông hoa vàng.",
      "Linh đứng yên quan sát để không làm bướm bay đi.",
    ],
    questions: [
      q(
        "Khi mây thưa dần, điều gì hiện ra?",
        ["Một khoảng trời xanh", "Một ngọn núi", "Một quả bóng"],
        "Một khoảng trời xanh",
        1,
        "trời xanh",
        "Mây thưa dần và một khoảng trời xanh hiện ra.",
      ),
      q(
        "Con bướm đậu ở đâu?",
        ["Trên ghế", "Trên bông hoa vàng", "Trên quyển sách"],
        "Trên bông hoa vàng",
        4,
        "bông hoa vàng",
        "Con bướm đậu trên bông hoa vàng.",
      ),
      q(
        "Vì sao Linh đứng yên?",
        ["Để không làm bướm bay đi", "Để buộc dây giày", "Để chờ ăn sáng"],
        "Để không làm bướm bay đi",
        5,
        "không làm bướm bay đi",
        "Linh đứng yên quan sát để không làm bướm bay đi.",
      ),
    ],
  },
];
export const firstLesson = lessons[0];
export const findLesson = (id?: string) =>
  lessons.find((lesson) => lesson.id === id);
