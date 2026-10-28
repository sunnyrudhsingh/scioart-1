import { notFound } from "next/navigation";

// Any unknown path inside a language folder shows the illustrated 404 page.
export default function CatchAll() {
  notFound();
}
