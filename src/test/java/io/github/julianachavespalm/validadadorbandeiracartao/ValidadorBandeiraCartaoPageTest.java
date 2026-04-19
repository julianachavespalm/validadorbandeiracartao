package io.github.julianachavespalm.validadadorbandeiracartao;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Selenide;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.github.julianachavespalm.validadadorbandeiracartao.page.ValidadorBandeiraCartaoPage;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.*;

import static com.codeborne.selenide.Condition.attribute;
import static com.codeborne.selenide.Condition.visible;
import static com.codeborne.selenide.Selenide.*;

public class ValidadorBandeiraCartaoPageTest {
    ValidadorBandeiraCartaoPage validadorBandeiraCartaoPage = new ValidadorBandeiraCartaoPage();

    @BeforeAll
    public static void setUpAll() {
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        open("http://localhost:63342/validadadorbandeiracartao/index.html?_ijt=ldfdp2qk13vpu8rhdee1k2alsv&_ij_reload=RELOAD_ON_SAVE");
    }

    @Test
    public void deveCarregarPaginaValidadorBandeiraCartao() {
        validadorBandeiraCartaoPage.getTituloValidadorBandeiraCartao().shouldBe(visible).shouldHave(attribute("textContent", "Validador de Bandeira de Cartão"));
        validadorBandeiraCartaoPage.getLegendInsiraNumeroCartao().shouldBe(visible).shouldHave(attribute("textContent", "Insira o número do cartão:"));
        validadorBandeiraCartaoPage.getInputNumeroCartao().shouldBe(visible).shouldHave(attribute("placeholder", "Digite o número do cartão"));
        validadorBandeiraCartaoPage.getButtonValidar().shouldBe(visible).shouldHave(attribute("textContent", "Validar"));
        validadorBandeiraCartaoPage.getButtonLimpar().shouldBe(visible).shouldHave(attribute("textContent", "Limpar"));
    }
}
