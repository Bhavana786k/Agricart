package com.PlayForYouApp.project.services;

import com.PlayForYouApp.project.entities.Cart;

public interface CartService {
    Cart addToCart(Long userId, Long itemId, String itemName, int quantity, double price);
    Cart updateQuantity(Long userId, Long itemId, int quantity);
    Cart removeItem(Long userId, Long itemId);
    Cart getCart(Long userId);
}
