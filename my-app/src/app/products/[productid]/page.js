import { getproduct } from "@/actions/Product"
import "../design.css"

const Page = async ({params}) => {
    const {productid} = await params
    const product = await getproduct(productid)
    console.log(product)
    return(
        <div id="productpage">
            <img alt="ERROR" srcset={`${product.image.srcset}`} width="500" id="productpageimg"></img>
            <div style={{width: 550 + "px"}}>
                <div>{product.name} - {product.type.name} - {product.price.vatIncluded}{product.price.currency.symbol}</div>
                <div>{product.type.shortDescription}</div>
            </div>
        </div>
    )
}
export default Page