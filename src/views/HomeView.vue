<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toastification';

import Header from '../components/Common/Header.vue';
import Product from '../components/Home/Product.vue';
import { getCartQuantity, updateCartQuantity, setItemInCart, doesItemExistInCart } from '../../composables/cart';
import { getAllProducts } from '../../composables/products';

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
    products.value = await getAllProducts();
});
</script>

<template>
    <Header :cartQuantity="cartQuantity" />

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