package com.jobtracker.repository;

import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

    List<JobApplication> findByStatus(ApplicationStatus status);

    long countByStatus(ApplicationStatus status);

    List<JobApplication> findByCompanyContainingIgnoreCaseOrRoleContainingIgnoreCaseOrLocationContainingIgnoreCase(
            String company, String role, String location);
}
