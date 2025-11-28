package com.PlayForYouApp.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.PlayForYouApp.project.entities.Song;
import java.util.List;

public interface SongRepository extends JpaRepository<Song, Integer> {

    // Find a product by item name
    Song findByName(String name);

    // Optional: find all products by type
    List<Song> findByType(String type);
}
