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

const IcecreamTypes=()=>{
    let typearr = [];
    const dispatch= useDispatch();

    const [value, setValue] = useState('');
    const type = Menu.icecream[2].types;
    const history = useHistory();

    Object.entries(type).map(([key,value])=>{
        typearr.push(value);
    })

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const addtype=()=>{
        let radios = document.getElementsByName('flavor');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                let t = radios[i].value;
                let thing = {type: t}
                dispatch({type:'ADD_ORDER', thing });
                //brownie sunday only has 1size so skip right to flavor choice
                if(t === 'Brownie Sundae'){
                    //only one size so skipping ahead
                    let thing = {"size":"Large","price":7.00};
                    dispatch({type:'ADD_ORDER', thing });
                    history.push('/icecreamflavor');
                }
                else{
                    history.push('/icecreamsize');
                }
                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
        
    }
    return (
        <div style={{textAlign:"center"}}>
            <br />
            <FormControl component="fieldset">
                <FormLabel component="legend"><b>Icecream Options:</b></FormLabel>
                <br />
                <RadioGroup aria-label="flavor" name="flavor" value={value} onChange={handleChange}>
                    {typearr.map(x=> 
                    <FormControlLabel value={x} control={<MaroonRadio />} label={x} />
                    )}
                </RadioGroup>
            </FormControl>
            <button onClick={addtype}>Next</button>
        </div>
    )
}

export default IcecreamTypes;