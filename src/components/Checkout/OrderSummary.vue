<script setup>
import { ref, onMounted } from 'vue';
import { formatCurrencyAsString } from '../../../composables/utilities';
import { formatDeliveryDate, getDeliveryOptionLength, getDeliveryOption } from '../../../composables/delivery';
import DeliveryOptions from './DeliveryOptions.vue'
import { removeItemFromCart, updateCartQuantity, updateCartShipping } from '../../../composables/cart';

const events = defineEmits([ "updateItem", "deleteItem" ])

const props = defineProps({
    productAndCartInfo: Object,
    index: Number
});

const image = ref();
const cart = ref(props.productAndCartInfo.cartInfo);
const product = ref(props.productAndCartInfo.productInfo);

function addQuantity()
{
    updateCartQuantity(product.value.id, 1);
    ++cart.value.productQuantity;
    events("updateItem", props.index);
}

function subtractQuantity()
{
    updateCartQuantity(product.value.id, -1);
    --cart.value.productQuantity;

    if (cart.value.productQuantity === 0)
        deleteItem();
    else
        events("updateItem", props.index);
}

function deleteItem()
{
    removeItemFromCart(product.value.id);
    events("deleteItem", props.index);
}

function changeShipping(deliveryID)
{
    updateCartShipping(product.value.id, deliveryID);
    cart.value.productDeliveryID = deliveryID;
}

onMounted(() => {
    import(`../../assets/${product.value.image}`)
    .then((img) => {
        image.value = img.default;
    });
})
</script>

<template>
    <div class="cart-item-container">
        <div class="delivery-date">
            Delivery date: {{ formatDeliveryDate(cart.productDeliveryID) }}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" :src="image">

            <div class="cart-item-details">
                <div class="product-name">
                    {{ product.name }}
                </div>
                <div class="product-price">
                    ${{ formatCurrencyAsString(product.priceCents) }}
                </div>
                <div class="product-quantity">
                    <span>Quantity:</span>
                </div>
                <div class="product-update">
                    <span class="product-upate-icons-left link-primary" @click="subtractQuantity">-</span>
                    <span class="quantity-label">{{ cart.productQuantity }}</span>
                    <span class="product-upate-icons-right link-primary" @click="addQuantity">+</span>
                    <span class="delete-quantity-link link-primary" @click="deleteItem">
                        Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                
                <DeliveryOptions v-for="i in getDeliveryOptionLength()" :deliveryOption="getDeliveryOption(i - 1)" :selected="i - 1 === cart.productDeliveryID" @onShippingSelected="changeShipping" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../../styles/pages/checkout/checkout-header.css";
@import "../../styles/pages/checkout/checkout.css";
</style>