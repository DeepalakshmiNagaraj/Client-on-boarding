export default function ListofAdmins() {
  const admins =
    JSON.parse(localStorage.getItem("admins")) || [
      {
        id: 1,
        name: "John Admin",
        email: "john.admin@company1.com",
        password: "Admin@123",
        company: "Company 1",
        status: "Active",
      },
      {
        id: 2,
        name: "Sarah Admin",
        email: "sarah.admin@company2.com",
        password: "Admin@123",
        company: "Company 2",
        status: "Active",
      },
      {
        id: 3,
        name: "Michael Admin",
        email: "michael.admin@company3.com",
        password: "Admin@123",
        company: "Company 3",
        status: "Inactive",
      },
    ];

  const saveAdmins = (updatedAdmins) => {
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    window.location.reload();
  };

  const handleDelete = (id) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== id);
    saveAdmins(updatedAdmins);
  };

  const handleNotify = (admin) => {
    window.location.href = `mailto:${admin.email}?subject=Admin Account Details&body=Hello ${admin.name},%0D%0A%0D%0AYour admin account has been created.%0D%0ACompany: ${admin.company}%0D%0AEmail: ${admin.email}%0D%0APassword: ${admin.password}`;
  };

  return (
    <div className="w-full rounded-2xl border border-[#07506b] bg-[#061321] p-7">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#00e8ad]">
          List of Admins
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          View, notify and manage all created admins
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#073f59]">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead className="bg-[#081b2e]">
            <tr className="text-left text-sm text-slate-200">
              <th className="px-5 py-4">No</th>
              <th className="px-5 py-4">Admin Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Password</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Notify</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin, index) => (
              <tr
                key={admin.id}
                className="border-t border-[#073f59] text-sm text-slate-300"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">{admin.name}</td>
                <td className="px-5 py-4">{admin.email}</td>
                <td className="px-5 py-4">{"•".repeat(10)}</td>
                <td className="px-5 py-4">{admin.company}</td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-md px-3 py-1 text-xs font-semibold ${
                      admin.status === "Active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => handleNotify(admin)}
                    className="flex items-center gap-2 rounded-md bg-[#00E8AD] px-3 py-2 text-black font-semibold hover:opacity-90"
                  >
                    <span className="text-black">✉</span>
                    Notify
                  </button>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold hover:opacity-90">
                      ✎
                    </button>

                    <button
                      onClick={() => handleDelete(admin.id)}
                      className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold hover:opacity-90"
                    >
                      ×
                    </button>

                    <button
                      onClick={() => handleNotify(admin)}
                      className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold hover:opacity-90"
                    >
                      !
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-5 text-sm text-slate-400">
        Showing 1 to {admins.length} of {admins.length} admins
      </p>
    </div>
  );
}