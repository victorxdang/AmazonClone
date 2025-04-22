<script setup>
import dayjs from "dayjs";

import { ref, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { getCartQuantity, getAllItemsFromCart, clearAllItemsFromCart } from '../../composables/cart';
import { placeOrder } from '../../composables/orders';
import { getUUIDv4 } from '../../composables/utilities';

import OrderSummary from '../components/Checkout/OrderSummary.vue';
import PaymentSummary from '../components/Checkout/PaymentSummary.vue';

const toast = useToast();
const router = useRouter();

const quantity = ref(getCartQuantity());
const allProductInfo = ref([ ]);

function onPlaceOrderClicked(orderTotal)
{   
    const allCartInfo = [ ];
    allProductInfo.value.forEach((item) => {
        allCartInfo.push(item.cartInfo);
    });

    const orderDetails = JSON.stringify({
        "id": getUUIDv4(),
        "orderDate": dayjs(),
        "total": orderTotal,
        "cartInfo": allCartInfo
    });

    placeOrder(orderDetails);
    toast.success("Your order has been placed!");

    allProductInfo.value = [ ];
    quantity.value = 0;

    clearAllItemsFromCart();
    router.push("/orders");
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

        <div v-if="allProductInfo?.length > 0 || false" class="checkout-grid">
            <div class="order-summary">
                <OrderSummary v-for="(ci, index) in allProductInfo" :key="ci.productInfo.id" :productAndCartInfo="ci" :index="index" @deleteItem="onDeleteItemFromCart" @updateItem="onUpdateItemFromCart" />
            </div>

            <div class="payment-summary">
                <PaymentSummary :allProductAndCartInfo="allProductInfo" @orderPlaced="onPlaceOrderClicked"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../styles/pages/checkout/checkout-header.css";
@import "../styles/pages/checkout/checkout.css";
</style>