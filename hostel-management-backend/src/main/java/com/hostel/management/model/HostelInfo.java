package com.hostel.management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class HostelInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // "food", "timings", "facilities", "rules"

    // For food menu
    private String meal; // Breakfast, Lunch, Snacks, Dinner
    private String menu; // food items
    private String timings; // e.g., "7:30 AM - 9:00 AM"

    @Column(columnDefinition = "TEXT")
    private String data; // For other categories (timings, facilities, rules)
}
