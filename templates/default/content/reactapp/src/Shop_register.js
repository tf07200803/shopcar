import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import axios from 'axios';
import $ from 'jquery';

const Shop_register = (props) => {


    const mounted = useRef();
    const [myArray, myArrayChange] = useState(props.shoplist);


    const apipath='https://demeter.5fpro.com/tw/zipcodes.json'
    const [addArray, addArraychange] = useState([]);
    const [city_name, city_name_change] = useState('plz');
    const [contury_name, contury_name_change] = useState('plz');
    const [addressdata, addressdatachange] = useState(null);
    const [sex1, sex1change] = useState('boy');
    const [codeimg, codeimgchange] = useState('')
    const codepath = 'index.php?m=member&c=index&a=codecheck'
    const reg= () =>{
        props.reg(false)
    }
    const changecode=()=>{
        //alert($("#imgcode").attr('src'))
        $("#imgcode").attr('src',$("#imgcode").attr('src')+'&'+Math.random())


    }
    const codeinit=()=>{

        props._loading(true)
        var bodyFormData = new FormData();
        bodyFormData.set('webtype', 'react');

        axios({
            method: 'post',
            url: codepath,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;
                props._loading(false)
                if (res.status == -1) {

                } else if (res.status == 1) {


                    codeimgchange(res.data)



                }

            })
            .catch(function (response) {

                console.log(response);
            });
    }
    const loginClick= () =>{



        if($("#nickname").val()==''){

            alert("姓名誤為空")
            return;

        }else if($("#username").val()==''){
            alert("帳號誤為空")
            return;

        }else if($("#email").val()==''){
            alert("EAMIL誤為空")
            return;

        }else if($("#tel").val()==''){
            alert("電話誤為空")
            return;

        }else if($("#password").val()==''){
            alert("密碼誤為空")
            return;

        }else if($("#password").val()!=$("#checkpassword").val()){
            alert("請在確認密碼")
            return;

        }else if(contury_name=='' || contury_name=='plz'){
            alert("鄉鎮市誤為空")
            return;

        }else if($("#address").val()==''){
            alert("請詳細填寫訂購人地址")
            return;

        }


        var content={}
        content.nickname=$("#nickname").val()
        content.username=$("#username").val()
        content.email=$("#email").val()
        content.tel=$("#tel").val()
        content.sex=sex1
        content.password=$("#password").val()
        content.cityname=city_name
        content.conturyname=contury_name
        content.address=$("#address").val()
        content.code=$("#code").val()
        content.finishaddress=addressdata[contury_name].zipcode+'-'+addressdata[contury_name].full_name+'-'+$("#address").val()
        props._loading(true)
        props.regsend(content,function(msg){
            props._loading(false)
            if(msg==-1){
                changecode()
            }

        })


    }




    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;

            axios.get(apipath, {
            }).then(function (response) {
                var res=response.data;

                addressdatachange(res)
                var array=[]
                for(var i=0;i<res.length;i++){

                    if($.inArray( res[i].city_name, array )==-1){
                        array.push(res[i].city_name)
                    }
                }
                addArraychange(array)


            }).catch(function (err) {

                console.log(err);
            });

            codeinit()



        }
        else { //componentDidUpdate

        }

    },[props,codeimg]);
    return (

        <div>

{addressdata === null ? "" :
            <div className='showmsg'>

                <div className='msgcenterview col-11 col-xl-7'>

                    <div className='loginview'>


                        <div className='msgTitle'>註冊<div className='msgclose' onClick={() => reg()}>
                            <FontAwesomeIcon icon={Icons.faWindowClose} />
                        </div>
                        </div>
                        <div className='msgDetail'>

                            <div className='row'>

                                <div className='col-12'>
                                    <div className='row'>
                                        <div className='col-lg-6  col-12'>
                                            <div className='w-100'>姓名</div>
                                            <div className='w-100'><input type='text' className='' id='nickname' />

                                            <input type="radio" id="sex1boy" name="sex1" value="boy" onChange={(e) => { sex1change('boy') }} checked={sex1=='boy'}/>
                                                                <label htmlFor="sex1boy"><span></span>先生</label>
                                                                <input type="radio" id="sex1girl" name="sex1" value="girl" onChange={(e) => { sex1change('girl') }} checked={sex1=='girl'}/>
                                                                <label htmlFor="sex1girl"><span></span>小姐</label>

                                            </div>
                                        </div>

                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>帳號</div>
                                                <div className='col-11'><input type='text' className='w-100' id='username'/></div>
                                            </div>


                                        </div>

                                    </div>



                                    <div className='row mt-0 mt-lg-3'>
                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>EMAIL</div>
                                                <div className='col-11'><input type='email' className='w-100' id='email'/></div>
                                            </div>


                                        </div>

                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>電話</div>
                                                <div className='col-11'><input type='number' className='w-100' id='tel' /></div>
                                            </div>
                                        </div>

                                    </div>











                                    <div className='row mt-0 mt-lg-3'>
                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>密碼</div>
                                                <div className='col-11'><input type='password' className='w-100' id='password' /></div>
                                            </div>
                                        </div>

                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>確認密碼</div>
                                                <div className='col-11'><input type='password' className='w-100' id='checkpassword'/></div>
                                            </div>
                                        </div>

                                    </div>




                                    <div className='row mt-0 mt-lg-3'>
                                        <div className='col-lg-6 col-12'>

                                            <div className='row'>




                                                <div className='col-2'>
                                                                    <div className='w-100'>區號</div>
                                                                    <input type='text' className="w-95" defaultValue={contury_name!='plz' ? addressdata[contury_name].zipcode : ''} readOnly/>
                                                                </div>
                                                                <div className='col-4'>
                                                                    <div className='w-100'>縣市</div>
                                                                    <select id="city" name="contact" className='w-95' defaultValue={city_name} onChange={(e)=>{ city_name_change(e.target.value) }}>
                                                                    <option value="plz">請選擇</option>
                                                                        {Object.entries(addArray).map((t, k) => <option key={k} value={t[1]}>{t[1]}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className='col-5'>
                                                                    <div className='w-100'>地區</div>
                                                                    <select id="dist" name="contact" className='w-95' defaultValue={contury_name} onChange={(e)=>{ contury_name_change(e.target.value) }}>
                                                                    <option value="plz">請選擇</option>


                                                                    {Object.entries(addressdata).map((t, k) => t[1].city_name==city_name ? <option key={k} value={k}>{t[1].name}</option>:'')}

                                                                    </select>
                                                                </div>

                                            </div>



                                        </div>

                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>地址</div>
                                                <div className='col-11'><input type='text' className='w-100' id='address'/></div>
                                            </div>
                                        </div>

                                    </div>



                                    <div className='row mt-0 mt-lg-3'>




                                        <div className='col-lg-6 col-12'>
                                            <div className='row'>
                                                <div className='col-12'>驗證碼</div>
                                                <div className='col-11'><div className='w-100'><input type='text' id='code' className='width100-130'/><img src={codeimg} onClick={()=>changecode()} id='imgcode' width={85}/></div></div>





                                            </div>
                                        </div>

                                    </div>





                                    <div className='row mt-lg-5 mt-3 justify-content-center text-center'>

                                        <div className='inforshopbtn col-lg-3 col-8'>
                                            <div className='inforbtnclass btncolor1' onClick={() => loginClick()}>確認註冊</div>
                                        </div>


                                    </div>



                                </div>


                            </div>

                        </div>

                    </div>

                </div>


            </div>

}
        </div>


    );
}
export default Shop_register;
