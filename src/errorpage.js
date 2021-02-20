import React from 'react';
import error1 from './pics/errorobot.png';
import error2 from './pics/errorbot2.jpg';

const Error=()=>{
    return (
        <div>
            <h1>We're sorry something went wrong</h1>
            <h2>Please try again or contact the barn directly by phone</h2>
            <img src = {error1} width='400px' height='600px' alt="error1" />
            <img src = {error2} width='400px' height='600px' alt="error2" />
        </div>
    )
}

export default Error;