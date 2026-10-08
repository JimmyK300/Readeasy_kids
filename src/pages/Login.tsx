import { Navigate } from "react-router-dom";
// The public sample never connects to private learner accounts.
export default function Login() {
  return <Navigate to="/" replace />;
}
