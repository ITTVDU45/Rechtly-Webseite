import Link from "next/link";

interface CategoriesProps {
  categories: string[];
  currentSlug: string;
}

export default function Categories({ categories, currentSlug }: CategoriesProps) {
  return (
    <div className="px-0 md:px-10 sxl:px-20 mt-10">
      <div className="flex flex-wrap justify-center items-center">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/blogundratgeber/categories/${cat}`}
            className={`inline-block py-1.5 md:py-2 px-5 md:px-10 rounded-full border-2 border-solid border-dark dark:border-light hover:scale-105 transition-all ease duration-200 m-2 ${
              currentSlug === cat
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : "text-dark dark:text-light"
            }`}
          >
            #{cat}
          </Link>
        ))}
      </div>
    </div>
  );
}
