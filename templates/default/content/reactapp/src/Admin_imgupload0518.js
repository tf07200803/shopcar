import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {fabric} from 'fabric';

const Admin_imgupload=()=>{


    const mounted=useRef();
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    var canvas = new fabric.Canvas('canvas', {
        height: 300,
        width: 300,
        backgroundColor: '#000'
     }); 
    
     
    const initCanvas = () => {
        
        
         /*var rect = new fabric.Rect({
            left: 100,
            top: 50,
            fill: '#D81B60',
            width: 50,
            height: 50,
            strokeWidth: 2,
            stroke: "#880E4F",
            rx: 10,
            ry: 10,
            angle: 45,
            scaleX: 3,
            scaleY: 3,
            hasControls: true
        });
        canvas.add(rect);*/
        var baseimg=new fabric.Image.fromURL(images[0].default, function(img) {

            
    
    
            img.originX= 'center'
            img.originY= 'center'
            img.addEventListener('dragstart', handleDragStart, false);
            
            
            img.scaleX= 300 / img.width
            img.scaleY= img.scaleX
            img.left=300/2
            img.top=225/2
            console.log(img)
            canvas.add(img);
            
        })
        
    }
     const  handleDragStart=()=>{
         console.log("yayayaya")
     } 
        

        
     


    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            mounted.current=true;

            



        }
        else{ //componentDidUpdate

        }

    });
    return(

        <div>


            <div className='col-12 col-lg-6 colorbg' onClick={()=>initCanvas()}>dsvdsvsdv</div>
            <canvas id="canvas"/>

    </div>


);
}
export default Admin_imgupload;
