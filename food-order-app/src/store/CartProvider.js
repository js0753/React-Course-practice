import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
    items:[],
    totalAmount:0,
};

const cartReducer = (state,action) => {
    if(action.type == 'ADD'){
        const newTotalAmount = state.totalAmount + action.item.price*action.item.amount;
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
            );

        const existingCartItem = state.items[existingCartItemIndex];
        
     
        let updatedItems;

        if( existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount+action.item.amount
            };
            
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
            //console.log("Updated :",updatedItems);
        } else{
            updatedItems = state.items.concat(action.item);
            // const updatedItems = state.items.concat(action.item);
        // We don't want to edit existing reference as react won't know it's edited
        // instead we want to generate a brand new state object
        }
        
        
        return {
            items: updatedItems,
            totalAmount: newTotalAmount
        };
    }
    if(action.type == 'REMOVE'){
        const updateIndex = state.items.findIndex((item)=>item.id == action.id);
        const updatedItem = state.items[updateIndex];
        //updatedItem.amount-=1;
        //const updatedItems = state.items.filter(item => item.amount>0);
        //if(updatedItem.amount<=0) updatedItems.splice(updateIndex,1);
        //else updatedItems[updateIndex] = updatedItem;
        let updatedItems;
        if(updatedItem.amount===1){
            updatedItems = state.items.filter(item => item.id!==action.id);
        }else{
            updatedItems=[...state.items];
            updatedItems[updateIndex] = {...updatedItem,amount:updatedItem.amount-1};

        }
        const newTotalAmount = state.totalAmount - updatedItem.price;

        return { 
            items:updatedItems,
            totalAmount: newTotalAmount
        };
    }
    return defaultCartState;
}; // Shouldn't be recreated all the time when the component is reevaluated


const CartProvider = props =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState); //Similar to use state but with our reducer function attached

    const addItemToCartHandler = item => {
            dispatchCartAction({          //Unlike the function from useState, we don't pass a new value for 
                type:'ADD', item: item,     // cartState, but instead we pass what action we want to perform on the state
            });
    };

    const removeItemFromCartHandler = id => {
        dispatchCartAction({type:'REMOVE',id:id});
    };
    const cartContext = {
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;