<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';

import Product from '../components/Home/Product.vue';
import { getCartQuantity, updateCartQuantity, setItemInCart, doesItemExistInCart } from '../../composables/cart';

const toast = useToast();
const products = ref();
const cartQuantity = ref(0);
const maxNameLength = 30;

async function onAddCartClicked(id, name, quantity)
{
    if (name.length > maxNameLength)
        name = name.substring(0, maxNameLength) + "...";

    if (doesItemExistInCart(id))
    {
        updateCartQuantity(id, quantity);
    }
    else
    {
        setItemInCart(id, {
            cartInfo: {
                productID: id,
                productQuantity: quantity,
                productDeliveryID: 1
            },
            productInfo: getProductWithID(id)
        });
    }

    cartQuantity.value += quantity;
    toast.success(`Added ${quantity} of ${name} to cart!`);
}

function getProductWithID(id)
{
    for (const p of products.value)
    {
        if (p.id === id)
            return p;
    }
}

onMounted(async () => {
    // get data from localStorage to calculate the total items in the cart
    cartQuantity.value = getCartQuantity();
    
    // grab all of the items from the "database"
    await fetch("http://localhost:3000/products/")
    .then((response) => {
        if (response.status === 200)
            return response.json();

        return null;
    })
    .then((data) => {
        if (data !== null)
            products.value = data;
    });
});
</script>

<template>
    <div class="amazon-header">
        <div class="amazon-header-left-section">
            <RouterLink to="/" class="header-link">
                <img class="amazon-logo" src="../assets/images/amazon-logo-white.png">
                <img class="amazon-mobile-logo" src="../assets/images/amazon-mobile-logo-white.png">
            </RouterLink>
        </div>

        <div class="amazon-header-middle-section">
            <input class="search-bar" type="text" placeholder="Search">

            <button class="search-button">
                <img class="search-icon" src="../assets/images/icons/search-icon.png">
            </button>
        </div>

        <div class="amazon-header-right-section">
            <RouterLink class="orders-link header-link" to="/orders">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
            </RouterLink>

            <RouterLink class="cart-link header-link" to="/checkout">
                <img class="cart-icon" src="../assets/images/icons/cart-icon.png">
                <div class="cart-quantity">{{ cartQuantity }}</div>
                <div class="cart-text">Cart</div>
            </RouterLink>
        </div>
    </div>
    
    <div class="main">
        <div class="products-grid">
            <Product v-for="p in products" :productInfo="p" @addToCart="onAddCartClicked" />
        </div>
    </div>
</template>

<style scoped>
@import "../styles/shared/amazon-header.css";
@import "../styles/pages/amazon.css";
</style>