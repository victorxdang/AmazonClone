const url = "http://localhost:3000/orders/";


export async function placeOrder(orderDetails)
{
    await fetch(url, {
        method: "POST",
        body: orderDetails,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .catch((error) => console.log(error));
}

export async function getAllOrders()
{
    let allOrders = null;

    await fetch(url)
    .then((response) => (response.status === 200) ? response.json() : null)
    .then((data) => {
        allOrders = data;
    });
    
    return allOrders;
}

export async function getOrder(id)
{
    let order = null;

    await fetch(url + id)
    .then((response) => (response.status === 200) ? response.json() : null)
    .then((data) => {
        order = data;
    });
    
    return order;
}