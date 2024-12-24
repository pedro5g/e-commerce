import Image from "next/image";

export const HomeBanner = () => {
  return (
    <div className=" relative bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 mb-8">
      <div className=" mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly ">
        <section className=" mb-8 md:mb-0 text-center">
          <h1 className=" text-4xl md:text-6xl font-bold mb-4 text-zinc-100">
            Black Friday
          </h1>
          <p className=" text-lg md:text-xl mb-2 text-zinc-100">
            Enjoy discounts on selected items
          </p>
          <p className=" text-2xl md:text-5xl font-bold text-yellow-400">
            GET 50% OFF
          </p>
        </section>
        <section className=" w-1/3 relative aspect-video">
          <Image
            src="/banner-image.png"
            fill
            className=" object-contain"
            alt="Banner Image"
          />
        </section>
      </div>
    </div>
  );
};
