package com.jobtracker.dto;

public class StatsResponse {

    private long total;
    private long interviews;
    private long offers;
    private double interviewRate;

    public StatsResponse() {
    }

    public StatsResponse(long total, long interviews, long offers, double interviewRate) {
        this.total = total;
        this.interviews = interviews;
        this.offers = offers;
        this.interviewRate = interviewRate;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getInterviews() {
        return interviews;
    }

    public void setInterviews(long interviews) {
        this.interviews = interviews;
    }

    public long getOffers() {
        return offers;
    }

    public void setOffers(long offers) {
        this.offers = offers;
    }

    public double getInterviewRate() {
        return interviewRate;
    }

    public void setInterviewRate(double interviewRate) {
        this.interviewRate = interviewRate;
    }
}
