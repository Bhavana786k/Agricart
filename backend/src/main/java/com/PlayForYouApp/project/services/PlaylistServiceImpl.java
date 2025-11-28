package com.PlayForYouApp.project.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PlayForYouApp.project.entities.Playlist;
import com.PlayForYouApp.project.repositories.PlaylistRepository;

@Service
public class PlaylistServiceImpl implements PlaylistService
{
	@Autowired
	PlaylistRepository prepo;

	@Override
	public void addPlaylist(Playlist playlist) {
		prepo.save(playlist);
	}

	@Override
	public List<Playlist> fetchAllPlaylists() {
		return prepo.findAll();
	}
	
	
}
