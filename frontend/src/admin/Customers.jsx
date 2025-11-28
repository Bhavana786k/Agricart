import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { fetchUserData } from '../services/UserService'

function Customers() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetchUserData();
                console.log(userData);
                setUsers(userData); // Update the state with fetched user data
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        getUsers(); // Call the function to fetch user data
    }, []);

    return (
        <div className='container my-5'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Premium Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.gender}</td>
                            <td>{user.address}</td>
                            <td>{user.premium === true ? 'Premium' : 'NotPremium'}</td> {/* Assuming isPremium is a boolean */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Customers;