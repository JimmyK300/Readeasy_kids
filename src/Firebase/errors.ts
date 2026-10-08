export function accountError(error: unknown): string {
  const code =
    typeof error === "object" && error && "code" in error
      ? String(error.code)
      : "";
  const messages: Record<string, string> = {
    "auth/email-already-in-use":
      "Email này đã có tài khoản. Hãy đăng nhập hoặc đặt lại mật khẩu.",
    "auth/invalid-email": "Hãy kiểm tra lại địa chỉ email.",
    "auth/weak-password": "Mật khẩu chưa đủ mạnh. Hãy dùng ít nhất 8 ký tự.",
    "auth/invalid-credential":
      "Email hoặc mật khẩu chưa đúng. Hãy kiểm tra lại.",
    "auth/user-not-found": "Email hoặc mật khẩu chưa đúng. Hãy kiểm tra lại.",
    "auth/wrong-password": "Email hoặc mật khẩu chưa đúng. Hãy kiểm tra lại.",
    "auth/too-many-requests":
      "Có quá nhiều lần thử. Hãy đợi một lúc rồi thử lại.",
    "auth/network-request-failed":
      "Chưa kết nối được. Hãy kiểm tra mạng rồi thử lại.",
    "auth/operation-not-allowed":
      "Tạo tài khoản chưa được bật trên dịch vụ. Em vẫn có thể học không cần tài khoản.",
    "auth/invalid-api-key":
      "Dịch vụ tài khoản chưa được cấu hình đúng. Em vẫn có thể học thử.",
    "auth/unauthorized-domain":
      "Địa chỉ trang này chưa được cho phép dùng tài khoản.",
    "permission-denied":
      "Chưa được phép lưu tiến độ. Hãy liên hệ người quản lý trang.",
    unavailable: "Chưa kết nối được nơi lưu tiến độ. Hãy kiểm tra mạng.",
  };
  return (
    messages[code] ??
    "Chưa thực hiện được. Hãy thử lại; bài học thử vẫn dùng được."
  );
}
