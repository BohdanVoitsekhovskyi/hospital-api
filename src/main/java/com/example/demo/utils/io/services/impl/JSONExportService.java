package com.example.demo.utils.io.services.impl;

import com.example.demo.utils.io.services.ExportService;
import com.example.demo.utils.io.utils.ExportFileNameManager;
import com.example.demo.models.ExportFile;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class JSONExportService implements ExportService {

    private final String type = ".json";

    private final ObjectMapper objectMapper;

    @Autowired
    public JSONExportService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public <T> ExportFile exportData(List<T> data) throws IOException {
        if(data == null || data.isEmpty())
            return null;

       byte [] array =  objectMapper
               .writerWithDefaultPrettyPrinter()
               .writeValueAsBytes(data);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        baos.write(array);

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
