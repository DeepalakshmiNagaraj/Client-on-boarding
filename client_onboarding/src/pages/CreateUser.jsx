function CreateUser({ setActivePage }) {

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      {/* MODAL BOX */}
      <div className="bg-[#06111f] border border-cyan-900 rounded-2xl p-8 w-full max-w-3xl shadow-2xl relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setActivePage("org")}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#00E8AD] mb-2">

          Create User

        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-400 mb-8">

          Create a new user account

        </p>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* FULL NAME */}
          <div>

            <label className="text-sm text-gray-300 block mb-2">

              Full Name

            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="
                w-full
                bg-[#0d1b2a]
                border
                border-cyan-900
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-[#00E8AD]
              "
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="text-sm text-gray-300 block mb-2">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter email"
              className="
                w-full
                bg-[#0d1b2a]
                border
                border-cyan-900
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-[#00E8AD]
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="text-sm text-gray-300 block mb-2">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="
                w-full
                bg-[#0d1b2a]
                border
                border-cyan-900
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-[#00E8AD]
              "
            />

          </div>

          {/* ROLE */}
          <div>

            <label className="text-sm text-gray-300 block mb-2">

              Role

            </label>

            <select
              className="
                w-full
                bg-[#0d1b2a]
                border
                border-cyan-900
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-[#00E8AD]
              "
            >

              <option>
                User
              </option>

              <option>
                Tech User
              </option>

            </select>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">

          <button
            className="
              bg-[#00E8AD]
              text-black
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:opacity-90
              transition
            "
          >

            Create User

          </button>

          <button
            onClick={() => setActivePage("org")}
            className="
              border
              border-cyan-900
              px-6
              py-3
              rounded-xl
              text-white
              hover:bg-[#0d1b2a]
              transition
            "
          >

            Cancel

          </button>

        </div>

      </div>

    </div>

  );

}

export default CreateUser;