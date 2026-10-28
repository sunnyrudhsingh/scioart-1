"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FolderDown, LoaderCircle } from "lucide-react";

/** Fetches every file of a kit and saves them as one ZIP (JSZip is loaded only when needed). */
export function DownloadAll({ files, name }: { files: { path: string; filename: string }[]; name: string }) {
  const t = useTranslations("common");
  const te = useTranslations("extension");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const run = async () => {
    setBusy(true);
    setError(false);
    try {
      const { default: JSZip } = await import("jszip");
      const zip = new JSZip();
      await Promise.all(
        files.map(async (f) => {
          const res = await fetch(f.path);
          if (!res.ok) throw new Error(f.path);
          zip.file(f.filename, await res.blob());
        }),
      );
      const blob = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${name}.zip`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="shadow-soft inline-flex min-h-13 items-center gap-2 rounded-full bg-mustard px-7 text-[1.05rem] font-semibold text-ink hover:brightness-105 disabled:opacity-70"
      >
        {busy ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <FolderDown className="size-5" aria-hidden="true" />}
        {busy ? t("preparing") : t("downloadAll")}
      </button>
      {error && (
        <p role="alert" className="t-small mt-2 font-semibold text-[#a12a1a] dark:text-[#f29a8a]">
          {te("zipError")}
        </p>
      )}
    </div>
  );
}
