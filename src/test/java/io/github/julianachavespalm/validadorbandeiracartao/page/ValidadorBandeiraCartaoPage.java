package io.github.julianachavespalm.validadorbandeiracartao.page;

import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.attribute;
import static com.codeborne.selenide.Selenide.$;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ValidadorBandeiraCartaoPage {

    private SelenideElement tituloValidadorBandeiraCartao = $("h1.validador__titulo");
    private SelenideElement legendInsiraNumeroCartao = $("legend");
    private SelenideElement inputNumeroCartao = $("#numeroCartao");
    private SelenideElement buttonValidar = $("#validarBtn");
    private SelenideElement buttonLimpar = $("#limparBtn");
    private SelenideElement txtResultado = $("#resultado");

    public void setInputNumeroCartao(String numeroCartao) {
        this.inputNumeroCartao.setValue(numeroCartao);
    }
    public SelenideElement getTituloValidadorBandeiraCartao() {
        return tituloValidadorBandeiraCartao;
    }

    public SelenideElement getLegendInsiraNumeroCartao() {
        return legendInsiraNumeroCartao;
    }

    public SelenideElement getInputNumeroCartao() {
        return inputNumeroCartao;
    }

    public SelenideElement getButtonValidar() {
        return buttonValidar;
    }

    public SelenideElement getButtonLimpar() {
        return buttonLimpar;
    }

    public SelenideElement getTxtResultado() {
        return txtResultado;
    }
}
