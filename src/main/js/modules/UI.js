/**
 * Módulo: UI
 * Responsabilidade: APENAS gerenciar interações com DOM
 *
 * Funções:
 * - Obter valores do DOM
 * - Atualizar elementos visuais
 * - Registrar event listeners
 */

import Formatador from './Formatador.js';

class UI {
    constructor() {
        this.input = document.getElementById('numeroCartao');
        this.botaoValidar = document.getElementById('validarBtn');
        this.botaoLimpar = document.getElementById('limparBtn');
        this.resultado = document.getElementById('resultado');
    }

    /**
     * Obtém o número do cartão limpo (apenas dígitos)
     * @returns {string} Número do cartão sem formatação
     */
    obterNumeroCartaoLimpo() {
        return Formatador.removerNaoNumericos(this.input.value);
    }

    /**
     * Define o valor do input de cartão
     * @param {string} valor - Valor a ser exibido
     * @param {string} interno - Valor interno (apenas dígitos)
     */
    definirValorInput(valor, interno = null) {
        this.input.value = valor;
        if (interno !== null) {
            this.input.setAttribute('data-internal', interno);
        } else {
            // keep existing data-internal consistent
            this.input.removeAttribute('data-internal');
        }
    }

    /**
     * Habilita ou desabilita o botão de validar
     * @param {boolean} habilitado - True para habilitar
     */
    definirBotaoValidar(habilitado) {
        this.botaoValidar.disabled = !habilitado;
        this.botaoValidar.setAttribute('aria-disabled', !habilitado);
    }

    /**
     * Habilita ou desabilita o botão de limpar
     * @param {boolean} habilitado - True para habilitar
     */
    definirBotaoLimpar(habilitado) {
        this.botaoLimpar.disabled = !habilitado;
        this.botaoLimpar.setAttribute('aria-disabled', !habilitado);
    }

    /**
     * Exibe uma mensagem de resultado (sucesso ou erro)
     * @param {string} mensagem - Mensagem a ser exibida
     * @param {boolean} valido - True para sucesso, false para erro
     */
    exibirResultado(mensagem, valido) {
        this.resultado.textContent = mensagem;
        const classe = valido ? 'resultado resultado--sucesso' : 'resultado resultado--erro';
        this.resultado.className = classe;
    }

    /**
     * Limpa o resultado exibido
     */
    limparResultado() {
        this.resultado.textContent = '';
        this.resultado.className = 'resultado';
    }

    /**
     * Retorna os elementos do DOM para que outros módulos registrem eventos
     * @returns {object} Objeto com referências aos elementos
     */
    obterElementos() {
        return {
            input: this.input,
            botaoValidar: this.botaoValidar,
            botaoLimpar: this.botaoLimpar
        };
    }
}

export default UI;

