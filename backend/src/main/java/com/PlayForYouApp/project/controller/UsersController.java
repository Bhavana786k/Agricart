package com.PlayForYouApp.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PlayForYouApp.project.entities.LoginRequest;
import com.PlayForYouApp.project.entities.Users;
import com.PlayForYouApp.project.services.UsersService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class UsersController {

    @Autowired
    UsersService userv;

    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody Users user) {
        boolean userExists = userv.emailExists(user.getEmail());
        if (!userExists) {
            userv.addUser(user);
            return ResponseEntity.ok("User registered successfully.");
        } else {
            return ResponseEntity.badRequest().body("Email already exists.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> validateUser(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        boolean loginStatus = userv.validateUser(email, password);
        if (loginStatus) {
            HttpSession session = request.getSession();
            session.setAttribute("email", email);

            String role = userv.checkRole(email);
            String homePage = "customer".equals(role) ? "customerHome" : "adminHome";

            return ResponseEntity.ok(homePage);
        } else {
            return ResponseEntity.badRequest().body("loginFail");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }

    @GetMapping("/customers")
    public List<Users> getCustomers() {
        return userv.getAllCustomers("customer");
    }

    @GetMapping("/premiumStatus")
    public ResponseEntity<Boolean> premiumStatus(@RequestParam String email) {
        Users user = userv.getUser(email);
        if (user == null) return ResponseEntity.status(404).body(false);
        return ResponseEntity.ok(user.isPremium());
    }

    @GetMapping("/user")
    public ResponseEntity<Users> getUserByEmail(@RequestParam String email) {
        Users user = userv.getUser(email);
        if (user == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePass(@RequestBody LoginRequest req) {
        Users user = userv.getUser(req.getEmail());
        if (user == null) return ResponseEntity.status(404).body("User not found");

        user.setPassword(req.getPassword());
        userv.updateUser(user);
        return ResponseEntity.ok("Password Updated Successfully");
    }
}
