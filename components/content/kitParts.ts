import { ClipboardCheck, ClipboardList, FileText, MessageSquareText, Presentation, Puzzle, ScrollText } from "lucide-react";

export const kitPartIcons = {
  "facilitator-guide": ScrollText,
  slides: Presentation,
  leaflet: FileText,
  activity: Puzzle,
  "pre-test": ClipboardList,
  "post-test": ClipboardCheck,
  "feedback-form": MessageSquareText,
} as const;
