import React, { useEffect } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import{BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Cart from "./components/checkout/Cart";
import SignIn from "./components/SignIn";
import {auth} from "./config/config"
import { useStateValue } from "./components/stateprovider/Stateprovider";
import Payment from "./components/payment/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./components/Orders"

const stripekey = loadStripe(
  "pk_test_51IouvhSFG5tRkOpo7dpzydsLSrMdlzfAJ0tOd7kaPjIkJx0IrirnaopcPtaPrdYr0CQNHHSg3TqDTFFA7e7Hyk21003rlWoioP"
);

function App() {
  const [{},dispatch] =useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser =>{
      console.log('user is ', authUser)
      if(authUser){
          dispatch({
            type:'SET_USER',
            user:authUser
          })
      }else{
        dispatch({
          type:'SET_USER',
          user:null
        })
      }  
    }) 
  }, [])

  return (
    <Router>
    <div className="app">  
       <Switch>
          <Route path="/login">
              <SignIn/>
          </Route>
          <Route path="/cart">
            <Header/>
            <Cart/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={stripekey}> 
              <Payment/>
            </Elements>
          </Route>
          <Route path="/orders" exact >
            <Header/>
            <Orders/>
          </Route>
          <Route path="/" exact >
            <Header/>
            <Home/>
          </Route>
       </Switch>
    </div>
    </Router> 
  );
}

export default App;
 