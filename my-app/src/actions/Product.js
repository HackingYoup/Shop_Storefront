'use server'
export const getproducts = async (offset, limit) => {
  const query = ` 
    {
  products(shopId:"1421248", platform: EU, locale: de_DE, limit: ${limit}, offset: ${offset}){
    items{
      id
      name
      description
      type{
        name
      }
      price{
		vatIncluded
        currency{
          pattern
          symbol
        }
      }
      image{
        src
        srcset
      }
    }
    pageInfo {
      limit
      offset
      totalCount
    }
  }
}`
  const options = {
    method: "POST",
    body: JSON.stringify({ query: query })
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const productpage = await result.json()
  return await productpage.data.products
}

export const getproduct = async (productid) => {
  const query = ` 
    {
  product(id:"${productid}", shopId:"1421248", platform: EU, locale: de_DE) {
    id
    name
    description
    type{
      name
      shortDescription
    }
    variants{
      sku
      size{
        id
        name
      }
      appearance{
        id
        name
      }
    }
    price{
      vatIncluded
      currency{
        pattern
        symbol
      }
    }
    image{
      src
      srcset
    }
    
  }
}`
  const options = {
    method: "POST",
    body: JSON.stringify({ query: query })
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const productpage = await result.json()
  console.log(productpage)
  return await productpage.data.product
}

/*export const getcart = async () => {
  const query = ` 
    { 
  cart(cartId: "d60a2667-03da-4289-955c-61c1fd30661c", locale: de_DE, platform: EU){
    id
    state
    checkoutLink
    price{
      total{
        vatIncluded
        currency{
            pattern
            symbol
          }
      }
    }
    items{
      id
      sku
      quantity
      product{
        id
        name
      }
    }
  }
}`
  const options = {
    method: "POST",
    body: JSON.stringify({ query: query })
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const cart = await result.json()
  console.log(cart)
  return await productpage.data.createcart
}*/

export const createcart = async () => {
  const mutation = ` 
mutation createCart($shopId: ID!, $platform: Platform!, $locale: Locale!, $items: [CartLineItemInput!]){
    createCart(
        shopId: $shopId,
        platform: $platform,
        locale: $locale
        cart: {
            items: $items
        }
    ) {
        id
        items {
            id
            quantity
            product {
                id
                name
                price {
                    vatExcluded
                    vatIncluded
                    vatAmount
                    currency {
                        symbol
                        pattern
                    }
                }
            }
        }
        price {
            total {
                vatExcluded
                vatIncluded
                vatAmount
            }
        }
    }
}`
  const variables = {
    shopId: 1421248,
    platform: "EU",
    locale: "de_DE",
    items: []
  }
  const options = {
    method: "POST",
    body: JSON.stringify({ query: mutation, variables: variables})
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const cart = await result.json()
  console.log("cart", cart)
  return cart.data.createCart
}

export const addcartItems = async (cartId, sku, quantity) => {
  const mutation = ` 
mutation addCartItem($shopId: ID!, $platform: Platform!, $cartId: ID! $items: [CartLineItemInput!]){
    addCartItems(
        cartId: $cartId,
        shopId: $shopId,
        platform: $platform,
        cartItems: $items
    ) {
        id
        items {
            id
            sku
            quantity
            product {
                id
                name
                price {
                    vatExcluded
                    vatIncluded
                    vatAmount
                    currency {
                        symbol
                        pattern
                    }
                }
            }
        }
        price {
            total {
                vatExcluded
                vatIncluded
                vatAmount
            }
        }
    }
}`
  const variables = {
    shopId: 1421248,
    platform: "EU",
    cartId: cartId,
    items: [{sku: sku, quantity: quantity}]
  }
  const options = {
    method: "POST",
    body: JSON.stringify({ query: mutation, variables: variables})
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const cart = await result.json()
  console.log("cart", cart)
  return cart.data.addCartItems
}

export const deletecartItems = async (cartId, itemId) => {
  const mutation = ` 
mutation deleteCartItem($shopId: ID!, $platform: Platform!, $cartId: ID! $items: [ID!]){
    deleteCartItems(
        cartId: $cartId,
        shopId: $shopId,
        platform: $platform,
        cartItemIds: $items
    ) {
        id
        items {
            id
            quantity
            productVariant {
                sku
            }
            product {
                id
                name
                price {
                    vatExcluded
                    vatIncluded
                    vatAmount
                    currency {
                        symbol
                        pattern
                    }
                }
            }
        }
        price {
            total {
                vatExcluded
                vatIncluded
                vatAmount
            }
        }
    }
}`
  const variables = {
    shopId: 1421248,
    platform: "EU",
    locale: "de_DE",
    items: [itemId],
    cartId: cartId
  }
  const options = {
    method: "POST",
    body: JSON.stringify({ query: mutation, variables: variables})
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const cart = await result.json()
  console.log("cart", cart)
  return cart.data.deleteCartItems
}

export const updatecartItems = async (cartId, itemId, quantity) => {
  const mutation = ` 
mutation addCartItem($shopId: ID!, $platform: Platform!, $cartId: ID! $items: [CartLineItemUpdate!]){
    updateCartItems(
        cartId: $cartId,
        shopId: $shopId,
        platform: $platform,
        cartItems: $items
    ) {
        id
        items {
            id
            quantity
            product {
                id
                name
                price {
                    vatExcluded
                    vatIncluded
                    vatAmount
                    currency {
                        symbol
                        pattern
                    }
                }
            }
        }
        price {
            total {
                vatExcluded
                vatIncluded
                vatAmount
            }
        }
    }
}
 `
  const variables = {
    shopId: 1421248,
    platform: "EU",
    locale: "de_DE",
    items: [{itemId: itemId, quantity: quantity}],
    cartId: cartId
  }
  const options = {
    method: "POST",
    body: JSON.stringify({ query: mutation, variables: variables})
  }
  const result = await fetch("https://api.spreadshop.com/v1/graphql", options)
  const cart = await result.json()
  console.log("cart", cart)
  return cart.data.updateCartItems
}