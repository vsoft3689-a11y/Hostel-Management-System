package com.hostel.management.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Room room;

    private LocalDate startDate;
    private LocalDate endDate;
    private double amount;
    private String status;// pending,approved,rejected
    private String paymentStatus; // paid, unpaid
}
