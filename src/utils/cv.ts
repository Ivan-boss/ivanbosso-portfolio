import fs from 'node:fs';
import path from 'node:path';
import type { Locale } from '../i18n/config';
import { CV_FILES } from '../config/site';

/**
 * Retourne le chemin public du CV pour la langue demandée.
 *
 * Le choix est DÉCLARÉ dans src/config/site.ts (`CV_FILES`), jamais deviné :
 * une détection implicite (tri alphabétique + heuristique sur le nom) a déjà
 * fait servir le CV « Développeur Full-Stack » comme CV français sur un site
 * positionné Data/IA, sans que rien ne casse visiblement.
 *
 * Si le fichier déclaré est absent, on prévient BRUYAMMENT au build puis on
 * retombe sur l'ancienne heuristique — mieux vaut un CV que pas de CV, mais
 * le message doit être impossible à rater dans les logs Cloudflare.
 *
 * Exécuté au build / côté serveur uniquement — jamais côté client.
 */

const CV_DIR = path.join(process.cwd(), 'public', 'cv');

function listPdfs(): string[] {
  try {
    return fs.readdirSync(CV_DIR).filter((f) => f.toLowerCase().endsWith('.pdf'));
  } catch {
    return [];
  }
}

/** Ancien comportement, conservé uniquement comme filet de secours. */
function guess(pdfs: string[], locale: Locale): string | undefined {
  const isEn = (f: string) => /(?:^|[_\- ])en(?:[_\- .])|english|_en_|-en-/i.test(f);
  const sorted = [...pdfs].sort();
  const pick = locale === 'en' ? sorted.find(isEn) : sorted.find((f) => !isEn(f));
  return pick ?? sorted[0];
}

export function getCvPath(locale: Locale = 'fr'): string | null {
  const pdfs = listPdfs();
  if (!pdfs.length) return null;

  const declared = CV_FILES[locale];

  if (declared) {
    if (pdfs.includes(declared)) return `/cv/${encodeURIComponent(declared)}`;
    console.warn(
      `\n⚠️  [cv] CV_FILES.${locale} = « ${declared} » est introuvable dans public/cv/.\n` +
        `    Présents : ${pdfs.map((f) => `« ${f} »`).join(', ')}\n` +
        `    → corrigez src/config/site.ts (CV_FILES) ou déposez le fichier manquant.\n` +
        `    En attendant, retour à la détection automatique : le CV servi peut être le mauvais.\n`
    );
  } else {
    console.warn(
      `\n⚠️  [cv] Aucun CV déclaré pour « ${locale} » dans CV_FILES (src/config/site.ts).\n` +
        `    → détection automatique, le CV servi peut être le mauvais.\n`
    );
  }

  const fallback = guess(pdfs, locale);
  return fallback ? `/cv/${encodeURIComponent(fallback)}` : null;
}
