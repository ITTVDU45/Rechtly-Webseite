"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Blog } from "../../.velite/generated";
import { slug as slugify } from "github-slugger";

type Props = { 
  blogs: Blog[];
  onFilteredBlogs: (blogs: Blog[]) => void;
};

export default function BlogSearch({ blogs, onFilteredBlogs }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const MIN_QUERY = 2;

  // Extract all unique tags and categories
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [blogs]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => categories.add(slugify(tag)));
    });
    return Array.from(categories).sort();
  }, [blogs]);

  // Filter blogs based on search and filters
  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Text search
    if (searchQuery.trim().length >= MIN_QUERY) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(blog =>
        selectedTags.some(tag => blog.tags.includes(tag))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(blog =>
        selectedCategories.some(category => 
          blog.tags.some(tag => slugify(tag) === category)
        )
      );
    }

    return filtered;
  }, [blogs, searchQuery, selectedTags, selectedCategories]);

  // Update parent component with filtered blogs
  useEffect(() => {
    onFilteredBlogs(filteredBlogs);
  }, [filteredBlogs, onFilteredBlogs]);

  // Handle search suggestions
  const searchSuggestions = useMemo(() => {
    if (searchQuery.trim().length < MIN_QUERY) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestions: Array<{ type: 'title' | 'tag' | 'category', text: string, slug?: string }> = [];

    // Add matching titles
    blogs.forEach(blog => {
      if (blog.title.toLowerCase().includes(query)) {
        suggestions.push({ type: 'title', text: blog.title, slug: blog.slug });
      }
    });

    // Add matching tags
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(query)) {
        suggestions.push({ type: 'tag', text: tag });
      }
    });

    // Add matching categories
    allCategories.forEach(category => {
      if (category.toLowerCase().includes(query)) {
        suggestions.push({ type: 'category', text: category });
      }
    });

    return suggestions.slice(0, 10); // Limit to 10 suggestions
  }, [searchQuery, blogs, allTags, allCategories]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSearchOpen(value.length >= MIN_QUERY && searchSuggestions.length > 0);
    setHighlightedIndex(-1);
  };

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Handle category selection
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    setSelectedCategories([]);
    setSearchOpen(false);
    setHighlightedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchOpen || searchSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev >= searchSuggestions.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev <= 0 ? searchSuggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < searchSuggestions.length) {
        const suggestion = searchSuggestions[highlightedIndex];
        setSearchQuery(suggestion.text);
        setSearchOpen(false);
        setHighlightedIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      setHighlightedIndex(-1);
    }
  };

  // Close search on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!inputRef.current) return;
      if (e.target instanceof Node && !inputRef.current.contains(e.target) && !listRef.current?.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const hasActiveFilters = searchQuery.trim().length > 0 || selectedTags.length > 0 || selectedCategories.length > 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <label htmlFor="blog-search" className="sr-only">Blog-Artikel suchen</label>
        <div className="relative">
          <input
            id="blog-search"
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery.length >= MIN_QUERY && setSearchOpen(searchSuggestions.length > 0)}
            onKeyDown={handleKeyDown}
            placeholder="Artikel, Tags oder Kategorien suchen..."
            className="w-full rounded-2xl px-6 py-4 text-gray-900 placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 text-lg border border-gray-200"
            aria-autocomplete="list"
            aria-expanded={searchOpen}
            aria-controls="blog-search-list"
          />
          
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Suggestions */}
          {searchOpen && searchSuggestions.length > 0 && (
            <ul 
              id="blog-search-list" 
              ref={listRef} 
              role="listbox" 
              className="absolute z-20 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-64 overflow-auto border border-gray-200"
            >
              {searchSuggestions.map((suggestion, i) => (
                <li
                  key={`${suggestion.type}-${suggestion.text}`}
                  role="option"
                  aria-selected={highlightedIndex === i}
                  onMouseEnter={() => setHighlightedIndex(i)}
                  onClick={() => {
                    setSearchQuery(suggestion.text);
                    setSearchOpen(false);
                    setHighlightedIndex(-1);
                  }}
                  className={`cursor-pointer px-4 py-3 border-b last:border-b-0 flex items-center gap-3 ${
                    highlightedIndex === i ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-lg">
                    {suggestion.type === 'title' ? '📄' : suggestion.type === 'tag' ? '🏷️' : '📂'}
                  </div>
                  <div className="font-medium text-gray-900">{suggestion.text}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
          </svg>
          Filter ({selectedTags.length + selectedCategories.length})
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Alle Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
          {/* Tags Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Kategorien</h3>
            <div className="flex flex-wrap gap-2">
              {allCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategories.includes(category)
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      {hasActiveFilters && (
        <div className="text-center text-gray-600 mt-4">
          {filteredBlogs.length} von {blogs.length} Artikeln gefunden
        </div>
      )}
    </div>
  );
}
