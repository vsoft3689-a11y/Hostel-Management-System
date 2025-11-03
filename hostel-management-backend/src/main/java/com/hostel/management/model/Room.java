package com.hostel.management.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomNo;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String roomImage;
    private String floor;
    private int capacity;
    private int occupied; // number of currently occupied beds
    private String type; // single, double, suite
    private Double feePerMonth;
    private String status = "available"; // available, full, maintenance
}
