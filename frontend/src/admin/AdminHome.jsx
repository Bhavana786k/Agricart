import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import AddSong from '../admin/AddSong';
import Songs from '../pages/Songs';
import Customers from './Customers';
import { logoutUser } from '../services/UserService';

const AdminHome = () => {
    const [showAddSong, setShowAddSong] = useState(false);
    const [showSongs, setShowSongs] = useState(false);
    const [showCust, setShowCust] = useState(true);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Clear local storage or session storage
            localStorage.clear();
            sessionStorage.clear();

            // Send logout request to the server
            await logoutUser();

            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={Link} to="/">Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" aria-label="Toggle navigation" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Row className="w-100">
                        {/* Left Column: Navigation Links */}
                        <Col className="col-lg-6">
                            <Nav className="mr-auto">
                                <Nav.Link
                                    onClick={() => {
                                        setShowAddSong(true);
                                        setShowSongs(false);
                                        setShowCust(false);
                                    }}
                                >
                                    Add New Product
                                </Nav.Link>
                                <Nav.Link
                                    onClick={() => {
                                        setShowAddSong(false);
                                        setShowSongs(true);
                                        setShowCust(false);
                                    }}
                                >
                                    All Products
                                </Nav.Link>
                                <Nav.Link
                                    onClick={() => {
                                        setShowAddSong(false);
                                        setShowSongs(false);
                                        setShowCust(true);
                                    }}
                                >
                                    User List
                                </Nav.Link>
                            </Nav>
                        </Col>

                        {/* Right Column: Logout Button */}
                        <Col className="col-lg-6">
                            <Nav className="ml-auto justify-content-end">
                                <Button
                                    variant="secondary"
                                    className="p rounded-sm text-white"
                                    onClick={handleLogout}
                                >
                                    Sign Out
                                </Button>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar.Collapse>
            </Navbar>

            {/* Conditional Rendering */}
            {showCust && <Customers />}
            {showAddSong && <AddSong />}
            {showSongs && <Songs />}
        </div>
    );
};

export default AdminHome;
