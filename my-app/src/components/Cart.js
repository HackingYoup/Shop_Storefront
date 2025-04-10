import Link from "next/link"

const Cart = ({ cart }) => {
    console.log("NavigationBar", cart)
    return (
        <div>
            <div>Cart</div>
            {cart && cart.items.map((item) => {
                return (
                    <div>
                        <div>{item.product.price.vatIncluded} {item.product.price.currency.symbol}</div>
                    </div>
                )
            })}
            <Link href={`https://highrank.myspreadshop.de/cart/${cart.id}`}>Checkout</Link>
        </div>

    )
}

export default Cart