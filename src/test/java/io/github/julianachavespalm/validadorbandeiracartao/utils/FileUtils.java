package io.github.julianachavespalm.validadorbandeiracartao.utils;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileUtils {

    public static JSONArray getJsonAsArray(String path, String key) throws IOException {
        String content = Files.readString(Paths.get(path));
        return new JSONObject(content).getJSONArray(key);
    }

}