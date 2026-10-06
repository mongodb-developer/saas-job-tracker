package com.jobtracker.model;

public class SalaryRange {

    private Double min;
    private Double max;
    private String currency;

    public SalaryRange() {
    }

    public SalaryRange(Double min, Double max, String currency) {
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
