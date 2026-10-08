import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiCheck, FiLogOut } from "react-icons/fi";
import { useAccount } from "../context/authContext";
import { useLearning } from "../context/dataContext";
import { accountError } from "../Firebase/errors";
import { lessons } from "../content/lessons";
export default function Account({
  mode = "login",
}: {
  mode?: "signup" | "login";
}) {
  const account = useAccount();
  const learning = useLearning();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const action = async (operation: () => Promise<void>) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await operation();
    } catch (failure) {
      setError(accountError(failure));
    } finally {
      setBusy(false);
      setPassword("");
    }
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    void action(async () => {
      if (mode === "signup") await account.signup(email.trim(), password);
      else await account.login(email.trim(), password);
      navigate("/account");
    });
  };
  if (account.loading)
    return (
      <div className="home-content" role="status">
        Đang kiểm tra tài khoản…
      </div>
    );
  if (account.user)
    return (
      <div className="home-content account-page">
        <p className="welcome">
          <FiUser /> Tài khoản của gia đình
        </p>
        <h1>Cùng em giữ nhịp học</h1>
        <section className="account-panel">
          <h2>Đã đăng nhập</h2>
          <p className="account-email">{account.user.email}</p>
          <p>
            <FiCheck /> {Object.keys(learning.progress).length} /{" "}
            {lessons.length} bài đã hoàn thành
          </p>
          <p role="status">{learning.syncStatus}</p>
          {learning.syncError && (
            <p className="form-error" role="alert">
              {learning.syncError}
            </p>
          )}
          <Link className="button primary" to="/lessons">
            Chọn bài để đọc
          </Link>
          <button
            className="button secondary"
            disabled={busy}
            onClick={() => void action(() => account.logout())}
          >
            <FiLogOut /> {busy ? "Đang đăng xuất…" : "Đăng xuất"}
          </button>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <p className="quiet-note">
            Tài khoản lưu các bài đã hoàn thành và số câu đúng. Đây là tiến độ
            luyện đọc, không phải kết quả chẩn đoán. Không thu tên, tuổi hay
            thông tin sức khỏe của trẻ.
          </p>
        </section>
      </div>
    );
  return (
    <div className="home-content account-page">
      <div className="account-intro">
        <img src={`${import.meta.env.BASE_URL}images/fox.png`} alt="" />
        <div>
          <p className="welcome">Dành cho phụ huynh hoặc người chăm sóc</p>
          <h1>{mode === "signup" ? "Tạo tài khoản" : "Chào mừng trở lại"}</h1>
          <p>Lưu bài đã hoàn thành để cùng em tiếp tục vào lần sau.</p>
        </div>
      </div>
      <section className="account-panel">
        {!account.configured && (
          <p className="form-error" role="alert">
            Dịch vụ tài khoản chưa được kết nối trên bản này. Gia đình có thể
            tiếp tục học thử không cần tài khoản.
          </p>
        )}
        {account.error && (
          <p className="form-error" role="alert">
            {account.error}
          </p>
        )}
        <form onSubmit={submit}>
          <label htmlFor="account-email">Email của phụ huynh</label>
          <input
            id="account-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={busy}
          />
          <label htmlFor="account-password">
            Mật khẩu {mode === "signup" && <span>(ít nhất 8 ký tự)</span>}
          </label>
          <input
            id="account-password"
            name="password"
            type="password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            minLength={mode === "signup" ? 8 : undefined}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={busy}
          />
          <p className="quiet-note">
            Firebase xử lý tài khoản và mật khẩu. ReadEasy không tự lưu mật
            khẩu. Tiến độ được gắn với tài khoản này.
          </p>
          <button
            className="button primary"
            type="submit"
            disabled={busy || !account.configured}
          >
            {busy
              ? "Đang thực hiện…"
              : mode === "signup"
                ? "Tạo tài khoản"
                : "Đăng nhập"}
          </button>
        </form>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {notice && (
          <p className="form-notice" role="status">
            {notice}
          </p>
        )}
        {mode === "login" && (
          <button
            className="restart-link"
            disabled={busy || !account.configured || !email.trim()}
            onClick={() =>
              void action(async () => {
                await account.resetPassword(email.trim());
                setNotice(
                  "Nếu email này có tài khoản, hãy kiểm tra hộp thư để đặt lại mật khẩu.",
                );
              })
            }
          >
            Gửi email đặt lại mật khẩu
          </button>
        )}
        <p>
          {mode === "signup"
            ? "Gia đình đã có tài khoản?"
            : "Gia đình chưa có tài khoản?"}{" "}
          <Link
            to={mode === "signup" ? "/login" : "/signup"}
            onClick={() => {
              setError("");
              setNotice("");
              setPassword("");
            }}
          >
            {mode === "signup" ? "Đăng nhập" : "Tạo tài khoản"}
          </Link>
        </p>
        <Link className="text-link" to="/lessons">
          Học thử không cần tài khoản
        </Link>
      </section>
    </div>
  );
}
