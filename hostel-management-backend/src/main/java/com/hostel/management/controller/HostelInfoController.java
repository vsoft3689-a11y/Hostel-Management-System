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

    // Add new item
    @PostMapping("/add")
    public HostelInfo addInfo(@RequestBody HostelInfo info) {
        return hostelInfoRepository.save(info);
    }

    // Update existing item
    @PutMapping("/update/{id}")
    public HostelInfo updateInfo(@PathVariable Long id, @RequestBody HostelInfo info) {
        HostelInfo existing = hostelInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        existing.setType(info.getType());
        existing.setData(info.getData());
        return hostelInfoRepository.save(existing);
    }
    
    // Delete item
    @DeleteMapping("/delete/{id}")
    public String deleteInfo(@PathVariable Long id) {
        hostelInfoRepository.deleteById(id);
        return "Deleted successfully";
    }

    @GetMapping("/{type}")
    public List<HostelInfo> getByType(@PathVariable String type) {
        return hostelInfoRepository.findByType(type);
    }
}
