'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/button';
import './BlogSection.css';

const blogPosts = [
  { id: 1, title: 'Unfallschaden richtig abwickeln', excerpt: 'Erfahren Sie, wie Sie nach einem Unfall die maximale Entschädigung erhalten.', category: 'Unfallrecht', date: '15. März 2024', image: '/assets/images/Unfall.png', readTime: '5 min' },
  { id: 2, title: 'Bußgeldbescheid anfechten', excerpt: 'Tipps und Strategien zur erfolgreichen Anfechtung eines Bußgeldbescheids.', category: 'Bußgeldrecht', date: '12. März 2024', image: '/assets/images/Bußgeld.webp', readTime: '4 min' },
  { id: 3, title: 'KFZ-Gutachten verstehen', excerpt: 'Alles Wichtige zum Thema KFZ-Gutachten bei Unfallschäden.', category: 'Gutachten', date: '10. März 2024', image: '/assets/images/KFZGutachten.jpg', readTime: '6 min' }
];

const BlogSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Aktuelle Rechtsinformationen - <span className="text-blue-600">Verkehrsrecht</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map(post => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-6xl">📰</div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-blue-600 text-white">{post.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4"><span>{post.date}</span><span>{post.readTime}</span></div>
                <Link href={`/blog/${post.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group">Weiterlesen <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
            <Link href="/blog" className="inline-flex items-center">Alle Beiträge ansehen <ArrowRight className="ml-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

