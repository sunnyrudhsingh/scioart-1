import { Clock, Files } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Kit } from "@/content/schema";
import { getCrop, getOperation } from "@/lib/content";
import { tx } from "@/lib/text";
import { CropIcon } from "@/components/illustrations/CropIcon";
import { OperationIcon } from "@/components/illustrations/FieldIcons";

export async function KitCard({ kit, locale, index = 0 }: { kit: Kit; locale: string; index?: number }) {
  const t = await getTranslations("common");
  const crop = getCrop(kit.crop);
  const op = getOperation(kit.operation);

  return (
    <Link
      href={`/extension/${kit.slug}`}
      data-season={crop?.season}
      data-reveal
      style={{ ["--i" as string]: index }}
      className="group pressable lift shadow-soft flex h-full flex-col rounded-[var(--radius-card)] bg-surface p-5 ring-1 ring-line"
    >
      <div className="flex items-center gap-2">
        <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent-ink">
          <CropIcon name={crop?.illustration ?? "wheat"} className="size-8" />
        </span>
        <span className="grid size-12 place-items-center rounded-2xl bg-surface-2 text-primary">
          <OperationIcon name={op?.icon ?? "crop-care"} className="size-8" />
        </span>
        {kit.sample && <span className="sample-badge ms-auto">{t("sample")}</span>}
      </div>
      <h3 className="mt-4 font-display text-[1.2rem] leading-snug font-semibold">{tx(kit.title, locale)}</h3>
      <p className="t-small mt-2 text-muted">{tx(kit.summary, locale)}</p>
      <div className="t-small mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" aria-hidden="true" />
          {tx(kit.duration, locale)}
        </span>
        <span className="inline-flex items-center gap-1.5" lang="en">
          <Files className="size-4" aria-hidden="true" />
          {kit.files.length} PDF
        </span>
      </div>
    </Link>
  );
}
