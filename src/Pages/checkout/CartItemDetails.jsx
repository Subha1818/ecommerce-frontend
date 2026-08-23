//import axios from "axios";
import api from "../../api";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {

    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await api.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    };

    const updateQuantity = async () => {

        if (isUpdating) {
            await api.put(`/api/cart-items/${cartItem.productId}`, {
                quantity: Number(quantity)
            });

            await loadCart();
        }

        setIsUpdating(!isUpdating);
    };

    return (
        <div className="cart-item-details">

            <div className="product-name">
                {cartItem.product.name}
            </div>

            <div className="product-price">
                {formatMoney(cartItem.product.priceCents)}
            </div>

            <div className="product-quantity">

                {isUpdating ? (
                    <input
                        type="text"
                        className="quantity-input"
                        value={quantity}
                        onChange={(event) => {
                            setQuantity(event.target.value);
                        }}

                        // onKeyDown={(event) => {
                        //     if (event.key === 'Enter') {
                        //         event.preventDefault();
                        //         updateQuantity();
                        //     }

                        //     if (event.key === 'Escape') {
                        //         event.preventDefault();
                        //         setQuantity(cartItem.quantity);
                        //         setIsUpdating(false);
                        //     }
                        // }}
                    />
                ) : (
                    <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                            {cartItem.quantity}
                        </span>
                    </span>
                )}

                <div className="cart-actions"></div>
                {/* <span
                    className="update-quantity-link link-primary"
                    onClick={updateQuantity}
                >
                    {isUpdating ? "Save" : "Update"}
                </span>

                <span
                    className="delete-quantity-link link-primary"
                    onClick={deleteCartItem}
                >
                    Delete
                </span> */}

                <div className="cart-actions">
                    <button
                        className="update-button"
                        onClick={updateQuantity}
                    >
                        {isUpdating ? "Save" : "Update"}
                    </button>

                    <button
                        className="delete-button"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </button>
                </div>

            </div>

        </div>
    );
}