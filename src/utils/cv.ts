import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '../i18n/config';

/**
 * Retourne le chemin public du CV pour la langue demandée.
 * Heuristique : un PDF dont le nom contient « _en » / « -en » / « english » = CV anglais ;
 * sinon = CV français. À défaut de correspondance, on prend le 1er PDF trouvé.
 *
 * Exécuté au build / côté serveur uniquement — jamais côté client.
 * → Déposez vos PDF dans public/cv/, les boutons « Télécharger » s'activent tout seuls.
 */
export function getCvPath(locale: Locale = 'fr'): string | null {
  try {
    const dir = path.join(process.cwd(), 'public', 'cv');
    const pdfs = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf')).sort();
    if (!pdfs.length) return null;
    const isEn = (f: string) => /(?:^|[_\- ])en(?:[_\- .])|english|_en_|-en-/i.test(f);
    const pick = locale === 'en' ? pdfs.find(isEn) : pdfs.find((f) => !isEn(f));
    const file = pick ?? pdfs[0];
    return `/cv/${encodeURIComponent(file)}`;
  } catch {
    return null;
  }
}
