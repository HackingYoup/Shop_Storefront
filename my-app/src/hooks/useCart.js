import { useShopContext } from "@/context/ShopContext"

const { createcart, addcartItems, deletecartItems, updatecartItems } = require("@/actions/Product")
const { useEffect, useState } = require("react")

const useCart = () => {
    const {cartstate} = useShopContext()
    const [cart, setcart] = cartstate
    const [loading, setloading] = useState(true)
    useEffect(() => {
        makecart()
    }, [])
    const makecart = async () => {
        setloading(true)
        setcart(await createcart())
        setloading(false)
    }
    const addcartitem = async (sku, quantity) => {
        setloading(true)
        setcart(await addcartItems(cart.id, sku, quantity))
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