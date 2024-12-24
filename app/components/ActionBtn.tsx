import { IconType } from "react-icons";

interface ActionBtnProps {
  animate?: boolean;
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ActionBtn = ({
  icon: Icon,
  onClick,
  disabled,
  animate,
}: ActionBtnProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center
        cursor-pointer w-[40px] h-[30px] placeholder:text-zinc-700 border-[1.2px] rounded-md border-zinc-400 
        disabled:opacity-50 disabled:cursor-not-allowed">
      <div className={`${animate && " animate-reverce-spin"}`}>
        <Icon size={18} />
      </div>
    </button>
  );
};
