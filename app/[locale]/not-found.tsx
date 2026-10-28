import { getTranslations } from "next-intl/server";
import { Scarecrow } from "@/components/illustrations/Decor";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="container-x grid min-h-[70vh] items-center gap-10 py-16 md:grid-cols-[1fr_1.1fr]">
      <Scarecrow className="mx-auto w-full max-w-sm" />
      <div>
        <p className="font-display text-7xl font-semibold text-wheat" lang="en">
          404
        </p>
        <h1 className="t-h1 mt-2">{t("title")}</h1>
        <p className="t-lead mt-4 max-w-lg">{t("text")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">{t("home")}</ButtonLink>
          <ButtonLink href="/search" variant="secondary">
            {t("search")}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
