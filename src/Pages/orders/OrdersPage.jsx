import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';

import { formatMoney } from '../../utils/money';
import { Header } from '../../components/Header';
import './OrdersPage.css';

import buyAgainIcon from '../../assets/images/icons/buy-again.png';


export function OrdersPage( {cart, loadCart}){

    const[orders, setOrders] = useState([]);
    

    useEffect(()=>{
        const fetchOrderData = async() =>{
            const response = await axios.get('/api/orders?expand=products');
                setOrders(response.data);
        }

        fetchOrderData();
    },[]);

    const addToCart = async (orderProduct) => {
    await axios.post('/api/cart-items', {
        productId: orderProduct.product.id,
        quantity: orderProduct.quantity
    });

    await loadCart();
};

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

            <Header cart={cart} />


            <div className="orders-page">
            <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order)=>{
                        return(
                            <div key={order.id} className="order-container">

                            <div className="order-header">
                                <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{dayjs(order.orderTimeMS).format('MMMM D')}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div> {formatMoney(order.totalCostCents)} </div>
                                </div>
                                </div>

                                <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{order.id}</div>
                                </div>
                            </div>

                            <div className="order-details-grid">

                                {order.products.map((orderProduct)=>{
                                    return(
                                        <Fragment key={orderProduct.product.id}>
                                            <div className="product-image-container">
                                            <img src={orderProduct.product.image} />
                                            </div>

                                            <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {orderProduct.quantity}
                                            </div>
                                            <button className="buy-again-button button-primary"
                                                onClick={() => addToCart(orderProduct)}>
                                                <img className="buy-again-icon" src={buyAgainIcon} />
                                                <span className="buy-again-message"
                                                >Add to Cart</span>
                                            </button>
                                            </div>

                                            <div className="product-actions">
                                            <a href={`/tracking/${order.id}/${orderProduct.productId}`}>
                                                <button className="track-package-button button-secondary">
                                                Track package
                                                </button>
                                            </a>
                                            </div>
                                        </Fragment>
                                    );

                                })}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}