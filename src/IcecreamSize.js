import React,{useState} from 'react';
import Menu from './Menu.json';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';

import './Global.css';

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

const IcecreamSize=()=>{

    var sizearr = [];

    const order = useSelector(store => store.order);
    const [value, setValue] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const whatsize=()=>{
        //change size options depending on the type they want
        if(order[0].type === 'Milkshake'){
            var size = Menu.icecream[1].sizes.milkshakes;
        }else if(order[0].type === 'Cone' || order[0].type === 'Dish'){
            var size = Menu.icecream[1].sizes.conesdishes;
        }else if(order[0].type === 'Flurry'){
            var size = Menu.icecream[1].sizes.flurries;
        }else if(order[0].type === 'Sundae'){
            var size = Menu.icecream[1].sizes.sundays;
        }else if(order[0].type === 'Banana Split'){
            var size = Menu.icecream[1].sizes.bananasun;
        }
        //sizearr = [];
        Object.entries(size).map(([key,value])=>{
            console.log(value,'--------------')
            sizearr.push(value);
        })
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const addsize=()=>{
        let radios = document.getElementsByName('size');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                let s = radios[i].value;
                let c = sizearr[i].price;
                let thing = {size: s, price: c}
                dispatch({type:'ADD_ORDER', thing })

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        history.push('/icecreamflavor');
    }

    return (
        <div style={{textAlign:"center"}}>
            {whatsize()}
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend"><b>Size Choices:</b></FormLabel>
                <br />
                <RadioGroup aria-label="size" name="size" onChange={handleChange}>
                    {sizearr.map(x=> 
                    <FormControlLabel value={x.size} control={<MaroonRadio />} label={x.size} />
                    )}
                </RadioGroup>
            </FormControl>
            <button onClick={()=>history.push('/icecreamtype')}>Back</button>
            <button onClick={addsize}>Next</button>
        </div>
    )
}

export default IcecreamSize;