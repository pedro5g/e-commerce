"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: React.ReactComponentElement<IconType>;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  const variant = small ? "small" : outline ? "outline" : "";

  return (
    <button
      data-variant={variant}
      onClick={onClick}
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80
    transition w-full border-slate-700 flex items-center justify-center gap-2 data-[variant='outline']:bg-slate-100 data-[variant='outline']:text-slate-700
    bg-slate-700 text-slate-100 text-md font-semibold py-3 px-4 border-2 data-[variant='small']:text-small data-[variant='small']:font-light data-[variant='small']:border-[1px]
    data-[variant='small']:py-1 data-[variant='small']:px-2 ${
      custom && custom
    }`}>
      {Icon && <div className=" text-2xl">{Icon}</div>}
      {label}
    </button>
  );
};
