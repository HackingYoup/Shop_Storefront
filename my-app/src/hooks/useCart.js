import { addcartitems, createCart } from "@/actions/Cart"
import { useShopContext } from "@/context/ShopContext"

const { addcartItems, deletecartItems, updatecartItems } = require("@/actions/Product")
const { useEffect, useState } = require("react")

const useCart = () => {
    const { cartstate } = useShopContext()
    const [cart, setcart] = cartstate
    const [loading, setloading] = useState(true)
    console.log("cartstate", cart)
    const addcartitem = async (sku, productTypeId) => {
        setloading(true)
        if (!cart) {
            const createcart = await createCart(sku, productTypeId)
            setcart(createcart)
        } else {
            const newcart = await addcartitems(cart.id, sku, productTypeId)
            console.log("newcart", newcart)
            newcart.items && setcart(newcart)
        }
        setloading(false)
    }
    const updatecartitem = async (cartId, quantity, itemId) => {
        setloading(true)
        setcart(await updatecartItems(cartId, itemId, quantity))
        setloading(false)
    }
    const deletecartitem = async (cartId, itemId) => {
        setloading(true)
        setcart(await deletecartItems(cartId, itemId))
        setloading(false)
    }
    return {
        cart,
        loading,
        addcartitem,
        updatecartitem,
        deletecartitem
    }
}

export default useCart