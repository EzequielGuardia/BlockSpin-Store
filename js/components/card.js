import { CATEGORIES } from '../config.js';

function calculateGauge(item) {
    if (item.stock <= 0) return { filled: 0, color: "var(--stock-out)", label: "Sin stock" };
    const ratio = Math.min(item.stock / item.stockMax, 1);
    const filled = Math.max(1, Math.round(ratio * 5));
    let color = "var(--hazard)";
    if (ratio <= 0.25) color = "var(--spark)";
    else if (ratio >= 0.8) color = "var(--circuit)";
    return { filled, color, label: `${item.stock} disponibles` };
}

export function renderCard(item) {
    const cat = CATEGORIES[item.cat];
    const g = calculateGauge(item);
    const segs = Array.from({ length: 5 }, (_, i) =>
        `<div class="seg ${i < g.filled ? 'on' : ''}"></div>`
    ).join('');

    return `
        <div class="card ${item.stock <= 0 ? 'out' : ''}" style="--cat-color:${cat.color}; --gauge-color:${g.color}">
        <div class="card-media">
            <span class="cat-badge">${cat.label}</span>
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x180/15181D/8A93A0?text=No+Image'">
        </div>
        <div class="card-content">
            <h3>${item.name}</h3>
            <p class="desc">${item.desc}</p>
            <div class="price-row">
            <div class="price">$${item.price.toLocaleString('es-AR')}</div>
            </div>
            <div class="stock-block">
            <div class="stock-label"><span>Stock</span><b>${g.label}</b></div>
            <div class="gauge">${segs}</div>
            </div>
            <button class="card-cta" data-name="${item.name}" data-price="${item.price}" ${item.stock <= 0 ? 'disabled' : ''}>
            ${item.stock <= 0 ? 'Sin stock' : 'Consultar en Discord'}
            </button>
        </div>
        </div>`;
}