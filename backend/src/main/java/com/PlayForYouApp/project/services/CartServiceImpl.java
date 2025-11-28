package com.PlayForYouApp.project.services;

import com.PlayForYouApp.project.entities.Cart;
import com.PlayForYouApp.project.entities.CartItem;
import com.PlayForYouApp.project.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart addToCart(Long userId, Long itemId, String itemName, int quantity, double price) {
        Cart cart = cartRepository.findByUserId(userId).orElse(new Cart());
        cart.setUserId(userId);

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(i -> i.getItemId().equals(itemId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setItemId(itemId);
            newItem.setItemName(itemName);
            newItem.setQuantity(quantity);
            newItem.setPrice(price);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    @Override
    public Cart updateQuantity(Long userId, Long itemId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for userId: " + userId));

        cart.getItems().stream()
                .filter(item -> item.getItemId().equals(itemId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        return cartRepository.save(cart);
    }

    @Override
    public Cart removeItem(Long userId, Long itemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for userId: " + userId));

        cart.getItems().removeIf(item -> item.getItemId().equals(itemId));
        return cartRepository.save(cart);
    }

    @Override
    public Cart getCart(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUserId(userId);
            newCart.setItems(new ArrayList<>());
            return newCart;
        });
    }
}
