export const deliveryOptions = 
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

export function getDeliveryOption(id)
{
    return deliveryOptions[Number(id)]
}