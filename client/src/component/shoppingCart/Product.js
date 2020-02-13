import React from 'react';
import HP1 from './photos/HP1.jpg';
import HP2 from './photos/HP2.jpg';
import HP3 from './photos/HP3.jpg';
import SW1 from './photos/SW1.jpg';

const Product = () =>{
  return(
    <article class ="">
      <div class="vrs">
        <img src = {HP1} className="br-100 h4w4dib ba b--black-05 pa2" title="First HP" />
        <h1 className = "f3 mb2">Harry Potter</h1>
        <h2 className ="f5 fw4 gray mt0">I dont know</h2>

        <button className ="f6 grow no-underline br-pill ba bw1 ph3 pv2 mb2 dib hot-pink">Add</button>

      </div>
    </article>
  );
};
export default Product;