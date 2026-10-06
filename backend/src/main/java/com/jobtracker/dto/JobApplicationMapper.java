package com.jobtracker.dto;

import com.jobtracker.model.JobApplication;
import com.jobtracker.model.SalaryRange;
import org.springframework.stereotype.Component;

@Component
public class JobApplicationMapper {

    public JobApplication toEntity(JobApplicationRequest request) {
        JobApplication application = new JobApplication();
        applyToEntity(request, application);
        return application;
    }

    public void applyToEntity(JobApplicationRequest request, JobApplication application) {
        application.setCompany(request.getCompany());
        application.setRole(request.getRole());
        application.setLocation(request.getLocation());
        application.setStatus(request.getStatus());
        application.setJobUrl(request.getJobUrl());
        application.setNotes(request.getNotes());
        application.setTags(request.getTags());
        application.setAppliedDate(request.getAppliedDate());

        SalaryRangeDto salaryDto = request.getSalary();
        if (salaryDto != null) {
            application.setSalary(new SalaryRange(salaryDto.getMin(), salaryDto.getMax(), salaryDto.getCurrency()));
        } else {
            application.setSalary(null);
        }
    }

    public JobApplicationResponse toResponse(JobApplication application) {
        JobApplicationResponse response = new JobApplicationResponse();
        response.setId(application.getId());
        response.setCompany(application.getCompany());
        response.setRole(application.getRole());
        response.setLocation(application.getLocation());
        response.setStatus(application.getStatus());
        response.setJobUrl(application.getJobUrl());
        response.setNotes(application.getNotes());
        response.setTags(application.getTags());
        response.setAppliedDate(application.getAppliedDate());
        response.setCreatedAt(application.getCreatedAt());
        response.setUpdatedAt(application.getUpdatedAt());

        SalaryRange salary = application.getSalary();
        if (salary != null) {
            response.setSalary(new SalaryRangeDto(salary.getMin(), salary.getMax(), salary.getCurrency()));
        }

        return response;
    }
}
