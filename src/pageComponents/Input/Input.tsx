import * as React from "react";

interface InputProps {
  type: string;
  state: string;
  placeholder: string;
  setState: any;
  isRequired: boolean;
}

export default function Input({
  type,
  placeholder,
  state,
  setState,
  isRequired,
}: InputProps) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => {
        setState(e.target.value);
      }}
      placeholder={placeholder}
      required={isRequired}
    />
  );
}
