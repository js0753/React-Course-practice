import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;
    //console.log(cartCtx.items)
    const numberOfCartItems = items.reduce((currNumber, item)=>{
        //console.log("It is a function though");
        return currNumber+item.amount;
    },0); //reduce array to a single value

    

    const btnClasses = `${classes.button} ${btnIsHighlighted? classes.bump:''}`;
    //console.log(btnIsHighlighted);
    useEffect(()=>{
        if(items.length===0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{setBtnIsHighlighted(false);},300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items]);
    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>
           {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton;