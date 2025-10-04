"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Blog } from "../../../.velite/generated";

interface HomeCoverSectionProps {
  blogs: Blog[];
}

export default function HomeCoverSection({ blogs }: HomeCoverSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [blogs.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
    setIsAutoPlaying(false);
  };

  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full mx-auto relative">
      <div className="relative overflow-hidden">
        {/* Slider Container */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {blogs.slice(0, 5).map((blog, index) => (
            <div key={blog.slug} className="w-full flex-shrink-0 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
              <Image
                src={blog.image.src}
                alt={blog.title}
                width={blog.image.width}
                height={blog.image.height}
                className="w-full h-[70vh] object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center text-white max-w-4xl mx-auto px-4">
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                        {blog.tags.slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                    {blog.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-6 opacity-90 max-w-3xl mx-auto">
                    {blog.description}
                  </p>
                  <Link
                    href={`/blogundratgeber/blogs/${blog.slug}`}
                    className="inline-block px-8 py-3 rounded-lg font-semibold text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)'
                    }}
                  >
                    Artikel lesen
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Vorheriger Artikel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Nächster Artikel"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          {blogs.slice(0, 5).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Gehe zu Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute top-6 right-6 z-30 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
          aria-label={isAutoPlaying ? "Auto-Play stoppen" : "Auto-Play starten"}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Progress Bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-30">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / blogs.slice(0, 5).length) * 100}%`
            }}
          />
        </div>
      )}
    </section>
  );
}
