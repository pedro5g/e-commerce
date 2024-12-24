"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputProps) => {
  const isInvalid = !!errors[id];

  return (
    <div className=" relative w-full">
      <input
        data-error={isInvalid}
        placeholder=""
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type ? type : "text"}
        className="peer w-full p-4 pt-6 outline-none text-zinc-700
        bg-white font-light border-2 rounded-md transition 
        disabled:opacity-70 disabled:cursor-not-allowed
        data-[error=true]:border-rose-500 data-[error=false]:border-zinc-400
        data-[error=true]:focus:border-rose-500 data-[error=false]:focus:border-zinc-400"
      />
      <label
        data-error={isInvalid}
        className="absolute cursor-text text-md 
        transform duration-150 -translate-y-3
        top-5 z-10 origin-[0] left-4 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 
        peer-focus:-translate-y-4
        data-[error=true]:text-red-500 data-[error=false]:text-zinc-500"
        htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
