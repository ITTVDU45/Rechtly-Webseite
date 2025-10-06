import { blogs as allBlogs, Blog } from "../../../../../.velite/generated";
import Image from "next/image";
import Categories from "@/components/Blog/Categories";
import { slug as slugify } from "github-slugger";
import Link from "next/link";

export async function generateStaticParams() {
  const categories: string[] = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog: Blog) => {
    if (blog.isPublished !== false) {
      blog.tags.map((tag: string) => {
        let slugified = slugify(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return {
    title: `${slug.replaceAll("-", " ")} Blogs`,
    description: `Erfahren Sie mehr über ${slug === "all" ? "rechtliche Themen" : slug} durch unsere Sammlung von Experten-Artikeln und Ratgebern`,
  };
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  
  // Step 2: Filter blogs based on the current category (slug)
  const blogs = allBlogs.filter((blog: Blog) => {
    if (slug === "all") {
      return true; // Include all blogs if 'all' category is selected
    }
    return blog.tags.some((tag: string) => slugify(tag) === slug);
  });

  // Get tags that are actually used in the filtered blogs for this category
  const categoryTags = new Set<string>();
  blogs.forEach((blog: Blog) => {
    blog.tags.forEach((tag: string) => {
      categoryTags.add(slugify(tag));
    });
  });

  // Convert to array and sort alphabetically
  const allCategories = Array.from(categoryTags).sort();

  // Helper function to get category display name
  const getCategoryDisplayName = (slug: string): string => {
    if (slug === "all") return "Alle Artikel";
    return slug.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const categoryName = getCategoryDisplayName(slug);

  return (
    <article className="flex flex-col text-dark dark:text-light">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Back Button */}
        <div className="relative z-10 mb-8">
          <Link
            href="/blogundratgeber"
            className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Blog-Übersicht
          </Link>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6 border border-white/20">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Kategorie
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {categoryName}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="flex items-center text-gray-300">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">
                {blogs.length} {blogs.length === 1 ? 'Artikel verfügbar' : 'Artikel verfügbar'}
              </span>
            </div>
          </div>

          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
            Entdecken Sie alle Artikel zu {categoryName.toLowerCase()} und erweitern Sie Ihr Wissen in diesem wichtigen Themenbereich.
          </p>
        </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Main Content */}
      <div className="relative z-10 px-5 sm:px-10 md:px-24 sxl:px-32 py-12">
        <Categories categories={allCategories} currentSlug={slug} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32">
          {blogs.map((blog: Blog, index: number) => (
            <article key={index} className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={blog.image.src}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  {blog.tags.slice(0, 1).map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 text-gray-900">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
                <Link
                  href={`/blogundratgeber/blogs/${blog.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)',
                    color: 'white'
                  }}
                >
                  Weiterlesen
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </article>
  );
};

export default CategoryPage;
