
import { Link } from "react-router-dom";
import Image from "./Image";

const categories = [
  {
    name: "Anime & Manga",
    image: "/categories/anime.jpg",
  },
  {
    name: "Art & Creativity",
    image: "/categories/art.jpg",
  },
  {
    name: "Personal Stories",
    image: "/categories/stories.jpg",
  },
  {
    name: "Gaming",
    image: "/categories/gaming.jpg",
    
  },
  {
    name: "Culture & Lifestyle",
    image: "/categories/culture.jpg",
  },
  {
    name: "Reviews & Recommendations",
    image: "/categories/reviews.jpg",
  },
];

const CategoriesSection = () => {
  return (
    <section className="w-full bg-[#FAF8F3] px-5 py-16 md:px-10 lg:px-13">
      {/* Heading */}
      <div className="mb-10">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-violet-700">
          FIND YOUR GENRE
        </p>

        <h2 className="text-4xl font-extrabold tracking-tight text-[#191629] md:text-5xl">
          Explore categories
        </h2>
      </div>

      {/* Category cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/blogs?category=${encodeURIComponent(category.name)}`}
            className="group relative h-[260px] overflow-hidden rounded-[28px] shadow-[0_15px_30px_rgba(35,25,65,0.08)] sm:h-[290px] lg:h-[323px]"
          >
            {/* Background image */}
            <Image
              src={category.image}
              alt={category.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#171126]/95 via-[#171126]/25 to-transparent" />

            {/* Text */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
              <h3 className="text-lg leading-tight font-bold text-white md:text-xl">
                {category.name}
              </h3>

              {category.description && (
                <p className="mt-2 text-sm leading-snug text-white/90">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
