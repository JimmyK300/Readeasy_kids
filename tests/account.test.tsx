// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
const mocks = vi.hoisted(() => ({
  signup: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  observe: vi.fn(),
  reset: vi.fn(),
}));
vi.mock("../src/Firebase/firebase", () => ({ auth: {}, db: null }));
vi.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: mocks.signup,
  signInWithEmailAndPassword: mocks.login,
  signOut: mocks.logout,
  onAuthStateChanged: mocks.observe,
  sendPasswordResetEmail: mocks.reset,
}));
import { AccountProvider } from "../src/context/authContext";
import { DataProvider } from "../src/context/dataContext";
import Account from "../src/pages/Account";
const mount = () =>
  render(
    <MemoryRouter>
      <AccountProvider>
        <DataProvider>
          <Account mode="signup" />
        </DataProvider>
      </AccountProvider>
    </MemoryRouter>,
  );
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
describe("real SDK account boundary", () => {
  it("waits for SDK authentication state and passes signup credentials only to Firebase", async () => {
    mocks.observe.mockImplementation((_auth, callback) => {
      callback(null);
      return () => {};
    });
    mocks.signup.mockResolvedValue({ user: { uid: "guardianA" } });
    mount();
    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText("Email của phụ huynh"),
      "guardian@example.com",
    );
    await user.type(screen.getByLabelText(/Mật khẩu/), "test-only-password");
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản" }));
    await waitFor(() =>
      expect(mocks.signup).toHaveBeenCalledWith(
        {},
        "guardian@example.com",
        "test-only-password",
      ),
    );
    expect((screen.getByLabelText(/Mật khẩu/) as HTMLInputElement).value).toBe(
      "",
    );
    expect(localStorage.length).toBe(0);
  });
  it("shows provider failure, clears password and re-enables submit", async () => {
    mocks.observe.mockImplementation((_auth, callback) => {
      callback(null);
      return () => {};
    });
    mocks.signup.mockRejectedValue({ code: "auth/email-already-in-use" });
    mount();
    const user = userEvent.setup();
    await user.type(
      screen.getByLabelText("Email của phụ huynh"),
      "guardian@example.com",
    );
    await user.type(screen.getByLabelText(/Mật khẩu/), "test-only-password");
    await user.click(screen.getByRole("button", { name: "Tạo tài khoản" }));
    expect((await screen.findByRole("alert")).textContent).toContain(
      "Email này đã có tài khoản",
    );
    expect(
      (
        screen.getByRole("button", {
          name: "Tạo tài khoản",
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(false);
    expect((screen.getByLabelText(/Mật khẩu/) as HTMLInputElement).value).toBe(
      "",
    );
  });
  it("shows authenticated account from SDK and sends logout to Firebase", async () => {
    mocks.observe.mockImplementation((_auth, callback) => {
      callback({ uid: "guardianA", email: "guardian@example.com" });
      return () => {};
    });
    mocks.logout.mockResolvedValue(undefined);
    mount();
    expect(screen.getByText("guardian@example.com")).toBeTruthy();
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Đăng xuất" }));
    await waitFor(() => expect(mocks.logout).toHaveBeenCalledWith({}));
  });
});
