import { CartaoBandeiras } from './cartaoBandeiras.js';
import Validador from './Validador.js';

/**
 * GerenciadorEstado
 * Responsabilidade: conectar a UI à lógica de validação e orquestrar ações do usuário.
 * - Registra os listeners dos botões (validar / limpar)
 * - Recupera o número do cartão (via a instância `ui` ou fallback para DOM)
 * - Detecta a bandeira e delega exibição do resultado à UI
 *
 * Observação: a classe é defensiva — se a instância `ui` não fornecer métodos esperados,
 * ela faz fallback para elementos do DOM para evitar erros em tempo de execução.
 */
export default class GerenciadorEstado {
    /**
     * Cria o gerenciador e registra listeners dos botões.
     * @param {{obterNumeroCartao?: Function, limparInput?: Function, mostrarResultado?: Function}|null} ui - Instância opcional que abstrai a UI
     */
    constructor(ui) {
        this.ui = ui;
        const validarBtn = document.getElementById('validarBtn');
        const limparBtn = document.getElementById('limparBtn');

        if (validarBtn) validarBtn.addEventListener('click', this.validarCartao.bind(this));
        if (limparBtn) limparBtn.addEventListener('click', this.limpar.bind(this));
    }

    /**
     * Handler para validar o cartão quando o usuário clica em validar.
     * Obtém o número (via `ui.obterNumeroCartao()` quando disponível), valida conteúdo
     * mínimo e detecta a bandeira para exibir o resultado.
     * @param {Event} event - Evento de clique (não usado, presente para compatibilidade)
     */
    validarCartao(event) {
        let numero;
        if (this.ui && typeof this.ui.obterNumeroCartao === 'function') {
            numero = this.ui.obterNumeroCartao();
        } else {
            const el = document.getElementById('numeroCartao');
            numero = el ? el.value : '';
        }

        if (!numero || numero.trim().length === 0) {
            if (this.ui && typeof this.ui.mostrarResultado === 'function') {
                this.ui.mostrarResultado('Insira um número de cartão válido.');
            } else {
                const resultadoEl = document.getElementById('resultado');
                if (resultadoEl) resultadoEl.textContent = 'Insira um número de cartão válido.';
            }
            return;
        }
        const bandeira = this._detectarBandeira(numero);
        if (this.ui && typeof this.ui.mostrarResultado === 'function') {
            this.ui.mostrarResultado(bandeira);
        } else {
            const resultadoEl = document.getElementById('resultado');
            if (resultadoEl) resultadoEl.textContent = bandeira;
        }
    }

    /**
     * Limpa o input e o resultado exibido.
     * Usa métodos da `ui` quando disponíveis, senão faz fallback para DOM.
     */
    limpar() {
        if (this.ui && typeof this.ui.limparInput === 'function') {
            this.ui.limparInput();
        } else {
            const el = document.getElementById('numeroCartao');
            if (el) el.value = '';
        }

        if (this.ui && typeof this.ui.mostrarResultado === 'function') {
            this.ui.mostrarResultado('');
        } else {
            const resultadoEl = document.getElementById('resultado');
            if (resultadoEl) resultadoEl.textContent = '';
        }
    }

    /**
     * Detecta a bandeira com base no prefixo e retorna uma string amigável.
     * Delegamos ao Validador.identificarBandeira para garantir consistência com o dicionário.
     * @param {string} numero - Valor possivelmente formatado (aceita espaços)
     * @returns {string} Bandeira detectada ou 'Desconhecida'
     */
    _detectarBandeira(numero) {
        const n = numero.replace(/\D/g, '');
        if (!n) return '';


        console.debug(`_detectarBandeira: número limpo='${n}', length=${n.length}`);

        const bandeira = Validador.identificarBandeira(n);
        console.debug(`Validador.identificarBandeira -> ${String(bandeira)}`);
        if (bandeira) return bandeira;

        for (const [nome, config] of Object.entries(CartaoBandeiras)) {
            try {
                const regexOk = !!(config.regex && config.regex.test(n));
                const lengthOk = Array.isArray(config.lengths) && config.lengths.includes(n.length);
                console.debug(`Teste bandeira='${nome}': regexOk=${regexOk}, lengthOk=${lengthOk}, regex=${config.regex}`);
                if (regexOk) {
                    console.debug(`_detectarBandeira (fallback-regex): número ${n} casou com regex da bandeira ${nome}`);
                    return nome;
                }
            } catch (err) {
                console.warn(`Erro ao testar bandeira (fallback) ${nome}:`, err);
            }
        }

        console.debug(`_detectarBandeira: número ${n} não correspondeu a nenhuma bandeira conhecida`);
        return 'Bandeira desconhecida';
    }
}
