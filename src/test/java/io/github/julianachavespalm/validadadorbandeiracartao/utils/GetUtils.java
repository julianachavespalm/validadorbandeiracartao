package io.github.julianachavespalm.validadadorbandeiracartao.utils;

import java.io.IOException;
import java.nio.file.Paths;

import static java.nio.file.Files.readString;

public class GetUtils {
    public static String getJsonAsString(String path) throws IOException {
        return  readString(Paths.get(path));
    }
}
