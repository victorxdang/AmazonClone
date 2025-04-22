<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

import { formatDeliveryDateFromOrderDate } from '../../../composables/delivery';
import { getProduct } from '../../../composables/products';

const props = defineProps({
    orderDate: String,
    cartInfo: Object
})

const product = ref({ });
const productImage = ref("");

onMounted(async () => {
    product.value = await getProduct(props.cartInfo.productID);

    import(`../../assets/${product.value.image}`)
    .then((img) => {
        productImage.value = img.default;
    });
});
</script>

<template>
    <div class="product-image-container">
        <img :src="productImage">
    </div>

    <div class="product-details">
        <div class="product-name">
            {{ product.name }}
        </div>
        <div class="product-delivery-date">
            Arriving on: {{ formatDeliveryDateFromOrderDate(cartInfo.productDeliveryID, orderDate) }}
        </div>
        <div class="product-quantity">
            Quantity: {{ cartInfo.productQuantity }}
        </div>
        <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="../../assets/images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
        </button>
    </div>

    <div class="product-actions">
        <RouterLink to="/tracking">
            <button class="track-package-button button-secondary">
                Track package
            </button>
        </RouterLink>
    </div>
</template>

<style scoped>
@import "../../styles/pages/orders.css";
</style>