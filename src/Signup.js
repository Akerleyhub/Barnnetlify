import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Signup=({signup})=>{
    const history = useHistory();
    const classes = useStyles();
    const initialState = {
        username:'',
        password:'',
        firstName:'',
        lastName:'',
        email:''
    }
    //state for the inputs
    const [formText,setformText] = useState(initialState);

    //changes the state of inputs for each typed character
    const handleChange=(e)=>{
        const {name, value} = e.target;
        setformText(formText => ({
            ...formText,
            [name]:value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        signup(formText); //DISPATCH HERE INSTEAD?
        //sets the form back to empty and sends to jobs page
        setformText(initialState);
        history.push('/');
    }

    return (
        <div style={{textAlign:"center"}}>
            <h1>Signup</h1>
            <form onSubmit = {handleSubmit} className={classes.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" name="username"  label ="Username" value = {formText.username} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-password-input" type="password" name="password"  label ="Password" value = {formText.password} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="firstName"  label ="First Name" value = {formText.firstName} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="lastName"  label ="Last Name" value = {formText.lastName} variant="outlined" onChange={handleChange} /><br />
                <TextField id="outlined-basic" name="email"  label ="Email" value = {formText.email} variant="outlined" onChange={handleChange} /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup;