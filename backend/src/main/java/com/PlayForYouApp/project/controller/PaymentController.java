package com.PlayForYouApp.project.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.PlayForYouApp.project.entities.Users;
import com.PlayForYouApp.project.services.UsersService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin("*")
@RestController
@RequestMapping("/payment")
public class PaymentController 
{	
	@Autowired
	UsersService userv;
	
	@PostMapping("/createOrder")
	public String createOrder()
	{
		Order order = null;
		try {
			RazorpayClient razorpay = new RazorpayClient("rzp_test_cIPHMs9jCYhJUB", "71Nk77kern9zqosMapNd0vMm");

			JSONObject orderRequest = new JSONObject();
			orderRequest.put("amount",9900);
			orderRequest.put("currency","INR");
			orderRequest.put("receipt", "receipt#1");
			JSONObject notes = new JSONObject();
			notes.put("Premium Subscription","Tea, Earl Grey, Hot");
			orderRequest.put("notes",notes);

			order = razorpay.orders.create(orderRequest);
		} catch (Exception e) {
			System.out.println("Exception while creating order");
		}
		return order.toString();
	}


	@PostMapping("/verify")
	public boolean verifyPayment(@RequestParam  String orderId, @RequestParam String paymentId, @RequestParam String signature) {
		try {
			// Initialize Razorpay client with your API key and secret
			RazorpayClient razorpayClient = new RazorpayClient("rzp_test_cIPHMs9jCYhJUB", "71Nk77kern9zqosMapNd0vMm");
			// Create a signature verification data string
			String verificationData = orderId + "|" + paymentId;

			// Use Razorpay's utility function to verify the signature
			boolean isValidSignature = Utils.verifySignature(verificationData, signature, "71Nk77kern9zqosMapNd0vMm");

			return isValidSignature;
		} catch (RazorpayException e) {
			e.printStackTrace();
			return false;
		}
	}
	
	//updating user to premium user 
	
	@GetMapping("/paymentSuccess")
	public String paymentSuccess(@RequestParam String email) {
	    System.out.println(email);
	    
	    Users user = userv.getUser(email);
	    user.setPremium(true);
	    
	    userv.updateUser(user);
	    
	    System.out.println(user);
	    return "login";
	}
	
	//payment-failure
	
//	@GetMapping("/payment-failure")
//	public String paymentFail()
//	{
//		return "login";
//	}
//	
}