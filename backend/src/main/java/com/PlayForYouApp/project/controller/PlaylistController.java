package com.PlayForYouApp.project.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.PlayForYouApp.project.entities.Playlist;
import com.PlayForYouApp.project.entities.Song;
import com.PlayForYouApp.project.services.PlaylistService;
import com.PlayForYouApp.project.services.SongService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {

	@Autowired
	PlaylistService pserv;

	@Autowired
	SongService sserv;

	@GetMapping("/getSongs")
	public List<Song> getSongs(Model model)
	{
		//fetch all songs
		return sserv.fetchAllSongs();

	}

	@PostMapping("/addPlaylist")
	public ResponseEntity<String> addPlaylist(@RequestBody Playlist playlist) {
		// Check if playlist is null
		System.out.println(playlist);
		if (playlist == null) {
			return ResponseEntity.badRequest().body("Playlist cannot be null");
		}

		// Check if playlist has songs
		List<Song> songList = playlist.getSong();
		if (songList == null || songList.isEmpty()) {
			return ResponseEntity.badRequest().body("Playlist must have at least one song");
		}

		try {
			// Adding playlist to table
			pserv.addPlaylist(playlist);

			// Updating song table
			for (Song s : songList) {
				s.getPlaylist().add(playlist);
				sserv.updateSong(s);
			}

			return ResponseEntity.ok("Playlist added successfully");

		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Error adding playlist: " + e.getMessage());
		}
	}



	@GetMapping("/playlists")
	public List<Playlist> allPlaylists()
	{
		//returning the list of playlists
		return pserv.fetchAllPlaylists();
	}
}
