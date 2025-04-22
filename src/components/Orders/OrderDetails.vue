<script setup>
import dayjs from 'dayjs';
import OrderProduct from '/src/components/Orders/OrderProduct.vue';
import { formatCurrencyAsString } from '/composables/utilities';

defineProps({
    order: Object
});
</script>

<template>
    <div class="order-container">
        <div class="order-header">
            <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>{{ dayjs(order.orderDate).format('MMMM D') }}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>${{ formatCurrencyAsString(order.total) }}</div>
                </div>
            </div>

            <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>{{ order.id }}</div>
            </div>
        </div>

        <div class="order-details-grid">
            <OrderProduct v-for="ci in order.cartInfo" :orderDate="order.orderDate" :cartInfo="ci" />
        </div>
    </div>
</template>

<style scoped>
@import "/src/styles/pages/orders.css";
</style>