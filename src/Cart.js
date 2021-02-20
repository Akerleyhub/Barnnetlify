//will show all the items in your cart and let you remove them

import React from 'react';
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import APIpage from './APIpage';

const CurrCart=()=>{
    const cart = useSelector(store => store.cart);
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(cart);

    const [userid,setuserid] = useState("");
    useEffect(() => {
        async function getPerson() {
            let userid = await APIpage.getUser(); //Should return {id: some number}
            let realid = userid.id
            console.log(realid)
            setuserid(realid);
        }
        getPerson();
    }, []);
    const getToppings=(x)=>{
        let str = "";
        for(let c=0;c<10;c++)
        {
            if(x[c]==null){
                return str;
            }
            if(x[c+1]==null){
                str+=`${x[c]}`;
            }else{
                str+=`${x[c]}, `;
            }
        }
    }

    //This will clear up the car so we can send it to our db happily
    const formatCart=()=>{
        return cart.map(function(item) {
            // create a new object to store full name.
            let newObj = {};
            newObj["type"] = item.type;
            newObj['flavor']=item.flavor;
            newObj['size'] = item.size;
            newObj['topping1']=item['0'] || '';
            newObj['topping2']=item['1'] || '';
            newObj['topping3']=item['2'] || '';
            newObj['topping4']=item['3'] || '';
            newObj['topping5']=item['4'] || '';
            newObj['topping6']=item['5'] || '';

            // return our new object.
            return newObj;
          });
    }

    //generate random string that will be turned into a qrcode
    const makeqrcode=(length)=>{
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    //removing an item from cart
    const rmItem=(obj)=>{
        let id = obj.x.id;
        dispatch({type:'DELETE_CART_ITEM', id });
    }

    const checkoutprice =()=>{
        if(cart.length == 0){
                return 0;
        }
        let t = 0;
        for(let price =0;price<cart.length;price++)
        {
            //if there are no topping only add the base price
            if(Object.is(parseFloat(cart[price].topprice), NaN)){
                t+=parseFloat(cart[price].price);
                continue;
            }
            console.log(cart[price].price);
            console.log(cart[price].topprice);
            //otherwise add the base price plus each topping added
            t+=parseFloat(cart[price].price) + parseFloat(cart[price].topprice);
        }
        console.log(t);
        return t;
        
    }
    
    //Nested tenary operator expample if needed
    //var icon = (area == 1) ? icon1 : (area == 2) ? icon2 : icon0;
    return (
        <div>
            {cart.map(x=> 
                <div id = {x.id} style={{border: '1px solid', margin:'5px', height:'270px',width:'450px'}}> 
                    {x.type=='smoothie' ? 
                    <div>
                        <h3>Smoothie</h3>
                        <p>{x.flavor}</p>
                        <p><b>PRICE:</b> <div className="cost">{x.price}</div></p>
                        <button onClick={()=>rmItem({x})}>Remove Item</button>
                        <br />
                    </div>
                    :
                    <div>
                    <h3>{x.type}</h3>
                    <p>{x.flavor}</p>
                    <p>{x.size}</p>
                    <p><b>PRICE:</b> <div className="cost">{x.price+x.topprice}</div></p>
                    <p>{getToppings(x)}</p>
                    <button onClick={()=>rmItem({x})}>Remove Item</button><br />
                    </div>
                    }
                </div>)
            }
            <p>Your total so far: {checkoutprice()} </p>
            <button onClick={()=>history.push('/')}>Add Another Item</button>
            <br /><br /><br />
            <PayPalButton
                amount={checkoutprice()}
                shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={async (details, data) => {
                    //alert("Transaction completed by " + details.payer.name.given_name);
                    alert("Thank-you for your order, press OK to proceed");
                    //add cart json to db, generate a QRCode the references that order
                    //empty the cart
                    let orderitems = formatCart();
                    let qr = makeqrcode(15);
                    let total = checkoutprice();
                    
                    let order = {qrcode: qr, totalcost:total, fk_customerid: userid}
                    console.log(order);
                    console.log(orderitems);
                    await APIpage.addOrder(order);
                    await APIpage.addOrderItems(orderitems);

                    dispatch({type:'DELETE_CART' });
                    history.push('/qrcode');


                    // OPTIONAL: Call your server to save the transaction comment out for now
                    // return fetch("/paypal-transaction-complete", {
                    //     method: "post",
                    //     body: JSON.stringify({
                    //         orderID: data.orderID
                    //     })
                    // });
                }}
                onError={(err) => {
                    alert('There was a problem with the info you provided');
                    console.log(err);
                }}
                options={{
                    clientId: "AeMpbvZc9eDS9FBfBxNY8F0_9OsL3ZV7lLDcHmyKG6UpN5ulMyBZiDbV48EM3pyQ3-WH3vqVLSMK8yjW"
                }}
            />
        </div>
    )
}
//https://www.npmjs.com/package/react-paypal-button-v2
//https://luehangs.site/lue_hang/projects/react-paypal-button-v2#usage-example
export default CurrCart;