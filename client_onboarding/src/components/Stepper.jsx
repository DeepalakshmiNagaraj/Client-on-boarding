function Stepper({ activePage, setActivePage }) {
  const role = localStorage.getItem("role");

  const commonSteps = [
    { key: "org", label: "Org Info" },
    { key: "contact", label: "Contact" },
    { key: "network", label: "Network" },
    { key: "cloud", label: "Cloud" },
    { key: "servers", label: "Server" },
    { key: "security", label: "Security" },
  ];

  const steps =
    role === "master_admin"
      ? [...commonSteps, { key: "listOfAdmins", label: "List of Admins" }]
      : role === "admin"
      ? [...commonSteps, { key: "listOfUsers", label: "List of Users" }]
      : commonSteps;

  return (
    <div className="mb-8 flex items-center gap-10 overflow-x-auto">
      {steps.map((step, index) => (
        <button
          key={step.key}
          type="button"
          onClick={() => setActivePage(step.key)}
          className="flex cursor-pointer items-center gap-2 transition-all hover:scale-[1.02]"
        >
          <div
            className={`
              flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all
              ${
                activePage === step.key
                  ? "bg-[#00E8AD] text-black shadow-[0_0_15px_rgba(0,232,173,0.5)]"
                  : "border border-cyan-900 bg-[#0d1b2a] text-gray-300"
              }
            `}
          >
            {index + 1}
          </div>

          <span
            className={`
              whitespace-nowrap text-sm transition-all
              ${
                activePage === step.key
                  ? "font-medium text-[#00E8AD]"
                  : "text-gray-400"
              }
            `}
          >
            {step.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default Stepper;