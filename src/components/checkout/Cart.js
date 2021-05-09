import React from 'react';
import "../../css/cart.css";
import banner from "../../img/Screen-Shot-2018-10-29-at-11.50.03-AM-450x96.png"
import { useStateValue } from '../stateprovider/Stateprovider';
import Subtotal from "../subtotal/Subtotal"
import Cartproduct from './Cartproduct';

const Cart = () => {
    const [{basket,user}]=useStateValue();
    
    return (
        <div className="cart">
            <div className="cart_left">
                <img className="cart_ad" src={banner} alt="ad"/>
                <div>
                    <h3>Hello {user?.email.split("@",1)}</h3>
                    <h2 className="cart_title"> Your Items in Cart</h2>
                    
                     {basket.map(item=>(   
                    <Cartproduct
                        id= {item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />))}
                </div>
            </div>
            <div className="cart_right">
                <Subtotal/>
            </div>
        </div>
    )
}

export default Cart
