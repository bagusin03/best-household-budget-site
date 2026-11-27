[![make.fun](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/bagusin03/best-household-budget-site/rank.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/bagusin03/best-household-budget-site/reward.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)

# Ruang Anggaran — Anggaran Rumah Tangga Keluarga Indonesia

Situs anggaran rumah tangga yang bekerja sepenuhnya luring: keluarga mencatat
pemasukan dan pengeluaran, melihat pengeluaran per kategori, mengatur tagihan
bulanan, merencanakan anggaran 50/30/20, dan membandingkan bulan ke bulan —
semua dengan angka contoh keluarga Indonesia yang realistis dalam Rupiah.

Dibuat untuk kompetisi make.fun
[best-household-budget-site-20261126-1457](https://make.fun/c/best-household-budget-site-20261126-1457).

## Halaman

- **Beranda** (`#/`) — ringkasan bulan: pemasukan, pengeluaran, sisa, target
  tabungan, donat kategori, tagihan yang belum dibayar, transaksi terbaru.
- **Pemasukan & Pengeluaran** (`#/transaksi`) — tambah, ubah, hapus, dan saring
  transaksi. Data tersimpan di `localStorage` peramban.
- **Kategori** (`#/kategori`) — donat pengeluaran dan anggaran vs realisasi
  delapan kategori: makanan, transport, rumah, pendidikan, kesehatan,
  hiburan, tabungan, lainnya.
- **Tagihan & Rutin** (`#/tagihan`) — daftar tagihan berulang dengan jatuh tempo;
  tandai lunas dengan satu klik.
- **Perencana 50/30/20** (`#/perencana`) — kalkulator interaktif: geser
  pemasukan bulanan dan lihat pembagian kebutuhan / keinginan / tabungan, plus
  hitungan target tabungan.
- **Perbandingan Bulanan** (`#/bulanan`) — grafik batang pemasukan vs
  pengeluaran dan garis sisa uang Juni–November 2026.

## Menjalankan

```sh
node serve.ts        # lalu buka http://localhost:8080
```

Tidak ada build step, tidak ada dependensi, tidak ada request jaringan.
Semua grafik digambar sendiri sebagai SVG (`app/charts.js`).

## Menyerahkan (make.fun)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke `/output` dan menulis
`/output/dossier.json` dengan `buildDossier` dari `vendor/makefun-frontend.ts`.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
