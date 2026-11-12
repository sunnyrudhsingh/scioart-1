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
 * one colour each for watch, listen, play, learn and read, and red for live.
 * The colours themselves come from the palette in app/globals.css (--cat-*).
 */
type Key = Category["action"] | "live";
const keyOf = (c: Pick<Category, "id" | "action">): Key => (c.id === "live" ? "live" : c.action);

/** Soft background with text in the category colour (cards, badges). */
const soft: Record<Key, string> = {
  watch:
    "bg-[color-mix(in_oklab,var(--cat-watch)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-watch)_82%,var(--text))]",
  listen:
    "bg-[color-mix(in_oklab,var(--cat-listen)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-listen)_68%,var(--text))]",
  play: "bg-[color-mix(in_oklab,var(--cat-play)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-play)_72%,var(--text))]",
  learn:
    "bg-[color-mix(in_oklab,var(--cat-learn)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-learn)_82%,var(--text))]",
  read: "bg-[color-mix(in_oklab,var(--cat-read)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-read)_82%,var(--text))]",
  live: "bg-[color-mix(in_oklab,var(--cat-live)_var(--cat-mix-soft),var(--surface))] text-[color-mix(in_oklab,var(--cat-live)_82%,var(--text))]",
};

/** Solid category colour with white text (big section buttons). */
const solid: Record<Key, string> = {
  watch: "bg-cat-watch text-white",
  listen: "bg-cat-listen text-white",
  play: "bg-cat-play text-white",
  learn: "bg-cat-learn text-white",
  read: "bg-cat-read text-white",
  live: "bg-cat-live text-white",
};

/** The category colour as a CSS value, for borders and patterns. */
const cssVar: Record<Key, string> = {
  watch: "var(--cat-watch)",
  listen: "var(--cat-listen)",
  play: "var(--cat-play)",
  learn: "var(--cat-learn)",
  read: "var(--cat-read)",
  live: "var(--cat-live)",
};

export const categoryTint = (c: Pick<Category, "id" | "action">) => soft[keyOf(c)];
export const categorySolid = (c: Pick<Category, "id" | "action">) => solid[keyOf(c)];
export const categoryColor = (c: Pick<Category, "id" | "action">) => cssVar[keyOf(c)];
