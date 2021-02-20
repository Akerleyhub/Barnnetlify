import React from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import brown from '@material-ui/core/colors/brown';
import barnlogo from './pics/barnlogo.jpg';
import './Global.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
      '&:hover': {
        backgroundColor: red[500],
        color: '#FFF'
      },
      margin:'20px',
      backgroundColor: red[900]
    },
    nonroot:{
        '& > *': {
            margin: theme.spacing(1),
          },
        '&:hover': {
          backgroundColor: brown[500],
          color: '#FFF'
        },
        backgroundColor: brown[700]
    }
  }));

//have it so they cant click order food buttons unless they're logged in
const Home=()=>{
    const history = useHistory();
    const classes = useStyles();

    let toke = localStorage.getItem('_token');
    return (
        <div style={{textAlign:"center"}}>
            <h1>Welcome to </h1> <br />
            <img style={{height:'300px', width:'300px'}}src ={barnlogo} alt="logo" />
            {/* <img src ="/pics/barnlogo.jpg" /> */}
            <h4>Here you can view and order online</h4> <br />
            <p><b>After making a cart and finishing the order we will send you a code that you can redeem at The Barn</b></p>
            <p><b>This will make your order faster so you can avoid lines and have less contact during this pandemic</b></p>
            {toke ?
            <div>
              <Button className={classes.root} variant="contained" color="secondary" onClick={()=>history.push('/food')} disabled>Order Food</Button>
              <Button className={classes.root} variant="contained" color="secondary" onClick={()=>history.push('/icecreamtype')}>Order Ice Cream</Button>
              <Button className={classes.root} variant="contained" color="secondary" onClick={()=>history.push('/smoothie')}>Order Smoothie</Button> <br />
              <Button className={classes.nonroot} variant="contained" color="primary" onClick={()=>history.push('/about')}>About</Button>
            </div>
            :
            <div>
              <Button className={classes.nonroot} variant="contained" color="primary" onClick={()=>history.push('/about')}>About</Button>
              <br />
              <p>New to the barn? Sign up here!</p>
              <Button className={classes.nonroot} variant="contained" color="primary" onClick={()=>history.push('/signup')}>Sign up</Button>
            </div>
            }
        </div>
    )
}

export default Home;