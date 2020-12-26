
export const initialState={
    events:[]
    
}

const Reducer=(state,action)=>{
    console.error(action.payload)
    switch(action.type){
        case 'ADD_EVENTS':
        return {
            ...state,
            events:[...state.events,action.payload]
        };
        default :
        return state;

    }
}
export default Reducer