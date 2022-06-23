import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import $ from 'jquery';
import * as PIXI from 'pixi.js'



const Admin_imgupload = (props) => {


    const mounted = useRef();
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const oldpicurl = useRef('');
    const [stagebunny, bunnychange] = useState(null)
    const [stageapp, appchange] = useState('')
    const oldapp= useRef('');
    const [type, typechange] = useState('all')
    const oldtype = useRef('all');

    const initCanvas = () => {





        const app = new PIXI.Application({ width: props._width, height: props._height, backgroundColor: 0x000 });

        $("#setimg").append(app.view)

        var texture
        const loader = new PIXI.Loader();
        loader.add('bunny', props._data)
        oldpicurl.current=props._data
        loader.load((loader, resources) => {
            texture = PIXI.Texture.from(props._data);
            const bunny = new PIXI.Sprite(texture);
            app.stage.addChild(bunny);
            setbunny(bunny,app);
            bunnychange(bunny)
            appchange(app)

            if(window.innerWidth<500){
                //var scalebily=window.innerWidth/500

            }



        })








    }
    const setbunny = (bunny,app) => {


        var w = bunny.width
        var h = bunny.height
        var bili = w / h
        var screenbili=app.screen.width/app.screen.height

        if (type == 'all') {

            if (screenbili < bili) {

                bunny.height = app.screen.height
                bunny.width = app.screen.height * bili
                bunny.x = -(bunny.width - app.screen.width) / 2
                bunny.y=0

            } else {
                bunny.width = app.screen.width
                bunny.height = app.screen.width / bili
                bunny.y = -(bunny.height - app.screen.height) / 2
                bunny.x=0
            }

        } else {
            if (screenbili < bili) {
                bunny.width = app.screen.width
                bunny.height = app.screen.width / bili
                bunny.x=0
                bunny.y=(app.screen.height-bunny.height) / 2
            }else{
                bunny.height=app.screen.height
                bunny.width=bunny.height*bili
                bunny.y=0
                bunny.x=(app.screen.width-bunny.width)/2
            }
        }

    }


    const saveimg=()=>{
        stageapp.render()
        var base64=stageapp.view.toDataURL("image/jpeg",0.8)

        props._uploadbase64(base64)
        //console.log($('canvas')[0].toDataURL("image/png"));
    }





    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            initCanvas()




        }
        else { //componentDidUpdate

            if(type!=oldtype.current){

                oldtype.current=type
                setbunny(stagebunny,stageapp)
                saveimg()
            }
            if(props._data!=oldpicurl.current){

                $("#setimg").empty();
                initCanvas()

            }

            if(stageapp!=oldapp.current){
                saveimg()
                oldapp.current=stageapp
            }

        }

    }, [props,type,stageapp]);
    return (

        <div>


            <div className='row justify-content-center'>

                <div id='setimg' className='col-auto'>




                </div>


                <div className='detailshopbtn col-xl-12 col-12 mt-3'>

                    <div className='row justify-content-center'>

                        <div className='col-4'>
                            <div className='detailbtnclass btncolor1 w99-5' onClick={ () => typechange('all')}>全版模式</div>
                        </div>


                        <div className='col-4'>
                            <div className='detailbtnclass btncolor2 w99-5 float-end' onClick={ () => typechange('normal')}>正常模式</div>
                        </div>



                    </div>

                </div>




            </div>



        </div>


    );
}
export default Admin_imgupload;
