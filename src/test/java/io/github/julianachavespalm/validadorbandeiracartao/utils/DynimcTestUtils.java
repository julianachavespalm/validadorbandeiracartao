package io.github.julianachavespalm.validadorbandeiracartao.utils;

import org.json.JSONArray;
import org.junit.jupiter.api.DynamicTest;

import java.util.function.Consumer;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class DynimcTestUtils {
    public static Stream<DynamicTest> createDynamicTests(
            JSONArray testDataArray,
            String testDisplayNameTemplate,
            Consumer<String[]> testExecutionLogic,
            String... jsonObjectKeys
    ) {
        return IntStream.range(0, testDataArray.length())
                .mapToObj(testDataArray::getJSONObject)
                .map(currentTestDataObject -> {
                    String[] extractedTestValues = Stream.of(jsonObjectKeys)
                            .map(currentTestDataObject::getString)
                            .toArray(String[]::new);

                    String generatedTestDisplayName = String.format(testDisplayNameTemplate, (Object[]) extractedTestValues);
                    return DynamicTest.dynamicTest(generatedTestDisplayName, () -> testExecutionLogic.accept(extractedTestValues));
                });
    }
}
