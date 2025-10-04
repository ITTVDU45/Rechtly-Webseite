import Link from "next/link";
import { Blog } from "../../.velite/generated";
import { slug as slugify } from "github-slugger";

interface CategoriesSectionProps {
  blogs: Blog[];
}

interface CategoryData {
  name: string;
  slug: string;
  count: number;
  description: string;
  icon: string;
  color: string;
}

export default function CategoriesSection({ blogs }: CategoriesSectionProps) {
  // Extract unique categories from blogs
  const categoriesMap = new Map<string, CategoryData>();
  
  blogs.forEach((blog) => {
    blog.tags.forEach((tag) => {
      const slugified = slugify(tag);
      if (!categoriesMap.has(slugified)) {
        categoriesMap.set(slugified, {
          name: tag,
          slug: slugified,
          count: 1,
          description: getCategoryDescription(tag),
          icon: getCategoryIcon(tag),
          color: getCategoryColor(tag)
        });
      } else {
        const existing = categoriesMap.get(slugified)!;
        existing.count += 1;
        categoriesMap.set(slugified, existing);
      }
    });
  });

  const categories = Array.from(categoriesMap.values()).sort((a, b) => b.count - a.count);

  return (
    <section className="w-full mx-auto py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Entdecken Sie unsere Kategorien
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finden Sie schnell die Informationen, die Sie suchen. Durchsuchen Sie unsere Artikel nach Themenbereichen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blogundratgeber/categories/${category.slug}`}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: category.color }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {category.count} Artikel
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium group-hover:text-gray-700 transition-colors">
                    <span>Artikel entdecken</span>
                    <svg 
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            href="/blogundratgeber/categories/all"
            className="inline-flex items-center px-6 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)'
            }}
          >
            Alle Artikel anzeigen
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Helper functions for category data
function getCategoryDescription(tag: string): string {
  const descriptions: { [key: string]: string } = {
    "Büßgeld": "Alles rund um Bußgelder, Einspruchsmöglichkeiten und Verkehrsrecht",
    "Verkehrsrecht": "Rechtliche Aspekte im Straßenverkehr und Verkehrsverstöße",
    "Verkehrsunfall": "Sofortmaßnahmen, Schadensregulierung und Ansprüche nach Unfällen",
    "Schadensregulierung": "Prozesse und Verfahren zur Schadensabwicklung",
    "KFZ-Gutachten": "Gutachten, Bewertungen und Sachverständige im KFZ-Bereich",
    "Versicherung": "Versicherungsrecht und Ansprüche gegenüber Versicherungen",
    "Rechtsberatung": "Allgemeine Rechtsberatung und rechtliche Unterstützung",
    "KI-Telefonie": "Innovative Technologien in der Kundenbetreuung",
    "Innovation": "Moderne Lösungen und technische Innovationen",
    "Kundenbetreuung": "Service und Betreuung von Kunden",
    "Rechtsschutz": "Rechtsschutzversicherungen und Rechtschutz",
    "Ratgeber": "Praktische Tipps und Ratgeber für den Alltag"
  };
  
  return descriptions[tag] || `Artikel und Informationen zum Thema ${tag}`;
}

function getCategoryIcon(tag: string): string {
  const icons: { [key: string]: string } = {
    "Büßgeld": "€",
    "Verkehrsrecht": "🚗",
    "Verkehrsunfall": "⚠️",
    "Schadensregulierung": "📋",
    "KFZ-Gutachten": "🔧",
    "Versicherung": "🛡️",
    "Rechtsberatung": "⚖️",
    "KI-Telefonie": "🤖",
    "Innovation": "💡",
    "Kundenbetreuung": "👥",
    "Rechtsschutz": "🔒",
    "Ratgeber": "📚"
  };
  
  return icons[tag] || "📄";
}

function getCategoryColor(tag: string): string {
  const colors: { [key: string]: string } = {
    "Büßgeld": "#EF4444",
    "Verkehrsrecht": "#3B82F6",
    "Verkehrsunfall": "#F59E0B",
    "Schadensregulierung": "#8B5CF6",
    "KFZ-Gutachten": "#10B981",
    "Versicherung": "#06B6D4",
    "Rechtsberatung": "#6366F1",
    "KI-Telefonie": "#EC4899",
    "Innovation": "#84CC16",
    "Kundenbetreuung": "#F97316",
    "Rechtsschutz": "#14B8A6",
    "Ratgeber": "#8B5CF6"
  };
  
  return colors[tag] || "#6B7280";
}
