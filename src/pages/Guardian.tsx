import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { useAccount } from '../context/authContext';
import { useLearning } from '../context/dataContext';
import { lessons } from '../content/lessons';
import { stages, stageFor, suggestLesson } from '../content/journey';
export default function Guardian() {
  const { user } = useAccount();
  const { progress, syncStatus, syncError } = useLearning();
  const [filter, setFilter] = useState('Tất cả');
  if (user && (syncStatus === 'Đang tải tiến độ…' || syncError)) return <div className="home-content guardian-content"><p className="welcome"><FiHeart /> Cùng em học đọc</p><h1>Góc đồng hành</h1><div className="data-notice"><strong>Tiến độ của tài khoản hiện tại</strong><p role={syncError ? 'alert' : 'status'}>{syncError || syncStatus}</p><p>Chưa có dữ liệu để lập báo cáo. Hãy kiểm tra kết nối và tải lại trang.</p><Link className="text-link" to="/account">Xem tài khoản <FiArrowRight /></Link></div></div>;
  const saved = lessons.filter(lesson => progress[lesson.id]);
  const revisit = saved.filter(lesson => progress[lesson.id].score < 3);
  const suggestion = suggestLesson(progress);
  const visible = lessons.filter(lesson => filter === 'Tất cả' || (filter === 'Đã hoàn thành' ? !!progress[lesson.id] : !!progress[lesson.id] && progress[lesson.id].score < 3));
  return <div className="home-content guardian-content">
    <p className="welcome"><FiHeart /> Cùng em học đọc</p>
    <h1>Góc đồng hành</h1>
    <p className="page-description">Dành cho người lớn: nhìn lại bài đã đọc và chọn một bước nhỏ tiếp theo.</p>
    <div className="data-notice"><strong>{user ? 'Tiến độ của tài khoản hiện tại' : 'Tiến độ trải nghiệm trong phiên này'}</strong><p>{user ? syncStatus : 'Chưa đăng nhập. Các số dưới đây chỉ đến từ bài vừa hoàn thành trên thiết bị này; không phải dữ liệu học sinh mẫu hay dữ liệu đã lưu trên đám mây.'}</p>{syncError && <p role="alert">{syncError}</p>}{!user && <Link className="text-link" to="/login">Đăng nhập để xem bài đã lưu <FiArrowRight /></Link>}</div>
    <div className="guardian-summary"><div><strong>{saved.length}<small> / 7</small></strong><span>Bài đã hoàn thành</span></div><div><strong>{revisit.length}</strong><span>Bài có câu cần đọc lại</span></div><div><strong>{7 - saved.length}</strong><span>Bài chưa hoàn thành</span></div></div>
    <section className="next-step"><span className="lesson-type">Gợi ý bước tiếp theo · Có thể chọn bài khác</span><h2>{suggestion.lesson.title}</h2><p>{suggestion.reason}</p><p>{stageFor(suggestion.lesson.id).support}</p><Link className="button primary" to={`/learn/${suggestion.lesson.id}`}>{suggestion.action} <FiArrowRight /></Link></section>
    <div className="section-heading"><div><h2>Bài đọc và kết quả</h2><p>Điểm là số câu đúng ở lần hoàn thành gần nhất; em có thể dùng gợi ý. Đây không phải mức thành thạo.</p></div></div>
    <div className="level-filters" aria-label="Lọc tiến độ">{['Tất cả', 'Đã hoàn thành', 'Cần đọc lại'].map(value => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value}</button>)}</div>
    <p role="status" className="library-count">{visible.length} bài trong lựa chọn này</p>
    <div className="progress-rows">{visible.map(lesson => <article className="progress-row" key={lesson.id}><div><span className="lesson-type">{stageFor(lesson.id).title}</span><h3>{lesson.title}</h3><p>{progress[lesson.id] ? `${progress[lesson.id].score}/3 câu đúng · Đã hoàn thành` : 'Chưa có kết quả hoàn thành'}</p></div><Link className="text-link" to={`/learn/${lesson.id}`}>{progress[lesson.id] ? 'Đọc lại' : 'Chọn bài'} <FiArrowRight /></Link></article>)}</div>
    {visible.length === 0 && <p className="data-notice">Chưa có bài ở nhóm này. Cùng em đọc một câu chuyện trước nhé.</p>}
    <section className="instruction-note"><h2>Đồng hành mà không cần vội</h2>{stages.map(stage => <details key={stage.id}><summary>{stage.title}: cùng em luyện thế nào?</summary><p>{stage.support}</p></details>)}<p className="quiet-note">Người hướng dẫn hoặc giáo viên có thể dùng góc này cùng gia đình trên tài khoản hiện tại. Bản mẫu chưa có hồ sơ riêng cho từng trẻ, lớp học hay quyền truy cập dành cho giáo viên. Chỉ lưu điểm hoàn thành; không lưu thời gian đọc, lần thử hoặc từng câu trả lời. Kết quả không dùng để chẩn đoán chứng khó đọc.</p></section>
  </div>;
}
