import dayjs from "dayjs";

const deliveryOptions = 
[
    {
        id: "0",
        deliveryDays: 7,
        deliveryCost: 0, 
    },
    {
        id: "1",
        deliveryDays: 3,
        deliveryCost: 499, 
    },
    {
        id: "2",
        deliveryDays: 1,
        deliveryCost: 999, 
    }
];

export function getDeliveryOptionLength()
{
    return deliveryOptions.length;
}

export function getDeliveryOption(id)
{
    return deliveryOptions[id]
}

export function formatDeliveryDate(deliveryID)
{
    return dayjs().add(getDeliveryOption(deliveryID).deliveryDays, "days").format("dddd, MMMM D")
}

export function formatDeliveryDateFromOrderDate(deliveryID, orderDate)
{
    return dayjs(orderDate).add(getDeliveryOption(deliveryID).deliveryDays, "days").format("MMMM D")
}