import React, { useState, useEffect } from 'react'
import { createPlaylist, songsForPlaylist } from '../services/PlaylistService'

function Playlist() {

    const [playlistName, setPlaylistName] = useState("");
    const [songs, setSongs] = useState([]);
    const [playlistSongs, setPlaylistSongs] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        const getSongs = async () => {
            try {
                const songsData = await songsForPlaylist();
                setSongs(songsData);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        getSongs();
    }, []);

    const addPlaylist = async (e) => {
        e.preventDefault();

        const playlist = {
            playlistName, playlistSongs
        }

        console.log(playlist);

        try {
            const response = await createPlaylist(playlist);
            console.log(response);
            setMsg(response.data); // Assuming the message is in response.data
        } catch (error) {
            console.error(error);
            setMsg(error.response.data); // Assuming the error message is in error.response.data
        }
    };

    const handleSongCheckboxChange = (e, songId) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            // If the checkbox is checked, find the Song object by its id
            const selectedSong = songs.find(song => song.id === songId);
            // Add the selected Song object to the selected songs list
            setPlaylistSongs(prevSongs => [...prevSongs, selectedSong]);
        } else {
            // If the checkbox is unchecked, remove the Song object from the selected songs list
            setPlaylistSongs(prevSongs => prevSongs.filter(song => song.id !== songId));
        }
    };


    return (
        <div>
            <div className='container'>
                <br /><br />
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3 shadow">
                        <h2 className='text-center m-2'>Create Playlist</h2>
                        <div className="card-body p-4">
                            <form onSubmit={addPlaylist} method='post'>
                                <div className="form-group mb-2">
                                    <input type="text"
                                        placeholder='Enter Playlist name'
                                        name='playlistName'
                                        value={playlistName}
                                        className='form-control border border-dark'
                                        onChange={(e) => setPlaylistName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <div className='row'>
                                        {songs.map(song => (
                                            <div key={song.id} className='col-md-6'>
                                                <div className="form-group row">
                                                    <div className='col-sm-1 my-2'>
                                                        <input type="checkbox"
                                                            id={`songCheckbox-${song.id}`}
                                                            value={song.id}
                                                            className="form-check-input border-dark mx-auto"
                                                            onChange={(e) => handleSongCheckboxChange(e, song.id)}
                                                        />
                                                    </div>
                                                    <label htmlFor={`songCheckbox-${song.id}`} className='col-sm-11 col-form-label'>{song.name}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='text-center'>
                                        <button className='btn btn-success' type='submit' value='SUBMIT FORM'>Create Playlist</button>
                                    </div>
                                </div>
                            </form>
                            {msg && <h4>{msg}</h4>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Playlist