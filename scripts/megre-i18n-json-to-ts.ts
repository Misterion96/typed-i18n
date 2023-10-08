import { Dirent, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';

const PACKAGE_ROOT: string = resolve(__dirname, '..');
const ASSETS_PATH: string = resolve(PACKAGE_ROOT, 'assets/i18n');
const I18N_DB_PATH: string = resolve(PACKAGE_ROOT, 'projects/typed-transloco-lib/src');

readdir(ASSETS_PATH, { withFileTypes: true }).then(files => {
  const db = files
      // en.json etc.
    .filter((f: Dirent) => f.isFile() && f.name.endsWith('.json'))
    .reduce<Record<string, unknown>>((acc, { name }) => {
      const lang: string = name.split('.')[0];
      const data: string = readFileSync( join(ASSETS_PATH, name), { encoding: 'utf8' });

      acc[lang] = JSON.parse(data);

      return acc;
    }, {});

  if (!existsSync(I18N_DB_PATH)) {
    mkdirSync(I18N_DB_PATH, { recursive: true });
  }

  writeFileSync(`${I18N_DB_PATH}/db/i18n.db.ts`, `export const TRANSLATE_DB = ${JSON.stringify(db, null, 2)} as const`);
  // cleanUp();
});

function cleanUp(): void {
  rmSync(ASSETS_PATH, { recursive: true, force: true });
}
