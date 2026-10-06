package com.jobtracker.dto;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class SalaryRangeDto {

    @PositiveOrZero(message = "Minimum salary must be zero or positive")
    private Double min;

    @PositiveOrZero(message = "Maximum salary must be zero or positive")
    private Double max;

    @Size(max = 10, message = "Currency code must be at most 10 characters")
    private String currency;

    public SalaryRangeDto() {
    }

    public SalaryRangeDto(Double min, Double max, String currency) {
        this.min = min;
        this.max = max;
        this.currency = currency;
    }

    public Double getMin() {
        return min;
    }

    public void setMin(Double min) {
        this.min = min;
    }

    public Double getMax() {
        return max;
    }

    public void setMax(Double max) {
        this.max = max;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
