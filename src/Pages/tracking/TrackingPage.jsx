
//import axios from 'axios';
import api from '../../api';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Header } from "../../components/Header";
import { Link } from "react-router";
import './Tracking.css';


export function TrackingPage( {cart} ){

        const { orderId, productId } = useParams();

        const [order, setOrder] = useState(null);

        useEffect(() => {
        const getOrder = async () => {

            const response = await api.get(
                `/api/orders/${orderId}?expand=products`
            );

            setOrder(response.data);
        };

        getOrder();

    }, [orderId]);

        if (!order) {
        return null;
    }


    const orderProduct = order.products.find((product) => {
        return product.productId === productId;
    });

    const product = orderProduct.product;

    const totalDeliveryTimeMs = 
        orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

    const timePassedMs =
        dayjs().valueOf() - order.orderTimeMs;

    let deliveryPercent =
        (timePassedMs / totalDeliveryTimeMs) * 100;

    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }
    if (deliveryPercent < 0) {
        deliveryPercent = 0;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return(
        <>
            <title>Tracking Page</title>

            <Header cart={cart} />
            
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                    View all orders
                    </Link>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 
                            ? 'Delivered On '
                            : 'Arrivinng On '
                        }
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                    {product.name}
                    </div>

                    <div className="product-info">
                    Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={product.image} />

                    <div className="progress-labels-container">
                    <div className={`progress-level ${isPreparing && 'current-status'}`}>
                        Preparing
                    </div>
                    <div className={`progress-level ${isShipped && 'current-status'}`}>
                        Shipped
                    </div>
                    <div className={`progress-level ${isDelivered && 'current-status'}`}>
                        Delivered
                    </div>
                    </div>

                    <div className="progress-bar-container">
                    <div className="progress-bar"
                        style={{
                            width: `${deliveryPercent}%`
                        }}
                    ></div>
                    </div>
                </div>
            </div>
        </>
    );
}