interface NullDataProps {
  title: string;
}

export const NullData = ({ title }: NullDataProps) => {
  return (
    <div className=" flex w-full h-screen items-center justify-center text-center text-base sm:text-xl md:text-2xl ">
      <p className="font-medium">{title}</p>
    </div>
  );
};
