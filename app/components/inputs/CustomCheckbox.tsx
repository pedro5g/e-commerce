"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  dasabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export const CustomCheckbox = ({
  id,
  label,
  dasabled,
  register,
}: CustomCheckboxProps) => {
  return (
    <>
      <div className=" w-full flex flex-row gap-2 items-center">
        <input
          id={id}
          disabled={dasabled}
          {...register(id)}
          placeholder=""
          type="checkbox"
          className=" cursor-pointer"
        />
        <label htmlFor={id} className=" font-medium cursor-pointer text-sm">
          {label}
        </label>
      </div>
    </>
  );
};
