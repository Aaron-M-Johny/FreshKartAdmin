interface InputFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  name,
  placeholder = "",
  type = "text",
  value,
  onChange,
  required = true,
  autoFocus = false,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoFocus={autoFocus}
        className="rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-background"
      />
    </div>
  );
};
