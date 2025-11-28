import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/UserService';
import './Entry.css'; 
import background from '../assets/backround.jpeg'; 

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [role, setRole] = useState('');
    const [address, setAddress] = useState('');
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        role: '',
        address: ''
    });

    const navigate = useNavigate();

    const Register = async (e) => {
        e.preventDefault();
        const user = { username, email, password, gender, role, address };

        if (validateForm()) {
            try {
                const response = await createUser(user);
                console.log(response.data);
                setMsg(response.data);
                navigate("/login");
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                setMsg(error.response ? error.response.data : error.message);
            }
        }
    };

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        errorsCopy.username = username.trim() ? '' : 'Username Required!';
        errorsCopy.email = email.trim() ? '' : 'Email Required!';
        errorsCopy.password = password.trim() ? '' : 'Password Required!';
        errorsCopy.gender = gender.trim() ? '' : 'Gender Required!';
        errorsCopy.role = role.trim() ? '' : 'Role Required!';
        errorsCopy.address = address.trim() ? '' : 'Address Required!';

        for (const key in errorsCopy) {
            if (errorsCopy[key]) valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

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
                    <div className="card custom-card shadow-lg bg-light p-4">
                        <h2 className='text-center mb-3'>Register</h2>
                        <div className="card-body">
                            <form onSubmit={Register} method='post'>
                                {/* Username */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Username :</label>
                                    <input type="text"
                                        value={username}
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required />
                                    {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                                </div>

                                {/* Email */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Email :</label>
                                    <input type="email"
                                        value={email}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>

                                {/* Password */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Password :</label>
                                    <input type="password"
                                        value={password}
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required />
                                    {errors.password && <div className='invalid-feedback'>{errors.password}</div>}
                                </div>

                                {/* Gender */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Gender :</label><br />
                                    {['male', 'female', 'other'].map((g) => (
                                        <div className="form-check form-check-inline" key={g}>
                                            <input className="form-check-input" type="radio" name="gender" value={g}
                                                onChange={(e) => setGender(e.target.value)} />
                                            <label className="form-check-label">{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                                        </div>
                                    ))}
                                    {errors.gender && <div className='invalid-feedback d-block'>{errors.gender}</div>}
                                </div>

                                {/* Role */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Role :</label><br />
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="role" value="admin"
                                            onChange={(e) => setRole(e.target.value)} disabled />
                                        <label className="form-check-label">Admin</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="role" value="customer"
                                            onChange={(e) => setRole(e.target.value)} />
                                        <label className="form-check-label">Customer</label>
                                    </div>
                                    {errors.role && <div className='invalid-feedback d-block'>{errors.role}</div>}
                                </div>

                                {/* Address */}
                                <div className="form-group mb-2">
                                    <label className='form-label'>Address :</label>
                                    <textarea rows="3"
                                        value={address}
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required />
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>

                                {/* Submit */}
                                <div className='text-center'>
                                    <button className='btn btn-success rounded-pill px-4' type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                        {msg && <h6 className="text-center border border-dark p-2 rounded text-danger">{msg}</h6>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
