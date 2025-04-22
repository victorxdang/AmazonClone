<script setup>
import { formatCurrencyAsString } from '/composables/utilities';
import { formatDeliveryDate } from '/composables/delivery';

const events = defineEmits([ "onShippingSelected" ])

const props = defineProps({
    deliveryOption: Object,
    selected: Boolean
});

function onClick()
{
    events("onShippingSelected", Number(props.deliveryOption.id));
}
</script>

<template>
    <div name="delivery-options" class="delivery-option">
        <input type="radio" :checked="selected" class="delivery-option-input" @click="onClick">
        <div>
            <div class="delivery-option-date">
                {{ formatDeliveryDate(deliveryOption.id) }}
            </div>
            <div class="delivery-option-price">
                {{ (deliveryOption.deliveryCost === 0) 
                    ? "FREE Shipping" 
                    : "$" + formatCurrencyAsString(deliveryOption.deliveryCost) + " - Shipping" }}
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "/src/styles/pages/checkout/checkout-header.css";
@import "/src/styles/pages/checkout/checkout.css";
</style>