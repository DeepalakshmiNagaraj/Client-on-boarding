import { useEffect, useState } from "react";

import logo from "../assets/infinitesol logo.png";
import pattern from "../assets/infinitesol pattern.png";
import background from "../assets/NewYork-image.png";

export default function ForgotPassword({ setActivePage }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  const handleSendCode = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError("");

    if (typeof setActivePage === "function") {
      setActivePage("verifyCode");
    }
  };

  const handleBackToLogin = () => {
    if (typeof setActivePage === "function") {
      setActivePage("login");
    }
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
        <section className="w-full max-w-[636px] rounded-[18px] border border-white/15 bg-[#0b171d]/90 px-[85px] pb-[60px] pt-[65px] shadow-[0_32px_120px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[18px] max-lg:max-w-[590px] max-lg:px-14 max-md:px-6 max-md:py-10">
          <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-[20px] border border-white/15 bg-[#0a1b22]/80 text-[#00f5d4] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_34px_rgba(0,0,0,0.24)]">
            <MailLargeIcon />
          </div>

          <div className="mt-[32px] text-center">
            <h1 className="text-[45px] font-light leading-none tracking-[-0.045em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] max-md:text-[34px]">
              Enter your email
            </h1>

            <p className="mx-auto mt-[17px] max-w-[470px] text-[15.5px] font-normal leading-7 tracking-[0.01em] text-white/76 max-md:text-sm">
              We’ll send a verification code to your email address.
            </p>
          </div>

          <form onSubmit={handleSendCode} className="mt-[49px]">
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
                  placeholder="name@company.com"
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

            <button
              type="submit"
              className="mt-[30px] flex h-[56px] w-full items-center justify-center rounded-[10px] border-0 bg-[#13e0ad] text-[18px] font-bold text-[#02100d] shadow-[0_18px_42px_rgba(19,224,173,0.32),0_0_28px_rgba(19,224,173,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:-translate-y-px hover:bg-[#35f5c6] hover:shadow-[0_22px_50px_rgba(19,224,173,0.42),0_0_40px_rgba(19,224,173,0.3)] active:translate-y-0"
            >
              Send Verification Code
            </button>

            <button
              type="button"
              onClick={handleBackToLogin}
              className="mt-[34px] block w-full border-0 bg-transparent p-0 text-center text-[15px] font-semibold text-[#00f5d4] transition hover:text-[#66ffee] hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.55)]"
            >
              ← Back to Login
            </button>

            <div className="mt-[34px] flex items-center justify-center gap-3 text-center text-[15px] text-white/68">
              <LockSmallIcon />
              <span>
                Your reset request is secured with encrypted verification.
              </span>
            </div>
          </form>
        </section>
      </div>

      <footer className="absolute bottom-[34px] left-0 right-0 z-10 text-center text-[15px] text-white/74 max-md:bottom-5">
        © 2024 <span className="text-[#00f5d4]">InfiniteSol.</span> All rights
        reserved.
      </footer>
    </main>
  );
}

function MailLargeIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M3 7l9 6 9-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

function LockSmallIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      className="shrink-0 text-[#00f5d4]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}