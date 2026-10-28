"use client";

import { useTranslations } from "next-intl";
import { Printer } from "lucide-react";

export function PrintButton() {
  const t = useTranslations("common");
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 font-semibold hover:border-primary hover:text-primary"
    >
      <Printer className="size-4" aria-hidden="true" />
      {t("print")}
    </button>
  );
}
