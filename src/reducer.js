
export const initialState=[]

    


const Reducer=(state,action)=>{
    console.error(action.payload)
    switch(action.type){
        case 'ADD_EVENTS':
        return [
            ...state,
            ...action.payload
        ];
        default :
        return state;

    }
}
export default Reducer