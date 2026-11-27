// Penyimpanan lokal: transaksi dan status tagihan tersimpan di localStorage,
// jadi keluarga bisa menambah, mengedit, dan menghapus tanpa akun apa pun.
import { SEED_TRANSACTIONS, BILLS } from './data.js';

const TX_KEY = 'ruang-anggaran-transaksi-v1';
const BILL_KEY = 'ruang-anggaran-tagihan-v1';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function loadTransactions() {
  return readJson(TX_KEY, SEED_TRANSACTIONS);
}

export function saveTransactions(list) {
  localStorage.setItem(TX_KEY, JSON.stringify(list));
}

export function loadBills() {
  return readJson(BILL_KEY, BILLS);
}

export function saveBills(list) {
  localStorage.setItem(BILL_KEY, JSON.stringify(list));
}

export function sumByKind(list, kind) {
  return list.filter((t) => t.kind === kind).reduce((s, t) => s + t.amount, 0);
}

export function sumByCategory(list, categoryId) {
  return list
    .filter((t) => t.kind === 'expense' && t.category === categoryId)
    .reduce((s, t) => s + t.amount, 0);
}

export function newTransactionId(list) {
  return 't' + String(Date.now()).slice(-8) + String(list.length + 1);
}
