import { IconType } from "react-icons";

interface AdminNavItem {
  selected?: boolean;
  icon: IconType;
  label: string;
}

export const AdminNavItem = ({ selected, icon: Icon, label }: AdminNavItem) => {
  return (
    <>
      <div
        data-selected={selected}
        className="flex items-center justify-center 
        text-center gap-1 p-2 border-b-2 
        hover:text-zinc-900 transition cursor-pointer
        data-[selected=true]:border-b-zinc-900  data-[selected=true]:text-zinc-800 
        data-[selected=false]:border-transparent data-[selected=false]:text-zinc-500">
        <Icon size={20} />
        <div className=" font-medium text-sm text-center break-normal ">
          {label}
        </div>
      </div>
    </>
  );
};
