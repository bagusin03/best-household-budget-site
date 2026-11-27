// Perbandingan Bulanan: pemasukan vs pengeluaran Juni–November 2026.
import { MONTHS } from './data.js';
import { rupiah, rupiahShort, pct } from './format.js';
import { groupedBarChart, savingsLineChart } from './charts.js';

export function renderMonthly() {
  const rows = MONTHS.map((m) => ({ ...m, left: m.income - m.expense, rate: pct(m.income - m.expense, m.income) }));
  const best = [...rows].sort((a, b) => b.left - a.left)[0];
  const worst = [...rows].sort((a, b) => a.left - b.left)[0];
  const avgExpense = Math.round(rows.reduce((s, m) => s + m.expense, 0) / rows.length);
  const avgLeft = Math.round(rows.reduce((s, m) => s + m.left, 0) / rows.length);

  return `
  <h1>Perbandingan Bulanan</h1>
  <p class="lede">Enam bulan terakhir keluarga Santoso, Juni–November 2026. Bulan mana yang paling hemat, dan bulan mana yang bocor? Polanya terlihat jelas di grafik.</p>

  <section class="cards" aria-label="Rata-rata enam bulan">
    <div class="card"><div class="label">Rata-rata pengeluaran</div><div class="amount">${rupiahShort(avgExpense)}</div><div class="sub">per bulan, 6 bulan terakhir</div></div>
    <div class="card good"><div class="label">Rata-rata sisa</div><div class="amount">${rupiahShort(avgLeft)}</div><div class="sub">per bulan — ${pct(avgLeft, 12500000)}% pemasukan</div></div>
    <div class="card"><div class="label">Bulan paling hemat</div><div class="amount">${best.label} ’26</div><div class="sub">Sisa ${rupiahShort(best.left)} (${best.rate}%)</div></div>
    <div class="card warn"><div class="label">Bulan paling boros</div><div class="amount">${worst.label} ’26</div><div class="sub">Sisa ${rupiahShort(worst.left)} (${worst.rate}%)</div></div>
  </section>

  <section class="panel">
    <h2>Pemasukan vs pengeluaran</h2>
    <div class="chart-wrap">${groupedBarChart(MONTHS)}</div>
    <div class="legend"><span><span class="dot" style="background:#1d4d3b"></span>Pemasukan</span><span><span class="dot" style="background:#e8a13a"></span>Pengeluaran</span></div>
    <p><strong>Juli 2026</strong> hampir habis: pengeluaran Rp 12,3 jt karena biaya masuk sekolah dan seragam baru. Itu pengeluaran tahunan yang bisa diprediksi — sisihkan Rp 200 rb per bulan dari Januari supaya Juli tidak terasa.</p>
  </section>

  <section class="panel">
    <h2>Sisa uang tiap bulan</h2>
    <div class="chart-wrap">${savingsLineChart(MONTHS)}</div>
    <p class="muted">Garis di atas nol berarti bulan itu menabung. November (sampai tanggal 24) terlihat paling besar karena sebagian tagihan akhir bulan belum jatuh tempo — jangan terkecoh, cek lagi di akhir bulan.</p>
  </section>

  <section class="panel">
    <h2>Tabel per bulan</h2>
    <table>
      <thead><tr><th>Bulan</th><th class="num">Pemasukan</th><th class="num">Pengeluaran</th><th class="num">Sisa</th><th class="num">Tingkat tabungan</th></tr></thead>
      <tbody>
        ${rows.map((m) => `<tr><td><strong>${m.label} 2026</strong></td><td class="num">${rupiah(m.income)}</td><td class="num">${rupiah(m.expense)}</td><td class="num">${rupiah(m.left)}</td><td class="num">${m.rate}%</td></tr>`).join('')}
      </tbody>
    </table>
    <p class="muted">Tingkat tabungan yang sehat untuk keluarga umumnya 20% pemasukan. Rata-rata keluarga contoh di sini ${pct(avgLeft, 12500000)}% — di atas target, tapi November belum selesai.</p>
  </section>`;
}
