package com.PlayForYouApp.project.services;

import java.util.List;
import com.PlayForYouApp.project.entities.Song;

public interface SongService {

    // Add a new product
    String addSong(Song song);

    // Check if a product exists by name
    boolean songExists(String name);

    // Fetch all products
    List<Song> fetchAllSongs();

    // Update an existing product
    void updateSong(Song song);

    // Fetch products by a list of IDs
    List<Song> getSongsByIds(List<Integer> songIds);
}
