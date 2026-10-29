export function slugify(text: string, separator = "-"): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/Æ/gi, "AE")
    .replace(/Œ/gi, "OE")
    .replace(/ß/g, "ss")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`\\${separator}{2,}`, "g"), separator)
    .replace(new RegExp(`^\\${separator}|\\${separator}$`, "g"), "");
}
