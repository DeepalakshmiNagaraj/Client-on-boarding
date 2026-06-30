import { useEffect, useMemo, useState } from "react";

import logo from "../assets/infinitesol logo.png";
import pattern from "../assets/infinitesol Pattern.png";
import lightLogo from "../assets/Logo original_png 1.png";

function Sidebar({
  activePage,
  setActivePage,
  selectedCompany,
  setSelectedCompany,
}) {
  const role = localStorage.getItem("role");

  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem("appTheme") === "light";
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

  const organizationCompanies = [
    "ABC Company",
    "TechNova Solutions",
    "CloudEdge Systems",
    "SecureNet Corp",
    "DataBridge Ltd",
    "InfiniteSol Demo",
  ];

  const [companies, setCompanies] = useState(organizationCompanies);
  const [showInput, setShowInput] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [expandedCompanies, setExpandedCompanies] = useState({});
  const [activeButton, setActiveButton] = useState("dashboard");
  const [showProfileActions, setShowProfileActions] = useState(false);

  const userName =
    role === "master_admin"
      ? "Master Admin"
      : role === "admin"
      ? "Admin User"
      : role === "techuser"
      ? "Tech User"
      : "Normal User";

  const userEmail =
    role === "master_admin"
      ? "master@gmail.com"
      : role === "admin"
      ? "admin@gmail.com"
      : role === "techuser"
      ? "techuser@gmail.com"
      : "user@gmail.com";

  const userShort =
    role === "master_admin"
      ? "MD"
      : role === "admin"
      ? "AD"
      : role === "techuser"
      ? "TU"
      : "US";

  const modules = useMemo(
    () => [
      { label: "Organization Information", page: "org", short: "Org" },
      { label: "Contacts & Stakeholders", page: "contact", short: "Contact" },
      { label: "Network Infrastructure", page: "network", short: "Network" },
      { label: "Cloud & Identity Management", page: "cloud", short: "Cloud" },
      {
        label: "Servers, Applications & Security",
        page: "servers",
        short: "Servers",
      },
      { label: "Security", page: "security", short: "Security" },
    ],
    []
  );

  const modulePageKeys = useMemo(
    () => modules.map((module) => module.page),
    [modules]
  );

  const isDashboardActive =
    activePage === "welcome" || activePage === "dashboard";

  const isOrganizationPageActive = modulePageKeys.includes(activePage);

  const handleSetSelectedCompany = (company) => {
    if (typeof setSelectedCompany === "function") {
      setSelectedCompany(company);
    }
  };

  const handleAddCompany = () => {
    const companyName = newCompany.trim();

    if (!companyName) return;

    setCompanies((previous) => [...previous, companyName]);
    handleSetSelectedCompany(companyName);

    setExpandedCompanies((previous) => ({
      ...previous,
      [companyName]: true,
    }));

    setActiveButton(companyName);
    setNewCompany("");
    setShowInput(false);
    setShowOrganizations(true);
  };

  const handleDashboardClick = () => {
    setActiveButton("dashboard");
    setActivePage("welcome");
  };

  const handleOrganizationsClick = () => {
    setShowOrganizations((value) => !value);
    setActiveButton("organizations");
  };

  const handleCompanyClick = (event, company) => {
    event.stopPropagation();

    handleSetSelectedCompany(company);
    setShowOrganizations(true);

    setExpandedCompanies((previous) => ({
      ...previous,
      [company]: !previous[company],
    }));

    setActiveButton(company);
  };

  const handleModuleClick = (event, company, page) => {
    event.stopPropagation();

    handleSetSelectedCompany(company);
    setShowOrganizations(true);

    setExpandedCompanies((previous) => ({
      ...previous,
      [company]: true,
    }));

    setActiveButton(`${company}-${page}`);
    setActivePage(page);
  };

  const handleCreateAdmin = () => {
    setActiveButton("createAdmin");
    setActivePage("createAdmin");
  };

  const handleLogout = () => {
    localStorage.clear();
    setActivePage("login");
  };

  const navButtonClass = (isActive) =>
    `
      flex w-full items-center justify-between rounded-xl px-4 py-3
      text-left text-sm font-semibold transition-all duration-200
      ${
        isActive
          ? "bg-[#00E8AD] text-[#03111c] shadow-[0_10px_26px_rgba(0,232,173,0.22)]"
          : isLightTheme
          ? "border border-[#d8e2ec] bg-white text-[#07111f] hover:border-[#00B894] hover:bg-[#effffb] hover:text-[#00B894]"
          : "bg-[#0b1a2b] text-white hover:bg-[#10243a] hover:text-[#00E8AD]"
      }
    `;

  const companyButtonClass = (isActive) =>
    `
      flex w-full items-center justify-between rounded-xl px-4 py-3
      text-left text-sm font-semibold transition-all duration-200
      ${
        isActive
          ? "bg-[#00E8AD] text-[#03111c] shadow-[0_10px_26px_rgba(0,232,173,0.22)]"
          : isLightTheme
          ? "border border-[#d8e2ec] bg-white text-[#07111f] hover:border-[#00B894] hover:bg-[#effffb] hover:text-[#00B894]"
          : "bg-[#0b1a2b]/95 text-white hover:bg-[#10243a] hover:text-[#00E8AD]"
      }
    `;

  const moduleButtonClass = (isActive) =>
    `
      group flex w-full items-center gap-3 rounded-lg px-3 py-2.5
      text-left text-[12px] leading-snug transition-all duration-200
      ${
        isActive
          ? "bg-[#00E8AD]/15 text-[#00B894]"
          : isLightTheme
          ? "text-[#07111f] hover:bg-[#dffaf4] hover:text-[#00B894]"
          : "text-slate-300 hover:bg-[#10243a] hover:text-white"
      }
    `;

  const profileActionButtonClass = (isActive) =>
    `
      w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200
      ${
        isActive
          ? "bg-[#00E8AD] text-[#03111c] shadow-[0_10px_26px_rgba(0,232,173,0.22)]"
          : isLightTheme
          ? "border border-[#d8e2ec] bg-white text-[#07111f] hover:border-[#00B894] hover:bg-[#00E8AD] hover:text-[#03111c]"
          : "bg-[#0b1a2b] text-white hover:bg-[#00E8AD] hover:text-[#03111c]"
      }
    `;

  return (
    <aside
      className={`
        flex h-screen w-[280px] shrink-0 flex-col border-r transition-colors duration-300
        ${
          isLightTheme
            ? "border-[#dbe5ef] bg-white text-[#07111f] shadow-[18px_0_60px_rgba(15,23,42,0.08)]"
            : "border-[#0b3852] bg-[#06111f] text-white shadow-[18px_0_60px_rgba(0,0,0,0.22)]"
        }
      `}
    >
      <style>
        {`
          .sidebar-scroll::-webkit-scrollbar {
            width: 4px;
          }

          .sidebar-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .sidebar-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 232, 173, 0.28);
            border-radius: 999px;
          }

          .sidebar-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 232, 173, 0.48);
          }
        `}
      </style>

      <div className="flex h-full min-h-0 flex-col px-4 py-5">
        <div className="mb-7 flex shrink-0 items-center gap-2">
          <img src={pattern} alt="Pattern" className="h-9 w-auto" />
          <img
            src={isLightTheme ? lightLogo : logo}
            alt="InfiniteSol Logo"
            className={isLightTheme ? "h-9 w-auto object-contain" : "h-9 w-auto"}
          />
        </div>

        <nav className="sidebar-scroll min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={handleDashboardClick}
            className={navButtonClass(isDashboardActive)}
          >
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            onClick={handleOrganizationsClick}
            className={navButtonClass(activeButton === "organizations")}
          >
            <span>Organizations</span>
            <span className="text-xs">{showOrganizations ? "⌃" : "⌄"}</span>
          </button>

          {showOrganizations && (
            <div className="space-y-2">
              {companies.map((company) => {
                const isExpanded = Boolean(expandedCompanies[company]);

                const isCompanyActive =
                  selectedCompany === company &&
                  (isOrganizationPageActive || activeButton === company);

                return (
                  <div key={company} className="rounded-2xl">
                    <button
                      type="button"
                      onClick={(event) => handleCompanyClick(event, company)}
                      className={companyButtonClass(isCompanyActive)}
                    >
                      <span className="min-w-0 truncate">{company}</span>
                      <span className="ml-3 shrink-0 text-xs">
                        {isExpanded ? "⌃" : "⌄"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div
                        className={`
                          mt-2 rounded-2xl border p-2 transition-colors duration-300
                          ${
                            isLightTheme
                              ? "border-[#dbe5ef] bg-[#f8fbfd]"
                              : "border-[#12344d] bg-[#071827]/75"
                          }
                        `}
                      >
                        <div className="space-y-1">
                          {modules.map((module, index) => {
                            const isActive =
                              selectedCompany === company &&
                              activePage === module.page;

                            return (
                              <button
                                key={module.page}
                                type="button"
                                onClick={(event) =>
                                  handleModuleClick(event, company, module.page)
                                }
                                className={moduleButtonClass(isActive)}
                              >
                                <span
                                  className={`
                                    flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                                    text-[11px] font-bold transition-all duration-200
                                    ${
                                      isActive
                                        ? "bg-[#00E8AD] text-[#03111c]"
                                        : isLightTheme
                                        ? "bg-[#e2e8f0] text-[#475569] group-hover:bg-[#dffaf4] group-hover:text-[#00B894]"
                                        : "bg-[#0d2a40] text-[#8db2c7] group-hover:bg-[#123a58] group-hover:text-[#00E8AD]"
                                    }
                                  `}
                                >
                                  {index + 1}
                                </span>

                                <span className="min-w-0 flex-1">
                                  {module.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {role === "master_admin" && (
                <div className="pt-1">
                  {showInput && (
                    <div
                      className={`
                        mb-2 rounded-2xl border p-2
                        ${
                          isLightTheme
                            ? "border-[#dbe5ef] bg-[#f8fbfd]"
                            : "border-[#12344d] bg-[#071827]/80"
                        }
                      `}
                    >
                      <input
                        type="text"
                        placeholder="Enter company name"
                        value={newCompany}
                        onChange={(event) => setNewCompany(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            handleAddCompany();
                          }
                        }}
                        className={`
                          w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition focus:border-[#00E8AD] focus:ring-4 focus:ring-[#00E8AD]/10
                          ${
                            isLightTheme
                              ? "border-[#d8e2ec] bg-white text-[#07111f] placeholder:text-slate-400"
                              : "border-[#1f5475] bg-[#0b1a2b] text-white placeholder:text-slate-500"
                          }
                        `}
                        autoFocus
                      />

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={handleAddCompany}
                          className="rounded-xl bg-[#00E8AD] px-3 py-2 text-xs font-bold text-[#03111c] transition hover:opacity-90"
                        >
                          Save
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowInput(false);
                            setNewCompany("");
                          }}
                          className={`
                            rounded-xl px-3 py-2 text-xs font-semibold transition
                            ${
                              isLightTheme
                                ? "bg-[#e2e8f0] text-[#07111f] hover:bg-[#cbd5e1]"
                                : "bg-[#13263d] text-white hover:bg-[#18324f]"
                            }
                          `}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {!showInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowInput(true);
                        setActiveButton("addCompany");
                      }}
                      className={navButtonClass(activeButton === "addCompany")}
                    >
                      <span>Add Company</span>
                      <span className="text-lg leading-none">+</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="mt-4 shrink-0 space-y-3">
          {showProfileActions && (
            <div
              className={`
                rounded-2xl border p-3 shadow-[0_-10px_28px_rgba(0,0,0,0.08)]
                ${
                  isLightTheme
                    ? "border-[#dbe5ef] bg-[#f8fbfd]"
                    : "border-[#12344d] bg-[#071827]"
                }
              `}
            >
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={handleCreateAdmin}
                  className={profileActionButtonClass(
                    activeButton === "createAdmin"
                  )}
                >
                  Create Admin
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={profileActionButtonClass(false)}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowProfileActions((value) => !value)}
            className={`
              flex w-full items-center justify-between rounded-2xl border p-3
              text-left transition-all duration-200
              ${
                showProfileActions
                  ? "border-[#00E8AD] bg-[#00E8AD] text-[#03111c] shadow-[0_0_22px_rgba(0,232,173,0.22)]"
                  : isLightTheme
                  ? "border-[#d8e2ec] bg-white text-[#07111f] hover:border-[#00B894]/50 hover:bg-[#effffb]"
                  : "border-[#12344d] bg-[#0b1a2b] text-white hover:border-[#00E8AD]/50 hover:bg-[#10243a]"
              }
            `}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold
                  ${
                    showProfileActions
                      ? "bg-[#06111f] text-[#00E8AD]"
                      : "bg-[#00E8AD] text-[#03111c]"
                  }
                `}
              >
                {userShort}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{userName}</p>
                <p
                  className={`truncate text-xs ${
                    showProfileActions
                      ? "text-black/70"
                      : isLightTheme
                      ? "text-slate-500"
                      : "text-slate-400"
                  }`}
                >
                  {userEmail}
                </p>
              </div>
            </div>

            <span className="ml-2 shrink-0 text-xs">
              {showProfileActions ? "⌃" : "⌄"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;