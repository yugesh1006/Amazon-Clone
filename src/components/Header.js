import React from 'react';
import "../css/header.css";
import logo from "../img/Amazon logo.png" ;
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {Link} from "react-router-dom";
import { useStateValue } from './stateprovider/Stateprovider';
import {auth} from "../config/config";
 
const Header = () => {
    const [{basket,user}]=useStateValue();

    const handleAuth=() => {
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/"><img className="header_logo" src={logo} alt="amazon logo" /></Link>
            <div className="header_search">
                <input className="header_searchInput" type="text" />
                <SearchIcon className="header_searchIcon"/>
            </div>
            <div className="header_nav">
            <Link to={!user && "/login"}>
                <div  onClick={handleAuth} className="header_option">
                    <span className="header_optionOne">
                        Hello {!user?'Guest' : user?.email.split("@",1)}
                    </span>
                    <span className="header_optionTwo">
                        {user ? 'Sign Out': 'Sign In'}
                    </span>
                </div>
            </Link>
            <Link to="/orders">    
                <div className="header_option">
                    <span className="header_optionOne">
                        Returns
                    </span>
                    <span className="header_optionTwo">
                        & Order
                    </span>
                </div>
            </Link>    
                <div className="header_option">
                    <span className="header_optionOne">
                        Your
                    </span>
                    <span className="header_optionTwo">
                        Prime
                    </span>
                </div>
                <Link to="/cart">
                    <div className="header_shoppingBasket">
                        <span className="header_shoppingBasketnum">
                        {basket.length}   
                        </span>
                        <ShoppingCartOutlinedIcon/>
                    </div>
                </Link>
            </div> 
        </div>
    )
}

export default Header
