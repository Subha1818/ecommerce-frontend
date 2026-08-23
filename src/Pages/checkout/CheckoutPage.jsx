import axios from 'axios';
import { useEffect, useState } from 'react';

import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import './checkout-header.css';
import './CheckoutPage.css';



export function CheckoutPage( {cart, loadCart}  ) {

    const[deliveryOptions, setDeliveryOptions] =  useState([]);
    const[paymentSummary, setPaymentSummary] = useState(null);

    useEffect(()=>{

        const fetchPaymentSummary = async() => {
            const response = await axios.get('/api/payment-summary');
                    setPaymentSummary(response.data);
            }
        
        fetchPaymentSummary();
    }, [cart]);

    useEffect(()=>{

        const fetchDeliveryOption = async() => { 
            const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
                setDeliveryOptions(response.data); 
        }
        fetchDeliveryOption();
    },[]);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/Cart-favicon.png" />
            <title>Checkout</title> 
            

            <CheckoutHeader/>
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    );
}