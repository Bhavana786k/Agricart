package com.PlayForYouApp.project.services;

import java.util.List;

import com.PlayForYouApp.project.entities.Playlist;

public interface PlaylistService {

	public void addPlaylist(Playlist playlist);
	
	public List<Playlist> fetchAllPlaylists();
	
}
