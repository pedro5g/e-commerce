interface HeadingProps {
  title: string;
  center?: boolean;
}

export const Heading = ({ title, center = false }: HeadingProps) => {
  return (
    <div
      data-center={center}
      className="data-[center=true]:text-center text-start">
      <h1 className=" font-bold text-2xl">{title}</h1>
    </div>
  );
};
