import { useState, useEffect } from "react";

import logo from "../assets/infinitesol logo.png";
import pattern from "../assets/infinitesol pattern.png";
import background from "../assets/NewYork-image.png";

export default function LoginPage({ setActivePage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.margin = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const goToNextPage = () => {
    if (typeof setActivePage === "function") {
      setActivePage("welcome");
    } else {
      window.location.href = "/welcome";
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    let hasError = false;

    setEmailError("");
    setPasswordError("");

    if (!trimmedEmail) {
      setEmailError("Please enter your email");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      hasError = true;
    }

    if (hasError) return;

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", trimmedEmail);

    goToNextPage();
  };

  const handleMicrosoftLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("provider", "microsoft");
    goToNextPage();
  };

  const handleGoogleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("provider", "google");
    goToNextPage();
  };

  return (
    <main
      className="relative h-[100dvh] w-screen overflow-hidden bg-[#071015] bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <style>
        {`
          @keyframes inputSoftPulse {
            0%, 100% {
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.08),
                0 8px 24px rgba(0, 0, 0, 0.16);
            }
            50% {
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                0 0 18px rgba(0, 245, 212, 0.10),
                0 8px 24px rgba(0, 0, 0, 0.16);
            }
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px rgba(9, 26, 33, 0.98) inset !important;
            -webkit-text-fill-color: #ffffff !important;
            caret-color: #ffffff !important;
            transition: background-color 9999s ease-in-out 0s;
          }
        `}
      </style>

      <div className="pointer-events-none absolute inset-0 bg-[#02080b]/5" />

      <header className="absolute left-[52px] top-[52px] z-20 flex items-center gap-[18px] max-md:left-6 max-md:top-7">
        <img
          src={pattern}
          alt=""
          className="h-[45px] w-[45px] object-contain drop-shadow-[0_0_16px_rgba(0,245,212,0.35)] max-md:h-9 max-md:w-9"
        />

        <img
          src={logo}
          alt="Infinitesol"
          className="h-[42px] w-auto object-contain max-md:h-8"
        />
      </header>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-5 pt-[34px]">
        <section className="w-full max-w-[636px] rounded-[18px] border border-white/15 bg-[#0b171d]/90 px-[85px] pb-[60px] pt-[77px] shadow-[0_32px_120px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[18px] max-lg:max-w-[590px] max-lg:px-14 max-md:px-6 max-md:py-10">
          <div className="text-center">
            <h1 className="text-[45px] font-light leading-none tracking-[-0.045em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] max-md:text-[34px]">
              Client Onboarding
            </h1>

            <p className="mt-[17px] text-[15.5px] font-normal tracking-[0.01em] text-white/76 max-md:text-sm">
              Secure access to your onboarding platform
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-[49px]">
            <div>
              <label
                htmlFor="email"
                className="mb-[12px] block text-[14.5px] font-semibold text-white/90"
              >
                Email Address
              </label>

              <div
                className={`group flex h-[56px] items-center gap-[17px] rounded-[10px] bg-[#0a1b22]/82 px-[18px] text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.16)] transition duration-300 ${
                  emailError
                    ? "border border-red-500 bg-red-500/10 ring-4 ring-red-500/10"
                    : "border border-[#6f8490]/45 hover:border-[#00f5d4]/45 hover:bg-[#0b2028]/88 focus-within:border-[#00f5d4] focus-within:bg-[#0b2229]/95 focus-within:ring-4 focus-within:ring-[#00f5d4]/16 focus-within:[animation:inputSoftPulse_2.2s_ease-in-out_infinite]"
                }`}
              >
                <span
                  className={`transition ${
                    emailError
                      ? "text-red-400"
                      : "text-white/78 group-hover:text-white/90 group-focus-within:text-[#00f5d4]"
                  }`}
                >
                  <MailIcon />
                </span>

                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className="min-w-0 flex-1 border-0 bg-transparent text-[16px] font-medium text-white outline-none placeholder:text-white/62"
                />
              </div>

              {emailError && (
                <p className="mt-2 text-[13px] font-medium text-red-400">
                  {emailError}
                </p>
              )}
            </div>

            <div className="mt-[24px]">
              <label
                htmlFor="password"
                className="mb-[12px] block text-[14.5px] font-semibold text-white/90"
              >
                Password
              </label>

              <div
                className={`group flex h-[56px] items-center gap-[17px] rounded-[10px] bg-[#0a1b22]/82 px-[18px] text-white/86 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.16)] transition duration-300 ${
                  passwordError
                    ? "border border-red-500 bg-red-500/10 ring-4 ring-red-500/10"
                    : "border border-[#6f8490]/45 hover:border-[#00f5d4]/45 hover:bg-[#0b2028]/88 focus-within:border-[#00f5d4] focus-within:bg-[#0b2229]/95 focus-within:ring-4 focus-within:ring-[#00f5d4]/16 focus-within:[animation:inputSoftPulse_2.2s_ease-in-out_infinite]"
                }`}
              >
                <span
                  className={`transition ${
                    passwordError
                      ? "text-red-400"
                      : "text-white/78 group-hover:text-white/90 group-focus-within:text-[#00f5d4]"
                  }`}
                >
                  <LockIcon />
                </span>

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (passwordError) setPasswordError("");
                  }}
                  className="min-w-0 flex-1 border-0 bg-transparent text-[16px] font-medium text-white outline-none placeholder:text-white/62"
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className={`inline-flex shrink-0 items-center justify-center border-0 bg-transparent p-0 transition ${
                    passwordError
                      ? "text-red-400 hover:text-red-300"
                      : "text-white/72 hover:text-[#00f5d4]"
                  }`}
                >
                  {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>

              {passwordError && (
                <p className="mt-2 text-[13px] font-medium text-red-400">
                  {passwordError}
                </p>
              )}
            </div>

            <div className="mt-[31px] flex items-center justify-between gap-4">
              <label className="flex cursor-pointer items-center gap-[11px] text-[14.5px] font-medium text-white/88">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(event) => setRememberDevice(event.target.checked)}
                  className="peer sr-only"
                />

                <span className="h-[18px] w-[18px] rounded-[4px] border border-[#00f5d4]/90 bg-[#07141a]/80 shadow-[0_0_14px_rgba(0,245,212,0.18)] transition peer-checked:border-[#00f5d4] peer-checked:bg-[#00f5d4] peer-checked:shadow-[0_0_20px_rgba(0,245,212,0.48),inset_0_0_0_4px_#071015]" />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  if (typeof setActivePage === "function") {
                    setActivePage("forgotPassword");
                  }
                }}
                className="border-0 bg-transparent p-0 text-[14.5px] font-semibold text-[#00f5d4] transition hover:text-[#66ffee] hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.55)]"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-[30px] flex h-[56px] w-full items-center justify-center gap-[20px] rounded-[10px] border-0 bg-[#13e0ad] text-[18px] font-bold text-[#02100d] shadow-[0_18px_42px_rgba(19,224,173,0.32),0_0_28px_rgba(19,224,173,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:-translate-y-px hover:bg-[#35f5c6] hover:shadow-[0_22px_50px_rgba(19,224,173,0.42),0_0_40px_rgba(19,224,173,0.3)] active:translate-y-0"
            >
              <span>Sign In</span>
              <ArrowRightIcon />
            </button>

            <div className="my-[44px] grid grid-cols-[1fr_auto_1fr] items-center gap-[18px]">
              <span className="h-px bg-white/[0.18]" />

              <p className="m-0 whitespace-nowrap text-[13.5px] font-medium text-white/66">
                or continue with
              </p>

              <span className="h-px bg-white/[0.18]" />
            </div>

            <div className="grid grid-cols-2 gap-[32px] max-sm:grid-cols-1 max-sm:gap-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex h-[56px] items-center justify-center gap-[15px] rounded-[10px] border border-[#6f8490]/35 bg-[#0a1b22]/58 text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:-translate-y-px hover:border-[#00f5d4]/70 hover:bg-[#0b2229]/78 hover:shadow-[0_0_24px_rgba(0,245,212,0.16)]"
              >
                <GoogleIcon />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={handleMicrosoftLogin}
                className="flex h-[56px] items-center justify-center gap-[15px] rounded-[10px] border border-[#6f8490]/35 bg-[#0a1b22]/58 text-[17px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:-translate-y-px hover:border-[#00f5d4]/70 hover:bg-[#0b2229]/78 hover:shadow-[0_0_24px_rgba(0,245,212,0.16)]"
              >
                <MicrosoftIcon />
                <span>Microsoft</span>
              </button>
            </div>
          </form>
        </section>
      </div>

      <footer className="absolute bottom-[34px] left-0 right-0 z-10 text-center text-[15px] text-white/74 max-md:bottom-5">
        © 2026 <span className="text-[#00f5d4]">InfiniteSol.</span> All rights
        reserved.
      </footer>
    </main>
  );
}

function MailIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      <path d="M12 15v2" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3l18 18" />
      <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4" />
      <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a16.4 16.4 0 0 1-3.1 4.1" />
      <path d="M6.1 6.1C3.5 8 2 12 2 12s3.5 7 10 7a10.5 10.5 0 0 0 4.1-.8" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 23 23" aria-hidden="true">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}