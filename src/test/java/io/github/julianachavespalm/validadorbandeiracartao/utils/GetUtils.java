package io.github.julianachavespalm.validadorbandeiracartao.utils;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

public class GetUtils {

    /**
     * Lê um arquivo JSON (filesystem ou classpath) e retorna o JSONArray associado à chave.
     */
    public static JSONArray getJsonAsArray(String path, String key) throws IOException {
        String content;
        Path p = Paths.get(path);

        if (Files.exists(p)) {
            content = Files.readString(p);
        } else {
            try (InputStream is = GetUtils.class.getClassLoader().getResourceAsStream(path)) {
                if (is == null) throw new FileNotFoundException("Arquivo não encontrado: " + path);
                content = new String(is.readAllBytes(), StandardCharsets.UTF_8);
            }
        }
        return new JSONObject(content).getJSONArray(key);
    }
}
