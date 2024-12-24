"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

export const CategoryInput = ({
  label,
  selected,
  icon: Icon,
  onClick,
}: CategoryInputProps) => {
  return (
    <>
      <div
        data-selected={selected}
        onClick={() => onClick(label)}
        className="rounded-xl border-2 p-4 flex flex-col gap-2 items-center hover:border-zinc-500
        transition cursor-pointer data-[selected=true]:border-zinc-500 data-[selected=false]:border-zinc-200">
        <Icon size={30} />
        <div className=" font-medium">{label}</div>
      </div>
    </>
  );
};
