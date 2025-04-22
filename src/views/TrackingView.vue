<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Header from '/src/components/Common/Header.vue';
import { getCartQuantity } from '/composables/cart';
import { getProduct } from '/composables/products';
import { formatDeliveryDateFromOrderDate } from '/composables/delivery';

const route = useRoute();
const product = ref();
const productImage = ref();

onMounted(async () => {
    product.value = await getProduct(route.query.productID);
    productImage.value = `/src/assets/${product.value.image}`;
});
</script>

<template >
    <Header :cartQuantity="getCartQuantity()" />

    <div class="main">
        <div class="order-tracking">
            <RouterLink class="back-to-orders-link link-primary" to="/orders">
                View all orders
            </RouterLink>

            <div class="delivery-date">
                Arriving on {{ formatDeliveryDateFromOrderDate(route.query.deliveryID, route.query.orderDate, "dddd, MMMM D") }}
            </div>

            <div v-if="product">
                <div class="product-info">
                    {{ product.name }}
                </div>

                <div class="product-info">
                    Quantity: {{ route.query.quantity }}
                </div>

                <img class="product-image" :src="productImage">
            </div>

            <div class="progress-labels-container">
                <div class="progress-label">
                    Preparing
                </div>
                <div class="progress-label current-status">
                    Shipped
                </div>
                <div class="progress-label">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "/src/styles/shared/amazon-header.css";
@import "/src/styles/pages/tracking.css";
</style>