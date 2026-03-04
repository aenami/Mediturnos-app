type SelectFieldProps = {
  label: string;
  value: string | number | "";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

function SelectField({ label, value, onChange, children }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {children}
      </select>
    </div>
  );
}

export default SelectField;