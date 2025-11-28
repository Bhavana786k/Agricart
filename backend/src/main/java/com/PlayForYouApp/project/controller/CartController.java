package com.PlayForYouApp.project.controller;

import com.PlayForYouApp.project.entities.Cart;
import com.PlayForYouApp.project.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestParam Long userId,
            @RequestParam Long itemId,
            @RequestParam String itemName,
            @RequestParam int quantity,
            @RequestParam double price) {

        if(userId == null || itemId == null || quantity <= 0 || price < 0) {
            return ResponseEntity.badRequest().body("Missing or invalid parameters");
        }

        Cart cart = cartService.addToCart(userId, itemId, itemName, quantity, price);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateQuantity(
            @RequestParam Long userId,
            @RequestParam Long itemId,
            @RequestParam int quantity) {

        if(userId == null || itemId == null || quantity < 0) {
            return ResponseEntity.badRequest().body("Missing or invalid parameters");
        }

        Cart cart = cartService.updateQuantity(userId, itemId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> removeItem(
            @RequestParam Long userId,
            @RequestParam Long itemId) {

        if(userId == null || itemId == null) {
            return ResponseEntity.badRequest().body("Missing parameters");
        }

        Cart cart = cartService.removeItem(userId, itemId);
        return ResponseEntity.ok(cart);
    }

    @GetMapping
    public ResponseEntity<?> getCart(@RequestParam Long userId) {
        if(userId == null) return ResponseEntity.badRequest().body("Missing userId");

        Cart cart = cartService.getCart(userId);
        if(cart == null) return ResponseEntity.ok(new Cart()); // empty cart
        return ResponseEntity.ok(cart);
    }
}
