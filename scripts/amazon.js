import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { formatCurrencyAsString } from "./utils/utilities.js";


function displayAllProducts()
{
    let productsHTML = "";
    let quantityHTML = "<option selected value=\"1\">1</option>";

    for (let i = 1; i < 10; ++i)
    {
        let index = i + 1;
        quantityHTML += `<option value="${index}">${index}</option>`;
    }


    for (let i = 0; i < products.length; ++i)
    {
        let e = products[i];

        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${e.image}>
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${e.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${String(e.rating.stars * 10).padStart(2, '0')}.png">
                    <div class="product-rating-count link-primary">
                    ${e.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${formatCurrencyAsString(e.priceCents)}
                </div>

                <div class="product-quantity-container">
                    <select id="js-${e.id}-select">
                    ${quantityHTML}
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary" name="add-to-cart" data-index="${i}" data-id="${e.id}">
                    Add to Cart
                </button>
            </div>`;
    };

    document.getElementById("products-page").innerHTML = productsHTML;

    let buttons = document.getElementsByName("add-to-cart");
    buttons.forEach((element) => {
        element.onclick = () => { 
            addToCart(element.dataset.index, element.dataset.id); 
        };
    });
}


displayAllProducts();