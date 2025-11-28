package com.PlayForYouApp.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.PlayForYouApp.project.entities.Users;

public interface UsersRepository extends JpaRepository<Users, Integer>
{
	public Users findByEmail(String email);
	
	public List<Users> findByRole(String role);
}
