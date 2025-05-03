package com.example.demo.utils.io.services;



import com.example.demo.models.ExportFile;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;

import java.io.IOException;
import java.util.List;

public interface ExportService {
    <T> ExportFile exportData(List<T> data) throws CsvRequiredFieldEmptyException, CsvDataTypeMismatchException, IOException;
    String getFormat();
}
