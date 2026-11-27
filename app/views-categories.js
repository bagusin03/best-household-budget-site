// Kategori: donat + anggaran vs realisasi tiap kategori.
import { CATEGORIES } from './data.js';
import { rupiah, rupiahShort, pct } from './format.js';
import { loadTransactions, sumByCategory, sumByKind } from './store.js';
import { donutChart } from './charts.js';

export function renderCategories() {
  const tx = loadTransactions();
  const expense = sumByKind(tx, 'expense');
  const rows = CATEGORIES.map((c) => {
    const spent = sumByCategory(tx, c.id);
    return { ...c, spent, over: spent - c.budget, usedPct: pct(spent, c.budget) };
  });
  const slices = rows.map((r) => ({ label: r.name, value: r.spent, color: r.color }));
  const maxSpent = Math.max(...rows.map((r) => r.spent), 1);
  const overList = rows.filter((r) => r.over > 0);

  return `
  <h1>Kategori Pengeluaran</h1>
  <p class="lede">Delapan kantong untuk satu bulan. Setiap kategori punya anggaran sendiri — bar di bawah menunjukkan berapa yang sudah terpakai dari anggarannya sampai 24 November 2026.</p>

  <div class="grid2">
    <section class="panel">
      <h2>Donat pengeluaran — ${rupiahShort(expense)}</h2>
      <div class="chart-wrap center">${donutChart(slices, 260)}</div>
      <div class="legend">${rows.filter((r) => r.spent > 0).map((r) => `<span><span class="dot" style="background:${r.color}"></span>${r.name} ${pct(r.spent, expense)}%</span>`).join('')}</div>
    </section>
    <section class="panel">
      <h2>Yang perlu diperhatikan</h2>
      ${overList.length ? `<p><strong>${overList.map((r) => r.name).join(', ')}</strong> sudah melewati anggaran bulan ini.</p>` : '<p>Bagus — belum ada kategori yang melewati anggarannya.</p>'}
      <div class="tip"><strong>Cara membaca donat:</strong> makanan, rumah, dan pendidikan adalah kebutuhan — wajar kalau ketiganya paling besar. Hiburan dan gaya hidup sebaiknya tidak lebih dari 10% pengeluaran. Bulan ini hiburan ${pct(rows.find((r) => r.id === 'hiburan').spent, expense)}% — masih aman.</div>
      <p class="muted">Anggaran di sini disusun dari pola belanja keluarga contoh. Sesuaikan anggarannya dengan pemasukan keluarga Anda di halaman Perencana.</p>
      <p><a class="btn-primary" href="#/perencana" style="display:inline-block;text-decoration:none;padding:.55rem 1.15rem;border-radius:999px;">Atur anggaran 50/30/20 →</a></p>
    </section>
  </div>

  <section class="panel">
    <h2>Anggaran vs realisasi</h2>
    ${rows.map((r) => {
      const barPct = Math.min(100, pct(r.spent, r.budget));
      const overBar = r.spent > r.budget ? `<span class="over" style="left:${barPct}%;width:${Math.min(100 - barPct, 100)}%"></span>` : '';
      return `<div class="bar-row">
        <span><span class="dot" style="background:${r.color};display:inline-block;width:.7rem;height:.7rem;border-radius:3px;margin-right:.35rem;"></span>${r.name}</span>
        <span><span class="bar-track"><span style="width:${barPct}%;background:${r.color}"></span>${overBar}</span><span class="muted">${r.usedPct}% dari anggaran ${rupiahShort(r.budget)}</span></span>
        <span class="num">${rupiahShort(r.spent)}${r.over > 0 ? ` <span style="color:#b3402e">(+${rupiahShort(r.over)})</span>` : ''}</span>
      </div>`;
    }).join('')}
    <p class="muted">Garis merah miring pada bar berarti pengeluaran sudah melewati anggaran kategori itu.</p>
  </section>`;
}
