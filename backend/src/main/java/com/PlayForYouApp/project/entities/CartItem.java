package com.PlayForYouApp.project.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;
    private String itemName;
    private int quantity;
    private double price;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;

    // Getters & Setters
    public Long getId() { return id; }
    public Long getItemId() { return itemId; }
    public void setItemId(Long itemId) { this.itemId = itemId; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }
}
