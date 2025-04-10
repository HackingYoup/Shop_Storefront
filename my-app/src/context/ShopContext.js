'use client'
import { Children, createContext, useContext, useState } from "react";

export const ShopContext = createContext()
export const useShopContext = () => useContext(ShopContext)
export const ShopContextProvider = ({children}) => {
    const cartstate = useState()
    return (
        <ShopContext.Provider value={{cartstate}}>
            {children}
        </ShopContext.Provider>
    )
}