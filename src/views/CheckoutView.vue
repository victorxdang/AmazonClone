<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { getCartQuantity, getAllItemsFromCart } from '../../composables/cart';
import OrderSummary from '../components/Checkout/OrderSummary.vue';
import PaymentSummary from '../components/Checkout/PaymentSummary.vue';

const quantity = ref(getCartQuantity());
const allProductInfo = ref([ ]);
const hasItems = ref(false);
const displayPaymentSummary = ref(false);

function onPlaceOrderClicked()
{
    allProductInfo.value = [ ];
    quantity.value = 0;
}

function onUpdateItemFromCart(index)
{
    quantity.value = getCartQuantity();
}

function onDeleteItemFromCart(index)
{
    allProductInfo.value.splice(index, 1);
    quantity.value = getCartQuantity();
}

onMounted(async () => {
    allProductInfo.value = getAllItemsFromCart();

    if (allProductInfo.value !== null)
    {
        hasItems.value = allProductInfo.value.length > 0;
        displayPaymentSummary.value = true;
    }
});
</script>

<template>
    <div class="checkout-header">
        <div class="header-content">
            <div class="checkout-header-left-section">
            <RouterLink to="/">
                <img class="amazon-logo" src="../assets/images/amazon-logo.png">
                <img class="amazon-mobile-logo" src="../assets/images/amazon-mobile-logo.png">
            </RouterLink>
            </div>

            <div class="checkout-header-middle-section">
            Checkout (<RouterLink class="return-to-home-link" to="/">
                {{ quantity }} items
            </RouterLink>)
            </div>

            <div class="checkout-header-right-section">
            <img src="../assets/images/icons/checkout-lock-icon.png">
            </div>
        </div>
    </div>

    <div class="main">
        <div class="page-title">Review your order</div>

        <div class="checkout-grid">
            <div class="order-summary">
                <div v-if="hasItems">
                    <OrderSummary v-for="(ci, index) in allProductInfo" :key="ci.productInfo.id" :productAndCartInfo="ci" :index="index" @deleteItem="onDeleteItemFromCart" @updateItem="onUpdateItemFromCart" />
                </div>
            </div>

            <div class="payment-summary">
                <PaymentSummary v-if="displayPaymentSummary" :allProductAndCartInfo="allProductInfo" @orderPlaced="onPlaceOrderClicked"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../styles/pages/checkout/checkout-header.css";
@import "../styles/pages/checkout/checkout.css";
</style>