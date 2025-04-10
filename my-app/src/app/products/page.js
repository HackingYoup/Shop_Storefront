'use client'
import { getproducts } from "@/actions/Product"
import "./design.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader"

const limit = 17
const Page = () => {
    const [pagenummber, setpagenummber] = useState(1)
    const [products, setproducts] = useState()
    const [loading, setloading] = useState(true)
    const loadproducts = async () => {
        setloading(true)
        const offset = (pagenummber - 1) * limit
        const products = await getproducts(offset, limit)
        setproducts(products)
        console.log(offset)
        setloading(false)
    }
    useEffect(() => {
        loadproducts()
    }, [pagenummber])
    console.log(products?.pageInfo?.totalCount)
    console.log("pagenummber", pagenummber)
    return (
        <>{
            loading && <Loader/>
        }
            {products && !loading &&
            <div className="productlistpage">
                <h1 id="title">Highrank`s Shop</h1>
                <div id="products-container">

                    {products && products.items.map((item) => {
                        return (
                            <Link href={`products/${item.id}`} key={item.id} id="product">
                                <div>{item.name} - {item.type.name} - {item.price.vatIncluded} {item.price.currency.symbol}</div>
                                <img src={`${item.image.src}`} id="image"></img>
                            </Link>
                        )
                    })}
                </div>
                <div id="paginationbar">
                    <div id="pagenummber"> Page: {pagenummber}</div>
                    <button onClick={() => setpagenummber(pagenummber - 1)} disabled={pagenummber == 1} className="">{"<-"}</button>
                    <button onClick={() => setpagenummber(pagenummber + 1)} disabled={((pagenummber - 1) * limit) + limit > products?.pageInfo?.totalCount ?? 0}>{"->"}</button>
                </div>
            </div>
            }
        </>

    )

}

export default Page