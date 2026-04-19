/**
 * Módulo: Validador
 * Responsabilidade: APENAS validar números de cartão
 *
 * Funções:
 * - Verificar comprimento válido
 * - Identificar bandeira
 * - Validar número completo
 */

import { CartaoBandeiras } from './cartaoBandeiras.js';

class Validador {
    static MIN_DIGITOS = 13;
    static MAX_DIGITOS = 19;

    /**
     * Verifica se o comprimento do número é válido
     * @param {string} numero - Número do cartão (apenas dígitos)
     * @returns {boolean} True se o comprimento é válido
     */
    static isComprimentoValido(numero) {
        return numero.length >= this.MIN_DIGITOS && numero.length <= this.MAX_DIGITOS;
    }

    /**
     * Identifica a bandeira do cartão
     * @param {string} numero - Número do cartão (apenas dígitos)
     * @returns {string|null} Nome da bandeira ou null se não identificada
     */
    static identificarBandeira(numero) {
        for (const [bandeira, config] of Object.entries(CartaoBandeiras)) {
            try {
                const regexOk = !!(config.regex && config.regex.test(numero));
                const lengthOk = Array.isArray(config.lengths) && config.lengths.includes(numero.length);

                if (regexOk) {
                    return bandeira;
                }

            } catch (err) {
                console.warn(`Erro ao testar bandeira ${bandeira}:`, err);
            }
        }
        return null;
    }

    /**
     * Valida um número de cartão completo
     * @param {string} numeroCartao - Número do cartão (apenas dígitos)
     * @returns {object} Objeto com resultado da validação
     */
    static validar(numeroCartao) {
        if (!this.isComprimentoValido(numeroCartao)) {
            return {
                valido: false,
                mensagem: 'O número deve ter entre 13 e 19 dígitos'
            };
        }

        const bandeira = this.identificarBandeira(numeroCartao);
        if (bandeira) {
            return {
                valido: true,
                mensagem: bandeira,
                bandeira: bandeira
            };
        }

        return {
            valido: false,
            mensagem: 'Número inválido'
        };
    }
}

export default Validador;

// Expor helper para debugging no browser (apenas para desenvolvimento)
if (typeof window !== 'undefined') {
    // eslint-disable-next-line no-unused-vars
    window._identificarBandeira = function (valor) {
        try {
            const s = String(valor).replace(/\D/g, '');
            return Validador.identificarBandeira(s);
        } catch (err) {
            console.error('Erro em _identificarBandeira:', err);
            return null;
        }
    };
}
