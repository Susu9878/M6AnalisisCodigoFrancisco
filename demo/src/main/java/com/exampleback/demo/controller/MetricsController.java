package com.exampleback.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exampleback.demo.dto.MetricResponseDTO;
import com.exampleback.demo.service.MetricsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/metrics")
@RequiredArgsConstructor
public class MetricsController {

    private final MetricsService service;

    // localhost5137/{metric}
    /*
     * returns a map with dates and the amount
     * of {metric} done/assigned/found in that day
     */
    @GetMapping("/{metric}")
    public List<MetricResponseDTO> getMetricData(
            @PathVariable String metric) {

        return service.getMetricData(metric);
    }
}