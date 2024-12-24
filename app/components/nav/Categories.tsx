"use client";
import { categories } from "@/utils/categories";
import { Container } from "../Container";
import { Category } from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

export const Categories = () => {
  const params = useSearchParams();
  const currentCategory = params?.get("category") ?? "All";
  const pathName = usePathname();

  // prevent that Categories component only to render within a main page
  const isMainPage = pathName === "/";
  if (!isMainPage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto gap-4">
          {categories.map((item, i) => (
            <Category
              key={i}
              {...item}
              selected={item.label === currentCategory}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
