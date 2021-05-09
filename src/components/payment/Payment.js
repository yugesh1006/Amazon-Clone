import React, { useEffect, useState } from 'react';
import "../../css/payment.css";
import { useStateValue } from '../stateprovider/Stateprovider';
import Cartproduct from "../checkout/Cartproduct";
import {Link,useHistory} from "react-router-dom";
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import { getBasketTotal } from '../stateprovider/Reducer';
import CurrencyFormat from 'react-currency-format';
import axios from "../axios";
import { db } from '../../config/config';

function Payment() {
    const [{basket,user},dispatch]=useStateValue();
    const history= useHistory();
    
    const stripe=useStripe();
    const elements=useElements();

    const [error, setError] = useState(null);
    const [disabled,setDisabled]=useState(null);
    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);  
    const [clientSecret,setClientSecret]=useState(true);


    useEffect(() => {
        const getClientSceret = async () =>{
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSceret();
    }, [basket])
    
    
    const handleSubmit= async(event) => {
        event.preventDefault();
        setProcessing(true);


        const payload = await stripe.confirmCardPayment(clientSecret,{payment_method:{
            card:elements.getElement(CardElement)
        }}).then(({paymentIntent})=>{

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket:basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            }) 

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        }) 
    }

    const handleChange = event =>{
        setDisabled(event.empty);
        setError(event.error ? event.error.message: " ")
    }

    return (
        <div className="payment">
            <div className="payment_container">
            <h1>Checked (<Link to='./cart'>{basket?.length} items</Link>)</h1>
                <div className="payment_section">
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>   
                    <div className="payment_address">
                        <p>{user?.email.split("@",1)}</p>
                        <p>xyz lane</p>
                        <p>India</p>
                    </div>
                </div>
                <div className="payment_section">
                    <div className="payment_title">
                        <p>Yours items for delivery</p>
                    </div>
                    <div className="payment_items">
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
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment_price">
                            <CurrencyFormat
                            renderText={(value) =>(              
                                    <h3>
                                       Oder Total:  ({basket.length} items): <strong>{value}</strong>
                                    </h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}    
                                prefix={"₹"}   
                            />
                            <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                            </div>

                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment