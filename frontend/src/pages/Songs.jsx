import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchSongs } from '../services/SongService'; // updated import
import background from '../assets/backround.jpeg';
import './Songs.css';

function Songs() {
    const [songs, setSongs] = useState([]); // renamed from products to songs

    useEffect(() => {
        const getAllSongs = async () => {
            try {
                const data = await fetchSongs(); // updated function name
                setSongs(data);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        getAllSongs();
    }, []);

    return (
        <div className="songs-page" style={{ backgroundImage: `url(${background})` }}>
            <div className="overlay">
                <div className="container-fluid songs-container py-5">
                    <h2 className="text-center text-white mb-4">All items</h2>
                    <Table striped bordered hover variant="dark" responsive className="rounded-3 overflow-hidden">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {songs.map((song, index) => (
                                <tr key={song.id}>
                                    <td>{index + 1}</td>
                                    <td>{song.name}</td>
                                    <td>{song.type}</td>
                                    <td>{song.quantity}</td>
                                    <td>₹{song.price}</td>
                                    <td>{song.lyrics}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}

export default Songs;
