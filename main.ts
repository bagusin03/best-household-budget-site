// Ruang Anggaran — entrypoint make.fun (Node 22, stdlib only).
//
// Program ini menyerahkan situsnya: menyalin app/ dan screenshots/ dari
// samping file ini ke /output, lalu menulis /output/dossier.json dengan
// buildDossier dari vendor/makefun-frontend.ts (salinan kit, tanpa diubah).
// Dijalankan dua kali oleh grader; kedua run harus menulis byte yang sama,
// jadi tidak ada timestamp, angka acak, atau urutan direktori yang tak tentu.
// buildDossier mengurutkan file yang ia baca, dan cpSync menyalin pohon apa
// adanya — tidak ada langkah di sini yang bergantung pada waktu atau acak.
//
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// Batas gate (reference/gate.json): text_max_bytes membentuk byte dossier;
// batas lain menolak entry yang scorer juga akan tolak (lebih dari 4
// screenshot atau satu di atas 256 KiB; app/ lebih dari 993 file/dir atau
// 16 MiB — app/ berbagi cap 1000 entri /output dengan screenshots/ dan
// dossier.json, jadi sisakan ruang). Angka-angka ini disalin dari kit
// kompetisi ini, bukan dari kompetisi lain.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
