import { getProductWithID } from "../../data/products.js";
import { updateCartItem, removeCartItem, getCartItems, updateDeliveryDate } from "../../data/cart.js";
import { formatCurrencyAsString } from "../utils/utilities.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { updatePaymentSummary } from "./paymentSummary.js"


function formatDeliveryDate(deliveryID)
{
    return dayjs().add(getDeliveryOption(deliveryID).deliveryDays, "days").format("dddd, MMMM D")
}

function generateDeliveryOptionsHTML(productID, productDeliveryID)
{
    let html = "";

    deliveryOptions.forEach((options) => {
        html += `
            <div name="delivery-options" class="delivery-option" data-id="${productID}" data-delivery-id="${options.id}">
                <input type="radio" ${(options.id == productDeliveryID) ? "checked" : ""}
                    class="delivery-option-input"
                    name="delivery-option-${productID}">
                <div>
                    <div class="delivery-option-date">
                        ${formatDeliveryDate(options.id)}
                    </div>
                    <div class="delivery-option-price">
                        ${(options.deliveryCost === 0) 
                            ? "FREE Shipping" 
                            : "$" + formatCurrencyAsString(options.deliveryCost) + " - Shipping"}
                    </div>
                </div>
            </div>`;
    });

    return html;
}

function updateOrderSummary()
{
    let orderSummaryHTML = "";

    const cart = getCartItems();
    console.log(cart);

    cart.forEach((e) => {
        let product = getProductWithID(e.productID);

        orderSummaryHTML += `
            <div id="js-${e.productID}-container" class="cart-item-container">
                <div class="delivery-date">
                    Delivery date: ${formatDeliveryDate(e.productDeliveryID)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src=${product.image}>

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${product.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrencyAsString(product.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span id="js-${e.productID}-quantity" class="quantity-label">${e.productQuantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" name="update-button" data-id=${e.productID}>
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary" name="delete-button" data-id=${e.productID}>
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        ${generateDeliveryOptionsHTML(e.productID, e.productDeliveryID)}
                    </div>
                </div>
            </div>`;
    });

    document.getElementById("js-order-summary").innerHTML = orderSummaryHTML;

    let updateButtons = document.getElementsByName("update-button");
    updateButtons.forEach((element) => {
        element.onclick = () => {
            updateCartItem(element.dataset.id, 1);
            updateOrderSummary();
        }
    });

    let deleteButtons = document.getElementsByName("delete-button");
    deleteButtons.forEach((element) => {
        element.onclick = () => {
            removeCartItem(element.dataset.id, "all");
            updateOrderSummary();
        };
    });

    let deliveryRadioButtons = document.getElementsByName("delivery-options");
    deliveryRadioButtons.forEach((element) => {
        element.onclick = () => {
            updateDeliveryDate(element.dataset.id, element.dataset.deliveryId);
            updateOrderSummary();
        }
    });

    updatePaymentSummary();
}


updateOrderSummary();