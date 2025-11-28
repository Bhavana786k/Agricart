package com.PlayForYouApp.project.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "product")  // Map to 'product' table
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "product_name")
    private String name;

    @Column(name = "product_type")
    private String type;

    @Column(name = "product_quantity")
    private int quantity;

    @Column(name = "product_price")
    private int price;

    @Lob
    @Column(name = "product_lyrics")
    private String lyrics;

    @ManyToMany
    private List<Playlist> playlist;

    // ------------------ CONSTRUCTORS ------------------
    public Song() {
        super();
    }

    public Song(int id, String name, String type, int quantity, int price, String lyrics, List<Playlist> playlist) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.price = price;
        this.lyrics = lyrics;
        this.playlist = playlist;
    }

    // ------------------ GETTERS & SETTERS ------------------
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public String getLyrics() { return lyrics; }
    public void setLyrics(String lyrics) { this.lyrics = lyrics; }

    public List<Playlist> getPlaylist() { return playlist; }
    public void setPlaylist(List<Playlist> playlist) { this.playlist = playlist; }

    // ------------------ TO STRING ------------------
    @Override
    public String toString() {
        return "Song [id=" + id + ", name=" + name + ", type=" + type +
               ", quantity=" + quantity + ", price=" + price +
               ", lyrics=" + (lyrics != null ? lyrics.substring(0, Math.min(30, lyrics.length())) + "..." : null) +
               ", playlist=" + playlist + "]";
    }
}
