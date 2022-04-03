import * as React from "react";

interface InputProps {
  type: string;
  state: any;
  placeholder: string;
  setState: any;
  isRequired: boolean;
  className?: string;
  accept?: string;
  id?: string;
  name?: string;
}

export default function Input({
  type,
  placeholder,
  state,
  setState,
  isRequired,
  accept,
  id,
  className,
  name,
}: InputProps) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      name={name}
      id={id}
      className={className}
      placeholder={placeholder}
      required={isRequired}
      accept={accept}
    />
  );
}
