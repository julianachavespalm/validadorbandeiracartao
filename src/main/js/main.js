/**
 * Arquivo Principal: main.js
 * Responsabilidade: Ponto de entrada da aplicação
 * - Importa a camada de UI e o Gerenciador de Estado
 * - Aguarda o evento DOMContentLoaded para inicializar (garante elementos do DOM disponíveis)
 */

import UI from './modules/UI.js';
import GerenciadorEstado from './modules/GerenciadorEstado.js';

window.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    new GerenciadorEstado(ui);
});
