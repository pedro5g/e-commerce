import Link from "next/link";
import { Container } from "../Container";
import { Roboto_Mono } from "next/font/google";
import { CartCount } from "./CartCount";
import { UserMenu } from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { Categories } from "./Categories";
import { SearchBar } from "./SearchBar";

const robotMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"] });

export const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <>
      <nav className=" sticky top-0 text-zinc-100 w-full bg-zinc-800 z-30 shadow-sm">
        <div className=" py-4 border-b-[1px]">
          <Container>
            <div className=" flex justify-between items-center gap-3">
              <Link
                href="/"
                className={`${robotMono.className} text-2xl font-bold`}>
                E-Commerce
              </Link>
              <div className=" hidden md:block">
                <SearchBar />
              </div>
              <div className=" flex items-center gap-6 md:gap-8">
                <CartCount />
                <div>
                  <UserMenu currentUser={currentUser} />
                </div>
              </div>
            </div>
          </Container>
        </div>
        <Categories />
      </nav>
    </>
  );
};
