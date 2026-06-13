package com.exampleback.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.exampleback.demo.model.DeveloperMetric;

@Repository
public interface DeveloperMetricRepository extends JpaRepository<DeveloperMetric, Long> {
        /*
         * new DeveloperMetric(
         * "Francisco",
         * LocalDate.of(2026, 5, 1),
         * 12,
         * 2,
         * 5,
         * 8),
         * 
         * new DeveloperMetric(
         * "Francisco",
         * LocalDate.of(2026, 5, 2),
         * 18,
         * 1,
         * 7,
         * 13),
         * 
         * new DeveloperMetric(
         * "Francisco",
         * LocalDate.of(2026, 5, 3),
         * 15,
         * 3,
         * 6,
         * 10),
         * 
         * new DeveloperMetric(
         * "Francisco",
         * LocalDate.of(2026, 5, 4),
         * 22,
         * 0,
         * 8,
         * 15)
         */
}