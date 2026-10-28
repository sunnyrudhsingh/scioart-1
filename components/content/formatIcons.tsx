import { BookOpen, BookOpenText, CircleHelp, Film, Gamepad2, Headphones, Megaphone, Music, Video, type LucideIcon } from "lucide-react";
import type { FormatId } from "@/content/schema";

export const formatIcon: Record<FormatId, LucideIcon> = {
  game: Gamepad2,
  song: Music,
  jingle: Megaphone,
  video: Video,
  emodule: BookOpen,
  quiz: CircleHelp,
  story: BookOpenText,
  podcast: Headphones,
  "play-film": Film,
};
