"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

function fmt(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}

/** Custom audio player with an animated equaliser while playing. */
export function AudioPlayer({
  src,
  title,
  compact = false,
  placeholder = false,
  className,
}: {
  src: string;
  title: string;
  compact?: boolean;
  placeholder?: boolean;
  className?: string;
}) {
  const t = useTranslations("learn");
  const tc = useTranslations("common");
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.addEventListener("pause", onPause);
    a.addEventListener("play", onPlay);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("play", onPlay);
    };
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) {
      // Pause any other player on the page.
      document.querySelectorAll("audio").forEach((x) => x !== a && x.pause());
      void a.play();
    } else a.pause();
  };

  return (
    <div
      className={cn("flex items-center gap-3 rounded-2xl bg-surface p-2.5 ring-1 ring-line", playing && "is-playing", className)}
      role="group"
      aria-label={`${t("audioPlayer")}: ${title}`}
    >
      <audio ref={audio} src={src} preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `${t("pause")}: ${title}` : `${t("play")}: ${title}`}
        className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-transform active:scale-95"
      >
        {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="ms-0.5 size-5" aria-hidden="true" />}
      </button>
      <div className="flex h-8 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="eq-bar block w-[4px] rounded-full bg-accent"
            style={{ height: `${[60, 100, 75, 90, 55][i]}%`, animationDelay: `${i * -0.17}s` }}
          />
        ))}
      </div>
      {!compact && (
        <div className="min-w-0 flex-1">
          <input
            type="range"
            min={0}
            max={dur || 0}
            step={0.1}
            value={time}
            onChange={(e) => {
              if (audio.current) audio.current.currentTime = Number(e.target.value);
            }}
            aria-label={t("seek")}
            className="w-full accent-[var(--primary)]"
          />
          <div className="t-small flex justify-between text-muted tabular-nums" lang="en">
            <span>{fmt(time)}</span>
            <span>{fmt(dur)}</span>
          </div>
        </div>
      )}
      {placeholder && <span className="t-small ms-auto hidden text-muted sm:inline">{tc("placeholderAudio")}</span>}
    </div>
  );
}
