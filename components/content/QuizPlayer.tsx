"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CircleCheck, CircleX, RotateCcw, Trophy } from "lucide-react";
import type { L, QuizQuestion } from "@/content/schema";
import { Confetti } from "@/components/motion/Confetti";
import { cn } from "@/lib/cn";

/** Multiple-choice quiz with instant feedback and a score at the end. */
export function QuizPlayer({ questions, title }: { questions: QuizQuestion[]; title: string }) {
  const t = useTranslations("learn");
  const locale = useLocale();
  const L = (x: L) => (locale === "en" ? x.en : x.pa);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];
  const total = questions.length;

  const reset = () => {
    setI(0);
    setPicked(null);
    setChecked(false);
    setScore(0);
    setDone(false);
  };

  if (done) {
    const perfect = score === total;
    return (
      <div className="relative overflow-hidden rounded-[var(--radius-section)] bg-surface p-8 text-center ring-1 ring-line">
        <Confetti fire={perfect || score >= Math.ceil(total * 0.6)} />
        <Trophy className="mx-auto size-14 text-wheat" aria-hidden="true" />
        <p className="t-h2 mt-4" role="status">
          {t("score", { score, total })}
        </p>
        {perfect && <p className="mt-2 text-lg font-semibold text-primary">{t("perfect")}</p>}
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-5 font-semibold hover:border-primary"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {t("retry")}
        </button>
      </div>
    );
  }

  const correct = picked === q.answer;

  return (
    <div
      className="rounded-[var(--radius-section)] bg-surface p-5 ring-1 ring-line sm:p-8"
      role="group"
      aria-label={`${t("quiz")}: ${title}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="t-label">{t("question", { n: i + 1, total })}</p>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-2" aria-hidden="true">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500"
            style={{ width: `${((i + (checked ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>
      <fieldset className="mt-4">
        <legend className="t-h3">{L(q.question)}</legend>
        <div className="mt-5 grid gap-2">
          {q.options.map((opt, j) => {
            const isPicked = picked === j;
            const showRight = checked && j === q.answer;
            const showWrong = checked && isPicked && j !== q.answer;
            return (
              <label
                key={j}
                className={cn(
                  "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 ring-1 transition-colors",
                  showRight
                    ? "bg-[#e2f0e5] ring-2 ring-[#2f8a52] dark:bg-[#183022]"
                    : showWrong
                      ? "bg-[#fbe3de] ring-2 ring-[#c0392b] dark:bg-[#361a15]"
                      : isPicked
                        ? "bg-accent-soft ring-2 ring-accent"
                        : "ring-line hover:bg-surface-2",
                  checked && "cursor-default",
                )}
              >
                <input
                  type="radio"
                  name={`q-${i}`}
                  value={j}
                  checked={isPicked}
                  disabled={checked}
                  onChange={() => setPicked(j)}
                  className="size-5 accent-[var(--primary)]"
                />
                <span className="flex-1">{L(opt)}</span>
                {showRight && <CircleCheck className="size-6 text-[#2f8a52]" aria-hidden="true" />}
                {showWrong && <CircleX className="size-6 text-[#c0392b]" aria-hidden="true" />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div aria-live="polite">
        {checked && (
          <p className={cn("mt-5 rounded-2xl p-4", correct ? "bg-[#e2f0e5] dark:bg-[#183022]" : "bg-[#fdf3d4] dark:bg-[#332a10]")}>
            <strong>{correct ? t("correct") : t("incorrect")}</strong> {L(q.explain)}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        {!checked ? (
          <button
            type="button"
            disabled={picked === null}
            onClick={() => {
              setChecked(true);
              if (picked === q.answer) setScore((s) => s + 1);
            }}
            className="min-h-12 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover disabled:opacity-50"
          >
            {t("check")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (i + 1 >= total) setDone(true);
              else {
                setI(i + 1);
                setPicked(null);
                setChecked(false);
              }
            }}
            className="min-h-12 rounded-full bg-primary px-6 font-semibold text-on-primary hover:bg-primary-hover"
          >
            {i + 1 >= total ? t("seeResult") : t("nextQuestion")}
          </button>
        )}
      </div>
    </div>
  );
}
