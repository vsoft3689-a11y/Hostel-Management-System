package com.hostel.management.controller;

import com.hostel.management.model.Room;
import com.hostel.management.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    @Autowired
    private RoomRepository roomRepository;

    @GetMapping
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Room> getRoomById(@PathVariable Long id) {
        return roomRepository.findById(id);
    }

    @PostMapping("/add")
    public Room addRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @PutMapping("/update/{id}")
    public Room updateRoom(@PathVariable Long id, @RequestBody Room roomDetails) {
        Room room = roomRepository.findById(id).orElse(null);
        if (room != null) {
            room.setRoomNo(roomDetails.getRoomNo());
            room.setCapacity(roomDetails.getCapacity());
            room.setFeePerMonth(roomDetails.getFeePerMonth());
            room.setRoomImage(roomDetails.getRoomImage());
            room.setStatus(roomDetails.getStatus());
            return roomRepository.save(room);
        }
        return null;
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRoom(@PathVariable Long id) {
        roomRepository.deleteById(id);
        return "Room deleted";
    }
}

