import React from 'react';
import "../../css/cartproduct.css"
import { useStateValue } from '../stateprovider/Stateprovider';

function Cartproduct({id,title,image,price,rating,hideButton}) {

    const[{},dispatch]=useStateValue();

    const removeFromBasket=()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id,
        })
    }

    return (
        <div className="cartproduct">
            <img className="cartproduct_img" src={image} alt=""/>
            <div className="cartproduct_info">
                <p className="cartproduct_title">{title}</p>
                <p className="cartproduct_price">  <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="cartproduct_rating">
                {Array(rating).fill().map((_,i) =>(
                    <p>⭐</p>                
                ))}
                </div>
                {!hideButton &&(<button onClick={removeFromBasket}>delete</button>)}
            </div>
        </div>
    )
};

export default Cartproduct
