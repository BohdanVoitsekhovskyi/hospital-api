package com.example.demo.utils.io.services.impl;

import com.example.demo.utils.io.services.ExportService;
import com.example.demo.utils.io.utils.ExportFileNameManager;
import com.example.demo.models.ExportFile;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;

import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.springframework.stereotype.Component;

import java.io.*;

import java.util.List;


@Component
public class CSVExportService implements ExportService {
    private final String type = ".csv";
    @Override
    public <T> ExportFile exportData(List<T> data) throws CsvRequiredFieldEmptyException, CsvDataTypeMismatchException, IOException {


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        OutputStreamWriter writer = new OutputStreamWriter(baos);

            StatefulBeanToCsv<T> beanToCsv = new StatefulBeanToCsvBuilder<T>(writer)
                    .withApplyQuotesToAll(false)
                    .withOrderedResults(true)
                    .build();


        beanToCsv.write(data);
        writer.flush();

        String fileName = ExportFileNameManager.configureFileName(data).concat(type);
        ExportFile exportFile = new ExportFile();

        exportFile.setFileName(fileName);
        exportFile.setContent(baos);

        return exportFile;
    }

    @Override
    public String getFormat() {
        return type;
    }
}
