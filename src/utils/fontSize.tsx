export type FontSize = "small" | "large";

const FONT_SIZE_KEY = "fontSize";

export const getStoredFontSize = (): FontSize => {
  return (localStorage.getItem(FONT_SIZE_KEY) as FontSize) || "small";
};

export const applyFontSizeClass = (size: FontSize) => {
  const html = document.documentElement;
  html.classList.remove("text-sm", "text-lg");
  html.classList.add(size === "large" ? "text-lg" : "text-sm");
  localStorage.setItem(FONT_SIZE_KEY, size);
};

export const toggleFontSize = () => {
  const current = getStoredFontSize();
  const next = current === "small" ? "large" : "small";
  applyFontSizeClass(next);
};
