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
        className="data-[level=two]:pl-0 data-[level=two]:pt-2
                  data-[level=two]:border-t border-solid border-dark/40
                  data-[level=three]:pl-4
                  sm:data-[level=three]:pl-6
                  flex items-center justify-start"
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
        <div className="mb-8 text-center relative w-full h-[90vh] bg-gray-900">
          {/* Back Button */}
          <div className="absolute top-20 left-6 z-20">
            <Link
              href="/blogundratgeber"
              className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-200 group bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
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

          <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Tag
              name={blog.tags[0]}
              link={`/blogundratgeber/categories/${slugify(blog.tags[0])}`}
              className="px-6 text-sm py-2"
            />
            <h1
              className="inline-block mt-6 font-semibold capitalize text-light text-2xl md:text-3xl lg:text-5xl !leading-normal relative w-5/6"
            >
              {blog.title}
            </h1>
          </div>
              <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gray-900/60" />
          <Image
            src={blog.image.src}
            placeholder="blur"
            blurDataURL={blog.image.blurDataURL}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className="aspect-square w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <BlogDetails blog={blog} slug={slug} />

        <div className="grid grid-cols-12 gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
          <div className="col-span-12 lg:col-span-4">
            <details
              className="border-[1px] border-solid border-gray-300 text-gray-900 rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
              open
            >
              <summary className="text-lg font-semibold capitalize cursor-pointer">
                Inhaltsverzeichnis
              </summary>
              <ul className="mt-4 font-in text-base">
                {blog.toc?.map((item: any) => (
                  <TableOfContentsItem key={item.url} item={item} />
                )) || (
                  <li>Kein Inhaltsverzeichnis verfügbar</li>
                )}
              </ul>
            </details>
          </div>
          <RenderMdx blog={blog} />
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
