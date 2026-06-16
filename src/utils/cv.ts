import fs from 'node:fs';
import path from 'node:path';

/**
 * Retourne le chemin public du CV : le 1er fichier PDF trouvé dans public/cv/,
 * QUEL QUE SOIT son nom. Renvoie null si aucun PDF n'est présent.
 *
 * Exécuté au build (site statique) / côté serveur uniquement — jamais côté client.
 * → Tu déposes ton PDF dans public/cv/, le bouton « Télécharger » s'active tout seul.
 */
export function getCvPath(): string | null {
  try {
    const dir = path.join(process.cwd(), 'public', 'cv');
    const pdf = fs
      .readdirSync(dir)
      .filter((f) => f.toLowerCase().endsWith('.pdf'))
      .sort()[0];
    return pdf ? `/cv/${encodeURIComponent(pdf)}` : null;
  } catch {
    return null;
  }
}
