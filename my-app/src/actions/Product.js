export const getproducts = async () => {
    const query = ` 
    {
  products(shopId:"1421248", platform: EU, locale: de_DE){
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