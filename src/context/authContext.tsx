import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { accountError } from "../Firebase/errors";
interface AccountState {
  user: User | null;
  loading: boolean;
  error: string;
  configured: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
const AccountContext = createContext<AccountState | null>(null);
export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(!!auth);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(
      auth,
      (next) => {
        setUser(next);
        setLoading(false);
      },
      (failure) => {
        setError(accountError(failure));
        setLoading(false);
      },
    );
  }, []);
  const run = async (action: () => Promise<unknown>) => {
    if (!auth) throw new Error("Firebase account service is not configured");
    await action();
  };
  return (
    <AccountContext.Provider
      value={{
        user,
        loading,
        error,
        configured: !!auth,
        signup: (email, password) =>
          run(() => createUserWithEmailAndPassword(auth!, email, password)),
        login: (email, password) =>
          run(() => signInWithEmailAndPassword(auth!, email, password)),
        logout: () => run(() => signOut(auth!)),
        resetPassword: (email) =>
          run(() => sendPasswordResetEmail(auth!, email)),
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("Account provider is missing");
  return context;
}
