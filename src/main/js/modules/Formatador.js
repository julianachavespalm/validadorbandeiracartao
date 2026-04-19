/**
 * Módulo: Formatador
 * Responsabilidade: APENAS formatar números de cartão
 *
 * Funções:
 * - Remover caracteres especiais
 * - Limitar número de dígitos
 * - Agrupar em blocos de 4
 */

class Formatador {
    /**
     * Remove caracteres não numéricos
     * @param {string} valor - Valor a ser limpo
     * @returns {string} Valor com apenas dígitos
     */
    static removerNaoNumericos(valor) {
        return valor.replace(/\D/g, '');
    }

    /**
     * Limita o número de dígitos
     * @param {string} numero - Número do cartão
     * @param {number} maximo - Máximo de dígitos permitidos
     * @returns {string} Número limitado
     */
    static limitar(numero, maximo = 19) {
        return numero.slice(0, maximo);
    }

    /**
     * Formata número em grupos de 4 dígitos
     * @param {string} numero - Número sem formatação
     * @returns {string} Número formatado em grupos de 4
     */
    static agrupar(numero) {
        const grupos = numero.match(/.{1,4}/g);
        return grupos ? grupos.join(' ') : numero;
    }

    /**
     * Formata o número do cartão completo (pipeline)
     * @param {string} valor - Valor com possíveis caracteres especiais
     * @returns {string} Número formatado
     */
    static formatarNumeroCartao(valor) {
        const numeroLimpo = this.removerNaoNumericos(valor);
        const numeroLimitado = this.limitar(numeroLimpo);
        return this.agrupar(numeroLimitado);
    }
}

export default Formatador;

