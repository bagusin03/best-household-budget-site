// Data contoh keluarga Santoso (Nov 2026) — angka ilustratif yang realistis
// untuk rumah tangga 4 orang di kota. Pengguna menggantinya dengan angka sendiri.
export const HOUSEHOLD = {
  name: 'Keluarga Santoso',
  city: 'Bandung',
  members: 4,
  month: 'November 2026',
  monthKey: '2026-11',
};

export const CATEGORIES = [
  { id: 'makanan', name: 'Makanan & Belanja', color: '#c65d3a', budget: 3500000 },
  { id: 'transport', name: 'Transport', color: '#4f8a96', budget: 1200000 },
  { id: 'rumah', name: 'Rumah & Listrik', color: '#1d4d3b', budget: 1800000 },
  { id: 'pendidikan', name: 'Pendidikan Anak', color: '#e8a13a', budget: 1500000 },
  { id: 'kesehatan', name: 'Kesehatan', color: '#8a5f7d', budget: 600000 },
  { id: 'hiburan', name: 'Hiburan & Gaya Hidup', color: '#7fa88f', budget: 800000 },
  { id: 'tabungan', name: 'Tabungan & Dana Darurat', color: '#2e7d4f', budget: 2000000 },
  { id: 'lainnya', name: 'Lainnya', color: '#9a8f7a', budget: 400000 },
];

export const INCOME = [
  { id: 'gaji-ayah', label: 'Gaji Ayah (karyawan swasta)', amount: 8500000 },
  { id: 'gaji-ibu', label: 'Gaji Ibu (guru honorer + les)', amount: 4000000 },
];

export const SEED_TRANSACTIONS = [
  { id: 't01', date: '2026-11-01', kind: 'income', category: 'lainnya', note: 'Gaji Ayah — November', amount: 8500000 },
  { id: 't02', date: '2026-11-03', kind: 'income', category: 'lainnya', note: 'Gaji Ibu — November', amount: 4000000 },
  { id: 't03', date: '2026-11-02', kind: 'expense', category: 'makanan', note: 'Belanja mingguan pasar & supermarket', amount: 685000 },
  { id: 't04', date: '2026-11-04', kind: 'expense', category: 'rumah', note: 'Token listrik PLN 300 kWh', amount: 450000 },
  { id: 't05', date: '2026-11-05', kind: 'expense', category: 'pendidikan', note: 'SPP anak pertama', amount: 750000 },
  { id: 't06', date: '2026-11-06', kind: 'expense', category: 'transport', note: 'Bensin motor 2 minggu', amount: 220000 },
  { id: 't07', date: '2026-11-08', kind: 'expense', category: 'makanan', note: 'Belanja mingguan + gas LPG 3 kg', amount: 542000 },
  { id: 't08', date: '2026-11-09', kind: 'expense', category: 'kesehatan', note: 'BPJS Kesehatan 4 jiwa', amount: 140000 },
  { id: 't09', date: '2026-11-10', kind: 'expense', category: 'rumah', note: 'Internet rumah 50 Mbps', amount: 315000 },
  { id: 't10', date: '2026-11-12', kind: 'expense', category: 'pendidikan', note: 'Les matematika anak kedua', amount: 400000 },
  { id: 't11', date: '2026-11-14', kind: 'expense', category: 'makanan', note: 'Belanja mingguan + susu anak', amount: 612000 },
  { id: 't12', date: '2026-11-15', kind: 'expense', category: 'transport', note: 'Ojek online & parkir', amount: 185000 },
  { id: 't13', date: '2026-11-16', kind: 'expense', category: 'hiburan', note: 'Nonton bioskop keluarga', amount: 240000 },
  { id: 't14', date: '2026-11-18', kind: 'expense', category: 'makanan', note: 'Belanja mingguan + beras 10 kg', amount: 598000 },
  { id: 't15', date: '2026-11-20', kind: 'expense', category: 'rumah', note: 'Air PDAM + iuran RT/RW', amount: 185000 },
  { id: 't16', date: '2026-11-21', kind: 'expense', category: 'tabungan', note: 'Setoran tabungan pendidikan', amount: 1000000 },
  { id: 't17', date: '2026-11-22', kind: 'expense', category: 'lainnya', note: 'Servis motor + ganti oli', amount: 275000 },
  { id: 't18', date: '2026-11-24', kind: 'expense', category: 'hiburan', note: 'Makan di luar akhir pekan', amount: 320000 },
];

export const BILLS = [
  { id: 'b01', name: 'Listrik PLN', amount: 450000, dueDay: 5, note: 'Token / tagihan pascabayar', paid: true },
  { id: 'b02', name: 'Air PDAM', amount: 120000, dueDay: 10, note: 'Tagihan air bulanan', paid: true },
  { id: 'b03', name: 'Internet rumah 50 Mbps', amount: 315000, dueDay: 10, note: 'Tagihan internet', paid: true },
  { id: 'b04', name: 'BPJS Kesehatan (4 jiwa)', amount: 140000, dueDay: 10, note: 'Iuran kelas 3', paid: true },
  { id: 'b05', name: 'SPP anak pertama', amount: 750000, dueDay: 5, note: 'Sekolah dasar swasta', paid: true },
  { id: 'b06', name: 'Les matematika', amount: 400000, dueDay: 12, note: '2x seminggu', paid: false },
  { id: 'b07', name: 'Cicilan motor', amount: 685000, dueDay: 15, note: 'Angsuran ke-14 dari 35', paid: false },
  { id: 'b08', name: 'Iuran RT/RW + keamanan', amount: 65000, dueDay: 20, note: 'Iuran lingkungan', paid: false },
];

// Pemasukan vs pengeluaran Juni–November 2026 (juta rupiah, contoh keluarga yang sama).
export const MONTHS = [
  { key: '2026-06', label: 'Jun', income: 12500000, expense: 10840000 },
  { key: '2026-07', label: 'Jul', income: 12500000, expense: 12300000 },
  { key: '2026-08', label: 'Agu', income: 13000000, expense: 11250000 },
  { key: '2026-09', label: 'Sep', income: 12500000, expense: 10980000 },
  { key: '2026-10', label: 'Okt', income: 12500000, expense: 11420000 },
  { key: '2026-11', label: 'Nov', income: 12500000, expense: 6917000 }, // sama dengan total transaksi November di halaman Transaksi (data s.d. 24 Nov)
];

export function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
