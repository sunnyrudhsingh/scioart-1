import { getTranslations } from "next-intl/server";
import { FlaskConical } from "lucide-react";

export async function SampleBanner({ text }: { text?: string }) {
  const t = await getTranslations("common");
  return (
    <p
      role="note"
      className="my-4 flex items-start gap-3 rounded-2xl border border-dashed border-[#c39420]/60 bg-[#fdf3d4] px-4 py-3 font-semibold text-[#4d3800] dark:bg-[#332a10] dark:text-[#f6e3a8]"
    >
      <FlaskConical className="mt-1 size-5 shrink-0" aria-hidden="true" />
      <span>{text ?? t("sampleNotice")}</span>
    </p>
  );
}
