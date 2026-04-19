/**
 * Módulo: GerenciadorEstado
 * Responsabilidade: APENAS orquestrar as interações entre módulos
 *
 * Este é o "maestro" que coordena:
 * - UI (apresentação)
 * - Formatador (transformação de dados)
 * - Validador (lógica de negócio)
 */

import Formatador from './Formatador.js';
import Validador from './Validador.js';
import UI from './UI.js';

class GerenciadorEstado {
    constructor() {
        this.ui = new UI();
        this.registrarEventos();
        this.inicializarEstado();
    }

    /**
     * Registra os event listeners
     * Todos os eventos passam por este módulo!
     */
    registrarEventos() {
        const elementos = this.ui.obterElementos();

        elementos.input.addEventListener('input', () => {
            this.aoAlterarNumeroCartao();
        });

        elementos.botaoValidar.addEventListener('click', () => {
            this.validarCartao();
        });

        elementos.botaoLimpar.addEventListener('click', () => {
            this.limparCampos();
        });
    }


    aoAlterarNumeroCartao() {
        const numeroLimpo = this.ui.obterNumeroCartaoLimpo();

        const numeroFormatado = Formatador.formatarNumeroCartao(numeroLimpo);

        this.ui.definirValorInput(numeroFormatado, numeroLimpo);
        this.ui.definirBotaoValidar(Validador.isComprimentoValido(numeroLimpo));
        this.ui.definirBotaoLimpar(numeroLimpo.length > 0);

        this.ui.limparResultado();
    }


    validarCartao() {
        const numeroCartao = this.ui.obterNumeroCartaoLimpo();

        fetch('/api/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeroCartao: this.ui.obterNumeroCartao() })
        }).then(res => res.json())
          .then(data => {
              if (data && typeof data === 'object') {
                  this.ui.exibirResultado(data.mensagem, !!data.valido);
              } else {
                  this.ui.exibirResultado('Erro na validação', false);
              }
          }).catch(err => {
              console.error('Erro na requisição de validação:', err);
              this.ui.exibirResultado('Erro na validação', false);
          });

    }

    /**
     * Executado quando o usuário clica em limpar
     */
    limparCampos() {
        this.ui.definirValorInput('', '');

        this.ui.limparResultado();

        this.aoAlterarNumeroCartao();

        // ensure focus returns to input
        const elementos = this.ui.obterElementos();
        elementos.input.focus();
    }

    /**
     * Inicializa o estado da aplicação
     */
    inicializarEstado() {
        this.aoAlterarNumeroCartao();
    }
}

export default GerenciadorEstado;

