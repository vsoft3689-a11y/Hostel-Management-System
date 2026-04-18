package com.hostel.management.controller;

import com.hostel.management.model.Booking;
import com.hostel.management.model.Room;
import com.hostel.management.model.User;
import com.hostel.management.repository.BookingRepository;
import com.hostel.management.repository.RoomRepository;
import com.hostel.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private RoomRepository roomRepository;

    // User applies
    @PostMapping("/apply")
    public Booking applyBooking(@RequestBody Booking booking, Authentication auth) {
        booking.setUser(userRepository.findByEmail(auth.getName()));
        booking.setRoom(roomRepository.findById(booking.getRoom().getId()).orElse(null));
        booking.setAmount(booking.getAmount());
        booking.setStartDate(booking.getStartDate());
        booking.setEndDate(booking.getEndDate());
        booking.setStatus("pending");
        booking.setPaymentStatus("unpaid");
        return bookingRepository.save(booking);
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

    // User bookings
    @GetMapping("/my")
    public List<Booking> getMyBookings(Authentication auth) {
        User user = userRepository.findByEmail(auth.getName());
        return bookingRepository.findByUserId(user.getId());
    }


}

