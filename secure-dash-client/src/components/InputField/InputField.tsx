import React from 'react';

interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-secondary">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-secondary bg-primary px-3 py-2 text-secondary shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-btn"
      />
    </div>
  );
};
