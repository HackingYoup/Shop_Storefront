'use client'
import { Dialog } from "@headlessui/react"
import "./NavigationBar.css"
import { useState } from "react"
import { useClickOutside } from "@mantine/hooks"
import useCart from "@/hooks/useCart"
import Cart from "./Cart"

const NavigationBar = () => {
    const [open, setopen] = useState(false)
    const clickoutsideref = useClickOutside(() => { setopen(false) })
    const { cart } = useCart()
    return (<div id="NavigationBar">
        <a href="http://localhost:3000/products" id="shopbutton">
            Shop
        </a>
        <button onClick={() => { setopen(!open) }} id="cartopenbutton">Cart</button>
        <Dialog onClose={() => { }} open={open} className="cartdialog" >
            <div id="cart" ref={clickoutsideref}>
                <button onClick={() => { setopen(false) }} id="closebutton">X</button>
                <Cart cart={cart}></Cart>
            </div>
        </Dialog>
    </div>)
}

export default NavigationBar