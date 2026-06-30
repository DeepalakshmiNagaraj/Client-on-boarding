function InputField({ label, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-gray-400">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="bg-[#0d1b2a] border border-cyan-900 rounded-lg px-4 py-3 outline-none focus:border-green-500"
      />
    </div>
  );
}

export default InputField;