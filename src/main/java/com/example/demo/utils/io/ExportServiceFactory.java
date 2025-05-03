package com.example.demo.utils.io;

import com.example.demo.utils.io.services.ExportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ExportServiceFactory {

    private final Map<String, ExportService> exportServiceMap;

    @Autowired
    public ExportServiceFactory(List<ExportService> exportManagers) {
        this.exportServiceMap = exportManagers.stream()
                .collect(Collectors.toMap(
                        ExportService::getFormat,
                        manager -> manager
                ));
    }

    public ExportService getService(String format) {
        return exportServiceMap.get(format.toLowerCase());
    }
}