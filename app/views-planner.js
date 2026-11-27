// Perencana: kalkulator anggaran 50/30/20 yang interaktif + target tabungan.
import { rupiah, rupiahShort } from './format.js';

let income = 12500000;
let needPct = 50;
let wantPct = 30;
let savePct = 20;
let goalAmount = 12000000;
let goalMonths = 12;

function split() {
  return {
    need: Math.round((income * needPct) / 100),
    want: Math.round((income * wantPct) / 100),
    save: Math.round((income * savePct) / 100),
  };
}

export function renderPlanner() {
  const s = split();
  const monthlyGoal = Math.ceil(goalAmount / goalMonths / 1000) * 1000;
  const goalShare = Math.round((monthlyGoal / income) * 100);

  return `
  <h1>Perencana Anggaran 50/30/20</h1>
  <p class="lede">Aturan praktis yang mudah diingat: <strong>50%</strong> pemasukan untuk kebutuhan, <strong>30%</strong> untuk keinginan, <strong>20%</strong> untuk tabungan dan membayar utang. Geser angka di bawah dan lihat pembagiannya berubah langsung.</p>

  <section class="panel">
    <h2>1. Pemasukan bulanan keluarga</h2>
    <div class="row">
      <input type="range" id="pl-income" min="3000000" max="30000000" step="250000" value="${income}" style="flex:1;min-width:200px" aria-label="Pemasukan bulanan">
      <span class="kpi-big" id="pl-income-label">${rupiahShort(income)}</span>
    </div>
    <p class="muted">Contoh: Rp 12,5 jt (gaji Ayah Rp 8,5 jt + gaji Ibu Rp 4 jt). Ketik angka sendiri di bawah kalau mau tepat.</p>
    <div class="row"><label for="pl-income-num" style="margin:0">Atau ketik:</label><input id="pl-income-num" type="number" min="1000000" step="100000" value="${income}" style="width:220px"> <span class="muted">rupiah / bulan</span></div>
  </section>

  <section class="panel">
    <h2>2. Pembagian 50/30/20</h2>
    <div class="bucket">
      <h3>Kebutuhan — ${needPct}% <span class="pct">${rupiah(s.need)}</span></h3>
      <div class="progress"><span style="width:${needPct * 2}%;background:#1d4d3b"></span></div>
      <p class="muted">Makan, listrik, air, transport, SPP, BPJS. Kalau kebutuhan Anda di atas 60%, kurangi dulu keinginan — bukan tabungan.</p>
    </div>
    <div class="bucket">
      <h3>Keinginan — ${wantPct}% <span class="pct">${rupiah(s.want)}</span></h3>
      <div class="progress"><span style="width:${wantPct * 2}%;background:#e8a13a"></span></div>
      <p class="muted">Makan di luar, hiburan, langganan, belanja gaya hidup. Ini kantong yang paling mudah dipangkas saat bulan menipis.</p>
    </div>
    <div class="bucket">
      <h3>Tabungan &amp; utang — ${savePct}% <span class="pct">${rupiah(s.save)}</span></h3>
      <div class="progress"><span style="width:${savePct * 2}%;background:#2e7d4f"></span></div>
      <p class="muted">Dana darurat dulu (3–6 bulan pengeluaran), lalu dana pendidikan, lalu cicilan. Bayar diri sendiri begitu gajian masuk.</p>
    </div>
    <div class="row">
      <button class="btn-ghost btn-small" id="pl-preset-503020">50 / 30 / 20</button>
      <button class="btn-ghost btn-small" id="pl-preset-602010">60 / 20 / 20</button>
      <button class="btn-ghost btn-small" id="pl-preset-403030">40 / 30 / 30</button>
      <span class="muted">Preset cepat — sesuaikan dengan kondisi keluarga Anda.</span>
    </div>
  </section>

  <section class="panel">
    <h2>3. Target tabungan Anda</h2>
    <form class="formgrid" id="goal-form">
      <div><label for="goal-amount">Target (Rp)</label><input id="goal-amount" type="number" min="100000" step="100000" value="${goalAmount}"></div>
      <div><label for="goal-months">Dalam berapa bulan?</label><input id="goal-months" type="number" min="1" max="60" value="${goalMonths}"></div>
    </form>
    <p>Untuk mencapai <strong>${rupiah(goalAmount)}</strong> dalam <strong>${goalMonths} bulan</strong>, sisihkan <span class="kpi-big">${rupiah(monthlyGoal)}</span> per bulan — sekitar <strong>${goalShare}%</strong> dari pemasukan Anda.</p>
    <p class="muted">Contoh: dana darurat Rp 12 jt (sekitar 2 bulan pengeluaran keluarga contoh) dalam 12 bulan = Rp 1 jt per bulan. Kalau ${goalShare}% terasa berat, panjangkan waktunya — yang penting mulai.</p>
  </section>

  <div class="note"><strong>Cek dengan angka nyata keluarga contoh:</strong> kebutuhan bulan ini Rp 5,08 jt (41%), keinginan Rp 0,84 jt (7%), tabungan Rp 1 jt (8%) — total Rp 6,92 jt dari Rp 12,5 jt. Masih ada sisa Rp 5,58 jt yang belum dialokasikan: pindahkan sebagian ke tabungan sebelum akhir bulan. <a href="#/kategori">Lihat rinciannya →</a></div>`;
}

export function bindPlanner(rerender) {
  const range = document.getElementById('pl-income');
  if (range) range.addEventListener('input', () => { income = Number(range.value); rerender(); });
  const num = document.getElementById('pl-income-num');
  if (num) num.addEventListener('change', () => { const v = Number(num.value); if (v >= 1000000) { income = v; rerender(); } });
  const presets = [
    ['pl-preset-503020', 50, 30, 20],
    ['pl-preset-602010', 60, 20, 20],
    ['pl-preset-403030', 40, 30, 30],
  ];
  presets.forEach(([id, n, w, s]) => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', () => { needPct = n; wantPct = w; savePct = s; rerender(); });
  });
  const ga = document.getElementById('goal-amount');
  if (ga) ga.addEventListener('change', () => { const v = Number(ga.value); if (v >= 100000) { goalAmount = v; rerender(); } });
  const gm = document.getElementById('goal-months');
  if (gm) gm.addEventListener('change', () => { const v = Number(gm.value); if (v >= 1 && v <= 60) { goalMonths = v; rerender(); } });
}
