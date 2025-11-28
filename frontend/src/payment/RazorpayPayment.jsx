import React, { useEffect, useState } from 'react';
import axios from 'axios';


const RazorpayPaymentButton = () => {

    const [orderId, setOrderId] = useState("");

    const getOrderId = async () => {
        try {
            const orderData = await axios.post('http://localhost:8080/payment/createOrder');
            setOrderId(orderData.id)
        } catch (error) {
            console.error(error);
        }
    }

    const paySuccess = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const response = await axios.get(`http://localhost:8080/payment/paymentSuccess?email=${userEmail}`);
                console.log(response.data);
            } else {
                console.error('User email not found in localStorage');
            }
        } catch (error) {
            console.error(error);
        }
    }


    const verifyPayment = async (orderId, paymentId, signature) => {
        try {
            const formData = new FormData();
            formData.append('orderId', orderId);
            formData.append('paymentId', paymentId);
            formData.append('signature', signature);

            const isValid = await axios.post('http://localhost:8080/payment/verify', formData)
            console.log(isValid);
            if (isValid) {
                paySuccess();
                alert("Payment successful");
            } else {
                alert("Payment failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    useEffect(() => {
        const loadRazorpay = async () => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            document.body.appendChild(script);
        };

        loadRazorpay();
        getOrderId();

        return () => {
            document.body.removeChild(document.body.lastChild);
        };
    }, []);


    // const handlePaymentSuccess = (response) => {
    //     // alert(response.razorpay_payment_id);
    //     // alert(response.razorpay_order_id);
    //     // alert(response.razorpay_signature);
    // };

    const handlePaymentFailure = (response) => {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    };

    const openPaymentModal = () => {

        const options = {
            key: 'rzp_test_cIPHMs9jCYhJUB', // Enter the Key ID generated from the Dashboard
            amount: '9900', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: 'Play For You',
            description: 'Premium Subscription',
            image: 'https://example.com/your_logo',
            order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: function (response) {
                verifyPayment(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
            },
            prefill: {
                name: 'Shriharsh Pattar',
                email: 'shriharsh@gmail.com',
                contact: '9000090000',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', handlePaymentFailure);

        rzp1.open();
    };

    return (
        <div className="text-center mt-5">
            <h2>Click here to pay and subscribe</h2>
            <button id="rzp-button1" className="btn btn-primary mt-3" onClick={openPaymentModal}>
                Subscribe
            </button>
        </div>
    );
};

export default RazorpayPaymentButton;
