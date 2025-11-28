import React, { useState } from 'react';
import addProduct from '../services/SongService'; // keep service name

function AddSong() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [msg, setMsg] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const product = { name, type, quantity, price, lyrics: description };

        try {
            const response = await addProduct(product);
            if (response) {
                console.log(response);
                setMsg("Product added successfully");
                // Clear form
                setName(""); setType(""); setQuantity(0); setPrice(0); setDescription("");
            }
        } catch (error) {
            console.error('Error:', error);
            setMsg("Failed to add product");
        }
    };

    // Styles for the card container - you can adjust width & height here
    const cardStyle = {
        width: '90%',       // Change width of the box
        maxWidth: '800px',  // Max width for large screens
        minHeight: '500px', // Minimum height
        margin: 'auto',
        padding: '20px'
    };

    return (
        <div className='container my-5'>
            <div className="card shadow" style={cardStyle}>
                <h2 className='text-center mb-4'>Add Product</h2>
                <div className="card-body">
                    <form onSubmit={handleAddProduct}>
                        <div className="form-group mb-3">
                            <label className='form-label'>Product Name:</label>
                            <input type="text" placeholder='Enter product name' value={name}
                                className='form-control' onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label className='form-label'>Type / Category:</label>
                            <input type="text" placeholder='Enter type/category' value={type}
                                className='form-control' onChange={(e) => setType(e.target.value)} required />
                        </div>
                        <div className="form-group mb-3">
                            <label className='form-label'>Quantity:</label>
                            <input type="number" placeholder='Enter quantity' value={quantity}
                                className='form-control' onChange={(e) => setQuantity(Number(e.target.value))} required />
                        </div>
                        <div className="form-group mb-3">
                            <label className='form-label'>Price:</label>
                            <input type="number" placeholder='Enter price' value={price}
                                className='form-control' onChange={(e) => setPrice(Number(e.target.value))} required />
                        </div>
                        <div className="form-group mb-3">
                            <label className='form-label'>Description:</label>
                            <textarea placeholder='Enter product description' value={description}
                                className='form-control' rows={6}
                                onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-success px-4 py-2' type='submit'>Add Product</button>
                        </div>
                    </form>
                </div>
                {msg && <h6 className="text-center border border-dark p-2 rounded text-danger mt-3">{msg}</h6>}
            </div>
        </div>
    );
}

export default AddSong;
