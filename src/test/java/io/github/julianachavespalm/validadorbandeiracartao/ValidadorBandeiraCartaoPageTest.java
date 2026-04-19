package io.github.julianachavespalm.validadorbandeiracartao;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.github.julianachavespalm.validadorbandeiracartao.page.ValidadorBandeiraCartaoPage;
import io.qameta.allure.selenide.AllureSelenide;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.*;

import java.io.IOException;

import static com.codeborne.selenide.Selenide.*;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.AssertUtils.*;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.GetUtils.*;

public class ValidadorBandeiraCartaoPageTest {
    ValidadorBandeiraCartaoPage page = new ValidadorBandeiraCartaoPage();
    private String cartoesValidosJsonPath = "src/test/resources/fixtures/cartoesValidos.json";
    private String cartoesInvalidosJsonPath = "src/test/resources/fixtures/cartoesInvalidos.json";

    @BeforeAll
    public static void setUpAll() {
        Configuration.browserSize = "1280x800";
        SelenideLogger.addListener("allure", new AllureSelenide());
    }

    @BeforeEach
    public void setUp() {
        open("https://julianachavespalm.github.io/validadorbandeiracartao/");
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

    @Test
    public void cartaoValidoDeveExibirResultado() throws IOException {
        JSONArray cartaoBandeiraEsperados = getJsonAsArray(cartoesValidosJsonPath, "cartoesValidos");
        int totalCartoes = cartaoBandeiraEsperados.length();

        for (int i = 0; i < totalCartoes; i++) {
            JSONObject cartao = cartaoBandeiraEsperados.getJSONObject(i);
            String numeroCartao = cartao.getString("numeroCartao");
            String bandeiraEsperada = cartao.getString("bandeira");

            page.setInputNumeroCartao(numeroCartao);
            page.getButtonValidar().click();
            deveEstarVisivelETerTextoExato(page.getTxtResultado(), bandeiraEsperada);
        }
    }

}
