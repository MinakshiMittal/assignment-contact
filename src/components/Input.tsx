import { ChangeEvent, FocusEvent } from "react";

type InputProps = {
  type: string;
  placeholder: string;
  value?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
};

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  error,
  id,
  onBlur,
  className,
  label,
  disabled,
}: InputProps) => {
  return (
    <div className={` ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        className={`w-full h-12 text-md font-medium text-gray-700 rounded-[12px] shadow-inner-default  pl-2 paceholder:font-normal  border-purple-500 border-2 outline:border-purple-900`}
        placeholder={placeholder}
        defaultValue={value}
        onChange={onChange}
        id={id}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
