package com.hostel.management.controller;

import com.hostel.management.model.*;
import com.hostel.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private HostelInfoRepository hostelInfoRepository;

    // HOSTEL INFO

    @PostMapping("/hostel-info/add")
    public HostelInfo addInfo(@RequestBody HostelInfo info) {
        return hostelInfoRepository.save(info);
    }

    @PutMapping("/hostel-info/update/{id}")
    public HostelInfo updateInfo(@PathVariable Long id, @RequestBody HostelInfo info) {
        HostelInfo existing = hostelInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        existing.setType(info.getType());
        existing.setData(info.getData());

        return hostelInfoRepository.save(existing);
    }

    @GetMapping("/hostel-info/{type}")
    public List<HostelInfo> getByType(@PathVariable String type) {
        return hostelInfoRepository.findByType(type);
    }

    @DeleteMapping("/hostel-info/delete/{id}")
    public String deleteInfo(@PathVariable Long id) {
        if (!hostelInfoRepository.existsById(id)) {
            throw new RuntimeException("Item not found");
        }
        hostelInfoRepository.deleteById(id);
        return "Deleted successfully";
    }

    // ROOMS

    @PostMapping("/rooms/add")
    public Room addRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @PutMapping("/rooms/update/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        room.setRoomNo(roomDetails.getRoomNo());
        room.setCapacity(roomDetails.getCapacity());
        room.setFeePerMonth(roomDetails.getFeePerMonth());
        room.setRoomImage(roomDetails.getRoomImage());
        room.setStatus(roomDetails.getStatus());

        return roomRepository.save(room);
    }

    @DeleteMapping("/rooms/delete/{id}")
    public String deleteRoom(@PathVariable Long id) {

        if (!roomRepository.existsById(id)) {
            throw new RuntimeException("Room not found");
        }

        roomRepository.deleteById(id);
        return "Room deleted";
    }

    // USERS

    @GetMapping("/users")
    public List<Map<String, Object>> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("name", user.getName());
                    map.put("email", user.getEmail());
                    map.put("phone", user.getPhone());
                    map.put("role", user.getRole());
                    return map;
                })
                .collect(Collectors.toList());
    }

    // BOOKINGS

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/bookings/approve/{bookingId}")
    public Booking approveBooking(@PathVariable Long bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getStatus().equalsIgnoreCase("pending")) {
            throw new RuntimeException("Booking already processed");
        }

        Room room = booking.getRoom();

        if (room.getOccupied() < room.getCapacity()) {
            booking.setStatus("approved");

            // update room occupancy
            room.setOccupied(room.getOccupied() + 1);
            roomRepository.save(room);

        } else {
            booking.setStatus("rejected");
        }

        return bookingRepository.save(booking);
    }

    // COMPLAINTS

    @GetMapping("/complaints")
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @PutMapping("/complaints/resolve/{id}")
    public Complaint resolveComplaint(@PathVariable Long id) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus("resolved");

        return complaintRepository.save(complaint);
    }
}