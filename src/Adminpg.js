import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import APIpage from './APIpage';
import './Global.css';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const Adminpg =()=>{
    //get order data, who made the order, QRCode
    const [order, setOrder] = useState([]);
    const [state,setState] = useState('');
    const history = useHistory();
    useEffect(() => {
        async function bulkorders() {
            try{
                var orders = await APIpage.getOrders();
                console.log(orders);
                setOrder(orders)
            }catch (e) {
                //aka user isnt logged in so redirect back home cuz they suck
                history.push('/');
            }
        }
        bulkorders();
    }, []);


    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const rmItems =()=>{
        var checkboxes = document.getElementsByName('checkB');
        var vals = [];

        for (var i=0, n=checkboxes.length;i<n;i++) 
        {
            if (checkboxes[i].checked) 
            {
                vals.push(checkboxes[i].id);
            }
        }
        console.log(vals);
        async function takeOff(vals) {
            try{
                var orders = await APIpage.markDone(vals);
                console.log("it worked i hope");
                window.location.reload(); 
                //setOrder(orders);
            }catch (e) {
                console.log(e);
            }
        }
        takeOff(vals);
        // let rmItems = {vals}
        // dispatch({type:'ADMIN_REMOVE', rmItems });
    }
    
    return (
        <div>
            <div style={{border: '1px solid', margin:'5px', height:'60px',width:'85%'}}>
                <p><b>QRCODE  |  FIRST_NAME  |  LAST_NAME  |  TOTAL_COST  |  TYPE  |  SIZE  |  FLAVOR  |  TOPPING1  |  TOPPING2  |  TOPPING3  |  TOPPING4  |  TOPPING5  |  TOPPING6</b></p>
            </div>
            {/* make this id for order */}
            {order.map(x=>
                <div id = {x.orderitemid} style={{border: '1px solid', margin:'5px', height:'90px',width:'85%'}}> 
                    <p>{x.qrcode}--{x.firstname}--{x.lastname}--{x.totalcost}--{x.type}--{x.size}--{x.flavor}--{x.topping1 || ""}--{x.topping2 || ""}--{x.topping3 || ""}--{x.topping4 || ""}--{x.topping5 || ""}--{x.topping6 || ""}</p>
                    <FormControlLabel
                            control={
                              <Checkbox
                                id = {x.orderitemid}
                                className="OrderList"
                                checked={state.checkedB}
                                onChange={handleChange}
                                name = 'checkB'
                                color="primary"
                              />
                            }
                            label={x.orderitemid}
                    />
                </div>
            )}
            <button onClick={rmItems}>Remove Checked Items</button>
        </div>
    )
}

export default Adminpg;

