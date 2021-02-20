import React,{useState,useEffect} from 'react';
import APIpage from './APIpage';
import {useHistory} from 'react-router-dom';

//https://www.npmjs.com/package/qrcode.react
const QRcode=()=>{
    //add a button that will take them back to the homepage
    const history = useHistory();

    async function sendQRemail() {
        let noreturn = await APIpage.getQRCodeEmail();
    }
    sendQRemail();


    return (
        <div style={{textAlign:"center"}}>
            <h1>Thank you for your order! Redeem this QRCode at The Barn for your order to be processed and complete!</h1>
            <p>You will get an attachment containing the QR Code</p>
            <p>Which is a 15character code out of nums and letters add that to a db</p>
            <p>And check that in the db when a scan is complete</p>
            <button onClick={()=>history.push('/')}>Back Home</button>
        </div>
    )
}

export default QRcode;