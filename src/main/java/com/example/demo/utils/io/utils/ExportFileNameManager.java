package com.example.demo.utils.io.utils;

import java.util.List;
import java.util.Locale;

public  class ExportFileNameManager {
    public static <T> String configureFileName(List<T> data)
    {
        return data.getFirst().getClass().getSimpleName().toLowerCase(Locale.ROOT).concat("s");
    }
}
