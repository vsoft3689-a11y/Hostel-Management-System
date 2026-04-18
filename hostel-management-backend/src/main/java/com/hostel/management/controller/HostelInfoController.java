package com.hostel.management.controller;

import com.hostel.management.model.HostelInfo;
import com.hostel.management.repository.HostelInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hostel-info")
public class HostelInfoController {

    @Autowired
    private HostelInfoRepository hostelInfoRepository;

    // Get Hostel Info
    @GetMapping
    public List<HostelInfo> getHostelInfo()
    {
        return hostelInfoRepository.findAll();
    }

    // Get Hostel details based on type
    @GetMapping("/{type}")
    public List<HostelInfo> getByType(@PathVariable String type) {
        return hostelInfoRepository.findByType(type);
    }
}
