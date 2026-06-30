function InfoCard({ label, name, value, canEdit, onChange }) {
  return (
    <div>
      <p className="mb-2 text-sm text-gray-400">{label}</p>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={!canEdit}
        className={`w-full rounded-lg border px-4 py-3 outline-none transition-all duration-200 ${
          canEdit
            ? "border-cyan-900 bg-[#0d1b2a] text-white focus:border-[#00e8ad] focus:ring-2 focus:ring-[#00e8ad]"
            : "cursor-not-allowed border-cyan-900 bg-[#0d1b2a] text-gray-400"
        }`}
      />
    </div>
  );
}

export default InfoCard;