interface FormWrapProps {
  children: React.ReactNode;
}

export const FormWrap = ({ children }: FormWrapProps) => {
  return (
    <div className=" min-w-fit h-full flex items-center justify-center pt-24 pb-12">
      <main
        className=" max-w-[650px] w-full flex flex-col gap-6 
      items-center shadow-xl shadow-slate-300 rounded-md p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};
