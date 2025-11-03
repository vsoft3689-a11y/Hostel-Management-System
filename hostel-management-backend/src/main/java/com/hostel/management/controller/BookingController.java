package com.hostel.management.controller;

import com.hostel.management.model.Booking;
import com.hostel.management.model.Room;
import com.hostel.management.repository.BookingRepository;
import com.hostel.management.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoomRepository roomRepository;

    // User applies
    @PostMapping("/apply")
    public Booking applyBooking(@RequestBody Booking booking) {
        booking.setStatus("pending");
        booking.setPaymentStatus("unpaid");
        return bookingRepository.save(booking);
    }

    // Admin approves booking
    @PostMapping("/approve/{bookingId}")
    public Booking approveBooking(@PathVariable Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null && booking.getStatus().equals("pending")) {
            Room room = booking.getRoom();
            if (room.getOccupied() < room.getCapacity()) {
                booking.setStatus("approved");
            } else {
                booking.setStatus("rejected");
            }
            return bookingRepository.save(booking);
        }
        return null;
    }

    // User pays
    @PutMapping("/pay/{bookingId}")
    public Booking payBooking(@PathVariable Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null && booking.getStatus().equals("approved") && booking.getPaymentStatus().equals("unpaid")) {
            booking.setPaymentStatus("paid");
            Room room = booking.getRoom();
            room.setOccupied(room.getOccupied() + 1);
            if (room.getOccupied() == room.getCapacity()) room.setStatus("full");
            roomRepository.save(room);
            return bookingRepository.save(booking);
        }
        return null;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}

