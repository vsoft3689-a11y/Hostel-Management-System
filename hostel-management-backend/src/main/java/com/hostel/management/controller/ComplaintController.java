package com.hostel.management.controller;

import com.hostel.management.model.Booking;
import com.hostel.management.model.Complaint;
import com.hostel.management.model.User;
import com.hostel.management.repository.ComplaintRepository;
import com.hostel.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private UserRepository userRepository;


    // User complaint
    @PostMapping
    public Complaint addComplaint(@RequestBody Complaint complaint, Authentication auth) {
        complaint.setUser(userRepository.findByEmail(auth.getName()));
        complaint.setDescription(complaint.getDescription());
        complaint.setStatus("pending");
        complaint.setDateSubmitted(LocalDate.now());
        return complaintRepository.save(complaint);
    }

    // User complaints
    @GetMapping("/my")
    public List<Complaint> getMyComplaints(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        return complaintRepository.findByUserId(user.getId());
    }
}

