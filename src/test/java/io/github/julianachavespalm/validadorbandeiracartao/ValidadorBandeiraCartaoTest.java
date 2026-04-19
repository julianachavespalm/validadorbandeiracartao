package io.github.julianachavespalm.validadorbandeiracartao;

import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.logevents.SelenideLogger;
import io.github.julianachavespalm.validadorbandeiracartao.page.ValidadorBandeiraCartaoPage;
import io.qameta.allure.selenide.AllureSelenide;
import org.junit.jupiter.api.*;
import java.io.IOException;
import java.util.stream.Stream;
import static com.codeborne.selenide.Selenide.closeWebDriver;
import static com.codeborne.selenide.Selenide.open;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.AssertUtils.*;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.DynimcTestUtils.*;
import static io.github.julianachavespalm.validadorbandeiracartao.utils.FileUtils.*;

@DisplayName("Testes da Página Validador de Bandeira de Cartão")
public class ValidadorBandeiraCartaoTest {

    private static final String URL = "https://julianachavespalm.github.io/validadorbandeiracartao/";
    private static final String CARTOES_VALIDOS_PATH = "src/test/resources/fixtures/cartoesValidos.json";
    private static final String CARTOES_INVALIDOS_PATH = "src/test/resources/fixtures/cartoesInvalidos.json";

    private ValidadorBandeiraCartaoPage page;

    @BeforeAll
    public static void setUpAll() {
        Configuration.browserSize = "1280x800";
        open(URL);
        SelenideLogger.addListener("allure",
                new AllureSelenide()
                        .screenshots(true)
                        .savePageSource(true)
                        .includeSelenideSteps(true)
        );

    }

    @BeforeEach
    public void setUp() {
        page = new ValidadorBandeiraCartaoPage();
    }

    @AfterAll
    public static void tearDownAll() {
        closeWebDriver();
    }

    @TestFactory
    @DisplayName("Deve exibir a bandeira correta para cartões válidos")
    public Stream<DynamicTest> deveExibirBandeiraParaCartaoValido() throws IOException {
        return createDynamicTests(
                getJsonAsArray(CARTOES_VALIDOS_PATH, "cartoesValidos"),
                "Cartão Válido: %s -> %s",
                args -> {
                    page.preencherCampoNumeroCartao(args[0]);
                    page.clicarBotaoValidar();
                    deveEstarVisivelETerTextoExato(page.getTxtResultado(), args[1]);
                },
                "numeroCartao", "bandeira"
        );
    }

    @TestFactory
    @DisplayName("Deve exibir bandeira desconhecida para cartões inválidos")
    public Stream<DynamicTest> deveExibirBandeiraDesconhecidaParaCartaoInvalido() throws IOException {
        return createDynamicTests(
                getJsonAsArray(CARTOES_INVALIDOS_PATH,
                        "cartoesInvalidos"),
                "Cartão Inválido: %s -> %s",
                args -> {
                    page.preencherCampoNumeroCartao(args[0]);
                    page.clicarBotaoValidar();
                    deveEstarVisivelETerTextoExato(page.getTxtResultado(), args[1]);
                },
                "numeroCartao", "bandeira"
        );
    }
}