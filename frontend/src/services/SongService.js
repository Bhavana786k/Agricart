import axios from 'axios';

// Base URL of Spring Boot backend
const API_URL = 'http://localhost:8080/product'; // matches your backend controller

// Add a new product/song
const addSong = async (song) => {
    try {
        const response = await axios.post(`${API_URL}/add`, song, {
            headers: {
                'Content-Type': 'application/json' // frontend sends JSON
            }
        });
        return response.data; // Returns success message or error from backend
    } catch (error) {
        console.error('Error adding song:', error);
        throw error.response?.data || error;
    }
};

// Fetch all products/songs
export const fetchSongs = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data; // Returns array of songs/products
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

export default addSong;
