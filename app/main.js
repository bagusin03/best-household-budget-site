// Router hash + boot situs Ruang Anggaran.
import { renderDashboard } from './views-dashboard.js';
import { renderTransactions, bindTransactions } from './views-transactions.js';
import { renderCategories } from './views-categories.js';
import { renderBills, bindBills } from './views-bills.js';
import { renderPlanner, bindPlanner } from './views-planner.js';
import { renderMonthly } from './views-monthly.js';

const app = document.getElementById('app');

const ROUTES = {
  '': { render: renderDashboard, bind: null, title: 'Beranda' },
  transaksi: { render: renderTransactions, bind: bindTransactions, title: 'Pemasukan & Pengeluaran' },
  kategori: { render: renderCategories, bind: null, title: 'Kategori' },
  tagihan: { render: renderBills, bind: bindBills, title: 'Tagihan & Rutin' },
  perencana: { render: renderPlanner, bind: bindPlanner, title: 'Perencana 50/30/20' },
  bulanan: { render: renderMonthly, bind: null, title: 'Perbandingan Bulanan' },
};

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

function render() {
  const key = currentRoute();
  const route = ROUTES[key];
  app.innerHTML = route.render();
  document.querySelectorAll('.mainnav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-route') === key);
  });
  document.title = `Ruang Anggaran — ${route.title}`;
  if (route.bind) route.bind(render);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
