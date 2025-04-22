const url = "http://localhost:3000/products/";


export async function getAllProducts()
{
    let products = [ ];

    // grab all of the items from the "database"
    await fetch(url)
    .then((response) => {
        if (response.status === 200)
            return response.json();

        return null;
    })
    .then((data) => {
        products = data;
    });

    return products;
}

export async function getProduct(id)
{
    let product = null;

    await fetch(url + id)
    .then((response) => {
        if (response.status === 200)
            return response.json();

        return null;
    })
    .then((data) => {
        product = data;
    });
    
    return product;
}