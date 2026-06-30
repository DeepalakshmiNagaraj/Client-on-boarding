import { useState } from "react";

import CreateAdmin from "./pages/CreateAdmin";
import CreateUser from "./pages/CreateUser";

import MainLayout from "./layout/MainLayout";

import LoginPage from "./pages/Loginpage";
import ForgotPassword from "./pages/Forgotpassword";
import VerifyCode from "./pages/Verifycode";
import CreatePassword from "./pages/CreateNewPassword";
import PasswordResetSuccess from "./pages/Passwordsuccess";
import WelcomePage from "./pages/Welcomepage";

import Organization from "./pages/Organization";
import Contact from "./pages/Contact";
import Network from "./pages/Network";
import Cloud from "./pages/Cloud";
import Servers from "./pages/Servers";
import Security from "./pages/Security";

import ListofAdmins from "./pages/Listofadmins";
import ListofUsers from "./pages/Listofusers";

function App() {
  const [activePage, setActivePage] = useState("login");

  if (activePage === "login") {
    return <LoginPage setActivePage={setActivePage} />;
  }

  if (activePage === "forgotPassword") {
    return <ForgotPassword setActivePage={setActivePage} />;
  }

  if (activePage === "verifyCode") {
    return <VerifyCode setActivePage={setActivePage} />;
  }

  if (activePage === "createPassword") {
    return <CreatePassword setActivePage={setActivePage} />;
  }

  if (activePage === "success") {
    return <PasswordResetSuccess setActivePage={setActivePage} />;
  }

  return (
    <div className="relative">
      <MainLayout activePage={activePage} setActivePage={setActivePage}>
        {(selectedCompany) => (
          <>
            {(activePage === "welcome" || activePage === "dashboard") && (
              <WelcomePage setActivePage={setActivePage} />
            )}

            {activePage === "org" && (
              <Organization selectedCompany={selectedCompany} />
            )}

            {activePage === "contact" && (
              <Contact selectedCompany={selectedCompany} />
            )}

            {activePage === "network" && (
              <Network selectedCompany={selectedCompany} />
            )}

            {activePage === "cloud" && (
              <Cloud selectedCompany={selectedCompany} />
            )}

            {(activePage === "devices" || activePage === "servers") && (
              <Servers selectedCompany={selectedCompany} />
            )}

            {activePage === "security" && (
              <Security selectedCompany={selectedCompany} />
            )}

            {activePage === "listOfAdmins" && (
              <ListofAdmins selectedCompany={selectedCompany} />
            )}

            {activePage === "listOfUsers" && (
              <ListofUsers selectedCompany={selectedCompany} />
            )}
          </>
        )}
      </MainLayout>

      {activePage === "createAdmin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-3xl">
            <CreateAdmin setActivePage={setActivePage} />
          </div>
        </div>
      )}

      {activePage === "createUser" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative mx-4 w-full max-w-3xl">
            <CreateUser setActivePage={setActivePage} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;