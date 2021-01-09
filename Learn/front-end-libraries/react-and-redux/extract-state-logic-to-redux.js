// Define ADD, addMessage(), messageReducer(), and store here:
const ADD='ADD';
const addMessage = (message)=>({
    type: ADD,
    message: message
  })
  const messageReducer = (state=[],action) => {
       if(action.type==ADD){
           return [...state,action.message];
  }
  return state;

  }
 
  let store  = Redux.createStore(messageReducer);