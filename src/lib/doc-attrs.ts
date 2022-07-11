/**
 * Toggles the site theme by adding or removing the "dark" class to the doc.
 * 
 * @param isLightTheme True if light theme, false if not
 */
export function toggleLightTheme(isLightTheme: boolean) {
  // Do NOT change "dark" to anything else -- Tailwind requires it
  if (isLightTheme) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
}