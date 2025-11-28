package com.PlayForYouApp.project.services;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.PlayForYouApp.project.entities.Song;
import com.PlayForYouApp.project.repositories.SongRepository;

@Service
public class SongServiceImpl implements SongService {

    @Autowired
    private SongRepository repo;

    @Override
    public String addSong(Song song) {
        repo.save(song);
        return "Product Added";
    }

    @Override
    public boolean songExists(String name) {
        Song song = repo.findByName(name);
        return song != null;
    }

    @Override
    public List<Song> fetchAllSongs() {
        return repo.findAll();
    }

    @Override
    public void updateSong(Song song) {
        repo.save(song);
    }

    @Override
    public List<Song> getSongsByIds(List<Integer> songIds) {
        return repo.findAllById(songIds);
    }
}
