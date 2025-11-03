package com.hostel.management.controller;

import com.hostel.management.model.User;
import com.hostel.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepository.findAll().stream()
                .filter(u -> u.getEmail().equals(user.getEmail()) && u.getPassword().equals(user.getPassword()))
                .findFirst()
                .orElse(null);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/profile/{id}")
    public User getUserProfile(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

