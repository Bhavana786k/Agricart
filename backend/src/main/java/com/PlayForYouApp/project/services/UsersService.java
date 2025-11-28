package com.PlayForYouApp.project.services;

import java.util.List;

import com.PlayForYouApp.project.entities.Users;

public interface UsersService
{

	public String addUser(Users user);
	
	public boolean emailExists(String email);
	
	public boolean validateUser(String email, String password);
	
	public String checkRole(String email);
	
	public List<Users> getAllCustomers(String role);

	public Users getUser(String email);
	
	public void updateUser(Users user);
}
