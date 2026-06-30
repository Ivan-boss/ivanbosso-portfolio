// ╔══════════════════════════════════════════════════════════════════╗
// ║  i18n — cœur du multilingue (FR par défaut, EN sous /en/).         ║
// ║  La locale est déduite de l'URL : tout composant peut appeler      ║
// ║  getLocale(Astro.url) sans qu'on ait à lui passer de prop.         ║
// ╚══════════════════════════════════════════════════════════════════╝

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

/** Déduit la langue depuis l'URL : /en/... → 'en', sinon 'fr'. */
export function getLocale(url: URL): Locale {
  const seg = url.pathname.split('/')[1];
  return seg === 'en' ? 'en' : 'fr';
}

/** Préfixe un chemin interne pour la locale cible (FR = pas de préfixe). */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'fr') return clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

/** Chemin de la page COURANTE dans l'autre langue (pour le bouton drapeau). */
export function alternatePath(url: URL, target: Locale): string {
  let p = url.pathname;
  if (p.startsWith('/en/')) p = p.slice(3);
  else if (p === '/en') p = '/';
  if (!p.startsWith('/')) p = '/' + p;
  return localizePath(p, target);
}
