/**
 * Arquivo Principal: main.js
 * Responsabilidade: Ponto de entrada da aplicação
 *
 * Importa GerenciadorEstado e inicializa
 */

import GerenciadorEstado from './modules/GerenciadorEstado.js';

window.addEventListener('DOMContentLoaded', () => {
    new GerenciadorEstado();
});

