import { getproducts } from "@/actions/Product"
import "./design.css"
import Link from "next/link"

const Page = async () => {
    const products = await getproducts()
    console.log(products)
    return (<div id="products-container">
        {products.items.map((item) => {
            return (
                <Link href={`products/${item.id}`} key={item.id} id="product">
                    <div>{item.name} - {item.type.name} - {item.price.vatIncluded} {item.price.currency.symbol}</div>
                    <img src={`${item.image.src}`} id="image"></img>
                </Link>
            )
        })}
    </div>)
}

export default Page