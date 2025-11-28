import axios from "axios";

const PLAYLIST_URL = 'http://localhost:8080/api/playlist'

export const songsForPlaylist = async () => {
    try {
        const response = await axios.get(PLAYLIST_URL + '/getSongs');
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

export const createPlaylist = async (playlist) => {
    try {
        const response = await axios.post(PLAYLIST_URL + '/addPlaylist', playlist, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000' // Origin of your frontend application
            }
        });
        return response; // Return the entire response object
    } catch (error) {
        console.error('Error creating playlist', error);
        throw error;
    }
};
