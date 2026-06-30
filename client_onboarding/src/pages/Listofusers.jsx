export default function ListofUsers() {
  const users =
    JSON.parse(localStorage.getItem("users")) || [
      {
        id: 1,
        name: "User One",
        email: "user1@company.com",
        password: "User@123",
        company: "ABC Company",
        role: "User",
        status: "Active",
      },
      {
        id: 2,
        name: "Tech User One",
        email: "techuser1@company.com",
        password: "Tech@123",
        company: "ABC Company",
        role: "Tech User",
        status: "Active",
      },
    ];

  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload();
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    saveUsers(updatedUsers);
  };

  const handleNotify = (user) => {
    window.location.href = `mailto:${user.email}?subject=User Account Details&body=Hello ${user.name},%0D%0A%0D%0AYour account has been created.%0D%0ACompany: ${user.company}%0D%0ARole: ${user.role}%0D%0AEmail: ${user.email}%0D%0APassword: ${user.password}`;
  };

  return (
    <div className="w-full rounded-2xl border border-[#07506b] bg-[#061321] p-7">
      <h1 className="text-3xl font-bold text-[#00e8ad]">
        List of Users
      </h1>

      <p className="mt-2 mb-6 text-sm text-slate-400">
        View, notify and manage users and tech users
      </p>

      <div className="overflow-x-auto rounded-xl border border-[#073f59]">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead className="bg-[#081b2e]">
            <tr className="text-left text-sm text-slate-200">
              <th className="px-5 py-4">No</th>
              <th className="px-5 py-4">Name</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Password</th>
              <th className="px-5 py-4">Company</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Notify</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-t border-[#073f59] text-sm text-slate-300"
              >
                <td className="px-5 py-4">{index + 1}</td>
                <td className="px-5 py-4">{user.name}</td>
                <td className="px-5 py-4">{user.email}</td>
                <td className="px-5 py-4">{"•".repeat(10)}</td>
                <td className="px-5 py-4">{user.company}</td>
                <td className="px-5 py-4">{user.role}</td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button
                    onClick={() => handleNotify(user)}
                    className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-semibold hover:opacity-90"
                  >
                    ✉ Notify
                  </button>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold">
                      ✎
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold"
                    >
                      ×
                    </button>

                    <button
                      onClick={() => handleNotify(user)}
                      className="rounded-md bg-[#00E8AD] px-3 py-2 text-black font-bold"
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
        Showing 1 to {users.length} of {users.length} users
      </p>
    </div>
  );
}