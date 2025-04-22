<script setup>
import { RouterLink } from 'vue-router';

defineProps({
    cartQuantity: Number
})
</script>

<template>
    <div class="amazon-header">
        <div class="amazon-header-left-section">
            <RouterLink to="/" class="header-link">
                <img class="amazon-logo" src="../../assets/images/amazon-logo-white.png">
                <img class="amazon-mobile-logo" src="../../assets/images/amazon-mobile-logo-white.png">
            </RouterLink>
        </div>

        <div class="amazon-header-middle-section">
            <input class="search-bar" type="text" placeholder="Search">

            <button class="search-button">
                <img class="search-icon" src="../../assets/images/icons/search-icon.png">
            </button>
        </div>

        <div class="amazon-header-right-section">
            <RouterLink class="orders-link header-link" to="/orders">
                <span class="returns-text">Returns</span>
                <span class="orders-text">& Orders</span>
            </RouterLink>

            <RouterLink class="cart-link header-link" to="/checkout">
                <img class="cart-icon" src="../../assets/images/icons/cart-icon.png">
                <div class="cart-quantity">{{ cartQuantity }}</div>
                <div class="cart-text">Cart</div>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
@import "../../styles/shared/amazon-header.css";
</style>