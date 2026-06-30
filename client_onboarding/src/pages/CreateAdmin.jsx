function CreateAdmin({ setActivePage }) {

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        backdrop-blur-sm
        px-4
      "
    >

      {/* POPUP BOX */}
      <div
        className="
          relative
          w-full
          max-w-3xl
          rounded-3xl
          border
          border-cyan-900/60
          bg-[#07111f]
          p-8
          shadow-[0_0_40px_rgba(0,232,173,0.08)]
          animate-fadeIn
        "
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setActivePage("org")}
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-[#0d1b2a]
            text-gray-400
            transition-all
            duration-200
            hover:bg-[#13263d]
            hover:text-white
          "
        >

          ✕

        </button>

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-[#00E8AD]">

            Create Admin

          </h1>

          <p className="mt-2 text-sm text-gray-400">

            Create a new admin account for selected company

          </p>

        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* FULL NAME */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">

              Full Name

            </label>

            <input
              type="text"
              placeholder="Enter full name"
              className="
                w-full
                rounded-xl
                border
                border-cyan-900
                bg-[#0d1b2a]
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-200
                focus:border-[#00E8AD]
                focus:ring-2
                focus:ring-[#00E8AD]/20
              "
            />

          </div>

          {/* EMAIL */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">

              Email Address

            </label>

            <input
              type="email"
              placeholder="Enter email address"
              className="
                w-full
                rounded-xl
                border
                border-cyan-900
                bg-[#0d1b2a]
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-200
                focus:border-[#00E8AD]
                focus:ring-2
                focus:ring-[#00E8AD]/20
              "
            />

          </div>

          {/* PASSWORD */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">

              Password

            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="
                w-full
                rounded-xl
                border
                border-cyan-900
                bg-[#0d1b2a]
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-200
                focus:border-[#00E8AD]
                focus:ring-2
                focus:ring-[#00E8AD]/20
              "
            />

          </div>

          {/* ROLE */}
          <div>

            <label className="mb-2 block text-sm text-gray-300">

              Role

            </label>

            <select
              className="
                w-full
                rounded-xl
                border
                border-cyan-900
                bg-[#0d1b2a]
                px-4
                py-3
                text-white
                outline-none
                transition-all
                duration-200
                focus:border-[#00E8AD]
                focus:ring-2
                focus:ring-[#00E8AD]/20
              "
            >

              <option>
                Admin
              </option>

            </select>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 flex items-center gap-4">

          {/* CREATE BUTTON */}
          <button
            className="
              rounded-xl
              bg-[#00E8AD]
              px-6
              py-3
              font-semibold
              text-black
              transition-all
              duration-200
              hover:scale-[1.02]
              hover:opacity-90
            "
          >

            Create Admin

          </button>

          {/* CANCEL BUTTON */}
          <button
            onClick={() => setActivePage("org")}
            className="
              rounded-xl
              border
              border-cyan-900
              px-6
              py-3
              text-white
              transition-all
              duration-200
              hover:bg-[#0d1b2a]
            "
          >

            Cancel

          </button>

        </div>

      </div>

    </div>

  );

}

export default CreateAdmin;