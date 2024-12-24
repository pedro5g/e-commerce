import { BgColorType, BgTextColorType } from "@/@types/color-types";
import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: BgColorType;
  color: BgTextColorType;
}

export const Status = ({ text, icon: Icon, bg, color }: StatusProps) => {
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
      {text} <Icon size={15} />
    </div>
  );
};
