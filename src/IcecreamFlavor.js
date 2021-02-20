import React,{useState} from 'react';
import Menu from './Menu.json';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';


const MaroonRadio = withStyles({
    root: {
      color: "black",
      '&$checked': {
        color: red[900],
      },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const IcecreamFlavor=()=>{
    let flavortown = [];
    const history = useHistory();
    const dispatch = useDispatch();
    const [value, setValue] = useState('vanilla');
    const order = useSelector(store => store.order);

    if(order[0].type === 'Milkshake')
    {
        const milkshakef = Menu.icecream[3].milkshake;
        console.log(milkshakef)
        console.log(Menu.icecream)
        Object.entries(milkshakef).map(([key,value])=>{
            flavortown.push(value);
        })
    
        const handleChange = (event) => {
            setValue(event.target.value);
        };
    
        const addmflavor=()=>{
            let radios = document.getElementsByName('milkflavor');
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    // do whatever you want with the checked radio
                    let f = radios[i].value;
                    let thing = {flavor: f}
                    dispatch({type:'ADD_ORDER', thing });
                    dispatch({type:'ADD_CART' });
                    dispatch({type:'CLEAR_ORDER'});
    
                    // only one radio can be logically checked, don't check the rest
                    break;
                }
            }
            history.push('/cart');
        }
        return (
            <div style={{textAlign:"center"}}>
                <br />
                <FormControl component="fieldset">
                    <FormLabel component="legend"><b>Milkshake Flavors:</b></FormLabel>
                    <br />
                    <RadioGroup aria-label="milkflavor" name="milkflavor" value={value} onChange={handleChange}>
                        {flavortown.map(x=> 
                        <FormControlLabel value={x} control={<MaroonRadio />} label={x} />
                        )}
                    </RadioGroup>
                </FormControl>
                <button onClick={()=>history.push('/icecreamsize')}>Back</button>
                <button onClick={addmflavor}>Add to Cart</button>
            </div>
        )

    }

    //ELSE -------------------------------------------------------------------------------

    const flavors = Menu.icecream[0].flavors;
    console.log(flavors);
    

    Object.entries(flavors).map(([key,value])=>{
        flavortown.push(value);
    })

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const addflavor=()=>{
        let radios = document.getElementsByName('flavor');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                let f = radios[i].value;
                let thing = {flavor: f}
                dispatch({type:'ADD_ORDER', thing })

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        history.push('/icecreamtoppings');
    }
    return (
        <div style={{textAlign:"center"}}>
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend"><b>Flavor Choices:</b></FormLabel>
                <br />
                <RadioGroup aria-label="flavor" name="flavor" value={value} onChange={handleChange}>
                    {flavortown.map(x=> 
                    <FormControlLabel value={x} control={<MaroonRadio />} label={x} />
                    )}
                </RadioGroup>
            </FormControl>
            <button onClick={()=>history.push('/icecreamsize')}>Back</button>
            <button onClick={addflavor}>Next</button>
        </div>
    )
}

export default IcecreamFlavor;