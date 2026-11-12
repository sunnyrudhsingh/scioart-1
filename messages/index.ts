import en from "./en.json";
import pa from "./pa.json";

export type Messages = typeof en;

const all = { en, pa } as const;

export function messagesFor(locale: string): Messages {
  return locale === "en" ? all.en : (all.pa as Messages);
}

/** Only these namespaces are sent to the browser (client components). */
export const clientNamespaces = ["common", "nav", "home", "crops", "library", "live", "player", "resources", "search"] as const;

export function clientMessages(messages: Messages) {
  return Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]));
}
