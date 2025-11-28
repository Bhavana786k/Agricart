import axios from 'axios';

const API_URL = "http://localhost:8080/cart"; // change if deployed

// Fetch cart items for a user
export const fetchCart = async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User ID not found in localStorage");
  
  try {
    const response = await axios.get(`${API_URL}`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (item) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User ID not found in localStorage");

  try {
    const response = await axios.post(`${API_URL}/add`, null, {
      params: {
        userId,
        itemId: item.id,
        itemName: item.title,
        quantity: item.quantity,
        price: item.price
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Update item quantity
export const updateCartQuantity = async (itemId, quantity) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User ID not found in localStorage");

  try {
    const response = await axios.put(`${API_URL}/update`, null, {
      params: { userId, itemId, quantity }
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

// Remove item from cart
export const removeCartItem = async (itemId) => {
  const userId = localStorage.getItem("userId");
  if (!userId) throw new Error("User ID not found in localStorage");

  try {
    const response = await axios.delete(`${API_URL}/remove`, { params: { userId, itemId } });
    return response.data;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
};
