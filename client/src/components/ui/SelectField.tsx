type SelectFieldProps = {
  label: string;
  value: string | number | "";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  disabled?: boolean;
};

function SelectField({label,value,onChange,children,disabled = false,}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-xl p-3 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {children}
      </select>
    </div>
  );
}

export default SelectField;