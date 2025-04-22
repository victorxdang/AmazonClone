<script setup>
import { onMounted, ref, watch } from 'vue';

import { formatCurrencyAsString } from '/composables/utilities';
import { getDeliveryOption } from '/composables/delivery';

const taxes = ref(0.0825);
const props = defineProps({
    allProductAndCartInfo: Object
});

const events = defineEmits([ "orderPlaced" ])

const payment = ref({
    quantity: 0,
    orderCost: 0,
    shippingCost: 0,
    subtotal: 0,
    taxes: 0,
    total: 0
});

const stopWatch = watch(props.allProductAndCartInfo, (newProps, oldProps) => {
    updatePaymentSummary();
});

function onPlaceOrderClicked()
{
    stopWatch();
    events("orderPlaced", payment.value.total);
}

function updatePaymentSummary()
{
    payment.value.quantity = 0;
    payment.value.orderCost = 0;
    
    let highestDeliveryID = 0;
    for (const info of props.allProductAndCartInfo)
    {
        payment.value.quantity += info.cartInfo.productQuantity;
        payment.value.orderCost += info.productInfo.priceCents * info.cartInfo.productQuantity;

        if (info.cartInfo.productDeliveryID > highestDeliveryID)
            highestDeliveryID = info.cartInfo.productDeliveryID;
    }

    payment.value.shippingCost = getDeliveryOption(highestDeliveryID).deliveryCost;
    payment.value.subtotal = payment.value.orderCost + payment.value.shippingCost;
    payment.value.taxes = payment.value.subtotal * taxes.value;
    payment.value.total = payment.value.subtotal + payment.value.taxes;

    if (payment.value.total === 0)
        stopWatch();
}

onMounted(() => {
    updatePaymentSummary();
});
</script>

<template>
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items ({{ payment.quantity }}):</div>
        <div class="payment-summary-money">${{ formatCurrencyAsString(payment.orderCost) }}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${{ formatCurrencyAsString(payment.shippingCost) }}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${{ formatCurrencyAsString(payment.subtotal) }}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax ({{ taxes * 100.0 }}%):</div>
        <div class="payment-summary-money">${{formatCurrencyAsString(payment.taxes) }}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${{ formatCurrencyAsString(payment.total) }}</div>
    </div>

    <button class="place-order-button button-primary" @click="onPlaceOrderClicked" :disabled="allProductAndCartInfo.length === 0">
        Place your order
    </button>
</template>

<style scoped>
@import "/src/styles/pages/checkout/checkout-header.css";
@import "/src/styles/pages/checkout/checkout.css";
</style>