// Pemasukan & Pengeluaran: tambah, edit, hapus, dan saring transaksi.
// Semua perubahan tersimpan di localStorage dan langsung ter-render ulang.
import { CATEGORIES, categoryById } from './data.js';
import { rupiah, formatDate, escapeHtml } from './format.js';
import { loadTransactions, saveTransactions, sumByKind, newTransactionId } from './store.js';

let filterKind = 'all';
let filterCat = 'all';
let editingId = null;

export function renderTransactions() {
  const tx = loadTransactions();
  const income = sumByKind(tx, 'income');
  const expense = sumByKind(tx, 'expense');
  const shown = [...tx]
    .filter((t) => (filterKind === 'all' ? true : t.kind === filterKind))
    .filter((t) => (filterCat === 'all' ? true : t.category === filterCat))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  const editing = editingId ? tx.find((t) => t.id === editingId) : null;

  return `
  <h1>Pemasukan &amp; Pengeluaran</h1>
  <p class="lede">Catat setiap uang masuk dan keluar. Daftar di bawah ini tersimpan di peramban Anda — tambah, ubah, atau hapus kapan saja, dan semua halaman lain ikut berubah.</p>

  <section class="cards" aria-label="Total">
    <div class="card good"><div class="label">Total masuk</div><div class="amount">${rupiah(income)}</div><div class="sub">${tx.filter((t) => t.kind === 'income').length} pemasukan</div></div>
    <div class="card warn"><div class="label">Total keluar</div><div class="amount">${rupiah(expense)}</div><div class="sub">${tx.filter((t) => t.kind === 'expense').length} pengeluaran</div></div>
    <div class="card"><div class="label">Selisih</div><div class="amount">${rupiah(income - expense)}</div><div class="sub">Sisa bulan November 2026</div></div>
  </section>

  <section class="panel">
    <h2>${editing ? 'Ubah transaksi' : 'Tambah transaksi baru'}</h2>
    <form id="tx-form" class="formgrid">
      <div><label for="f-date">Tanggal</label><input id="f-date" name="date" type="date" value="${editing ? editing.date : '2026-11-25'}" required></div>
      <div><label for="f-kind">Jenis</label><select id="f-kind" name="kind"><option value="expense" ${editing && editing.kind === 'expense' ? 'selected' : ''}>Pengeluaran</option><option value="income" ${editing && editing.kind === 'income' ? 'selected' : ''}>Pemasukan</option></select></div>
      <div><label for="f-cat">Kategori</label><select id="f-cat" name="category">${CATEGORIES.map((c) => `<option value="${c.id}" ${editing && editing.category === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select></div>
      <div><label for="f-amount">Jumlah (Rp)</label><input id="f-amount" name="amount" type="number" min="1000" step="500" value="${editing ? editing.amount : ''}" placeholder="contoh: 250000" required></div>
      <div class="full"><label for="f-note">Keterangan</label><input id="f-note" name="note" type="text" maxlength="80" value="${editing ? escapeHtml(editing.note) : ''}" placeholder="contoh: Belanja mingguan di pasar" required></div>
      <div class="full row">
        <button class="btn-primary" type="submit">${editing ? 'Simpan perubahan' : 'Tambah transaksi'}</button>
        ${editing ? '<button class="btn-ghost" type="button" id="cancel-edit">Batal</button>' : ''}
      </div>
    </form>
  </section>

  <section class="panel">
    <h2>Daftar transaksi (${shown.length})</h2>
    <div class="filters">
      <label class="muted" for="flt-kind">Jenis</label>
      <select id="flt-kind"><option value="all">Semua</option><option value="income" ${filterKind === 'income' ? 'selected' : ''}>Pemasukan</option><option value="expense" ${filterKind === 'expense' ? 'selected' : ''}>Pengeluaran</option></select>
      <label class="muted" for="flt-cat">Kategori</label>
      <select id="flt-cat"><option value="all">Semua kategori</option>${CATEGORIES.map((c) => `<option value="${c.id}" ${filterCat === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}</select>
    </div>
    <table>
      <thead><tr><th>Tanggal</th><th>Keterangan</th><th>Kategori</th><th class="num">Jumlah</th><th>Aksi</th></tr></thead>
      <tbody>
        ${shown.map((t) => `<tr class="${t.kind}">
          <td>${formatDate(t.date)}</td>
          <td>${escapeHtml(t.note)}</td>
          <td><span class="tag">${categoryById(t.category).name}</span></td>
          <td class="num">${t.kind === 'income' ? '+' : '−'} ${rupiah(t.amount)}</td>
          <td><button class="btn-ghost btn-small" data-edit="${t.id}">Ubah</button> <button class="btn-danger btn-small" data-delete="${t.id}">Hapus</button></td>
        </tr>`).join('') || '<tr><td colspan="5">Tidak ada transaksi yang cocok dengan saringan.</td></tr>'}
      </tbody>
    </table>
  </section>`;
}

export function bindTransactions(rerender) {
  const form = document.getElementById('tx-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const amount = Math.round(Number(data.get('amount')));
      if (!amount || amount <= 0) return;
      const list = loadTransactions();
      const record = {
        id: editingId || newTransactionId(list),
        date: String(data.get('date')),
        kind: String(data.get('kind')),
        category: String(data.get('category')),
        note: String(data.get('note')).trim(),
        amount,
      };
      if (editingId) {
        const i = list.findIndex((t) => t.id === editingId);
        if (i >= 0) list[i] = record;
        editingId = null;
      } else {
        list.push(record);
      }
      saveTransactions(list);
      rerender();
    });
  }
  const cancel = document.getElementById('cancel-edit');
  if (cancel) cancel.addEventListener('click', () => { editingId = null; rerender(); });
  const fk = document.getElementById('flt-kind');
  if (fk) fk.addEventListener('change', () => { filterKind = fk.value; rerender(); });
  const fc = document.getElementById('flt-cat');
  if (fc) fc.addEventListener('change', () => { filterCat = fc.value; rerender(); });
  document.querySelectorAll('[data-edit]').forEach((b) => b.addEventListener('click', () => { editingId = b.getAttribute('data-edit'); rerender(); }));
  document.querySelectorAll('[data-delete]').forEach((b) => b.addEventListener('click', () => {
    const id = b.getAttribute('data-delete');
    saveTransactions(loadTransactions().filter((t) => t.id !== id));
    if (editingId === id) editingId = null;
    rerender();
  }));
}
