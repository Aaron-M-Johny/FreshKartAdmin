import { SelectFieldProps } from "@/interfaces/interfaces";

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  name,
  options,
  value,
  onChange,
  required = true,
  disabled = false,
  placeholder = "Select an option",
  className = "",
  title = "",
}) => {
  return (
    <div className="flex flex-col">
      {label&&<label htmlFor={id} className="text-sm font-medium mb-1">
        {label}
      </label>}
      <select
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        title={title}
        className={`border rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          disabled ? "cursor-not-allowed text-gray-400" : ""
        } ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};