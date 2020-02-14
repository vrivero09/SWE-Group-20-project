import HP1 from './photo/HP1.jpg'
import HP22 from './photo/HP22.jpg';
import HP33 from './photo/HP33.jpg';
import SW11 from './photo/SW11.jpg';
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'

const initState = {
    items: [
        {id:1,title:'Deathly Hallows', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:20,img:HP1},
        {id:2,title:'Goblet of Fire', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:30,img: HP22},
        {id:3,title:'Deathly Hallows: Old version', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:15,img: HP33},
        {id:4,title:'Star Wars: Darth Vader', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:50,img:SW11}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        //check if the action id exists in the addedItems
       let existed_item= state.addedItems.find(item=> action.id === item.id)
       if(existed_item)
       {
          addedItem.quantity += 1 
           return{
              ...state,
               total: state.total + addedItem.price 
                }
      }
       else{
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + addedItem.price 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
  }
  else{
    return state;
  }
}
export default cartReducer;
