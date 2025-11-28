import React, { useState } from 'react';
import { loginUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import background from '../assets/backround.jpeg'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await loginUser(loginData);
            console.log(response);
            if (response === 'adminHome') {
                navigate('/admin');
            } else if (response === 'customerHome') {
                localStorage.setItem('userEmail', loginData.email);
                navigate('/customer');
            } else {
                setError('Login failed');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
            setError('Login failed !! Invalid Credentials');
        }
    };

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
            <div className='container-fluid'>
                <div className="row justify-content-center">
                    <div className="card custom-card shadow bg-light p-4">
                        <h2 className='text-center mb-3'>Login</h2>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    <label htmlFor='email' className='form-label'>User Email:</label>
                                    <input
                                        type="email"
                                        placeholder='Enter Email'
                                        name='email'
                                        value={email}
                                        className='form-control'
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor='password' className='form-label'>Password:</label>
                                    <input
                                        type="password"
                                        placeholder='Enter Password'
                                        name='password'
                                        value={password}
                                        className='form-control'
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='text-center'>
                                    <button className='btn btn-success px-4 rounded-pill' type='submit'>Login</button>
                                </div>
                                {error && <div className="mt-3 text-danger text-center fw-bold">{error}</div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
