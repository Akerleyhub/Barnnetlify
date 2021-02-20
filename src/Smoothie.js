import React,{useState} from 'react';
import Menu from './Menu.json';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

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

const Smoothie=()=>{

    const [value, setValue] = useState('');
    const flavor = Menu.smoothie[0].flavors;
    const history = useHistory();
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const addflavor=()=>{
        let radios = document.getElementsByName('flavor');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                let f = radios[i].value;
                let thing = {flavor: f, type:'smoothie', price: 5.00, tprice:0.00}
                //why call this twice you might ask? bc with finding the value the first time order is undefined
                //so the second time it will be defined so it will add the values and overwrite the old ones
                dispatch({type:'ADD_ORDER', thing });
                dispatch({type:'ADD_ORDER', thing });
                dispatch({type:'ADD_ID' });
                dispatch({type:'ADD_CART' });
                dispatch({type:'CLEAR_ORDER' });

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        history.push('/cart');
    }
    return (
        <div>
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend"><b>Smoothie Choices:</b></FormLabel>
                <br />
                <RadioGroup aria-label="flavor" name="flavor" value={value} onChange={handleChange}>
                    {flavor.map(x=> 
                    <FormControlLabel value={x.fruit} control={<MaroonRadio />} label={x.fruit} />
                    )}
                </RadioGroup>
            </FormControl>
            <button onClick={()=>history.push('/')}>Back Home</button>
            <button onClick={addflavor}>Add to Cart</button>
        </div>
    )
}

export default Smoothie;