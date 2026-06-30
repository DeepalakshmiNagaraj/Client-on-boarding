import { useEffect, useState } from "react";

function Cloud() {
  const canEdit = true;

  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("appTheme") === "light";
  });

  const [formData, setFormData] = useState({
    primaryPlatform: "",
    tenantId: "",
    tenantDomain: "",
    adminUsername: "",
    adminPassword: "",
    singleSignOn: "",
    mfaEnforced: "",
    emailSecurityProvider: "",
  });

  useEffect(() => {
    const handleThemeChange = (event) => {
      setIsLightTheme(event.detail === "light");
    };

    const handleStorageChange = () => {
      setIsLightTheme(localStorage.getItem("appTheme") === "light");
    };

    window.addEventListener("app-theme-change", handleThemeChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("app-theme-change", handleThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleThemeToggle = () => {
    setIsLightTheme((currentTheme) => {
      const nextTheme = !currentTheme;
      const themeName = nextTheme ? "light" : "dark";

      localStorage.setItem("appTheme", themeName);

      window.dispatchEvent(
        new CustomEvent("app-theme-change", {
          detail: themeName,
        })
      );

      return nextTheme;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const pageClass = isLightTheme
    ? "bg-[#f7fafc] text-[#07111f]"
    : "bg-[#04111f] text-white";

  const toolbarInputClass = isLightTheme
    ? "border-[#d8e2ec] bg-white text-[#07111f] placeholder:text-slate-400 focus:border-[#00B894] focus:ring-[#00B894]/10"
    : "border-[#24445f] bg-[#071827] text-white placeholder:text-slate-500 focus:border-[#00E8AD] focus:ring-[#00E8AD]/10";

  const iconButtonClass = isLightTheme
    ? "border-[#d8e2ec] bg-white text-[#07111f] shadow-[0_8px_24px_rgba(15,23,42,0.06)] hover:border-[#00B894] hover:text-[#00B894]"
    : "border-[#24445f] bg-[#071827] text-white/80 hover:border-[#00E8AD]/60 hover:text-[#00E8AD]";

  const cardClass = isLightTheme
    ? "border-[#dbe5ef] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    : "border-[#23425e] bg-[#071827]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_80px_rgba(0,0,0,0.22)]";

  const dividerClass = isLightTheme ? "border-[#dbe5ef]" : "border-[#23425e]";

  const headingTextClass = isLightTheme ? "text-[#07111f]" : "text-white";

  const mutedTextClass = isLightTheme ? "text-slate-500" : "text-slate-400";

  const infoBoxClass = isLightTheme
    ? "border-[#a9eee0] bg-[#effffb] shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
    : "border-[#00E8AD]/20 bg-[#042d35]/75 shadow-[0_18px_60px_rgba(0,0,0,0.18)]";

  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden px-8 py-5 transition-colors duration-300 ${pageClass}`}
    >
      <style>
        {`
          .cloud-scroll::-webkit-scrollbar {
            width: 5px;
          }

          .cloud-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .cloud-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 184, 148, 0.45);
            border-radius: 999px;
          }

          .cloud-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 184, 148, 0.75);
          }
        `}
      </style>

      {/* TOP TOOLBAR */}
      <div className="mb-5 flex shrink-0 items-center justify-between gap-6">
        <div className="relative w-full max-w-[430px]">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#00B894]">
            <SearchIcon />
          </span>

          <input
            type="text"
            placeholder="Search cloud and identity details..."
            className={`h-11 w-full rounded-2xl border pl-12 pr-4 text-sm outline-none transition focus:ring-4 ${toolbarInputClass}`}
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className={`relative flex h-11 w-11 items-center justify-center rounded-2xl border transition ${iconButtonClass}`}
          >
            <NotificationIcon />
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#00B894]" />
          </button>

          <button
            type="button"
            onClick={handleThemeToggle}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${iconButtonClass}`}
          >
            {isLightTheme ? <MoonIcon /> : <SunIcon />}
          </button>

          <button
            type="button"
            className={`flex h-11 items-center gap-2 rounded-2xl border px-5 text-sm font-semibold transition ${iconButtonClass}`}
          >
            <ExportIcon />
            Export
          </button>
        </div>
      </div>

      {/* PAGE HEADER */}
      <div className="mb-5 flex shrink-0 items-center justify-between gap-5">
        <div>
          <h1
            className={`text-[34px] font-bold leading-tight tracking-[-0.03em] ${headingTextClass}`}
          >
            Cloud & Identity Management
          </h1>
          <p className={`mt-1.5 text-base ${mutedTextClass}`}>
            Provide tenant, identity, authentication, and email security details.
          </p>
        </div>
      </div>

      {/* CENTER CARD */}
      <div
        className={`min-h-0 flex-1 rounded-3xl border px-8 py-7 transition-colors duration-300 ${cardClass}`}
      >
        <div className="flex h-full min-h-0 flex-col">
          <div className={`mb-6 shrink-0 border-b pb-6 ${dividerClass}`}>
            <h2 className={`text-2xl font-bold ${headingTextClass}`}>
              Cloud & Identity Management
            </h2>
            <p className={`mt-2 text-base ${mutedTextClass}`}>
              Enter platform, tenant, admin, SSO, MFA, and email security
              information.
            </p>
          </div>

          {/* ONLY FORM CONTENT SCROLLS */}
          <div className="cloud-scroll min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-x-8 gap-y-7 xl:grid-cols-2">
              <FormInput
                label="Primary Platform"
                name="primaryPlatform"
                value={formData.primaryPlatform}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Example: Microsoft 365, Azure, Google Workspace"
                required
                isLightTheme={isLightTheme}
              />

              <FormInput
                label="Tenant ID"
                name="tenantId"
                value={formData.tenantId}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Enter tenant ID"
                isLightTheme={isLightTheme}
              />

              <FormInput
                label="Tenant Domain"
                name="tenantDomain"
                value={formData.tenantDomain}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Example: company.onmicrosoft.com"
                isLightTheme={isLightTheme}
              />

              <FormInput
                label="Admin Username"
                name="adminUsername"
                value={formData.adminUsername}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Enter admin username"
                isLightTheme={isLightTheme}
              />

              <FormInput
                label="Admin Password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Enter admin password"
                type="password"
                isLightTheme={isLightTheme}
              />

              <RadioGroup
                label="Single Sign-On"
                name="singleSignOn"
                value={formData.singleSignOn}
                onChange={handleChange}
                disabled={!canEdit}
                options={["Yes", "No"]}
                isLightTheme={isLightTheme}
              />

              <RadioGroup
                label="MFA Enforced"
                name="mfaEnforced"
                value={formData.mfaEnforced}
                onChange={handleChange}
                disabled={!canEdit}
                options={["Yes", "No"]}
                isLightTheme={isLightTheme}
              />

              <FormInput
                label="Email Security Provider"
                name="emailSecurityProvider"
                value={formData.emailSecurityProvider}
                onChange={handleChange}
                disabled={!canEdit}
                placeholder="Example: Defender, Proofpoint, Mimecast"
                isLightTheme={isLightTheme}
              />
            </div>
          </div>

          {/* FIXED BOTTOM SECTION */}
          <div
            className={`mt-6 shrink-0 rounded-3xl border px-6 py-4 transition-colors duration-300 ${infoBoxClass}`}
          >
            <div>
              <h3 className="text-lg font-bold text-[#00B894]">
                Why this information matters?
              </h3>
              <p
                className={`mt-1 text-sm leading-6 ${
                  isLightTheme ? "text-slate-600" : "text-slate-400"
                }`}
              >
                Cloud and identity details help us understand tenant structure,
                administrator access, sign-on requirements, MFA posture, and
                email security coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInput({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
  required = false,
  type = "text",
  isLightTheme,
}) {
  const labelClass = isLightTheme ? "text-[#07111f]" : "text-slate-300";

  const inputClass = isLightTheme
    ? "border-[#d8e2ec] bg-white text-[#07111f] placeholder:text-slate-400 focus:border-[#00B894] focus:ring-[#00B894]/10 disabled:bg-slate-50"
    : "border-[#294963] bg-[#071827] text-white placeholder:text-slate-500 focus:border-[#00E8AD] focus:ring-[#00E8AD]/10 disabled:opacity-70";

  return (
    <label className="block">
      <span className={`mb-3 block text-[15px] font-semibold ${labelClass}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`h-[58px] w-full rounded-2xl border px-5 text-base outline-none transition focus:ring-4 disabled:cursor-not-allowed ${inputClass}`}
      />
    </label>
  );
}

function RadioGroup({
  label,
  name,
  value,
  onChange,
  disabled,
  options,
  isLightTheme,
}) {
  const labelClass = isLightTheme ? "text-[#07111f]" : "text-slate-300";

  const boxClass = isLightTheme
    ? "border-[#d8e2ec] bg-white text-[#07111f]"
    : "border-[#294963] bg-[#071827] text-white";

  const optionTextClass = isLightTheme ? "text-[#07111f]" : "text-white";

  return (
    <div>
      <p className={`mb-3 text-[15px] font-semibold ${labelClass}`}>{label}</p>

      <div
        className={`flex h-[58px] w-full items-center gap-8 rounded-2xl border px-5 transition ${boxClass}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-center gap-2 text-base ${optionTextClass}`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              disabled={disabled}
              className="h-4 w-4 accent-[#00E8AD] disabled:cursor-not-allowed"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M10 20a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m7 10 5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 20h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default Cloud;