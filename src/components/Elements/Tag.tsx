import Link from "next/link";

interface TagProps {
  link?: string;
  name: string;
  className?: string;
}

export default function Tag({ link, name, className }: TagProps) {
  const content = (
    <span className={`inline-block py-2 sm:py-3 px-6 sm:px-10 bg-dark text-light rounded-full capitalize font-semibold border-2 border-solid border-light hover:scale-105 transition-all ease duration-200 text-sm sm:text-base ${className}`}>
      #{name}
    </span>
  );

  if (link) {
    return (
      <Link href={link} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
