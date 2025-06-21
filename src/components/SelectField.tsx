import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectFieldProps } from "@/interfaces/interfaces";

export const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  name, 
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Select an option",
  className = "",
  title = "",
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={id} className="text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <Select
        value={value}
        onValueChange={(val) => onChange({ target: { value: val, name } } as React.ChangeEvent<HTMLSelectElement>)}
        disabled={disabled}
      >
        <SelectTrigger
          id={id}
          title={title}
          className={className}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt, index) => (
            <SelectItem key={index} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
