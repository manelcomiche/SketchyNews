import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — SketchyNews",
  description: "Learn how SketchyNews turns headlines into AI-generated illustrations.",
};

export default function About() {
  return <AboutContent />;
}
