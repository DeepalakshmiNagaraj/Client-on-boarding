import { useState, useRef, useEffect } from "react";

import logo from "../assets/infinitesol logo.png";
import pattern from "../assets/infinitesol pattern.png";
import background from "../assets/NewYork-image.png";

export default function VerifyCode({ setActivePage }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputs = useRef([]);

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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    setCanResend(true);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (isError) setIsError(false);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = () => {
    const enteredOtp = otp.join("");

    if (!/^\d{6}$/.test(enteredOtp)) {
      setIsError(true);
      return;
    }

    setIsError(false);

    if (typeof setActivePage === "function") {
      setActivePage("createPassword");
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setTimer(30);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    setIsError(false);
    inputs.current[0]?.focus();
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
            <LockLargeIcon />
          </div>

          <div className="mt-[32px] text-center">
            <h1 className="text-[45px] font-light leading-none tracking-[-0.045em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] max-md:text-[34px]">
              Enter Verification Code
            </h1>

            <p className="mx-auto mt-[17px] max-w-[470px] text-[15.5px] font-normal leading-7 tracking-[0.01em] text-white/76 max-md:text-sm">
              Enter the 6-digit code sent to your email address.
            </p>
          </div>

          <div className="mt-[45px] flex justify-center gap-3 max-sm:gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                ref={(element) => (inputs.current[index] = element)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={data}
                onChange={(event) => handleChange(event.target.value, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`h-[58px] w-[58px] rounded-[10px] bg-[#0a1b22]/82 text-center text-[22px] font-bold text-white outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.16)] transition duration-300 max-sm:h-11 max-sm:w-11 max-sm:text-lg ${
                  isError
                    ? "border border-red-500 bg-red-500/10 ring-4 ring-red-500/10"
                    : "border border-[#6f8490]/45 hover:border-[#00f5d4]/45 focus:border-[#00f5d4] focus:ring-4 focus:ring-[#00f5d4]/16 focus:[animation:inputSoftPulse_2.2s_ease-in-out_infinite]"
                }`}
              />
            ))}
          </div>

          {isError && (
            <p className="mt-3 text-center text-[13px] font-medium text-red-400">
              Please enter a valid 6-digit code.
            </p>
          )}

          <p className="mt-[28px] text-center text-[14px] text-white/68">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend}
              className={`font-semibold transition ${
                canResend
                  ? "cursor-pointer text-[#00f5d4] hover:text-[#66ffee] hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.55)]"
                  : "cursor-not-allowed text-white/38"
              }`}
            >
              {canResend ? "Resend Code" : `Resend Code (${timer}s)`}
            </button>
          </p>

          <button
            type="button"
            onClick={handleVerifyCode}
            className="mt-[30px] flex h-[56px] w-full items-center justify-center rounded-[10px] border-0 bg-[#13e0ad] text-[18px] font-bold text-[#02100d] shadow-[0_18px_42px_rgba(19,224,173,0.32),0_0_28px_rgba(19,224,173,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:-translate-y-px hover:bg-[#35f5c6] hover:shadow-[0_22px_50px_rgba(19,224,173,0.42),0_0_40px_rgba(19,224,173,0.3)] active:translate-y-0"
          >
            Verify Code
          </button>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="mt-[34px] block w-full border-0 bg-transparent p-0 text-center text-[15px] font-semibold text-[#00f5d4] transition hover:text-[#66ffee] hover:drop-shadow-[0_0_8px_rgba(0,245,212,0.55)]"
          >
            ← Back to Login
          </button>

          <div className="mt-[34px] flex items-center justify-center gap-3 text-center text-[15px] text-white/68">
            <ShieldIcon />
            <span>Your verification is secured with encrypted protection.</span>
          </div>
        </section>
      </div>

      <footer className="absolute bottom-[34px] left-0 right-0 z-10 text-center text-[15px] text-white/74 max-md:bottom-5">
        © 2024 <span className="text-[#00f5d4]">InfiniteSol.</span> All rights
        reserved.
      </footer>
    </main>
  );
}

function LockLargeIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}