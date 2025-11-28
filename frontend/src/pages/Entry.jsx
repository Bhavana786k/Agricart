import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Entry.css';
import logo from '../assets/agricart.jpeg';
import background from '../assets/backround.jpeg';

function Entry() {
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    return (
        <div style={backgroundStyle}>
            <div className="container">
                <div className="row">
                    <div className="card col-md-10 offset-md-1 bg-light shadow">
                        <div className="card-body text-center">
                            <img src={logo} alt="App Logo" style={{ width: '150px', marginBottom: '20px' }} />
                            
                            <h1><strong>Bringing Freshness Home</strong></h1>
                            <div className='d-grid gap-2 mt-4'>
                                <button className='btn btn-success rounded-pill p-3' onClick={() => navigate("/register")}>Sign Up</button>
                                <button className='btn btn-success rounded-pill p-3' onClick={() => navigate("/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Entry;
