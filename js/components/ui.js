import { CATEGORIES, DISCORD_INVITE } from '../config.js';
import { ITEMS } from '../data/items.js';
import { renderCard } from './card.js';
import { contactDiscord } from '../utils/clipboard.js';

export function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

export function renderTabs() {
  const tabs = document.getElementById('tabs');
  const all = [{ key: 'all', label: 'Todos' }, ...Object.entries(CATEGORIES).map(([key, v]) => ({ key, label: v.label }))];
  
  tabs.innerHTML = all.map((c, i) =>
    `<button class="tab ${i === 0 ? 'active' : ''}" data-cat="${c.key}">${c.label}</button>`
  ).join('');

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab');
    if (!btn) return;
    tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.cat);
  });
}

export function renderGrid(filter = 'all') {
  const grid = document.getElementById('grid');
  const items = filter === 'all' ? ITEMS : ITEMS.filter(i => i.cat === filter);
  
  grid.innerHTML = items.map(renderCard).join('');

  grid.querySelectorAll('.card-cta').forEach(btn => {
    btn.addEventListener('click', () => contactDiscord(btn.dataset.name, btn.dataset.price));
  });
}

export function initGlobalListeners() {
  ['navDiscordBtn', 'heroDiscordBtn', 'footerDiscordBtn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(DISCORD_INVITE, '_blank');
      });
    }
  });
}