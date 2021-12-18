let state = {
    login: true,
    username: 'md khan',

  
}

function getState() {
    return state;
}

function setState(newState){
  state = {...state,...newState}
//   Object.assign(state,newState)
    
}
export {state,setState,getState};