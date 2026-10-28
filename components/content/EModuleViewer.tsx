"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import type { L, QuizQuestion } from "@/content/schema";
import { QuizPlayer } from "./QuizPlayer";

/** A step-by-step lesson with a progress bar, followed by its quiz. */
export function EModuleViewer({ lesson, quiz, title }: { lesson: { title: L; body: L }[]; quiz?: QuizQuestion[]; title: string }) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const L = (x: L) => (locale === "en" ? x.en : x.pa);
  const [step, setStep] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const total = lesson.length;

  if (quizMode && quiz) return <QuizPlayer questions={quiz} title={title} />;

  const s = lesson[step];
  return (
    <div className="rounded-[var(--radius-section)] bg-surface p-5 ring-1 ring-line sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="t-label">{t("step", { n: step + 1, total })}</p>
        <span className="t-small text-muted">{t("lesson")}</span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step + 1}
        aria-label={t("step", { n: step + 1, total })}
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-500"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>
      <div key={step} className="word-in mt-6 block" aria-live="polite">
        <h2 className="t-h2">{L(s.title)}</h2>
        <p className="mt-4 max-w-2xl text-[1.12rem]">{L(s.body)}</p>
      </div>
      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((x) => Math.max(0, x - 1))}
          disabled={step === 0}
          className="min-h-12 rounded-full border border-line-strong px-6 font-semibold hover:border-primary disabled:opacity-40"
        >
          {t("back")}
        </button>
        {step + 1 < total ? (
          <button
            type="button"
            onClick={() => setStep((x) => x + 1)}
            className="min-h-12 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
          >
            {t("continue")}
          </button>
        ) : (
          quiz && (
            <button
              type="button"
              onClick={() => setQuizMode(true)}
              className="min-h-12 rounded-full bg-mustard px-6 font-semibold text-ink hover:brightness-105"
            >
              {t("startQuiz")}
            </button>
          )
        )}
      </div>
    </div>
  );
}
