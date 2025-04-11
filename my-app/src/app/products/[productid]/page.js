'use client'
import { getproduct, createcart } from "@/actions/Product"
import "../design.css"
import { useEffect, useState } from "react"
import useCart from "@/hooks/useCart"
import { Carter_One } from "next/font/google"
import Loader from "@/components/Loader"

const Page = ({ params }) => {
    const { addcartitem, cart } = useCart()
    const [product, setproduct] = useState()
    const [loading, setloading] = useState(true)
    const load = async () => {
        setloading(true)
        const { productid } = await params
        const product = await getproduct(productid)
        setproduct(product)
        console.log(product)
        setloading(false)
    }
    useEffect(() => {
        load()
    }, [])
    console.log("addcart", product?.variants)
    const appearances = new Set()
    const sizes = new Set()
    product && product.variants.forEach((variant) => {
        appearances.add(variant.appearance.name)
        sizes.add(variant.size.name)
    })
    return (
        <>
            {loading && <Loader/>}
            {product && !loading && <div id="productpage">



                <div id="pageproduct">
                    <img alt="ERROR" srcSet={`${product.image.srcset}`} width="500" id="productpageimg"></img>
                    <div id="productdescription">

                        <div style={{ width: 550 + "px" }}>
                            <h1>{product.name} - {product.type.name}</h1>
                            <div>{product.type.shortDescription}</div>
                            <b>{product.price.vatIncluded}{product.price.currency.symbol}</b>
                        </div>
                        <div className="configbuttons">
                            {appearances && Array.from(appearances).map((appearance) => {
                                return (
                                    <button key={appearance}>{appearance}</button>
                                )
                            })}
                        </div>

                        <div className="configbuttons">
                            {sizes && Array.from(sizes).map((size) => {
                                return (
                                    <button key={size}>{size}</button>
                                )
                            })}
                        </div>
                        <button id="buybutton" onClick={async () => {
                            console.log("product", product)
                            await addcartitem(product.variants[0].sku, 1)

                        }}>
                            add to Cart
                        </button>
                    </div>

                </div>


            </div>}
        </>

    )
}
export default Page