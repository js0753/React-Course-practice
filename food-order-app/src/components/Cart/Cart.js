import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = props => {
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = item => {
        cartCtx.addItem({...item,amount:1});
    };

    const cartItems = <ul className={classes['cart-items']}>
        {
        cartCtx.items.map((item) => (
        <CartItem 
        key={item.id} 
        name={item.name} amount={item.amount} price={item.price}
        onRemove = {cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null,item)} // Pre configure function with arguments that it needs when it will be executed
        />
        )
        ) 
    }</ul>;
    console.log(cartItems.length);
    const hasItems = cartCtx.items.length>0;
    
    return <Modal hideModal={props.hideCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
           {hasItems &&  <button className={classes.button}>Order</button>}
        </div>
    </Modal>
};

export default Cart;