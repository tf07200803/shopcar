import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import $ from 'jquery';
import axios from "axios";

const Shop_login=(props)=>{


    const mounted=useRef();
    const [codeimg, codeimgchange] = useState('')
    const login= () =>{
        props.login(false)
    }

    const loginClick= () =>{



        if($("#username").val()==''){

            alert("帳號誤為空")
            return;

        }else if($("#password").val()==''){
            alert("密碼誤為空")
            return;

        }


        var content={}
        content.username=$("#username").val()
        content.password=$("#password").val()
        content.code=$("#code").val()
        props.loginsend(content,function(msg){

            if(msg==-1){
                changecode()
            }

        })
    }


    const logininit=()=>{
        var bodyFormData = new FormData();
        bodyFormData.set('webtype', 'react');

        axios({
            method: 'post',
            url: 'index.php?m=member&c=index&a=login&webtype=react',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {

                } else if (res.status == 1) {


                    codeimgchange(res.data)




                }

            })
            .catch(function (response) {

                console.log(response);
            });
    }

    const changecode=()=>{
        //alert($("#imgcode").attr('src'))
        $("#imgcode").attr('src',$("#imgcode").attr('src')+'&'+Math.random())


    }

    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            mounted.current=true;
            logininit()




        }
        else{ //componentDidUpdate

        }

    },[props, codeimg]);
    return(

        <div>


        <div className='showmsg'>

        <div className='msgcenterview col-10 col-lg-5'>

        <div className='loginview'>


        <div className='msgTitle'>登入<div className='msgclose' onClick={() => login()}><FontAwesomeIcon icon={Icons.faWindowClose} /></div></div>
    <div className='msgDetail'>

        <div className='row'>

        <div className='d-inline-block col-12 col-xl-3 text-left'>用戶名<br /><input type='text' id='username' className='width100-4'/></div>
        <div className='d-inline-block col-12 col-xl-3 mt-2 mt-xl-0 text-left'>密　碼<br /><input type='password' id='password' className='width100-4'/></div>
        <div className='d-inline-block col-12 col-xl-4 mt-2 mt-xl-0 text-left'>驗證碼<br /><div className='w-100'><input type='text' id='code' className='width100-130'/><img src={codeimg} onClick={()=>changecode()} id='imgcode' width={85}/></div></div>
        <div className='d-inline-block col-12 col-xl-2 mt-2 mt-xl-0 text-center'>&nbsp;<br/><input type='button' value='登　入' onClick={() => loginClick()}/></div>
        </div>

        </div>

        </div>

        </div>


        </div>


    </div>


);
}
export default Shop_login;
