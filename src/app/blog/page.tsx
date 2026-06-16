import type { Metadata } from "next";
import BlogGallery from "@/components/blog/BlogGallery";

export const metadata: Metadata = {
  title: "The Journal — Career Passport",
  description:
    "Notes on verified work, the future of hiring, and building a career you can prove. Explore the Career Passport journal.",
};

export default function BlogPage() {
  return <BlogGallery />;
}
