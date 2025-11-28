import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import RazorpayPayment from '../payment/RazorpayPayment';
import { logoutUser, fetchUserByEmail } from '../services/UserService';
import Songs from '../pages/Songs';
import UpdatePasswordForm from '../pages/UpdatePasswordForm';
import { IoPersonOutline } from "react-icons/io5";

// Images
import tomato from "../assets/tomato.jpeg";
import potato from "../assets/potato.jpeg";
import apples from "../assets/apples.jpeg";
import ladiesfinger from "../assets/ladiesfinger.jpeg";

// Cart service
import { fetchCart, addToCart, updateCartQuantity, removeCartItem } from '../services/CartService';

function CustomerHome() {

  const [showSongs, setShowSongs] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [premium, setPremium] = useState(false);
  const [username, setUsername] = useState('');
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("email");

  // Hardcoded products
  const products = [
    { id: 1, title: "Tomato", price: 120, img: tomato },
    { id: 2, title: "Potato", price: 60, img: potato },
    { id: 3, title: "Apple", price: 180, img: apples },
    { id: 4, title: "Ladies Finger", price: 90, img: ladiesfinger }
  ];

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    products.forEach(p => initialQuantities[p.id] = 0);
    setQuantities(initialQuantities);
  }, []);

  // Fetch user info, premium status, and cart
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetchUserByEmail(userEmail);
        if(user) setUsername(user.username);

        const premiumResp = await fetch(`http://localhost:8080/api/premiumStatus?email=${userEmail}`);
        const premiumStatus = await premiumResp.json();
        setPremium(premiumStatus === true);

        const cart = await fetchCart(userId);
        setCartItems(cart.items || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userId, userEmail]);

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  // Quantity handlers
  const increaseQty = (id) => setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
  const decreaseQty = (id) => setQuantities(prev => ({ ...prev, [id]: prev[id] > 0 ? prev[id] - 1 : 0 }));

  // Cart actions
  const handleAddToCart = async (item) => {
    const quantity = quantities[item.id];
    if(quantity <= 0) return alert("Please select quantity!");

    try {
      await addToCart(userId, {
        id: item.id,
        title: item.title,
        price: item.price,
        quantity
      });
      setQuantities(prev => ({ ...prev, [item.id]: 0 }));
      const cart = await fetchCart(userId);
      setCartItems(cart.items || []);
      alert(`${item.title} added to cart!`);
    } catch (error) {
      console.error(error);
      alert("successfully added to the cart!");
    }
  };

  const handleUpdateQuantity = async (itemId, newQty) => {
    if(newQty <= 0) return handleRemoveFromCart(itemId);
    try {
      await updateCartQuantity(userId, itemId, newQty);
      const cart = await fetchCart(userId);
      setCartItems(cart.items || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await removeCartItem(userId, itemId);
      const cart = await fetchCart(userId);
      setCartItems(cart.items || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar expand="lg" bg="dark" variant="dark">
        <Navbar.Brand
          as={Link}
          to="#"
          onClick={() => { setShowHome(true); setShowSongs(false); setShowPay(false); setShowUpdatePass(false); }}
          className="mx-3"
        >
          AgriCart
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link onClick={() => { setShowSongs(true); setShowHome(false); setShowPay(false); setShowUpdatePass(false); }}>Products</Nav.Link>
            {premium ? <Nav.Link disabled>Subscribed</Nav.Link> :
                       <Nav.Link onClick={() => { setShowPay(true); setShowHome(false); setShowSongs(false); setShowUpdatePass(false); }}>Payment</Nav.Link>}
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
              <IoPersonOutline style={{ marginRight: '5px' }} /> {username}
            </Nav.Link>
            <Nav.Link onClick={() => { setShowUpdatePass(true); setShowHome(false); setShowPay(false); setShowSongs(false); }}>
              Change Password
            </Nav.Link>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* HOME / PRODUCTS */}
      {showHome && (
        <div className="container mt-4">
          <Row>
            {products.map(item => (
              <Col md={3} key={item.id} className="mb-4">
                <div className="card shadow-sm" style={{ borderRadius: "16px" }}>
                  <img src={item.img} className="card-img-top" alt={item.title} style={{ height: "180px", objectFit: "cover" }} />
                  <div className="card-body text-center">
                    <h5>{item.title}</h5>
                    <p>₹{item.price}</p>
                    <div style={{ display:"flex", justifyContent:"center", gap:"10px", marginBottom:"10px" }}>
                      <button className="btn btn-outline-danger" onClick={() => decreaseQty(item.id)}>-</button>
                      <span>{quantities[item.id]}</span>
                      <button className="btn btn-outline-success" onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <button className="btn btn-primary w-100" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* CART */}
          {cartItems.length > 0 && (
            <div className="mt-5">
              <h3>Your Cart</h3>
              <ul className="list-group">
                {cartItems.map(item => (
                  <li key={item.itemId} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.itemName} - ₹{item.price} x {item.quantity}
                    <div>
                      <button className="btn btn-sm btn-success mx-1" onClick={() => handleUpdateQuantity(item.itemId, item.quantity + 1)}>+</button>
                      <button className="btn btn-sm btn-danger mx-1" onClick={() => handleUpdateQuantity(item.itemId, item.quantity - 1)}>-</button>
                      <button className="btn btn-sm btn-secondary mx-1" onClick={() => handleRemoveFromCart(item.itemId)}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showPay && <RazorpayPayment />}
      {showSongs && <Songs />}
      {showUpdatePass && <UpdatePasswordForm />}
    </div>
  );
}

export default CustomerHome;
