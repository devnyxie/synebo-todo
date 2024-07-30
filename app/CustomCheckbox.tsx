import React from "react";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
}) => {
  return (
    <label className="custom-checkbox relative cursor-pointer flex justify-center items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`w-6 h-6 inline-block rounded-full  mr-3 ${
          checked
            ? "bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] border-transparent p-1"
            : "border-gray-300 border"
        }`}
      >
        {checked && (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
