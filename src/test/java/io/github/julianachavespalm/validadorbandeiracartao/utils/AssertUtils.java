package io.github.julianachavespalm.validadorbandeiracartao.utils;

import com.codeborne.selenide.Condition;
import com.codeborne.selenide.SelenideElement;

import static com.codeborne.selenide.Condition.visible;

public class AssertUtils {
    public static void deveEstarVisivelETerTextoExato(SelenideElement elemento, String texto) {
        elemento.shouldBe(visible)
                .shouldHave(Condition.exactText(texto));
    }

    public static void deveEstarVisivelETerAtributoComValor(SelenideElement elemento, String atributo, String valor) {
        elemento.shouldBe(visible)
                .shouldHave(Condition.attribute(atributo, valor));
    }

    public static void deveEstarVazio(SelenideElement elemento) {
        elemento.shouldBe(visible)
                .shouldHave(Condition.empty);
    }
}