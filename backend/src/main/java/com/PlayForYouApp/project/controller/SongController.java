package com.PlayForYouApp.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PlayForYouApp.project.entities.Song;
import com.PlayForYouApp.project.services.SongService;

@CrossOrigin("*")
@RestController
@RequestMapping("/product") // base URL for product operations
public class SongController {

    @Autowired
    private SongService songService;

    // Add new product
    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Song song) {
        if (!songService.songExists(song.getName())) {
            songService.addSong(song);
            return ResponseEntity.ok("Product added successfully");
        } else {
            return ResponseEntity.badRequest().body("Product already exists");
        }
    }

    // Fetch all products
    @GetMapping("/all")
    public List<Song> getAllProducts() {
        return songService.fetchAllSongs();
    }

    // Optional: get product by IDs
    @PostMapping("/getByIds")
    public List<Song> getProductsByIds(@RequestBody List<Integer> ids) {
        return songService.getSongsByIds(ids);
    }
}
