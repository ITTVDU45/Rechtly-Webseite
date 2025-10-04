import Image from "next/image";
import Link from "next/link";

import { Blog } from "../../../.velite/generated";

interface BlogLayoutThreeProps {
  blog: Blog;
}

export default function BlogLayoutThree({ blog }: BlogLayoutThreeProps) {
  return (
    <article className="group flex flex-col items-center text-dark">
      <Link href={`/blogundratgeber/blogs/${blog.slug}`} className="h-full rounded-xl overflow-hidden bg-accent dark:bg-accentDark">
        <Image
          src={blog.image.src}
          placeholder="blur"
          blurDataURL={blog.image.blurDataURL}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className="aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-300"
          sizes="(max-width: 640px) 100vw,(max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col w-full mt-4">
        <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          {blog.tags[0]}
        </span>
        <Link href={`/blogundratgeber/blogs/${blog.slug}`} className="inline-block my-1">
          <h2 className="font-semibold capitalize text-base sm:text-lg">
            <span className="bg-gradient-to-r from-accentDark to-accentDark dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
              {blog.title}
            </span>
          </h2>
        </Link>

        <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base">
          {new Date(blog.publishedAt).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>
    </article>
  );
}
