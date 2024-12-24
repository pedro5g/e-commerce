import Link from "next/link";
import { Container } from "../Container";
import { FooterList } from "./FooterList";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className=" bg-zinc-900 text-slate-200 text-sm mt-16 ">
      <Container>
        <div className=" flex flex-col md:flex-row justify-between pt-16 pb-8 ">
          <FooterList>
            <h3 className=" text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">TVs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className=" text-base font-bold mb-2">Costumer Service</h3>
            <Link href="#">Contact us</Link>
            <Link href="#">Shipping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">Watches</Link>
            <Link href="#">FQS</Link>
          </FooterList>
          <div className=" w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className=" text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Discover the latest in electronics at E-Commerce. From smartphones
              to smart home devices, laptops to gaming gear, we offer a curated
              selection of high-quality products. Shop with confidence and
              explore the future of tech with us.
            </p>
            <p>
              &copy; {new Date().getFullYear()} E~Commerce. All rights reserved.
            </p>
          </div>
          <FooterList>
            <h3 className=" text-base font-bold mb-2"> Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <AiFillFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterSquare size={24} />
              </Link>
              <Link href="#">
                <AiOutlineInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};
