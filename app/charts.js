// Grafik SVG yang digambar sendiri — tanpa library chart, supaya first load tetap kecil.
import { rupiahShort } from './format.js';

// Donat: slices = [{label, value, color}]. Mengembalikan string SVG.
export function donutChart(slices, size = 220) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  let angle = -Math.PI / 2;
  const paths = slices
    .filter((x) => x.value > 0)
    .map((x) => {
      const frac = x.value / total;
      const a0 = angle;
      const a1 = angle + frac * Math.PI * 2;
      angle = a1;
      const large = frac > 0.5 ? 1 : 0;
      const x0 = cx + r * Math.cos(a0);
      const y0 = cy + r * Math.sin(a0);
      const x1 = cx + r * Math.cos(a1);
      const y1 = cy + r * Math.sin(a1);
      const xi1 = cx + inner * Math.cos(a1);
      const yi1 = cy + inner * Math.sin(a1);
      const xi0 = cx + inner * Math.cos(a0);
      const yi0 = cy + inner * Math.sin(a0);
      return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${x.color}"><title>${x.label}: ${rupiahShort(x.value)}</title></path>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Diagram donat pengeluaran per kategori" width="${size}" height="${size}">${paths}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="15" font-weight="700" fill="#123327">${rupiahShort(total)}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#5d6b63">pengeluaran Nov</text></svg>`;
}

// Batang ganda: pemasukan vs pengeluaran per bulan.
export function groupedBarChart(months, width = 640, height = 260) {
  const padL = 52;
  const padB = 28;
  const padT = 12;
  const max = Math.max(...months.map((m) => Math.max(m.income, m.expense))) * 1.1;
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const slot = plotW / months.length;
  const barW = Math.min(30, (slot - 14) / 2);
  const y = (v) => padT + plotH - (v / max) * plotH;
  const grid = [0.25, 0.5, 0.75, 1]
    .map((f) => {
      const gy = padT + plotH - f * plotH;
      return `<line x1="${padL}" y1="${gy}" x2="${width - 12}" y2="${gy}" stroke="#e3dac7" stroke-width="1"/><text x="${padL - 6}" y="${gy + 4}" text-anchor="end" font-size="10" fill="#5d6b63">${rupiahShort(max * f)}</text>`;
    })
    .join('');
  const bars = months
    .map((m, i) => {
      const x = padL + i * slot + (slot - barW * 2 - 6) / 2;
      return `<rect x="${x.toFixed(1)}" y="${y(m.income).toFixed(1)}" width="${barW}" height="${(padT + plotH - y(m.income)).toFixed(1)}" rx="3" fill="#1d4d3b"><title>${m.label}: pemasukan ${rupiahShort(m.income)}</title></rect>` +
        `<rect x="${(x + barW + 6).toFixed(1)}" y="${y(m.expense).toFixed(1)}" width="${barW}" height="${(padT + plotH - y(m.expense)).toFixed(1)}" rx="3" fill="#e8a13a"><title>${m.label}: pengeluaran ${rupiahShort(m.expense)}</title></rect>` +
        `<text x="${(padL + i * slot + slot / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#22302a">${m.label}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Grafik batang pemasukan dan pengeluaran Juni sampai November 2026" width="100%">${grid}${bars}</svg>`;
}

// Garis: sisa (pemasukan − pengeluaran) per bulan.
export function savingsLineChart(months, width = 640, height = 220) {
  const padL = 52;
  const padB = 28;
  const padT = 16;
  const values = months.map((m) => m.income - m.expense);
  const max = Math.max(...values) * 1.15;
  const min = Math.min(0, Math.min(...values) * 1.15);
  const plotW = width - padL - 12;
  const plotH = height - padT - padB;
  const x = (i) => padL + (i / (months.length - 1)) * plotW;
  const y = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = values
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="5" fill="#c65d3a" stroke="#fff" stroke-width="2"><title>${months[i].label}: sisa ${rupiahShort(v)}</title></circle><text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="10" fill="#22302a">${rupiahShort(v)}</text>`)
    .join('');
  const zeroY = y(0);
  return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Garis sisa uang tiap bulan" width="100%"><line x1="${padL}" y1="${zeroY}" x2="${width - 12}" y2="${zeroY}" stroke="#b3402e" stroke-width="1" stroke-dasharray="4 3"/><polyline points="${points}" fill="none" stroke="#c65d3a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}${months.map((m, i) => `<text x="${x(i).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="11" fill="#22302a">${m.label}</text>`).join('')}</svg>`;
}

// Batang horizontal sederhana untuk satu seri (dipakai di dasbor).
export function hbar(value, max, color) {
  const w = Math.max(2, Math.min(100, (value / max) * 100));
  return `<div class="bar-track"><span style="width:${w.toFixed(1)}%;background:${color}"></span></div>`;
}
