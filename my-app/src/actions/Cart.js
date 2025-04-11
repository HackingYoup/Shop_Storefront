export const createCart = async (sku, productTypeId) => {
    const sellablecomponents = parseProductVariantSKU(sku)

    const body = {
        shopId: 1421248,
        locale: "de_DE",
        items: [
            {
                sellableId: sellablecomponents.sellableId,
                productTypeId: productTypeId,
                quantity: 1,
                appearanceId: sellablecomponents.appearanceId,
                sizeId: sellablecomponents.sizeId
            }
        ]
    }
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const result = await fetch("https://api.spreadshirt.net/api/v2/carts", options)
    const cart = await result.json()
    console.log("cart", cart)
    return cart
}

export const addcartitems = async (cartId, sku, productTypeId) => {
    const sellablecomponents = parseProductVariantSKU(sku)

    const body = {
        cartItems: [
            {
                sellableId: sellablecomponents.sellableId,
                productTypeId: productTypeId,
                quantity: 1,
                appearanceId: sellablecomponents.appearanceId,
                sizeId: sellablecomponents.sizeId
            }
        ]
    }
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const result = await fetch(`https://api.spreadshirt.net/api/v2/carts/${cartId}/items`, options)
        const cart = await result.json()
        console.log("cart", cart)
        return cart
    } catch{
        return undefined
    }
   
}

const SKU_SIZE_PREFIX = 's';
const SKU_APPEARANCE_PREFIX = 'a';

export const parseProductVariantSKU = (sku) => {

    const skuComponents = sku.split('-');

    const sizeComponentIndex = skuComponents.findIndex(

        (component, index) => component.charAt(0) === SKU_SIZE_PREFIX && index != 0

    );

    const appearanceComponentIndex = skuComponents.findIndex(

        (component, index) => component.charAt(0) === SKU_APPEARANCE_PREFIX && index != 0

    );

    if (sizeComponentIndex < 0 || appearanceComponentIndex < 0) {

        throw new Error(`Could not parse size or appearance in product sku: ${sku}`)

    }

    const sizeId = skuComponents[sizeComponentIndex]?.replace(/[^0-9]/g, '')

    const appearanceId = skuComponents[appearanceComponentIndex]?.replace(/[^0-9]/g, '')

    skuComponents.splice(sizeComponentIndex);

    skuComponents.splice(appearanceComponentIndex);

    const sellableId = skuComponents.join('-');

    if (sellableId.length <= 0) {

        throw new Error(`Could not parse sellable id in product sku: ${sku}`)

    }

    return {

        sellableId,

        sizeId,

        appearanceId

    };

};

