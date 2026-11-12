/** A real 11-character YouTube ID (placeholders start with SAMPLE). */
export const isRealYouTubeId = (id: string | undefined): id is string =>
  Boolean(id && /^[A-Za-z0-9_-]{11}$/.test(id) && !id.startsWith("SAMPLE"));

export const youTubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
