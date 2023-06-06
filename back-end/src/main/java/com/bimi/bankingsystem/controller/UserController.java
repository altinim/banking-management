package com.bimi.bankingsystem.controller;

import com.bimi.bankingsystem.model.User;
import com.bimi.bankingsystem.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user")
    public User saveUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public List<User> getUserById(@PathVariable("id") Long id) {
        return userService.getAllUsers();
    }

    @DeleteMapping("/user/{id}")
    public boolean deleteEmployee(@PathVariable("id") Long id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/user/{id}")
    public User updateUser(@PathVariable("id") Long id,
                                           @RequestBody User user) {
        return userService.updateUser(id,user);
    }

}