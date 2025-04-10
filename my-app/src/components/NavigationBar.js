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
        <a href="http://localhost:3000/products">
            <button className="button">Shop</button>
        </a>
        <button onClick={() => { setopen(!open) }} id="cartopenbutton">NavigationBar</button>
        <Dialog onClose={() => { }} open={open} className="cartdialog" >
            <div id="cart" ref={clickoutsideref}>NavigationBar
                <button onClick={() => { setopen(false) }} id="closebutton">X</button>
                <Cart cart={cart}></Cart>
            </div>
        </Dialog>
    </div>)
}

export default NavigationBar