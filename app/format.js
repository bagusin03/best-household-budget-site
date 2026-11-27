// Format angka dan tanggal ke Bahasa Indonesia.
export function rupiah(n) {
  return 'Rp ' + Math.round(n).toLocaleString('id-ID');
}

export function rupiahShort(n) {
  if (Math.abs(n) >= 1000000) return 'Rp ' + (n / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + ' jt';
  if (Math.abs(n) >= 1000) return 'Rp ' + Math.round(n / 1000) + ' rb';
  return rupiah(n);
}

export function pct(part, whole) {
  if (!whole) return 0;
  return Math.round((part / whole) * 100);
}

const MONTH_NAMES = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTH_NAMES[m - 1]} ${y}`;
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
