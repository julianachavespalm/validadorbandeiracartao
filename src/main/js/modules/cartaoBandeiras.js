/**
 * Módulo: CartaoBandeiras
 * Responsabilidade: Armazenar configurações de validação de cada bandeira
 *
 * Este módulo contém APENAS dados de configuração.
 * Não tem lógica, não manipula DOM, não faz validações.
 */

export const CartaoBandeiras = {
    "Visa": {
        "regex": /^4[0-9]{12}(?:[0-9]{3})?$/,
        "lengths": [13, 16]
    },
    "MasterCard": {
        "regex": /^5[1-5][0-9]{14}$/,
        "lengths": [16]
    },
    "American Express": {
        "regex": /^3[47][0-9]{13}$/,
        "lengths": [15]
    },
    "Discover": {
        "regex": /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        "lengths": [16]
    },
    "Diners Club": {
        "regex": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        "lengths": [14]
    },
    "Hipercard": {
        "regex": /^(606282|3841)[0-9]{10,12}$/,
        "lengths": [13, 16, 19]
    }
};

