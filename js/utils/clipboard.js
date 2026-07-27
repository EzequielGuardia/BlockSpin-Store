import { DISCORD_INVITE } from '../config.js';
import { showToast } from '../components/ui.js';

export async function contactDiscord(name, price) {
  const msg = `Hola! Quiero comprar: ${name} ($${Number(price).toLocaleString('es-AR')})`;
  try {
    await navigator.clipboard.writeText(msg);
    showToast('Pedido copiado. ¡Pegalo en Discord!');
  } catch (e) {
    showToast('Abriendo Discord...');
  }
  window.open(DISCORD_INVITE, '_blank');
}