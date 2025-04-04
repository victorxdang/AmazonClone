import { getProductWithID } from "../../data/products.js";
import { getCartItems } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrencyAsString } from "../utils/utilities.js";


export function updatePaymentSummary()
{
    let shippingCost = 0;
    let orderQuantity = 0;
    let orderCost = 0;

    const cart = getCartItems();
    cart.forEach((item) => {
        orderQuantity += item.productQuantity;
        shippingCost += getDeliveryOption(item.productDeliveryID).deliveryCost;
        orderCost += (getProductWithID(item.productID).priceCents * item.productQuantity);
    });

    const subtotal = orderCost + shippingCost;
    const taxes = subtotal * 0.1;

    let html = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${orderQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrencyAsString(orderCost)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrencyAsString(shippingCost)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrencyAsString(subtotal)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrencyAsString(taxes)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrencyAsString(subtotal + taxes)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>
    `;

    document.getElementById("js-checkout-header-quantity").innerHTML = `${orderQuantity} items`;
    document.getElementById("js-payment-summary").innerHTML = html;
}