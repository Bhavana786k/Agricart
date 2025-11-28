import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdatePasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/updatePassword', { email, password: newPassword });
            console.log(response.data);
            setError(response.data) // Assuming the response contains a success message
            // Handle success, e.g., display a success message to the user
        } catch (error) {
            console.error('Error updating password:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    // Fetch email from localStorage on component mount
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        setEmail(userEmail);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <h2 className="card-header text-center">Update Your Password</h2>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="userEmail" className="form-label">User Email:</label>
                                    <input type="text" id="userEmail" className="form-control" value={email} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                                    <input type="password" id="newPassword" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                    <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>
                                {error && <div className="text-danger mb-3">{error}</div>}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UpdatePasswordForm;
