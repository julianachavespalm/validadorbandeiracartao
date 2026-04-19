package io.github.julianachavespalm.validadorbandeiracartao.utils;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.DynamicTest;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class FileUtils {

    public static JSONArray getJsonAsArray(String path, String key) throws IOException {
        String content = Files.readString(Paths.get(path));
        return new JSONObject(content).getJSONArray(key);
    }

}