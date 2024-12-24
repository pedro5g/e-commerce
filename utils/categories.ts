import { IconType } from "react-icons";
import { AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import {
  MdOutlineKeyboard,
  MdOutlineSmartphone,
  MdStorefront,
  MdTv,
  MdWatch,
} from "react-icons/md";

interface ICategories {
  label: string;
  icon: IconType;
}

export const categories: ICategories[] = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phone",
    icon: MdOutlineSmartphone,
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
  },
  {
    label: "Desktop",
    icon: AiOutlineDesktop,
  },
  {
    label: "Watch",
    icon: MdWatch,
  },
  {
    label: "Tv",
    icon: MdTv,
  },
  {
    label: "Accesories",
    icon: MdOutlineKeyboard,
  },
];
