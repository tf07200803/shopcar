import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import $ from 'jquery';
import axios from 'axios';

const Admin_login = (props) => {


    const mounted = useRef();



    const loginClick = () => {



        if ($("#username").val() == '') {

            alert("帳號誤為空")
            return;

        } else if ($("#password").val() == '') {
            alert("密碼誤為空")
            return;

        }

        var content={}
        content.username=$("#username").val()
        content.password=$("#password").val()
    
        props._adminlogin(content)
        

        
    }

    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
           




        }
        else { //componentDidUpdate

        }

    }, [props]);
    return (

        <div>



<div className='showmsg_login'>
            <div className='msgcenterview col-10 col-lg-5'>

                <div className='loginview'>


                    <div className='msgTitle'>後台登入</div>
                    <div className='msgDetail'>

                        <div className='row'>

                            <div className='d-inline-block col-12 col-xl-5 text-center'>用戶名 <input type='text' className='' id='username' /></div>
                            <div className='d-inline-block col-12 col-xl-5 mt-2 mt-xl-0 text-center'>密　碼 <input type='password' id='password' /></div>
                            <div className='d-inline-block col-12 col-xl-2 mt-2 mt-xl-0 text-center'><input type='button' value='登　入' onClick={() => loginClick()} /></div>
                        </div>

                    </div>

                </div>

            </div>
</div>




        </div>


    );
}
export default Admin_login;
