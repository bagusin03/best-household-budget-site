// Beranda: ringkasan bulan berjalan untuk keluarga.
import { HOUSEHOLD, CATEGORIES, MONTHS } from './data.js';
import { rupiah, rupiahShort, pct, formatDate } from './format.js';
import { loadTransactions, loadBills, sumByKind, sumByCategory } from './store.js';
import { donutChart, hbar } from './charts.js';

export function renderDashboard() {
  const tx = loadTransactions();
  const bills = loadBills();
  const income = sumByKind(tx, 'income');
  const expense = sumByKind(tx, 'expense');
  const left = income - expense;
  const savingsTarget = 2500000;
  const saved = sumByCategory(tx, 'tabungan');
  const savedPct = Math.min(100, pct(saved, savingsTarget));
  const slices = CATEGORIES.map((c) => ({
    label: c.name,
    value: sumByCategory(tx, c.id),
    color: c.color,
  }));
  const topCats = [...slices].sort((a, b) => b.value - a.value).slice(0, 3);
  const maxCat = Math.max(...slices.map((s) => s.value), 1);
  const unpaid = bills.filter((b) => !b.paid);
  const unpaidTotal = unpaid.reduce((s, b) => s + b.amount, 0);
  const recent = [...tx].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const nov = MONTHS.find((m) => m.key === '2026-11');

  return `
  <h1>Beranda — ${HOUSEHOLD.month}</h1>
  <p class="lede">Halo, ${HOUSEHOLD.name} (${HOUSEHOLD.members} orang, ${HOUSEHOLD.city}). Ini kondisi uang keluarga bulan ini, data sampai 24 November 2026. Semua angka bisa Anda ubah di halaman Transaksi.</p>

  <section class="cards" aria-label="Ringkasan bulan ini">
    <div class="card good"><div class="label">Pemasukan</div><div class="amount">${rupiahShort(income)}</div><div class="sub">Gaji Ayah + Gaji Ibu</div></div>
    <div class="card warn"><div class="label">Pengeluaran</div><div class="amount">${rupiahShort(expense)}</div><div class="sub">Termasuk tabungan ${rupiahShort(saved)}</div></div>
    <div class="card"><div class="label">Sisa bulan ini</div><div class="amount">${rupiahShort(left)}</div><div class="sub">Belum dialokasikan — pindahkan ke tabungan sebelum habis</div></div>
    <div class="card accent"><div class="label">Target tabungan</div><div class="amount">${savedPct}% tercapai</div><div class="sub">${rupiahShort(saved)} dari ${rupiahShort(savingsTarget)} (20% pemasukan)</div></div>
  </section>

  <div class="grid2">
    <section class="panel" aria-label="Pengeluaran per kategori">
      <h2>Ke mana uang pergi?</h2>
      <div class="chart-wrap">${donutChart(slices)}</div>
      <div class="legend">${slices.filter((s) => s.value > 0).map((s) => `<span><span class="dot" style="background:${s.color}"></span>${s.label} — ${rupiahShort(s.value)}</span>`).join('')}</div>
      <p class="muted">Makanan masih yang terbesar (${pct(topCats[0].value, expense)}% dari pengeluaran), sama seperti pola umum rumah tangga Indonesia menurut Susenas BPS.</p>
    </section>

    <section class="panel" aria-label="Tagihan yang belum dibayar">
      <h2>Tagihan menanti: ${unpaid.length} tagihan</h2>
      <p>Total yang belum lunas: <strong>${rupiah(unpaidTotal)}</strong></p>
      ${unpaid.map((b) => `<div class="bar-row"><span>${b.name}</span><span class="muted">jatuh tempo tgl ${b.dueDay} Nov</span><span class="num">${rupiahShort(b.amount)}</span></div>`).join('')}
      <p><a class="btn-primary" href="#/tagihan" style="display:inline-block;text-decoration:none;padding:.55rem 1.15rem;border-radius:999px;">Lihat semua tagihan →</a></p>
      <div class="tip"><strong>Tips bulan ini:</strong> Juli lalu pengeluaran sempat melebihi pemasukan karena biaya masuk sekolah. Sisihkan dana pendidikan sedikit demi sedikit tiap bulan supaya Juli tidak mengejutkan lagi. <a href="#/bulanan">Lihat perbandingan 6 bulan →</a></div>
    </section>
  </div>

  <section class="panel" aria-label="Tiga kategori terbesar">
    <h2>Tiga kategori terbesar bulan ini</h2>
    ${topCats.map((c) => `<div class="bar-row"><span>${c.label}</span>${hbar(c.value, maxCat, c.color)}<span class="num">${rupiahShort(c.value)}</span></div>`).join('')}
    <p><a href="#/kategori">Buka rincian semua kategori →</a></p>
  </section>

  <section class="panel" aria-label="Transaksi terbaru">
    <h2>Transaksi terbaru</h2>
    <table>
      <thead><tr><th>Tanggal</th><th>Keterangan</th><th class="num">Jumlah</th></tr></thead>
      <tbody>
        ${recent.map((t) => `<tr class="${t.kind}"><td>${formatDate(t.date)}</td><td>${t.note}</td><td class="num">${t.kind === 'income' ? '+' : '−'} ${rupiah(t.amount)}</td></tr>`).join('')}
      </tbody>
    </table>
    <p><a href="#/transaksi">Tambah atau ubah transaksi →</a> &nbsp;·&nbsp; <a href="#/perencana">Rencanakan anggaran 50/30/20 →</a></p>
  </section>

  <div class="note"><strong>Catatan:</strong> November baru berjalan sampai tanggal 24 (${rupiah(nov.expense)} dari target pengeluaran ${rupiah(11000000)}). Sisa ${rupiah(left)} sebaiknya langsung dialokasikan — lihat kalkulator di <a href="#/perencana">Perencana</a>.</div>`;
}
