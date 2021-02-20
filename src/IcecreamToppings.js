import React,{useState} from 'react';
import Menu from './Menu.json';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const IcecreamToppings=()=>{

    let toppingarr = [];
    const [state,setState] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();
    const order = useSelector(store => store.order);
    console.log(order[0].type);

    if(order[0].type === 'Cone' || order[0].type === 'Dish')
    {
        const toppings = Menu.icecream[4].toppings.cones;
        console.log(toppings);
        // Object.entries(toppings).map(([key,value])=>{
        //     toppingarr.push(value);
        // })
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };
        const addtoppin=()=>{
            var checkboxes = document.getElementsByName('checkB');
            var vals = [];

            for (var i=0, n=checkboxes.length;i<n;i++) 
            {
                if (checkboxes[i].checked) 
                {
                    vals.push(checkboxes[i].value);
                    toppingarr.push({"tprice":toppings[i].price});
                }
            }
            //console.log(toppingarr);
            //console.log(vals,'---');
            for(let x=0;x < toppingarr.length;x++){
                let thing = toppingarr[x]; //not x.price bc that's the value
                //console.log(thing, "in for loop in toppings");
                dispatch({type:'ADD_ORDER', thing });
            }

            let thing = {vals}
            dispatch({type:'ADD_ORDER', thing });
            dispatch({type:'ADD_ID' });
            dispatch({type:'ADD_CART', order});
            dispatch({type:'CLEAR_ORDER'});

        history.push('/cart');
        }
        return (
            <div style={{textAlign:"center"}}>
                <h3>Toppings are extra</h3>
                <p>Sprinkles: .25</p>
                <p>Drips: .50</p>
                <p>Other: .50</p>
                {toppings.map(x=>
                            <FormControlLabel
                            control={
                              <Checkbox
                                className="toppingList"
                                checked={state.checkedB}
                                onChange={handleChange}
                                name = 'checkB'
                                value={x.top}
                                color="primary"
                              />
                            }
                            label={x.top}
                />)}
                <button onClick={addtoppin}>Add to Cart</button>
            </div>
        )
    }

    //------------------------------------------------------------------------

    if(order[0].type === 'Flurry')
    {
        const toppings = Menu.icecream[4].toppings.flurry;
        Object.entries(toppings).map(([key,value])=>{
            toppingarr.push(value);
        })
        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };
        const addtoppin=()=>{
            var checkboxes = document.getElementsByName('checkB');
            var vals = [];

            for (var i=0, n=checkboxes.length;i<n;i++) 
            {
                if (checkboxes[i].checked) 
                {
                    vals.push(checkboxes[i].value);
                }
            }
            let thing = {vals}
            dispatch({type:'ADD_ORDER', thing });
            dispatch({type:'ADD_ID' });
            dispatch({type:'ADD_CART', order});
            dispatch({type:'CLEAR_ORDER'});

        history.push('/cart');
        }
        return (
            <div>
                {toppingarr.map(x=>
                            <FormControlLabel
                            control={
                              <Checkbox
                                className="toppingList"
                                checked={state.checkedB}
                                onChange={handleChange}
                                name = 'checkB'
                                value={x}
                                color="primary"
                              />
                            }
                            label={x}
                />)}
                <button onClick={addtoppin}>Add to Cart</button>
            </div>
        )
    }

    //--------------------------------------------------------------------------

    if(order[0].type === 'Sundae' || order[0].type === 'Banana Split' || order[0].type === 'Brownie Sundae')
    {
        let toppingarr = [];
        let toppingarr2 =[];

        const toppings = Menu.icecream[4].toppings.sundae.normal;
        const toppings2 = Menu.icecream[4].toppings.sundae.checkbox;

        Object.entries(toppings).map(([key,value])=>{
            toppingarr.push(value);
        })

        Object.entries(toppings2).map(([key,value])=>{
            toppingarr2.push(value);
        })

        const handleChange = (event) => {
            setState({ ...state, [event.target.name]: event.target.checked });
        };

        const addtoppin=()=>{
            var checkboxes = document.getElementsByName('checkB');
            var checkotherboxes = document.getElementsByName('checkA');
            var vals = [];

            for (let i=0, n=checkboxes.length;i<n;i++) 
            {
                if (checkboxes[i].checked) 
                {
                    vals.push(checkboxes[i].value);
                }
            }
            for (let j=0, n=checkotherboxes.length;j<n;j++) 
            {
                if (checkotherboxes[j].checked) 
                {
                    vals.push(checkotherboxes[j].value);
                }
            }
            let thing = vals
            dispatch({type:'ADD_ORDER', thing });
            dispatch({type:'ADD_ID' });
            dispatch({type:'ADD_CART', order});
            dispatch({type:'CLEAR_ORDER'});

        history.push('/cart');
        }
        return (
            <div>
                <h4>Comes with:</h4>
                {toppingarr2.map(x=>
                            <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkA"
                                value={x}
                                color="primary"
                              />
                            }
                            label={x}
                />)}
                <br /> <br />
                <h4>Choose 1 topping(.50 extra per topping)</h4>
                {toppingarr.map(x=>
                            <FormControlLabel
                            control={
                              <Checkbox
                                className="toppingList"
                                checked={state.checkedB}
                                onChange={handleChange}
                                name = 'checkB'
                                value={x}
                                color="primary"
                              />
                            }
                            label={x}
                />)}
                <button onClick={addtoppin}>Add to Cart</button>
            </div>
        )
    }


}

export default IcecreamToppings;