package com.PlayForYouApp.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PlayForYouApp.project.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, Integer>
{

}
