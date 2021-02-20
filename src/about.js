import React from 'react';
import barnmenu from './pics/Foodmenu.jpg';
import barncream from './pics/icecreammenu.jpg';
import barnfish from './pics/morefood.jpg';

const About=()=>
{
  
  return (
    <div>
        <h2>What is the Barn? Why is it called the Barn?</h2> <br />
        <p>
        This is an authentic 1800's barn. It was built between 1866 and 1898 on an pathway
        between the Old
        Gris Mill and Main St.
        The pathway was later
        named Mallery St.
        The Barn is
        at 8 Mallery St.
        in Corinth, NY.
        <br />
        We have renovated it
        into a very unique
        Soft Ice Cream Shop and Eatery
        </p>
        <h5>What We have to offer</h5>
        <ul>
          <li>Great ice cream and food</li>
          <li>Live Music Nights (most) Wednesday's and Saturday's featuring different local bands</li>
          <li>Safe clean comforable outdoor seating</li>
        </ul>
        <img src = {barnmenu} width='400px' height='600px' alt="foodmenupic" />
        <img src = {barncream} width='400px' height='600px' alt="icecreammenupic" />
        <img src = {barnfish} width='400px' height='600px' alt="newfoodmenupic" />
        <p>Adress: 8 Mallery St, Corinth, NY 12822</p>
    </div>
  );
}

export default About;