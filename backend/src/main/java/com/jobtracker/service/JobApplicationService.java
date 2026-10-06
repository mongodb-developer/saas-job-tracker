package com.jobtracker.service;

import com.jobtracker.dto.JobApplicationMapper;
import com.jobtracker.dto.JobApplicationRequest;
import com.jobtracker.dto.JobApplicationResponse;
import com.jobtracker.dto.StatsResponse;
import com.jobtracker.dto.StatusUpdateRequest;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.ApplicationStatus;
import com.jobtracker.model.JobApplication;
import com.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;
    private final JobApplicationMapper mapper;

    public JobApplicationService(JobApplicationRepository repository, JobApplicationMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public List<JobApplicationResponse> findAll(String search, ApplicationStatus status) {
        List<JobApplication> applications;

        if (search != null && !search.isBlank()) {
            applications = repository
                    .findByCompanyContainingIgnoreCaseOrRoleContainingIgnoreCaseOrLocationContainingIgnoreCase(
                            search, search, search);
        } else {
            applications = repository.findAll();
        }

        return applications.stream()
                .filter(app -> status == null || app.getStatus() == status)
                .sorted(Comparator.comparing(JobApplication::getUpdatedAt,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .map(mapper::toResponse)
                .toList();
    }

    public JobApplicationResponse findById(String id) {
        return mapper.toResponse(getOrThrow(id));
    }

    public JobApplicationResponse create(JobApplicationRequest request) {
        JobApplication application = mapper.toEntity(request);
        return mapper.toResponse(repository.save(application));
    }

    public JobApplicationResponse update(String id, JobApplicationRequest request) {
        JobApplication application = getOrThrow(id);
        mapper.applyToEntity(request, application);
        return mapper.toResponse(repository.save(application));
    }

    public JobApplicationResponse updateStatus(String id, StatusUpdateRequest request) {
        JobApplication application = getOrThrow(id);
        application.setStatus(request.getStatus());
        return mapper.toResponse(repository.save(application));
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Job application not found with id " + id);
        }
        repository.deleteById(id);
    }

    public StatsResponse getStats() {
        long total = repository.count();
        long interviews = repository.countByStatus(ApplicationStatus.INTERVIEW);
        long offers = repository.countByStatus(ApplicationStatus.OFFER);
        long applied = repository.countByStatus(ApplicationStatus.APPLIED);

        long interviewEligible = interviews + offers + applied
                + repository.countByStatus(ApplicationStatus.REJECTED);
        double interviewRate = interviewEligible == 0
                ? 0.0
                : (interviews + offers) * 100.0 / interviewEligible;

        return new StatsResponse(total, interviews, offers, Math.round(interviewRate * 10.0) / 10.0);
    }

    private JobApplication getOrThrow(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found with id " + id));
    }
}
