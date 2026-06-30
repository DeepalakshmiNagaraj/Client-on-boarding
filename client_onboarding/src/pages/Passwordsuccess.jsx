import { useEffect } from "react";

import logo from "../assets/infinitesol logo.png";
import pattern from "../assets/infinitesol pattern.png";
import background from "../assets/NewYork-image.png";

export default function PasswordResetSuccess({ setActivePage }) {
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
            <CheckIcon />
          </div>

          <div className="mt-[32px] text-center">
            <h1 className="text-[45px] font-light leading-none tracking-[-0.045em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.12)] max-md:text-[34px]">
              You're All Set!
            </h1>

            <p className="mx-auto mt-[17px] max-w-[470px] text-[15.5px] font-normal leading-7 tracking-[0.01em] text-white/76 max-md:text-sm">
              Your password has been reset successfully.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBackToLogin}
            className="mt-[42px] flex h-[56px] w-full items-center justify-center rounded-[10px] border-0 bg-[#13e0ad] text-[18px] font-bold text-[#02100d] shadow-[0_18px_42px_rgba(19,224,173,0.32),0_0_28px_rgba(19,224,173,0.22),inset_0_1px_0_rgba(255,255,255,0.28)] transition hover:-translate-y-px hover:bg-[#35f5c6] hover:shadow-[0_22px_50px_rgba(19,224,173,0.42),0_0_40px_rgba(19,224,173,0.3)] active:translate-y-0"
          >
            Back to Login
          </button>

          <div className="mt-[34px] rounded-[14px] border border-white/15 bg-[#0a1b22]/70 px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00f5d4]/25 bg-[#00f5d4]/10 text-[#00f5d4]">
                <ShieldIcon />
              </div>

              <div>
                <h3 className="text-[16px] font-semibold text-white">
                  Security Tip
                </h3>

                <p className="mt-1 text-[14px] leading-6 text-white/65">
                  Keep your password secure and don't share it with anyone.
                </p>
              </div>
            </div>
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

function CheckIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7l7-4z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}