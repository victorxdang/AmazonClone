export function doesItemExistInCart(id)
{
    return localStorage.getItem(id) !== null;
}

export function setItemInCart(id, object)
{
    localStorage.setItem(id, JSON.stringify(object));
}

export function getItemFromCart(id)
{
    return JSON.parse(localStorage.getItem(id)) || null;
}

export function getItemFromCartIndex(index)
{
    return JSON.parse(localStorage.getItem(localStorage.key(index))) || null;
}

export function getAllItemsFromCart()
{
    const array = [ ];
    
    for (let i = 0; i < localStorage.length; ++i)
        array[i] = getItemFromCartIndex(i);
    
    return array;
}

export function getCartQuantity()
{
    let quantity = 0;

    for (let i = 0; i < localStorage.length; ++i)
        quantity += getItemFromCartIndex(i).cartInfo.productQuantity;

    return quantity;
}

export function updateCartQuantity(id, quantityToAdd)
{
    const item = getItemFromCart(id);
    item.cartInfo.productQuantity += quantityToAdd;
    setItemInCart(id, item);
}

export function updateCartShipping(id, newDeliveryID)
{
    const item = getItemFromCart(id);
    item.cartInfo.productDeliveryID = newDeliveryID;
    setItemInCart(id, item);
}

export function removeItemFromCart(id)
{
    localStorage.removeItem(id);
}