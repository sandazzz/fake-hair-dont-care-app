export function formatName(input: string) {
  if (typeof input !== "string") return "";

  return input
    .toLowerCase()
    .split(/(\s|-|’|')/) // conserve séparateurs comme espace, tiret, apostrophes
    .map((part) =>
      /[a-zA-Z\u00C0-\u017F]/.test(part.charAt(0))
        ? part.charAt(0).toUpperCase() + part.slice(1)
        : part
    )
    .join("");
}
