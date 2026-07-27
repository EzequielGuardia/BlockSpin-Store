import { renderTabs, renderGrid, initGlobalListeners } from './components/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTabs();
  renderGrid();
  initGlobalListeners();
});