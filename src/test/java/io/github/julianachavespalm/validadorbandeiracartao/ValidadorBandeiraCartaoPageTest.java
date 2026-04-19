package io.github.julianachavespalm.validadorbandeiracartao;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.github.julianachavespalm.validadorbandeiracartao.page.ValidadorBandeiraCartaoPage;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.*;

import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.*;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.AssertUtils.*;

public class ValidadorBandeiraCartaoPageTest {
    ValidadorBandeiraCartaoPage page = new ValidadorBandeiraCartaoPage();

    @BeforeAll
    public static void setUpAll() {
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        open("http://192.168.0.10:63342");
    }

    @Test
    public void deveCarregarPaginaValidadorBandeiraCartao() {
        deveEstarVisivelETerTextoExato(page.getTituloValidadorBandeiraCartao(), "Validador de Bandeira de Cartão");
        deveEstarVisivelETerTextoExato(page.getTituloValidadorBandeiraCartao(), "Validador de Bandeira de Cartão");
        deveEstarVisivelETerTextoExato(page.getLegendInsiraNumeroCartao(), "Insira o número do cartão *");
        deveEstarVisivelETerAtributoComValor(page.getInputNumeroCartao(), "placeholder", "0000 0000 0000 0000");
        deveEstarVisivelETerAtributoComValor(page.getButtonValidar(), "aria-disabled", "true");
        deveEstarVisivelETerAtributoComValor(page.getButtonLimpar(), "aria-disabled", "true");
        deveEstarVisivelETerTextoExato(page.getTxtResultado(), "");
    }
}
