package com.hostel.management.controller;

import com.hostel.management.model.Complaint;
import com.hostel.management.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    @Autowired
    private ComplaintRepository complaintRepository;

    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint) {
        complaint.setDateSubmitted(LocalDate.now());
        complaint.setStatus("pending");
        return complaintRepository.save(complaint);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PutMapping("/resolve/{id}")
    public Complaint resolveComplaint(@PathVariable Long id) {
        Complaint complaint = complaintRepository.findById(id).orElse(null);
        if (complaint != null) {
            complaint.setStatus("resolved");
            return complaintRepository.save(complaint);
        }
        return null;
    }
}

