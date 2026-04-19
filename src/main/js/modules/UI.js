import Formatador from './Formatador.js';

/**
 * UI
 * Responsabilidade: encapsular interações com o DOM relacionadas ao formulário de cartão.
 * - Formata o input enquanto o usuário digita
 * - Controla o estado dos botões (aria-disabled e disabled)
 * - Exponibiliza métodos usados pelo `GerenciadorEstado` (obterNumeroCartao, limparInput, mostrarResultado)
 */
export default class UI {
    /**
     * Construtor: cacheia referências para elementos do DOM e registra listeners locais.
     */
    constructor() {
        this.input = document.getElementById('numeroCartao');
        this.resultado = document.getElementById('resultado');
        this.validarBtn = document.getElementById('validarBtn');
        this.limparBtn = document.getElementById('limparBtn');

        // Estado inicial dos botões
        this.setBotoesEnabled(false);

        // Bind do listener de input para formatar e atualizar botões
        if (this.input) {
            this.input.addEventListener('input', this._onInput.bind(this));
        }

        // Botão limpar: comportamento local de fallback (também usado por GerenciadorEstado)
        if (this.limparBtn) {
            this.limparBtn.addEventListener('click', () => this.limparInput());
        }
    }

    /**
     * Handler interno para input: formata valor, tenta preservar caret e ativa/desativa botões.
     * Método privado: usado apenas pela própria UI.
     */
    _onInput() {
        if (!this.input) return;
        const caret = this.input.selectionStart || 0;
        const before = this.input.value;
        const formatted = Formatador.formatarNumeroCartao(before);
        this.input.value = formatted;
        // tentar restaurar caret de forma simples
        const diff = formatted.length - before.length;
        const pos = Math.max(0, caret + diff);
        this.input.selectionStart = this.input.selectionEnd = pos;

        const enabled = Formatador.removerNaoNumericos(formatted).length > 0;
        this.setBotoesEnabled(enabled);
    }

    /**
     * Controla os estados visuais e semânticos dos botões (aria-disabled e propriedade disabled).
     * @param {boolean} enabled - true para habilitar os botões
     */
    setBotoesEnabled(enabled) {
        const attr = enabled ? 'false' : 'true';
        if (this.validarBtn) {
            this.validarBtn.setAttribute('aria-disabled', attr);
            this.validarBtn.disabled = !enabled;
        }
        if (this.limparBtn) {
            this.limparBtn.setAttribute('aria-disabled', attr);
            this.limparBtn.disabled = !enabled;
        }
    }

    /**
     * Retorna o valor atual do input (possivelmente formatado).
     * @returns {string}
     */
    obterNumeroCartao() {
        return this.input ? this.input.value : '';
    }

    /**
     * Limpa o input e desabilita os botões.
     */
    limparInput() {
        if (this.input) this.input.value = '';
        this.setBotoesEnabled(false);
    }

    /**
     * Escreve um texto simples no elemento de resultado.
     * @param {string} text
     */
    mostrarResultado(text) {
        if (this.resultado) this.resultado.textContent = text;
    }
}
