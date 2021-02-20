import React,{useState} from 'react';
import {BrowserRouter,Route, Switch, Redirect} from 'react-router-dom';
import Home from './home';
import About from './about';
import Singlefood from './Singlefood';
import Singleicecream from './Singlecream';
import Cart from './Cart';
import IcecreamFlavor from './IcecreamFlavor';
import IcecreamTypes from './IcecreamTypes';
import IcecreamToppings from './IcecreamToppings';
import IcecreamSize from './IcecreamSize';
import Foods from './Foods'
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Smoothies from './Smoothie';
import APIpage from './APIpage';
import QRcode from './QRCode';
import {useHistory} from 'react-router-dom';
import Adminpg from './Adminpg';


const Router=()=>{
    //const history = useHistory();
    const [userinfo,setUserinfo] = useState({});
    const getFormData=(logobj)=>{
        //prob add a try catch for all asyncness
        async function login(logobj) {
          const {username,password} = logobj;
          let obj = {username:`${username}`,password:`${password}`}
          let log= await APIpage.login(obj);
          localStorage.setItem('_token', log.token);
          setUserinfo(username);
          return log;
        }
        login(logobj);
    }
    async function signup(logobj) {
        let {username} = logobj;
        let reg= await APIpage.register(logobj);
        localStorage.setItem('_token', reg.token);
        setUserinfo(username);
        return reg;
    }

    
    return (
        <div>
            <BrowserRouter>

                <Navbar />

                <Switch>
                    <Route exact path="/" >
                        <Home />
                    </Route>
                    <Route exact path="/admin" >
                        <Adminpg />
                    </Route>
                    <Route exact path="/login" >
                        <Login getFormData={getFormData} />
                    </Route>
                    <Route exact path="/signup" >
                        <Signup signup={signup} />
                    </Route>
                    <Route exact path="/about" >
                        <About />
                    </Route>
                    <Route exact path="/cart" >
                        <Cart />
                    </Route>
                    <Route exact path="/food/:food">
                        <Singlefood />
                    </Route>
                    <Route exact path="/icecream/:cream" >
                        <Singleicecream /> 
                    </Route>
                    <Route exact path="/food">
                        <Foods />
                    </Route>
                    <Route exact path="/icecreamtype" >
                        <IcecreamTypes /> 
                    </Route>
                    <Route exact path="/icecreamflavor" >
                        <IcecreamFlavor /> 
                    </Route>
                    <Route exact path="/icecreamsize" >
                        <IcecreamSize /> 
                    </Route>
                    <Route exact path="/icecreamtoppings" >
                        <IcecreamToppings /> 
                    </Route>
                    <Route exact path="/smoothie" >
                        <Smoothies /> 
                    </Route>
                    <Route exact path="/qrcode" >
                        <QRcode /> 
                    </Route>
                        <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Router;