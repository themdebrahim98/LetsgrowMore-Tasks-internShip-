let state = {
    login: false,
    username: 'md khan',

  
}

function getState() {
    return state;
}

function setState(newState){
  state = {...state,...newState}
//   Object.assign(state,newState)
    
}

let studentState = {
  login:false,
  username:"md@123"
}
export {state,setState,getState,studentState};