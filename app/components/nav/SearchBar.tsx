"use client";

import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const SearchBar = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm: data.searchTerm,
        },
      },
      { skipNull: true }
    );

    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        type="text"
        placeholder="Explore"
        className="p-2 border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] 
        focus:border-slate-900 text-zinc-900 w-80"
      />
      <button
        className="bg-zinc-700 hover:opacity-80 text-white p-2 rounded-r-md"
        onClick={handleSubmit(onSubmit)}>
        Search
      </button>
    </div>
  );
};
