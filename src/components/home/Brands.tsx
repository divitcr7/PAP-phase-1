export default function Brands() {
  const partners = [
    {
      src: "/images/brands/First-Choice.png",
      alt: "First Choice Management Group",
    },
    {
      src: "/images/brands/Juniper.png",
      alt: "Juniper Investment Group",
    },
    { src: "/images/brands/Resman.png", alt: "RESMAN" },
  ];

  return (
    <section className="w-full py-18 lg:py-24 bg-gray-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 lg:mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Trusted by <span className="italic">leading</span> brands
          </h3>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 lg:gap-40">
          {partners.map((partner, index) => (
            <div
              key={index}
              className={`opacity-80 hover:opacity-100 transition-opacity duration-300 flex justify-center ${
                index === 2
                  ? "w-full justify-center md:w-auto"
                  : "w-[40%] md:w-auto"
              }`}
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-h-24 md:max-h-32 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
