import BlogDetails from "@/components/Blog/BlogDetails";
import RenderMdx from "@/components/Blog/RenderMdx";
import Tag from "@/components/Elements/Tag";
import siteMetadata from "@/utils/siteMetaData";
import { blogs, Blog } from '../../../../../.velite/generated';
import { slug as slugify } from "github-slugger";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import RelatedPosts from "@/components/Blog/RelatedPosts";
import PodcastWidget from '@/components/Blog/PodcastWidget';

export async function generateStaticParams() {
  return blogs.map((blog: Blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogs.find((blog: Blog) => blog.slug === slug);
  if (!blog) {
    return;
  }

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

  let imageList: string[] = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList = [siteMetadata.siteUrl + blog.image.src];
  }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + `/blogundratgeber/blogs/${blog.slug}`,
      siteName: siteMetadata.title,
      locale: "de_DE",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: ogImages,
    },
  };
}

interface TocItem {
  title: string;
  url: string;
  items?: TocItem[];
}

interface TableOfContentsItemProps {
  item: TocItem;
  level?: "two" | "three";
}

function TableOfContentsItem({ item, level = "two" }: TableOfContentsItemProps) {
  return (
    <li className="py-1">
      <a
        href={item.url}
        data-level={level}
        className="blog-toc-link data-[level=two]:pl-0 data-[level=two]:pt-2
                  data-[level=two]:border-t border-solid border-dark/40
                  data-[level=three]:pl-3
                  sm:data-[level=three]:pl-6
                  flex items-center justify-start py-2 text-sm sm:text-base"
      >
        {level === "three" && (
          <span className="flex w-1 h-1 rounded-full bg-gray-900 mr-2">&nbsp;</span>
        )}
          <span className="hover:underline text-gray-900">{item.title}</span>
      </a>
      {item.items && item.items.length > 0 && (
        <ul className="mt-1">
          {item.items.map((subItem) => (
            <TableOfContentsItem 
              key={subItem.url} 
              item={subItem} 
              level="three"
            />
          ))}
        </ul>
      )}
    </li>
  );
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = blogs.find((blog: Blog) => {
    return blog.slug === slug;
  });

  if (!blog) {
    notFound();
  }

  // Find related blogs based on tags, categories, or similar titles
  const getRelatedBlogs = (currentBlog: Blog, allBlogs: Blog[]): Blog[] => {
    const otherBlogs = allBlogs.filter(b => b.slug !== currentBlog.slug);
    
    const scoredBlogs = otherBlogs.map(b => {
      let score = 0;
      
      // Check for matching tags
      const matchingTags = b.tags.filter(tag => currentBlog.tags.includes(tag));
      score += matchingTags.length * 3; // High weight for matching tags
      
      // Check for similar category keywords
      const currentCategoryWords = currentBlog.tags.flatMap(tag => 
        tag.toLowerCase().split(/[\s-]+/)
      );
      const blogCategoryWords = b.tags.flatMap(tag => 
        tag.toLowerCase().split(/[\s-]+/)
      );
      const matchingWords = currentCategoryWords.filter(word => 
        blogCategoryWords.includes(word) && word.length > 2
      );
      score += matchingWords.length * 2; // Medium weight for matching words
      
      // Check for similar title words
      const currentTitleWords = currentBlog.title.toLowerCase().split(/[\s-]+/);
      const blogTitleWords = b.title.toLowerCase().split(/[\s-]+/);
      const matchingTitleWords = currentTitleWords.filter(word => 
        blogTitleWords.includes(word) && word.length > 3
      );
      score += matchingTitleWords.length * 1; // Lower weight for title similarity
      
      return { blog: b, score };
    });
    
    // Sort by relevance score (highest first)
    const sortedBlogs = scoredBlogs.sort((a, b) => b.score - a.score);
    
    // Get blogs with similarity score > 0 first
    const relatedBlogs = sortedBlogs.filter(item => item.score > 0);
    
    // If we have less than 3 related blogs, fill up with other recent blogs
    if (relatedBlogs.length < 3) {
      const additionalBlogs = sortedBlogs
        .filter(item => item.score === 0) // Get blogs with no similarity
        .slice(0, 3 - relatedBlogs.length); // Fill up to 3 total
      
      relatedBlogs.push(...additionalBlogs);
    }
    
    // Return at least 3, maximum 6 blogs
    return relatedBlogs
      .slice(0, 6)
      .map(item => item.blog);
  };

  const relatedBlogs = getRelatedBlogs(blog, blogs);

  let imageList: string[] = [siteMetadata.socialBanner];
  if (blog.image) {
    imageList = [siteMetadata.siteUrl + blog.image.src];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": blog.title,
    "description": blog.description,
    "image": imageList,
    "datePublished": new Date(blog.publishedAt).toISOString(),
    "dateModified": new Date(blog.updatedAt || blog.publishedAt).toISOString(),
    "author": [{
        "@type": "Person",
        "name": blog?.author ? [blog.author] : siteMetadata.author,
        "url": siteMetadata.twitter,
      }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="blog-detail-hero">
          {/* Back Button */}
          <div className="absolute top-16 sm:top-20 left-3 sm:left-6 z-20">
            <Link
              href="/blogundratgeber"
              className="blog-back-button inline-flex items-center text-white hover:text-gray-300 transition-colors duration-200 group bg-black/30 hover:bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg border border-white/20 text-sm sm:text-base"
            >
              <svg 
                className="w-4 sm:w-5 h-4 sm:h-5 mr-1.5 sm:mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Zurück zur Blog-Übersicht</span>
              <span className="sm:hidden">Zurück</span>
            </Link>
          </div>

          <div className="blog-detail-hero-overlay" />
          <Image
            src={blog.image.src}
            placeholder="blur"
            blurDataURL={blog.image.blurDataURL}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="blog-detail-hero-image"
            priority
            sizes="100vw"
          />
          <div className="blog-detail-hero-content">
            <span className="blog-detail-hero-tag">
              #{blog.tags[0]}
            </span>
            <h1 className="blog-detail-hero-title">
              {blog.title}
            </h1>
          </div>
        </div>
        <BlogDetails blog={blog} slug={slug} />

        <div className="blog-content-grid">
          <div className="blog-sidebar">
            <details
              className="blog-toc"
              open
            >
              <summary className="blog-toc-header">
                Inhaltsverzeichnis
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="blog-toc-content">
                <ul className="mt-4 font-in text-base">
                  {blog.toc?.map((item: any) => (
                    <TableOfContentsItem key={item.url} item={item} />
                  )) || (
                    <li>Kein Inhaltsverzeichnis verfügbar</li>
                  )}
                </ul>
              </div>
            </details>
            
            {/* CTA Section */}
            <div className="blog-cta">
              <Image
                src="/assets/images/Typische Bussgeldfaelleneu.png"
                alt="Typische Bußgeldfälle"
                width={120}
                height={90}
                className="blog-cta-image"
              />
              <h3 className="blog-cta-title">
                {blog.tags.includes('Bußgeld') ? 'Haben Sie ein Bußgeld erhalten?' :
                 blog.tags.includes('Verkehrsunfall') ? 'Unfall gehabt?' :
                 blog.tags.includes('KFZ-Gutachten') ? 'KFZ GUTACHTEN GESUCHT?' :
                 'Haben Sie ein Anliegen?'}
              </h3>
              <p className="blog-cta-text">
                Lassen Sie uns Ihr Anliegen prüfen und Ihre Rechte durchsetzen.
              </p>
              <a
                href="/anliegen-pruefen"
                className="blog-cta-button inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Jetzt Anliegen prüfen
              </a>
            </div>
          </div>
          <div className="blog-content">
            <div className="podcast-widget-container">
              {blog.slug === 'verkehrsunfall-sofortmassnahmen-und-schadensregulierung' ? (
                <PodcastWidget
                  episodes={[
                    {
                      src: '/assets/audio/Verkehrsunfall_in_Deutschland__Sofortmaßnahmen__Fahrerflucht_un.mp3',
                      title: 'Verkehrsunfall: Sofortmaßnahmen & Schadensregulierung',
                      subtitle: 'Kurzüberblick zu Sofortmaßnahmen, Fahrerflucht und Schadensregulierung',
                    },
                  ]}
                  heading={"Podcast Rechtly — Verkehrsunfall"}
                  subheading={"Weiterführende Gespräche und Experten-Interviews zum Thema Verkehrsunfall"}
                />
              ) : blog.slug === 'bussgeld-rotlichtverstoss' || blog.slug === 'bussgeld-bei-rotlichtverstossen-was-sie-wissen-mussen' ? (
                <PodcastWidget
                  episodes={[
                    {
                      src: '/assets/audio/Rotlichtverstoß_in_Deutschland__Die_1-Sekunden-Falle__Strafen_u.mp3',
                      title: 'Rotlichtverstöße: Strafen, Messfehler & Einspruchswege',
                      subtitle: 'Kurzüberblick zu Bußgeldern, Messfehlern und wie Sie Einspruch einlegen',
                    },
                  ]}
                  heading={"Podcast Rechtly — Bußgeld & Rotlicht"}
                  subheading={"Experten sprechen über Bußgelder, Messfehler und Einspruchsmöglichkeiten"}
                />
              ) : (
                <PodcastWidget />
              )}
            </div>
            <RenderMdx blog={blog} />
          </div>
        </div>
      </article>

      {/* Related Posts Section */}
      {relatedBlogs.length >= 3 && (
        <div className="mt-16">
          <RelatedPosts blogs={relatedBlogs} title="Ähnliche Artikel" />
        </div>
      )}
    </>
  );
}
