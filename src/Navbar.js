import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import red from '@material-ui/core/colors/red';
import SvgIcon from '@material-ui/core/SvgIcon';
import {useHistory} from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  barColor:{
      backgroundColor: red[900]
  },
}));

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
}


export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  let toke = localStorage.getItem('_token');

  const logout=()=>{
    localStorage.clear();
    history.push('/');
    window.location.reload(); 
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.barColor}>
        <Toolbar>
          <IconButton onClick={()=>history.push('/')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            The Barn
          </Typography>
          <IconButton onClick={()=>history.push('/cart')} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ShoppingCartIcon fontSize="medium" />
          </IconButton>
          {toke?<Button color="inherit" onClick={()=>logout()}>Logout</Button>:<Button color="inherit" onClick={()=>history.push('/login')}>Login</Button>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
