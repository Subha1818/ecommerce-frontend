import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
    return (
        <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((cartItem) => {

                const selectedDeliveryOption = deliveryOptions.find(
                    (deliveryOption) =>
                        deliveryOption.id === cartItem.deliveryOptionId
                );

                return (
                    <div
                        key={cartItem.productId}
                        className="cart-item-container"
                    >

                        <div className="delivery-date">
                            Delivery date:{" "}
                            {dayjs(
                                selectedDeliveryOption.estimatedDeliveryTimeMs
                            ).format("dddd, MMMM D")}
                        </div>

                        <div className="cart-item-details-grid">

                            <img
                                className="product-image"
                                src={cartItem.product.image}
                            />

                            <CartItemDetails
                                cartItem={cartItem}
                                loadCart={loadCart}
                            />

                            <DeliveryOptions
                                cartItem={cartItem}
                                deliveryOptions={deliveryOptions}
                                loadCart={loadCart}
                            />

                        </div>
                    </div>
                );
            })}

        </div>
    );
}