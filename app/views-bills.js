// Tagihan & Rutin: daftar tagihan berulang, jatuh tempo, tandai lunas.
import { rupiah, rupiahShort } from './format.js';
import { loadBills, saveBills } from './store.js';

export function renderBills() {
  const bills = [...loadBills()].sort((a, b) => a.dueDay - b.dueDay);
  const total = bills.reduce((s, b) => s + b.amount, 0);
  const unpaid = bills.filter((b) => !b.paid);
  const unpaidTotal = unpaid.reduce((s, b) => s + b.amount, 0);
  const paidTotal = total - unpaidTotal;

  return `
  <h1>Tagihan &amp; Rutin</h1>
  <p class="lede">Semua tagihan yang datang tiap bulan, dalam satu daftar. Tandai yang sudah dibayar supaya tidak ada yang terlewat — statusnya tersimpan di peramban Anda.</p>

  <section class="cards" aria-label="Ringkasan tagihan">
    <div class="card"><div class="label">Total tagihan / bulan</div><div class="amount">${rupiahShort(total)}</div><div class="sub">${bills.length} tagihan rutin</div></div>
    <div class="card good"><div class="label">Sudah dibayar</div><div class="amount">${rupiahShort(paidTotal)}</div><div class="sub">${bills.length - unpaid.length} dari ${bills.length} tagihan</div></div>
    <div class="card warn"><div class="label">Belum dibayar</div><div class="amount">${rupiahShort(unpaidTotal)}</div><div class="sub">${unpaid.length} tagihan menanti</div></div>
    <div class="card accent"><div class="label">Porsi dari pemasukan</div><div class="amount">${Math.round((total / 12500000) * 100)}%</div><div class="sub">Dari pemasukan Rp 12,5 jt</div></div>
  </section>

  <section class="panel">
    <h2>Daftar tagihan November 2026</h2>
    <table>
      <thead><tr><th>Tagihan</th><th>Keterangan</th><th>Jatuh tempo</th><th class="num">Jumlah</th><th>Status</th><th>Aksi</th></tr></thead>
      <tbody>
        ${bills.map((b) => `<tr>
          <td><strong>${b.name}</strong></td>
          <td>${b.note}</td>
          <td>Tanggal ${b.dueDay}</td>
          <td class="num">${rupiah(b.amount)}</td>
          <td>${b.paid ? '<span class="tag lunas">Lunas</span>' : '<span class="tag jatuh-tempo">Belum dibayar</span>'}</td>
          <td>${b.paid ? `<button class="btn-ghost btn-small" data-unpay="${b.id}">Batalkan lunas</button>` : `<button class="btn-primary btn-small" data-pay="${b.id}">Tandai lunas</button>`}</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </section>

  <div class="grid2">
    <section class="panel">
      <h2>Cara mengatur tagihan tanpa stres</h2>
      <p>Bayar tagihan besar — listrik, SPP, cicilan — begitu gajian masuk, bukan menunggu tanggal jatuh tempo. Uang yang tersisa setelah itu baru dibagi untuk belanja harian.</p>
      <p>Tagihan keluarga contoh ini totalnya <strong>${rupiah(total)}</strong> per bulan, atau sekitar ${Math.round((total / 12500000) * 100)}% dari pemasukan. Kalau tagihan Anda di atas 40% pemasukan, pertimbangkan menegosiasikan ulang paket internet atau memindahkan cicilan.</p>
    </section>
    <section class="panel">
      <h2>Pengingat jatuh tempo</h2>
      <p>Yang paling dekat: <strong>Les matematika</strong> (Rp 400 rb, tanggal 12), <strong>Cicilan motor</strong> (Rp 685 rb, tanggal 15), dan <strong>Iuran RT/RW</strong> (Rp 65 rb, tanggal 20).</p>
      <p class="muted">Situs ini tidak mengirim pengingat — cek daftar ini tiap awal bulan, atau catat tanggalnya di kalender ponsel Anda.</p>
    </section>
  </div>`;
}

export function bindBills(rerender) {
  document.querySelectorAll('[data-pay]').forEach((b) => b.addEventListener('click', () => {
    const list = loadBills();
    const item = list.find((x) => x.id === b.getAttribute('data-pay'));
    if (item) { item.paid = true; saveBills(list); rerender(); }
  }));
  document.querySelectorAll('[data-unpay]').forEach((b) => b.addEventListener('click', () => {
    const list = loadBills();
    const item = list.find((x) => x.id === b.getAttribute('data-unpay'));
    if (item) { item.paid = false; saveBills(list); rerender(); }
  }));
}
