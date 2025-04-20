<script setup>
import { ref } from 'vue';
import { formatCurrencyAsString } from '../../../composables/utilities';

const events = defineEmits([ "addToCart" ]);

const props = defineProps({
    productInfo: Object
});

const quantity = ref(1);

const productImage = ref();
import(`../../assets/${props.productInfo.image}`)
    .then((img) => {
        productImage.value = img.default;
    });

const ratingImage = ref();
import(`../../assets/images/ratings/rating-${String(props.productInfo.rating.stars * 10).padStart(2, '0')}.png`)
    .then((img) => {
        ratingImage.value = img.default;
    });


function addToCart()
{
    events("addToCart", props.productInfo.id, props.productInfo.name, quantity.value);
}
</script>

<template>
    <div class="product-container">
        <div class="product-image-container">
            <img class="product-image" :src="productImage">
        </div>

        <div class="product-name limit-text-to-2-lines">
            {{ productInfo.name }}
        </div>

        <div class="product-rating-container">
            <img class="product-rating-stars" :src="ratingImage">
            <div class="product-rating-count link-primary">
                {{ productInfo.rating.count }}
            </div>
        </div>

        <div class="product-price">
            ${{ formatCurrencyAsString(productInfo.priceCents) }}
        </div>

        <div class="product-quantity-container">
            <select v-model="quantity">
                <option v-for="i in 10" :value="i">{{ i }}</option>
            </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
            <img src="../../assets/images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary" @click="addToCart">
            Add to Cart
        </button>
    </div>
</template>

<style scoped>
@import "../../styles/shared/amazon-header.css";
@import "../../styles/pages/amazon.css";
</style>