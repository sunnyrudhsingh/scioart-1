import type { ReactNode } from "react";
import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

const tones = {
  important: {
    Icon: Info,
    cls: "border-[#1f5e3b]/30 bg-[#e4efe5] text-[#123d26] dark:border-[#6fc28b]/30 dark:bg-[#183022] dark:text-[#d6efdd]",
    icon: "text-[#1f5e3b] dark:text-[#8fd4a6]",
  },
  caution: {
    Icon: TriangleAlert,
    cls: "border-[#b4541a]/30 bg-[#fbe8d8] text-[#5a2608] dark:border-[#f2a065]/30 dark:bg-[#36210f] dark:text-[#f8dcc4]",
    icon: "text-[#b4541a] dark:text-[#f2a065]",
  },
  tip: {
    Icon: Lightbulb,
    cls: "border-[#c39420]/35 bg-[#fdf3d4] text-[#4d3800] dark:border-[#f2c230]/30 dark:bg-[#332a10] dark:text-[#f6e3a8]",
    icon: "text-[#a37700] dark:text-[#f2c230]",
  },
} as const;

export function Callout({ tone, title, children }: { tone: keyof typeof tones; title: string; children: ReactNode }) {
  const { Icon, cls, icon } = tones[tone];
  return (
    <aside className={cn("print-break my-6 flex gap-3 rounded-2xl border p-4 sm:p-5", cls)}>
      <Icon className={cn("mt-1 size-5 shrink-0", icon)} aria-hidden="true" />
      <div>
        <p className="font-bold">{title}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </aside>
  );
}
