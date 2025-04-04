
export function addToCart(index, id)
{
    let selectID = `js-${id}-select`;
    console.log("Adding to cart: ", index, id, selectID);
    const selectElement = document.getElementById(selectID);

    if (selectElement === null)
        return;

    const productQuantity = selectElement.options[selectElement.selectedIndex].value;

    let existingElement = false;
    let totalQuantity = 0;

    const cart = getCartItems();
    cart.forEach((e) => 
    {
        if (e.productID === id)
        {
            e.productQuantity += Number(productQuantity);
            existingElement = true;
            console.log("Updating existing element");
        }

        totalQuantity += e.productQuantity;
    });

    if (!existingElement)
    {
        console.log("Pushing new element");
        let newQuantity = Number(productQuantity);

        cart.push({
            productID: id,
            productQuantity: newQuantity,
            productDeliveryID: 1
        });

        totalQuantity += newQuantity;
    }

    displayCartQuantity(totalQuantity);
    console.log(totalQuantity, cart);

    saveCartToLocalStorage(cart);
}

export function removeCartItem(id, amountToRemove)
{
    const cart = getCartItems();

    for(let i = 0; i < cart.length; ++i)
    {
        let item = cart[i];

        if (item.productID === id)
        {
            item.productQuantity = (amountToRemove === "all") ? 0 : item.productQuantity - amountToRemove;

            if (item.productQuantity <= 0)
                cart.splice(i, 1);

            console.log(cart);
            saveCartToLocalStorage(cart);

            return item.productQuantity;
        }
    }

    return null;
}

export function updateCartItem(id, amountToAdd)
{
    const cart = getCartItems();

    for(let i = 0; i < cart.length; ++i)
    {
        let item = cart[i];

        if (item.productID === id)
        {
            item.productQuantity += amountToAdd;

            console.log(cart);
            saveCartToLocalStorage(cart);

            return item.productQuantity;
        }
    }

    return null;
}

export function getCartItems()
{
    return JSON.parse(localStorage.getItem("cart")) || [ ];
}

export function getCartQuantity()
{
    const cart = getCartItems();
    let total = 0;

    cart.forEach((e) => {
        total += e.productQuantity;
    })

    return total;
}

export function updateDeliveryDate(id, deliveryOptionID)
{
    const cart = getCartItems();

    for(let i = 0; i < cart.length; ++i)
    {
        let item = cart[i];

        if (item.productID === id)
        {
            item.productDeliveryID = deliveryOptionID;

            console.log(cart);
            saveCartToLocalStorage(cart);

            break;
        }
    }
}


function saveCartToLocalStorage(cart)
{
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCartQuantity(quantity)
{
    const quantityElement = document.getElementById("js-cart-quantity");

    if (quantityElement !== null)
        quantityElement.innerHTML = quantity;
}


displayCartQuantity(getCartQuantity());