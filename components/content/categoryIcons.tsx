import {
  BookOpen,
  Clapperboard,
  Dices,
  Drama,
  Drum,
  Film,
  GraduationCap,
  Images,
  Megaphone,
  Music,
  Podcast,
  Radio,
  type LucideIcon,
} from "lucide-react";
import type { Category, CategoryId } from "@/content/schema";

export const categoryIcon: Record<CategoryId, LucideIcon> = {
  culture: Drum,
  documentaries: Clapperboard,
  live: Radio,
  jingles: Megaphone,
  "scientific-songs": Music,
  theatre: Drama,
  "short-films": Film,
  podcasts: Podcast,
  games: Dices,
  "e-modules": GraduationCap,
  "e-books": BookOpen,
  "posters-comics": Images,
};

/**
 * Colour follows what you do with an item, so the library reads at a glance:
 * blue = watch, green = listen, gold = play, violet = learn, clay = read, red = live.
 */
const actionTint: Record<Category["action"], string> = {
  watch: "bg-[#e1eef6] text-[#1d5878] dark:bg-[#132634] dark:text-[#9cc9e3]",
  listen: "bg-[#e2f0e5] text-[#236b3d] dark:bg-[#183022] dark:text-[#8fd4a6]",
  play: "bg-[#fbefd0] text-[#7a5200] dark:bg-[#33290f] dark:text-[#f2c860]",
  learn: "bg-[#ece6f6] text-[#4c3a7a] dark:bg-[#231d33] dark:text-[#c3b3ec]",
  read: "bg-[#f6e4da] text-[#8a3b17] dark:bg-[#33201a] dark:text-[#eda88a]",
};
const liveTint = "bg-[#fbe3de] text-[#a12a1a] dark:bg-[#361a15] dark:text-[#f29a8a]";

export function categoryTint(c: Pick<Category, "id" | "action">) {
  return c.id === "live" ? liveTint : actionTint[c.action];
}
