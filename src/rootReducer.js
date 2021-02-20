const INITIAL_STATE = { cart:[], order:[], admin:[] };
var totalprice = {"topprice": ""};

function rootReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case 'ADD_ORDER':
            console.log(action.thing,"in rootreduce");
            //if its an array turn it into an obj and add it to order
            if(Array.isArray(action.thing.vals)){
                let arraytoObj = {...action.thing.vals}
                return { ...state,
                    order: [{...state.order[0], ...arraytoObj}]
                    }
            }
            //adding up price if there is price in a try catch bc it will break program if state.order[0].price is undefined
            try{
                let sizeprice = state.order[0].price;
                //let newprice= action.thing;
                let prevVal = totalprice.topprice;
                let newtoppingprice = action.thing.tprice;
                if(prevVal === ""){
                    prevVal = 0;
                }
                //not null meaing if they both exist to add those values
                if(sizeprice!=null && newtoppingprice !=null){
                    let v = parseFloat(newtoppingprice) + parseFloat(prevVal);
                    console.log(newtoppingprice, '+', prevVal, '=', v);
                    totalprice.topprice = v;
                }
            }catch{
                console.log("has no vlaue");
            }
            console.log(totalprice,'TOTAL');
            //state.order is what it has in it so far flavor,size,type. action.thing is whats being added
            //and totalprice is any additional toppings price that are being added
            return { ...state,
                order: [{...state.order[0], ...action.thing,...totalprice}]
                }
        case 'CLEAR_ORDER':
            //set totalprice aka toppings to zero
            totalprice = {"topprice": ""};
            return { ...state,
                order: []
                }
        case 'GET_CART':
            return { ...state, cart: action.data }

        case 'ADD_ID':
            //give it an ID this is a very bad way to do it but for now will work
            let randnum = Math.floor(Math.random() * 10000)
            let id = {"id": randnum};
            return { ...state,
                order: [{...state.order[0], ...id}]
                }
        case 'ADD_CART':
            return { ...state.cart,
                cart: [...state.cart,...state.order]
                }

        case 'DELETE_CART_ITEM':
            console.log(action)
            return { ...state,
                cart: state.cart.filter(x=>x.id!==action.id)
                }
        case 'DELETE_CART':
            return { ...state,
                cart: []
            }

        // case 'ADMIN_REMOVE':
        //     return {...state,
        //         action.rmItems
        //     }
        default:
            return state;
    }
}

export default rootReducer;