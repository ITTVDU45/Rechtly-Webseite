'use client';

import Link from "next/link";
import { Blog } from "../../../.velite/generated";
import { slug as slugify } from "github-slugger";
import { useRef, useState, useEffect } from "react";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Only consider published blogs and extract unique categories from them
  const publishedBlogs = blogs.filter((b) => b.isPublished !== false);
  const categoriesMap = new Map<string, CategoryData>();

  publishedBlogs.forEach((blog: Blog) => {
    (blog.tags || []).forEach((tag: string) => {
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

  // Only show categories that actually have at least one article
  const categories = Array.from(categoriesMap.values())
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate current index based on scroll position
      const cardWidth = 280 + 16; // card width + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 16; // card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 280 + 16; // card width + gap
      scrollContainerRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener('scroll', updateScrollButtons);
    }
  }, []);

  return (
    <section className="blog-grid-section w-full mx-auto py-12 sm:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="blog-section-title text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Entdecken Sie unsere Kategorien
          </h2>
          <p className="blog-section-description text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Finden Sie schnell die Informationen, die Sie suchen. Durchsuchen Sie unsere Artikel nach Themenbereichen.
          </p>
        </div>

        {/* Mobile: Horizontal Slider with Navigation */}
        <div className="md:hidden relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
              canScrollLeft 
                ? 'opacity-100 hover:scale-110 active:scale-95' 
                : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ marginLeft: '-12px' }}
            aria-label="Vorherige Kategorie"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-200 ${
              canScrollRight 
                ? 'opacity-100 hover:scale-110 active:scale-95' 
                : 'opacity-30 cursor-not-allowed'
            }`}
            style={{ marginRight: '-12px' }}
            aria-label="Nächste Kategorie"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slider Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blogundratgeber/categories/${category.slug}`}
                className="group block flex-shrink-0 snap-start"
                style={{ width: '280px' }}
              >
                <div className="category-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                  <div 
                    className="h-2 w-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div 
                        className="category-card-icon w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.icon}
                      </div>
                      <span className="category-card-count text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {category.count} Artikel
                      </span>
                    </div>
                    
                    <h3 className="category-card-title text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="category-card-description text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
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
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex 
                    ? 'w-6 h-2 bg-gradient-to-r from-[#C7E70C] to-[#8BC34A]' 
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Gehe zu Kategorie ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/blogundratgeber/categories/${category.slug}`}
              className="group block"
            >
              <div className="category-card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                <div 
                  className="h-2 w-full"
                  style={{ backgroundColor: category.color }}
                />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div 
                      className="category-card-icon w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center text-white text-xl sm:text-2xl font-bold"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.icon}
                    </div>
                    <span className="category-card-count text-xs sm:text-sm text-gray-500 bg-gray-100 px-2.5 sm:px-3 py-1 rounded-full">
                      {category.count} Artikel
                    </span>
                  </div>
                  
                  <h3 className="category-card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="category-card-description text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4">
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
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/blogundratgeber/categories/all"
            className="blog-card-link inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)'
            }}
          >
            Alle Artikel anzeigen
            <svg className="w-4 sm:w-5 h-4 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    "Bußgeld": "Alles rund um Bußgelder, Einspruchsmöglichkeiten und Verkehrsrecht",
    "Verkehrsrecht": "Rechtliche Aspekte im Straßenverkehr und Verkehrsverstöße",
    "Blitzer": "Geschwindigkeitsmessungen, Blitzer-Arten und Messfehler",
    "Messfehler": "Fehlerquellen bei Geschwindigkeitsmessungen und wie Sie sich wehren",
    "Fahrverbot": "Fahrverbote, Punkte in Flensburg und rechtliche Konsequenzen",
    "Einspruch": "Einspruchsmöglichkeiten gegen Bußgeldbescheide und Verkehrsverstöße",
    "Mobile Blitzer": "Mobile Geschwindigkeitsmessungen und deren Fehlerquellen",
    "Stationäre Blitzer": "Fest installierte Blitzer und typische Messprobleme",
    "Geschwindigkeitsüberschreitung": "Tempoüberschreitungen, Bußgelder und rechtliche Folgen",
    "Bußgeldkatalog 2025": "Aktueller Bußgeldkatalog mit allen Strafen und Sanktionen",
    "Punkte Flensburg": "Punktesystem, Fahreignungsregister und Abbau von Punkten",
    "innerorts geblitzt": "Geschwindigkeitsüberschreitungen innerorts und deren Folgen",
    "Rechtly": "Digitale Rechtshilfe und Bußgeldbescheid-Prüfung"
  };
  
  return descriptions[tag] || `Artikel und Informationen zum Thema ${tag}`;
}

function getCategoryIcon(tag: string): string {
  const icons: { [key: string]: string } = {
    "Bußgeld": "€",
    "Verkehrsrecht": "⚖️",
    "Blitzer": "📸",
    "Messfehler": "⚠️",
    "Fahrverbot": "🚫",
    "Einspruch": "✋",
    "Mobile Blitzer": "📱",
    "Stationäre Blitzer": "🚦",
    "Geschwindigkeitsüberschreitung": "⚡",
    "Bußgeldkatalog 2025": "📋",
    "Punkte Flensburg": "📍",
    "innerorts geblitzt": "🏙️",
    "Rechtly": "🛡️"
  };
  
  return icons[tag] || "📄";
}

function getCategoryColor(tag: string): string {
  const colors: { [key: string]: string } = {
    "Bußgeld": "#EF4444",
    "Verkehrsrecht": "#3B82F6",
    "Blitzer": "#F59E0B",
    "Messfehler": "#EF4444",
    "Fahrverbot": "#DC2626",
    "Einspruch": "#8B5CF6",
    "Mobile Blitzer": "#F97316",
    "Stationäre Blitzer": "#EA580C",
    "Geschwindigkeitsüberschreitung": "#EAB308",
    "Bußgeldkatalog 2025": "#10B981",
    "Punkte Flensburg": "#06B6D4",
    "innerorts geblitzt": "#6366F1",
    "Rechtly": "#84CC16"
  };
  
  return colors[tag] || "#6B7280";
}
