import {createStore} from 'redux';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {counter:0, showCounter:true};

createSlice({
  name:'counter',
  initialState  
});

const counterReducer = (state=initialState,action) =>{
    if(action.type === 'increment'){
        return {
            counter:state.counter+1,
            showCounter:state.showCounter
        };
    }
    if(action.type === 'increase'){
        return {
            counter:state.counter+action.amount,
            showCounter:state.showCounter
        };
    }
    if(action.type === 'decrement'){
        return {
            counter:state.counter-1,
            showCounter:state.showCounter
        };
    }
    if(action.type === 'toggle'){
        return {
            
            showCounter:!state.showCounter,
            counter:state.counter
        };
    }
    return state;
}

const store = createStore(counterReducer);

export default store;
// const counterSubscriber = () => {
//     const latestState = store.getState();
//     console.log(latestState);
// }

// store.subscribe(counterSubscriber);

// store.dispatch({type:'increment'});
// store.dispatch({type:'decrement'});