import { Fragment } from "react";

/** Splits a headline into words that rise in one after another (pure CSS). */
export function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-in" style={{ ["--w" as string]: i }}>
            {w}
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
