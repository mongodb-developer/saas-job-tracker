package com.jobtracker.config;

import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.model.JobApplication;
import com.jobtracker.model.SalaryRange;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final JobApplicationRepository repository;

    public DataSeeder(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) {
            return;
        }

        repository.saveAll(List.of(
                buildApplication("MongoDB", "Software Developer Advocate", "New York, NY", ApplicationStatus.OFFER,
                        1d, 1000000d, "USD", "https://www.mongodb.com/careers",
                        "The offer letter says the range is negotiable. Very negotiable.",
                        List.of("devrel", "java", "dream-job"), LocalDate.now().minusDays(35)),

                buildApplication("Old Coach Road Tolls & Robbery Co.", "Highwayman", "The King's Highway, 1725",
                        ApplicationStatus.REJECTED, null, null, "USD",
                        null,
                        "Application ended abruptly at the gallows in the spring of '25. Would not recommend the benefits package.",
                        List.of("outlaw", "freelance", "high-risk"), LocalDate.now().minusDays(300)),

                buildApplication("Cape Horn Schooner Lines", "Sailor", "Aboard a Ship Bound for Mexico",
                        ApplicationStatus.INTERVIEW, null, null, "USD",
                        null,
                        "Made it around the Horn fine, but a sudden blow snapped the yards mid-voyage. Following up to see if there's a safer route.",
                        List.of("maritime", "seasonal", "travel"), LocalDate.now().minusDays(200)),

                buildApplication("Boulder Dam Construction Co.", "Concrete Pour Technician", "Boulder, NV",
                        ApplicationStatus.APPLIED, null, null, "USD",
                        null,
                        "Big project, big pour. Hoping to avoid becoming a permanent part of the dam this time.",
                        List.of("construction", "concrete", "hazardous"), LocalDate.now().minusDays(90)),

                buildApplication("Universe Divide Starlines", "Starship Captain", "Low Earth Orbit",
                        ApplicationStatus.SAVED, null, null, "USD",
                        null,
                        "Still deciding whether to apply. Not sure if I'll come back as a highwayman or a drop of rain if it goes badly.",
                        List.of("aerospace", "reincarnation-friendly", "remote"), null),

                buildApplication("Midnight Toker Ranch", "Space Cowboy", "Somewhere Past the Moon",
                        ApplicationStatus.APPLIED, 50000d, 90000d, "USD",
                        null,
                        "Some people call me the space cowboy. Applied under that alias, hope that's fine.",
                        List.of("space", "cowboy", "freelance"), LocalDate.now().minusDays(12)),

                buildApplication("Gangster of Love Inc.", "Maurice", "Undisclosed Location",
                        ApplicationStatus.INTERVIEW, 60000d, 100000d, "USD",
                        null,
                        "Recruiter said everybody knows my name around here. Interview scheduled to discuss the pompatus of love.",
                        List.of("love", "pompatus", "mystery"), LocalDate.now().minusDays(8)),

                buildApplication("Pompatus of Love Consulting", "Joker & Part-Time Poet", "Remote, Somewhere Groovy",
                        ApplicationStatus.SAVED, 40000d, 80000d, "USD",
                        null,
                        "Considering applying. The job description just says 'sing a happy song' and I respect that.",
                        List.of("music", "poetry", "vibes"), null)
        ));
    }

    private JobApplication buildApplication(String company, String role, String location,
                                             ApplicationStatus status, Double min, Double max, String currency,
                                             String jobUrl, String notes, List<String> tags, LocalDate appliedDate) {
        JobApplication application = new JobApplication();
        application.setCompany(company);
        application.setRole(role);
        application.setLocation(location);
        application.setStatus(status);
        application.setSalary(new SalaryRange(min, max, currency));
        application.setJobUrl(jobUrl);
        application.setNotes(notes);
        application.setTags(tags);
        application.setAppliedDate(appliedDate);
        return application;
    }
}
