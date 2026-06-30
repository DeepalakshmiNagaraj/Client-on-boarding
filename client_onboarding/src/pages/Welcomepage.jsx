import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

const companies = [
  { name: "Acme Corp", x: "50%", y: "24%" },
  { name: "Nova Systems", x: "68%", y: "30%" },
  { name: "BluePeak Ltd", x: "78%", y: "53%" },
  { name: "Vertex Labs", x: "67%", y: "78%" },
  { name: "GreenField Inc", x: "40%", y: "77%" },
  { name: "Orion Tech", x: "28%", y: "49%" },
];

const companyConnections = companies.flatMap((company, companyIndex) =>
  companies.slice(companyIndex + 1).map((targetCompany) => ({
    from: company,
    to: targetCompany,
  }))
);

const subsections = [
  { label: "Organization", page: "org" },
  { label: "Contacts", page: "contact" },
  { label: "Network", page: "network" },
  { label: "Cloud", page: "cloud" },
  { label: "Servers", page: "servers" },
  { label: "Security", page: "security" },
];

const overviewItems = [
  {
    icon: <BuildingSmallIcon />,
    label: "New Organizations",
    value: "2",
    trend: "20%",
    bg: "bg-[#063f37]/85",
    text: "text-[#00e8ad]",
  },
  {
    icon: <UsersSmallIcon />,
    label: "New Users",
    value: "24",
    trend: "18%",
    bg: "bg-[#073c56]/85",
    text: "text-[#08d7ff]",
  },
  {
    icon: <PulseIcon />,
    label: "Active Sessions",
    value: "156",
    trend: "12%",
    bg: "bg-[#282464]/85",
    text: "text-[#a18bff]",
  },
  {
    icon: <SyncSmallIcon />,
    label: "Data Syncs",
    value: "342",
    trend: "28%",
    bg: "bg-[#5a3500]/85",
    text: "text-[#ff9300]",
  },
];

const activityItems = [
  {
    icon: <UsersTinyIcon />,
    time: "2m ago",
    label: "New user added",
    company: "Acme Corp",
    color: "text-white/75",
  },
  {
    icon: <CloudTinyIcon />,
    time: "5m ago",
    label: "Cloud account connected",
    company: "Orion Tech",
    color: "text-white/75",
  },
  {
    icon: <ShieldTinyIcon />,
    time: "7m ago",
    label: "Security scan completed",
    company: "BluePeak Ltd",
    color: "text-[#ffb000]",
  },
  {
    icon: <SyncTinyIcon />,
    time: "10m ago",
    label: "Data sync completed",
    company: "Nova Systems",
    color: "text-[#ff6b00]",
  },
  {
    icon: <DeviceTinyIcon />,
    time: "12m ago",
    label: "New device registered",
    company: "GreenField Inc",
    color: "text-white/75",
  },
];

const particleDots = Array.from({ length: 220 }, (_, index) => {
  const angle = index * 137.508;
  const radius = 8 + ((index * 37) % 92);
  const x = 50 + Math.cos((angle * Math.PI) / 180) * radius * 0.48;
  const y = 50 + Math.sin((angle * Math.PI) / 180) * radius * 0.48;
  const size = 1.5 + (index % 4) * 0.55;
  const opacity = 0.18 + (index % 7) * 0.06;

  return {
    id: index,
    x: `${x}%`,
    y: `${y}%`,
    size,
    opacity,
    delay: `${(index % 24) * 0.12}s`,
  };
});

const networkLines = Array.from({ length: 90 }, (_, index) => {
  const angle = index * 31;
  const length = 28 + (index % 7) * 20;
  const left = 50 + Math.cos((index * 53 * Math.PI) / 180) * ((index % 30) + 4);
  const top = 50 + Math.sin((index * 47 * Math.PI) / 180) * ((index % 30) + 4);

  return {
    id: index,
    left: `${left}%`,
    top: `${top}%`,
    width: `${length}px`,
    rotate: `${angle}deg`,
    opacity: 0.06 + (index % 5) * 0.025,
    delay: `${(index % 20) * 0.15}s`,
  };
});

export default function WelcomePage({ setActivePage }) {
  const [zoom, setZoom] = useState(100);
  const [pinnedCompany, setPinnedCompany] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.margin = "0";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleZoomOut = () => {
    setZoom((currentZoom) => Math.max(currentZoom - 10, 60));
  };

  const handleZoomIn = () => {
    setZoom((currentZoom) => Math.min(currentZoom + 10, 160));
  };

  const handleResetView = () => {
    setZoom(100);
  };

  return (
    <div
      className="fixed inset-0 flex overflow-hidden bg-[#03101d] text-white"
      style={{ width: "100vw", height: "100vh" }}
      onClick={() => setPinnedCompany(null)}
    >
      <style>
        {`
          @keyframes sphereFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(0, -10px, 0) scale(1.012);
            }
          }

          @keyframes sphereRotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes reverseRotate {
            0% {
              transform: rotate(360deg);
            }
            100% {
              transform: rotate(0deg);
            }
          }

          @keyframes dotPulse {
            0%, 100% {
              opacity: 0.18;
              transform: scale(1);
            }
            50% {
              opacity: 0.82;
              transform: scale(1.45);
            }
          }

          @keyframes linePulse {
            0%, 100% {
              opacity: 0.04;
            }
            50% {
              opacity: 0.18;
            }
          }

          @keyframes companyDotGlow {
            0%, 100% {
              box-shadow:
                0 0 8px rgba(255, 255, 255, 0.35),
                0 0 16px rgba(0, 232, 213, 0.08);
              transform: scale(1);
            }
            50% {
              box-shadow:
                0 0 12px rgba(255, 255, 255, 0.48),
                0 0 24px rgba(0, 232, 213, 0.22);
              transform: scale(1.15);
            }
          }

          @keyframes activeCompanyDotGlow {
            0%, 100% {
              box-shadow:
                0 0 12px rgba(0, 232, 213, 0.72),
                0 0 26px rgba(0, 232, 213, 0.42);
              transform: scale(1);
            }
            50% {
              box-shadow:
                0 0 18px rgba(0, 232, 213, 0.95),
                0 0 36px rgba(0, 232, 213, 0.62);
              transform: scale(1.22);
            }
          }

          @keyframes cardGlow {
            0%, 100% {
              box-shadow:
                0 0 0 1px rgba(0, 232, 213, 0.10),
                0 22px 70px rgba(0, 0, 0, 0.32),
                inset 0 1px 0 rgba(255, 255, 255, 0.05);
            }
            50% {
              box-shadow:
                0 0 0 1px rgba(0, 232, 213, 0.20),
                0 28px 90px rgba(0, 0, 0, 0.42),
                0 0 40px rgba(0, 232, 213, 0.06),
                inset 0 1px 0 rgba(255, 255, 255, 0.07);
            }
          }

          @keyframes connectionPulse {
            0%, 100% {
              opacity: 0.09;
            }
            50% {
              opacity: 0.17;
            }
          }

          @keyframes statusShieldGlow {
            0%, 100% {
              filter: drop-shadow(0 0 12px rgba(0, 232, 173, 0.42));
            }
            50% {
              filter: drop-shadow(0 0 22px rgba(0, 232, 173, 0.78));
            }
          }
        `}
      </style>

      <Sidebar setActivePage={setActivePage} />

      <main className="relative min-w-0 flex-1 overflow-hidden bg-[#041629]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_48%_42%,rgba(0,232,213,0.08),transparent_30%),radial-gradient(circle_at_78%_18%,rgba(14,91,150,0.15),transparent_34%),linear-gradient(180deg,rgba(3,16,29,0.25),rgba(1,10,20,0.55))]" />

        <div className="relative z-10 flex h-full flex-col gap-4 overflow-hidden px-8 pb-5 pt-6">
          <section className="shrink-0">
            <div className="flex items-center justify-between gap-6">
              <h1 className="text-[32px] font-semibold leading-none tracking-[-0.03em] text-white">
                Master Dashboard
              </h1>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#061b33]/75 text-white/80 transition hover:text-[#00e8d5]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <BellIcon />
                  <span className="absolute right-2.5 top-2.5 h-3 w-3 rounded-full border-2 border-[#061b33] bg-[#00e8d5]" />
                </button>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#061b33]/75 text-white/80 transition hover:text-[#00e8d5]"
                  onClick={(event) => event.stopPropagation()}
                >
                  <MoonIcon />
                </button>

                <button
                  type="button"
                  className="flex h-11 items-center gap-3 rounded-lg border border-[#163656] bg-[#061b33]/82 px-5 text-sm font-semibold text-white transition hover:border-[#00e8d5]/50"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DownloadIcon />
                  Export
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-5">
              <DashboardStatCard
                icon={<BuildingIcon />}
                title="Total Organizations"
                value="5"
                subtitle="Active across all portfolios"
                chart={<MiniGraph />}
              />

              <DashboardStatCard
                icon={<UsersIcon />}
                title="Users Created"
                value="24"
                subtitle="+4 this week"
                subtitleClass="text-[#00e8ad]"
                chart={<MiniGraph />}
              />

              <DashboardStatCard
                icon={<InvitationIcon />}
                title="Invitations"
                value="23/32"
                subtitle="23 accepted"
                subtitleClass="text-[#00e8ad]"
                chart={<RoundChart value={72} />}
              />

              <DashboardStatCard
                icon={<CheckCircleIcon />}
                title="Onboarding in Progress"
                value="18/28"
                subtitle="18 active"
                subtitleClass="text-[#00e8ad]"
                chart={<RoundChart value={64} />}
              />
            </div>
          </section>

          <section
            className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-[#15334a] bg-[#06172d]/72 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] [animation:cardGlow_5s_ease-in-out_infinite]"
            onClick={(event) => {
              event.stopPropagation();
              setPinnedCompany(null);
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_42%_48%,rgba(0,232,213,0.07),transparent_34%)]" />

            <div className="relative z-20 flex h-full gap-5">
              <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden pt-12">
                <div
                  className="absolute left-0 top-0 z-30 flex items-center gap-3"
                  onClick={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleResetView();
                    }}
                    className="flex h-10 items-center gap-2 rounded-lg border border-[#1c4065] bg-[#071d36]/82 px-4 text-xs font-semibold text-white transition hover:border-[#00e8d5]/55"
                  >
                    <ResetIcon />
                    Reset View
                  </button>

                  <div className="flex h-10 items-center overflow-hidden rounded-lg border border-[#1c4065] bg-[#071d36]/82 text-white">
                    <button
                      type="button"
                      onClick={handleZoomOut}
                      className="h-full px-4 text-lg text-white/80 transition hover:bg-[#0b2848] hover:text-[#00e8d5]"
                    >
                      −
                    </button>

                    <span className="min-w-[68px] border-x border-[#1c4065] px-3 text-center text-xs font-semibold">
                      {zoom}%
                    </span>

                    <button
                      type="button"
                      onClick={handleZoomIn}
                      className="h-full px-4 text-lg text-white/80 transition hover:bg-[#0b2848] hover:text-[#00e8d5]"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  className="transition-transform duration-300 ease-out"
                  style={{
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "center center",
                  }}
                >
                  <ObsidianSphere
                    setActivePage={setActivePage}
                    pinnedCompany={pinnedCompany}
                    setPinnedCompany={setPinnedCompany}
                  />
                </div>
              </div>

              <aside
                className="relative z-30 flex h-full w-[365px] shrink-0 flex-col"
                onClick={(event) => event.stopPropagation()}
              >
                <ActivitySidePanel />
              </aside>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ActivitySidePanel() {
  return (
    <div className="grid h-full min-h-0 grid-rows-[218px_1fr_122px] gap-4 overflow-hidden">
      <div className="min-h-0 rounded-xl border border-[#12314b] bg-[#03111f]/88 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.035)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-white/90">
            Activity Overview
          </h3>

          <button
            type="button"
            className="rounded-lg border border-[#153b59] bg-[#061b33]/80 px-2.5 py-1 text-[11px] font-semibold text-white/80 transition hover:border-[#00e8d5]/50 hover:text-[#00e8d5]"
          >
            This month
            <span className="ml-1.5 text-white/45">⌄</span>
          </button>
        </div>

        <div className="space-y-3">
          {overviewItems.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[34px_1fr_48px_50px] items-center gap-3"
            >
              <div
                className={`flex h-8.5 w-8.5 items-center justify-center rounded-lg ${item.bg} ${item.text}`}
              >
                {item.icon}
              </div>

              <p className="truncate text-[13px] font-bold text-white/78">
                {item.label}
              </p>

              <span className="text-right text-[17px] font-bold leading-none text-white/85">
                {item.value}
              </span>

              <span className="text-right text-[11px] font-bold text-[#00e8ad]">
                ↑ {item.trend}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-col rounded-xl border border-[#12314b] bg-[#03111f]/88 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.035)]">
        <div className="mb-5 flex shrink-0 items-center justify-between">
          <h3 className="text-[15px] font-bold text-white/90">
            Live Activity Feed
          </h3>

          <span className="flex items-center gap-2 rounded-lg bg-[#063f37]/45 px-2.5 py-1 text-[11px] font-bold text-[#00e8ad]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00e8ad]" />
            Live
          </span>
        </div>

        <div className="min-h-0 flex-1 space-y-4">
          {activityItems.map((item) => (
            <div
              key={`${item.time}-${item.label}`}
              className="grid grid-cols-[18px_52px_1fr] items-center gap-3 text-[11px]"
            >
              <div className={`flex justify-center ${item.color}`}>
                {item.icon}
              </div>

              <span className="font-semibold text-white/48">{item.time}</span>

              <p className="min-w-0 truncate font-semibold text-white/55">
                {item.label}
                <span className="mx-2 text-white/35">•</span>
                <span className="text-white/72">{item.company}</span>
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mx-auto mt-auto flex shrink-0 items-center gap-2 pt-4 text-[13px] font-bold text-[#00e8ad] transition hover:text-[#5fffe9]"
        >
          View all activity
          <ArrowRightIcon />
        </button>
      </div>

      <div className="min-h-0 rounded-xl border border-[#12314b] bg-[#03111f]/88 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.035)]">
        <div className="flex h-full items-center gap-4">
          <div className="shrink-0 text-[#00e8ad] [animation:statusShieldGlow_3s_ease-in-out_infinite]">
            <StatusShieldIcon />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-[13px] font-bold text-white/82">
              System Status
            </h3>

            <p className="mt-1 text-[12px] font-bold text-[#00e8ad]">
              All systems operational
            </p>

            <p className="mt-1 text-[11px] font-semibold text-white/58">
              Everything is running smoothly
            </p>
          </div>

          <div className="shrink-0 text-[#00e8ad]">
            <StatusGraph />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({
  icon,
  title,
  value,
  subtitle,
  subtitleClass = "text-white/55",
  chart,
}) {
  return (
    <div className="flex min-h-[112px] items-center justify-between rounded-xl border border-[#15334a] bg-[#071f38]/82 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex min-w-0 items-center gap-5">
        <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl bg-[#063f37]/75 text-[#00e8ad]">
          {icon}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-white/65">
            {title}
          </h3>

          <p className="mt-1 text-[30px] font-bold leading-none text-white">
            {value}
          </p>

          <p className={`mt-2 text-[13px] font-semibold ${subtitleClass}`}>
            {subtitle}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-[#00e8ad]">{chart}</div>
    </div>
  );
}

function MiniGraph() {
  return (
    <svg width="74" height="36" viewBox="0 0 74 36" fill="none">
      <path
        d="M2 28L10 26L18 18L27 23L36 9L45 17L54 7L63 13L72 11"
        stroke="#00e8ad"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RoundChart({ value }) {
  const degree = Math.round((value / 100) * 360);

  return (
    <div className="relative h-[64px] w-[64px]">
      <div
        className="absolute inset-0 rounded-full shadow-[0_0_22px_rgba(0,232,173,0.22)]"
        style={{
          background: `conic-gradient(#00e8ad 0deg, #00e8ad ${degree}deg, rgba(28,54,84,0.9) ${degree}deg, rgba(28,54,84,0.9) 360deg)`,
        }}
      />
      <div className="absolute inset-[8px] rounded-full bg-[#071f38]" />
      <div className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-white">
        {value}%
      </div>
    </div>
  );
}

function ObsidianSphere({ setActivePage, pinnedCompany, setPinnedCompany }) {
  return (
    <div className="relative h-[610px] w-[610px] max-h-full max-w-full [animation:sphereFloat_6s_ease-in-out_infinite]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_45%_38%,rgba(0,232,213,0.12),rgba(4,22,40,0.34)_28%,rgba(2,11,22,0.78)_62%,rgba(2,9,18,0.95)_100%)] shadow-[inset_0_0_90px_rgba(0,232,213,0.08),0_0_70px_rgba(0,0,0,0.5)]" />

      <div className="absolute inset-[2%] rounded-full border border-[#00e8d5]/10" />
      <div className="absolute inset-[8%] rounded-full border border-white/[0.035]" />
      <div className="absolute inset-[16%] rounded-full border border-white/[0.025]" />

      <div className="absolute inset-[2%] rounded-full opacity-80 [animation:sphereRotate_58s_linear_infinite]">
        {networkLines.map((line) => (
          <span
            key={line.id}
            className="absolute h-px origin-left bg-white"
            style={{
              left: line.left,
              top: line.top,
              width: line.width,
              opacity: line.opacity,
              transform: `rotate(${line.rotate})`,
              animation: `linePulse 4s ease-in-out ${line.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 rounded-full [animation:reverseRotate_95s_linear_infinite]">
        {particleDots.map((dot) => (
          <span
            key={dot.id}
            className="absolute rounded-full bg-[#b7bdc4]"
            style={{
              left: dot.x,
              top: dot.y,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              animation: `dotPulse 5s ease-in-out ${dot.delay} infinite`,
            }}
          />
        ))}
      </div>

      <svg
        className="pointer-events-none absolute inset-0 z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="companyConnectionGradient"
            x1="0"
            x2="1"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(0, 232, 213, 0.02)" />
            <stop offset="50%" stopColor="rgba(0, 232, 213, 0.22)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.03)" />
          </linearGradient>
        </defs>

        {companyConnections.map((connection) => (
          <line
            key={`${connection.from.name}-${connection.to.name}`}
            x1={parseFloat(connection.from.x)}
            y1={parseFloat(connection.from.y)}
            x2={parseFloat(connection.to.x)}
            y2={parseFloat(connection.to.y)}
            stroke="url(#companyConnectionGradient)"
            strokeWidth="0.16"
            strokeLinecap="round"
            strokeDasharray="1.2 1.6"
            style={{
              animation: "connectionPulse 6s ease-in-out infinite",
            }}
          />
        ))}
      </svg>

      <div className="absolute inset-[5%] rounded-full border border-dashed border-white/[0.06] [animation:sphereRotate_80s_linear_infinite]" />
      <div className="absolute inset-[12%] rounded-full border border-dashed border-[#00e8d5]/[0.055] [animation:reverseRotate_90s_linear_infinite]" />

      {companies.map((company) => (
        <CompanyNode
          key={company.name}
          company={company}
          setActivePage={setActivePage}
          pinnedCompany={pinnedCompany}
          setPinnedCompany={setPinnedCompany}
        />
      ))}
    </div>
  );
}

function CompanyNode({
  company,
  setActivePage,
  pinnedCompany,
  setPinnedCompany,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const isPinned = pinnedCompany === company.name;
  const isVisible = isHovered || isPinned;

  const positions = [
    { x: 0, y: -70 },
    { x: 68, y: -36 },
    { x: 68, y: 38 },
    { x: 0, y: 74 },
    { x: -68, y: 38 },
    { x: -68, y: -36 },
  ];

  const handleNodeClick = (event) => {
    event.stopPropagation();
    setPinnedCompany((currentCompany) =>
      currentCompany === company.name ? null : company.name
    );
  };

  const handleSubsectionClick = (event, page) => {
    event.stopPropagation();

    if (typeof setActivePage === "function") {
      setActivePage(page);
    }
  };

  return (
    <div
      className="absolute z-20"
      style={{
        left: company.x,
        top: company.y,
        transform: "translate(-50%, -50%)",
      }}
      onClick={(event) => event.stopPropagation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          absolute left-1/2 top-1/2 transition-all duration-300
          ${
            isVisible
              ? "pointer-events-auto scale-100 opacity-100"
              : "pointer-events-none scale-90 opacity-0"
          }
        `}
      >
        {subsections.map((section, index) => {
          const pos = positions[index % positions.length];

          return (
            <div
              key={`${company.name}-${section.label}`}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              <span
                className="absolute left-1/2 top-1/2 h-px w-[46px] origin-left bg-gradient-to-r from-[#00e8d5]/35 to-transparent"
                style={{
                  transform: `rotate(${index * 60 + 90}deg)`,
                }}
              />

              <button
                type="button"
                onClick={(event) => handleSubsectionClick(event, section.page)}
                className="
                  absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                  whitespace-nowrap rounded-xl border border-[#1e4968]
                  bg-[#061b33]/95 px-3 py-1.5 text-[10px] font-bold
                  text-white/88 shadow-[0_12px_34px_rgba(0,0,0,0.38)]
                  backdrop-blur-xl transition-all duration-200
                  hover:border-[#00e8d5] hover:bg-[#00e8d5]
                  hover:text-[#03111c] hover:shadow-[0_0_28px_rgba(0,232,213,0.26)]
                "
              >
                {section.label}
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNodeClick}
        className="group relative z-30 flex h-[18px] w-[18px] items-center justify-center rounded-full transition-all duration-300"
        aria-label={company.name}
      >
        <span
          className={`
            h-2.5 w-2.5 rounded-full transition-all duration-300
            ${
              isVisible
                ? "bg-[#00e8d5]"
                : "bg-white/85 group-hover:bg-[#00e8d5]"
            }
          `}
          style={{
            animation: isVisible
              ? "activeCompanyDotGlow 3.6s ease-in-out infinite"
              : "companyDotGlow 4s ease-in-out infinite",
          }}
        />
      </button>

      <div
        className="
          pointer-events-none absolute left-1/2 top-[24px] -translate-x-1/2
          whitespace-nowrap rounded-lg border border-[#00e8d5]/16
          bg-[#061b33]/88 px-2.5 py-1 text-[10px] font-bold text-white/86
          shadow-[0_10px_28px_rgba(0,0,0,0.32)] backdrop-blur-xl
        "
      >
        {company.name}
      </div>
    </div>
  );
}

function BellIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v12" stroke="currentColor" strokeWidth="1.7" />
      <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M3 21h18"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="9.5" cy="7" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function InvitationIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M3 7l9 6 9-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8 12 2.7 2.7L16.5 9" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 0 1 13.6-5.7L20 8.7"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M20 4v4.7h-4.7" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function BuildingSmallIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 21V5h10v16M15 10h4v11M8 8h4M8 12h4M8 16h4M3 21h18"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function UsersSmallIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="9.5" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function PulseIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h4l2-5 5 10 2-5h5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SyncSmallIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 7h-9a4 4 0 0 0-4 4v1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="m17 4 3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17h9a4 4 0 0 0 4-4v-1"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="m7 20-3-3 3-3"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersTinyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="9.5" cy="7" r="4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function CloudTinyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M17.5 19H7a5 5 0 1 1 .7-9.95A6 6 0 0 1 19 11.5 3.8 3.8 0 0 1 17.5 19Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ShieldTinyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function SyncTinyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 7h-9a4 4 0 0 0-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="m17 4 3 3-3 3M4 17h9a4 4 0 0 0 4-4M7 20l-3-3 3-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DeviceTinyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect
        x="6"
        y="3"
        width="12"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M10 18h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusShieldIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
      <path
        d="M32 5 51 14v15c0 18-19 28-19 28S13 47 13 29V14L32 5Z"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="m24 31 6 6 12-14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusGraph() {
  return (
    <svg width="78" height="38" viewBox="0 0 88 44" fill="none">
      <path
        d="M2 37C9 35 12 29 18 31C24 33 28 22 35 24C42 26 46 34 53 28C60 22 63 12 69 18C75 24 78 4 84 8L88 9"
        stroke="#00e8ad"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}