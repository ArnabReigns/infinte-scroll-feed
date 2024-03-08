import React, { ReactElement, Ref, forwardRef, useRef } from "react";
import { ReactComponentElement } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  helperColor?: string;
  inputClassName?: String;
  endElement?: ReactElement;
}

const InputField = ({
  label,
  helperColor,
  inputClassName,
  endElement,
  helperText,
  ...inputProps
}: Props) => {
  return (
    <div className={"flex flex-col " + inputProps.className}>
      <p className="mb-1 text-sm block font-medium">{label}</p>
      <div className="flex bg-slate-100 p-3 rounded-sm relative">
        <input
          {...inputProps}
          className={`w-full autofill:bg-red-500 webkit bg-transparent outline-none border-none peer ${inputClassName}`}
        />
        {endElement}

        <span
          className={`bg-[#3275F1] absolute bottom-0 left-0 h-[2px] w-0 peer-focus:w-full peer-focus:transition-all peer-focus:duration-[0.3s]`}
        ></span>
      </div>

      <span style={{ height: "2px" }}></span>

      <span
        style={{
          color: helperColor || "black",
        }}
        className={`text-xs font-medium`}
      >
        {helperText}
      </span>
    </div>
  );
};

export default InputField;
