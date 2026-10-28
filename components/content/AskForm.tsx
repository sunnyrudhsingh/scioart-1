"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CircleCheck, ImagePlus, LoaderCircle, ShieldCheck, X } from "lucide-react";
import type { L } from "@/content/schema";
import { useRegion } from "@/components/layout/RegionProvider";
import { compressImage } from "@/lib/image";
import { getSupabase, supabaseEnabled } from "@/lib/supabase";
import { cn } from "@/lib/cn";

type CropOpt = { slug: string; name: L; operations: { slug: string; name: L }[] };
type Districts = { slug: string; name: L }[];

const phone = /^(\+?91[\s-]?)?[6-9]\d{9}$/;
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AskForm({ crops, districts }: { crops: CropOpt[]; districts: Districts }) {
  const t = useTranslations("ask");
  const locale = useLocale();
  const params = useSearchParams();
  const { district } = useRegion();
  const id = useId();
  const L = (x: L) => (locale === "en" ? x.en : x.pa);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().max(80).optional(),
        contact: z
          .string()
          .trim()
          .min(1, t("required"))
          .refine((v) => phone.test(v.replace(/\s/g, "")) || email.test(v), t("contactInvalid")),
        district: z.string().min(1, t("required")),
        crop: z.string().min(1, t("required")),
        operation: z.string().optional(),
        question: z.string().trim().min(15, t("questionShort")).max(2000),
      }),
    [t],
  );
  type Values = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      contact: "",
      district: "",
      crop: params.get("crop") ?? "",
      operation: params.get("operation") ?? "",
      question: "",
    },
  });

  useEffect(() => {
    if (district && !getValues("district")) setValue("district", district);
  }, [district, setValue, getValues]);

  const [photo, setPhoto] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState(false);
  const [sent, setSent] = useState<{ contact: string; demo: boolean } | null>(null);
  const [submitError, setSubmitError] = useState(false);

  const cropSlug = useWatch({ control, name: "crop" });
  const ops = crops.find((c) => c.slug === cropSlug)?.operations ?? [];

  const onPhoto = async (file: File | undefined) => {
    setPhotoError(false);
    if (!file) return;
    try {
      const blob = await compressImage(file);
      setPhoto(blob);
      setPreview(URL.createObjectURL(blob));
    } catch {
      setPhoto(null);
      setPreview(null);
      setPhotoError(true);
    }
  };

  const onSubmit = async (v: Values) => {
    setSubmitError(false);
    try {
      const sb = await getSupabase();
      if (sb) {
        let photoPath: string | null = null;
        if (photo) {
          photoPath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.jpg`;
          const up = await sb.storage.from("question-photos").upload(photoPath, photo, { contentType: "image/jpeg" });
          if (up.error) throw up.error;
        }
        const ins = await sb.from("expert_questions").insert({
          name: v.name || null,
          contact: v.contact,
          district: v.district,
          crop: v.crop,
          operation: v.operation || null,
          question: v.question,
          photo_path: photoPath,
          locale,
        });
        if (ins.error) throw ins.error;
      } else if (process.env.NODE_ENV === "development") {
        console.info("[SciOArt demo mode] Question not stored:", v);
      }
      setSent({ contact: v.contact, demo: !supabaseEnabled });
    } catch {
      setSubmitError(true);
    }
  };

  if (sent) {
    return (
      <div role="status" className="pop-in rounded-[var(--radius-section)] bg-surface p-8 text-center ring-1 ring-line sm:p-12">
        <CircleCheck className="mx-auto size-16 text-primary" aria-hidden="true" />
        <h2 className="t-h2 mt-4">{t("successTitle")}</h2>
        <p className="mt-2 text-lg">{t("successText", { contact: sent.contact })}</p>
        {sent.demo && <p className="t-small mx-auto mt-4 max-w-md rounded-xl bg-surface-2 p-3 text-muted">{t("demoNote")}</p>}
        <button
          type="button"
          onClick={() => {
            reset();
            setPhoto(null);
            setPreview(null);
            setSent(null);
          }}
          className="mt-6 min-h-12 rounded-full border border-line-strong px-6 font-semibold hover:border-primary"
        >
          {t("another")}
        </button>
      </div>
    );
  }

  const field = "h-12 w-full rounded-[var(--radius-input)] border bg-bg px-3 outline-none focus:border-primary";
  const err = (name: keyof Values) => errors[name]?.message as string | undefined;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 rounded-[var(--radius-section)] bg-surface p-5 ring-1 ring-line sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label={t("name")}>
          <input id={`${id}-name`} autoComplete="name" {...register("name")} className={cn(field, "border-line-strong")} />
        </Field>
        <Field id={`${id}-contact`} label={t("contact")} hint={t("contactHint")} error={err("contact")}>
          <input
            id={`${id}-contact`}
            autoComplete="tel"
            aria-invalid={!!errors.contact}
            aria-describedby={`${id}-contact-hint${errors.contact ? ` ${id}-contact-err` : ""}`}
            {...register("contact")}
            className={cn(field, errors.contact ? "border-[#c0392b]" : "border-line-strong")}
          />
        </Field>
        <Field id={`${id}-district`} label={t("district")} error={err("district")}>
          <select
            id={`${id}-district`}
            aria-invalid={!!errors.district}
            aria-describedby={errors.district ? `${id}-district-err` : undefined}
            {...register("district")}
            className={cn(field, errors.district ? "border-[#c0392b]" : "border-line-strong")}
          >
            <option value="">{t("chooseDistrict")}</option>
            {districts.map((d) => (
              <option key={d.slug} value={d.slug}>
                {L(d.name)}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-crop`} label={t("crop")} error={err("crop")}>
          <select
            id={`${id}-crop`}
            aria-invalid={!!errors.crop}
            aria-describedby={errors.crop ? `${id}-crop-err` : undefined}
            {...register("crop", { onChange: () => setValue("operation", "") })}
            className={cn(field, errors.crop ? "border-[#c0392b]" : "border-line-strong")}
          >
            <option value="">{t("chooseCrop")}</option>
            {crops.map((c) => (
              <option key={c.slug} value={c.slug}>
                {L(c.name)}
              </option>
            ))}
            <option value="other">{t("otherCrop")}</option>
          </select>
        </Field>
      </div>

      <Field id={`${id}-op`} label={t("operation")}>
        <select id={`${id}-op`} {...register("operation")} className={cn(field, "border-line-strong")}>
          <option value="">{t("general")}</option>
          {ops.map((o) => (
            <option key={o.slug} value={o.slug}>
              {L(o.name)}
            </option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-q`} label={t("question")} hint={t("questionHint")} error={err("question")}>
        <textarea
          id={`${id}-q`}
          rows={5}
          aria-invalid={!!errors.question}
          aria-describedby={`${id}-q-hint${errors.question ? ` ${id}-q-err` : ""}`}
          {...register("question")}
          className={cn(
            "w-full rounded-[var(--radius-input)] border bg-bg p-3 outline-none focus:border-primary",
            errors.question ? "border-[#c0392b]" : "border-line-strong",
          )}
        />
      </Field>

      <div>
        <p className="t-label mb-1.5" id={`${id}-photo-label`}>
          {t("photo")}
        </p>
        <p className="t-small mb-3 text-muted">{t("photoHint")}</p>
        {preview ? (
          <div className="relative w-fit">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="" className="h-40 w-auto rounded-2xl object-cover ring-1 ring-line" />
            <button
              type="button"
              onClick={() => {
                setPhoto(null);
                setPreview(null);
              }}
              className="shadow-soft absolute -end-3 -top-3 grid size-10 place-items-center rounded-full bg-surface ring-1 ring-line"
              aria-label={t("removePhoto")}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <label className="inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border-2 border-dashed border-line-strong px-5 font-semibold hover:border-primary hover:text-primary">
            <ImagePlus className="size-5" aria-hidden="true" />
            {t("addPhoto")}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              aria-labelledby={`${id}-photo-label`}
              className="sr-only"
              onChange={(e) => onPhoto(e.target.files?.[0])}
            />
          </label>
        )}
        {photoError && (
          <p role="alert" className="t-small mt-2 font-semibold text-[#c0392b] dark:text-[#f29a8a]">
            {t("photoError")}
          </p>
        )}
      </div>

      {submitError && (
        <p role="alert" className="rounded-xl bg-[#fbe3de] p-3 font-semibold text-[#a12a1a] dark:bg-[#361a15] dark:text-[#f29a8a]">
          {t("submitError")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p className="t-small flex items-center gap-2 text-muted">
          <ShieldCheck className="size-4" aria-hidden="true" />
          {t("privacy")}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-13 items-center gap-2 rounded-full bg-primary px-8 text-[1.05rem] font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-70"
        >
          {isSubmitting && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {isSubmitting ? t("sending") : t("submit")}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-1.5">
      <label htmlFor={id} className="t-label">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="t-small text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="t-small font-semibold text-[#c0392b] dark:text-[#f29a8a]">
          {error}
        </p>
      )}
    </div>
  );
}
