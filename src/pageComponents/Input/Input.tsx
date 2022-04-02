import * as React from "react";

interface InputProps {
  type: string;
  state: string;
  placeholder: string;
  setState: any;
}

export default function Input({
  type,
  placeholder,
  state,
  setState,
}: InputProps) {
  return (
    <input
      type={type}
      value={state}
      onChange={(e) => {
        console.log(e.target.value);
        setState(e.target.value);
      }}
      placeholder={placeholder}
    />
  );
}
