import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface BackButtonProps {
  label: string;
}

export const BackButton = ({ label }: BackButtonProps) => {
  return (
    <div>
      <Link href={"/"} className=" flex items-center gap-2">
        <MdArrowBack size={24} />
        <span>{label}</span>
      </Link>
    </div>
  );
};
