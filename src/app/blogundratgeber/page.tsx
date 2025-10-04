import { blogs, Blog } from "../../../.velite/generated";
import HomeCoverSection from "@/components/Blog/HomeCoverSection";
import CategoriesSection from "@/components/Blog/CategoriesSection";
import FeaturedPosts from "@/components/Blog/FeaturedPosts";
import RecentPosts from "@/components/Blog/RecentPosts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} />
      <FeaturedPosts blogs={blogs} />
      <CategoriesSection blogs={blogs} />
      <RecentPosts blogs={blogs} />
    </main>
  );
}
