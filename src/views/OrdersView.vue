<script setup>
import { ref, onMounted } from 'vue';

import Header from '../components/Common/Header.vue';
import OrderDetails from '../components/Orders/OrderDetails.vue';

import { getCartQuantity } from '../../composables/cart';
import { getAllOrders } from '../../composables/orders';

const allOrders = ref([ ]);

onMounted(async () => {
    allOrders.value = await getAllOrders();

    // display orders in descending order, with the latest order being at top
    allOrders.value = allOrders.value?.sort((a, b) => b.orderDate.localeCompare(a.orderDate));
});
</script>

<template>
    <Header :cartQuantity="getCartQuantity()" />

    <div class="main">
        <div class="page-title">Your Orders</div>
        <div class="orders-grid">
            <OrderDetails v-for="od in allOrders" :order="od" />
        </div>
    </div>
</template>

<style scoped>
@import "../styles/pages/orders.css";
</style>