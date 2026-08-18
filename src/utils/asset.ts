/**
 * Utility to resolve asset paths with basePath for GitHub Pages static exports
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/Eiscaf-Bl-vand" : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
