"use client";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

export const Category = ({ label, selected, icon: Icon }: CategoryProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      data-selected={selected}
      className="flex items-center justify-center py-2 text-center gap-1 border-b-2 hover:text-slate-800 
    transition cursor-pointer data-[selected=true]:border-b-slate-800 data-[selected=true]:text-slate-800
    data-[selected=false]:border-b-transparent data-[selected=false]:text-slate-500
    ">
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};
