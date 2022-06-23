import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';


const Shop_footer=()=>{


    const mounted=useRef();





    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            mounted.current=true;





        }
        else{ //componentDidUpdate

        }

    });
    return(

        <div>


            <div className='footer'>Copyright © 2021 tommy. All rights reserved.</div>


    </div>


);
}
export default Shop_footer;
