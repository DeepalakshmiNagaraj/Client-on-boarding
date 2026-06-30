import { useState } from "react";

import Sidebar from "../components/Sidebar";

function MainLayout({ children, activePage, setActivePage }) {
  const [selectedCompany, setSelectedCompany] = useState("Company 1");

  return (
    <div className="flex h-screen overflow-hidden bg-[#07111f] text-white">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
      />

      <main className="min-w-0 flex-1 overflow-hidden">
        {typeof children === "function"
          ? children(selectedCompany)
          : children}
      </main>
    </div>
  );
}

export default MainLayout;