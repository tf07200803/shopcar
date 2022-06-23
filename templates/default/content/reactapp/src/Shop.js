
import {HashRouter,Route,Switch} from "react-router-dom";
import Shop_index from "./Shop_index";
import Shop_menu from "./Shop_menu";
import Shop_footer from "./Shop_footer";
import Shop_login from "./Shop_login";
import Shop_register from "./Shop_register";
import {useEffect, useRef, useState} from "react";
import Shop_detail from "./Shop_detail";
import Shop_carlist from "./Shop_carlist";
import Shop_check_list from "./Shop_check_list";
import Shop_finish_report from "./Shop_finish_report";
import Shop_order_list from "./Shop_order_list";
import Admin_login from "./Admin_login";
import Admin_index from "./Admin_index";
import Admin_updata from "./Admin_updata";
import Admin_updatalist from "./Admin_updatalist";
import Admin_orderlist from "./Admin_orderlist";
import Admin_order_check from "./Admin_order_check";
import Admin_viplist from "./Admin_viplist";
import Admin_vip_check from "./Admin_vip_check";

import Admin_bannerlist from "./Admin_bannerlist";
import Admin_banner from "./Admin_banner";


import Admin_imgupload from "./Admin_imgupload";

import { add, multiply,getcookie,setcookie,delcookie } from './cookie.js';
import $ from 'jquery';
import axios from 'axios';

const Shop=()=>{


    const mounted=useRef();
    const [logincc,loginchange]=useState(false);
    const [regcc,regchange]=useState(false);
    const [pageid,pagechange]=useState(null);
    const [myArray,myArrayChange]=useState(getcookie('shopdata') ? JSON.parse(getcookie('shopdata')):[]);
    const registerpath='index.php?m=member&c=index&a=register'
    const memberpath='index.php?m=member&c=index&a=init&webtype=vue'
    const loginpath='index.php?m=member&c=index&a=login';
    const logoutpath='index.php?m=member&c=index&a=logout&webtype=vue'
    const [jsondata,datachange]=useState(null);
    const [shopid,shopidchange]=useState(null);
    const [admincc,adminccchange]=useState(true);
    const [admindata,admindatachange]=useState(null);
    const [order,orderchange]=useState(null);


    Date.prototype.format = function(fmt) {
        var o = {
           "M+" : this.getMonth()+1,                 //月份
           "d+" : this.getDate(),                    //日
           "h+" : this.getHours(),                   //小时
           "m+" : this.getMinutes(),                 //分
           "s+" : this.getSeconds(),                 //秒
           "q+" : Math.floor((this.getMonth()+3)/3), //季度
           "S"  : this.getMilliseconds()             //毫秒
       };
       if(/(y+)/.test(fmt)) {
               fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
       }
        for(var k in o) {
           if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
       return fmt;
   }

    const cookieChange=(data)=>{
        var cc=true
        

        $.map(myArray, function(val) {

            if(val.shop_list_target==data.shop_list_target){

                alert("此商品已在購物車")

                cc=false;
            }

        });


        if(cc){

            myArrayChange(myArray => [...myArray, data]);

            alert("已成功加入購物車")

        }


    }

    const getcoo=()=>{
        console.log(getcookie('shopdata'))
    }


    const shopidfunction=(id)=>{


        if(id){
            shopidchange(id)
        }else{

        }
        return shopid;

    }


    const cookieDelete=(data)=>{


        myArrayChange(data)
    }



    const loginclick=(cc)=>{
        if(cc){
            loginchange(true)
        }else{
            loginchange(false)
        }

    }

    const regclick=(cc)=>{
        if(cc){
            regchange(true)
        }else{
            regchange(false)
        }

    }
    const reggo=(data,checksuccess)=>{

        var self=this;
        var bodyFormData = new FormData();
        bodyFormData.set('nickname', data.nickname);
        bodyFormData.set('username', data.username);
        bodyFormData.set('email', data.email);
        bodyFormData.set('tel', data.tel);
        bodyFormData.set('sex', data.sex);
        bodyFormData.set('password', data.password);
        bodyFormData.set('address', data.address);
        bodyFormData.set('cityname', data.cityname);
        bodyFormData.set('conturyname', data.conturyname);
        bodyFormData.set('finishaddress', data.finishaddress);
        bodyFormData.set('code', data.code);
        bodyFormData.set('webtype', 'react');
        bodyFormData.set('dosubmit', '登录');

        

        axios({
            method: 'post',
            url: registerpath,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                var res=response.data;
                if(res.status==-1){
                    alert(res.msg)
                    checksuccess(-1)
                }else if(res.status==1){
                    alert(res.msg)
                    window.location.href="./"
                }

            })
            .catch(function (response) {

                console.log(response);
            });

    }
    const logingo=(data,checksuccess)=>{

        var self=this;
        var bodyFormData = new FormData();
        bodyFormData.set('username', data.username);
        bodyFormData.set('password', data.password);
        bodyFormData.set('code', data.code);
        bodyFormData.set('webtype', 'react');
        bodyFormData.set('dosubmit', '登录');



        axios({
            method: 'post',
            url: loginpath,
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                var res=response.data;
                if(res.status==-1){
                    alert(res.msg)
                    checksuccess(-1)
                }else if(res.status==1){
                    alert(res.msg)
                    window.location.href="./"
                }

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }
    const loginoutgo=()=>{
        axios.get(logoutpath, {
        }).then(function (response) {
            var res=response.data;
            if(res.status==-1){
                alert(res.msg)
            }else if(res.status==1){
                alert(res.msg)
                window.location.href="./"
            }

        }).catch(function (err) {
            console.log(err);
        });

    }



    const adminlogin=(data)=>{
        var self=this;
        var bodyFormData = new FormData();
        bodyFormData.set('username', data.username);
        bodyFormData.set('password', data.password);
        bodyFormData.set('webtype', 'react');
        bodyFormData.set('dosubmit', '登录');



        axios({
            method: 'post',
            url: 'index.php?m=admin&c=index&a=login&dosubmit=1',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                var res=response.data;
                if(res.status==-1){
                    alert(res.msg)
                }else if(res.status==1){
                    alert(res.msg)
                    admindatachange(res.data)
                    window.location.href="#/Admin_index"
                }

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }


    const adminlogout=()=>{
        axios.get('index.php?m=admin&c=index&a=public_logout&webtype=vue', {
        }).then(function (response) {
            var res=response.data;
            if(res.status==-1){
                alert(res.msg)
            }else if(res.status==1){
                alert(res.msg)
                admindatachange(null)
                window.location.href="#/Admin_login"
            }

        }).catch(function (err) {
            console.log(err);
        });
    }



    const checkadmindata=(callback)=>{
        axios.get('index.php?m=admin&c=index&a=init&webtype=vue', {
        }).then(function (response) {
            var res=response.data;

            if(res.status==-1){
               alert(res.msg)
               window.location.href="#/Admin_login"
            }else if(res.status==1){

                admindatachange(res.data)
                callback(res)

            }else{

            }

        }).catch(function (err) {
            console.log(err);
        });
    }


    const checkadminContentdata=(callback)=>{

        axios.get('index.php?m=content&c=content&a=init&pc_hash='+admindata['pc_hash'], {
        }).then(function () {

            callback(admindata['pc_hash']);

        }).catch(function (err) {
            callback(-1)
        });
    }

    const userlogin=()=>{
        axios.get(memberpath, {
        }).then(function (response) {
            var res=response.data;

            if(res.status==-1){

            }else if(res.status==1){

                datachange(res.data)

            }

        }).catch(function (err) {

            console.log(err);
        });
    }



    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            mounted.current=true;
            
            userlogin()

            //checkadmindata()

        }
        else{ //componentDidUpdate
            
            setcookie('shopdata',JSON.stringify(myArray),1)
            console.log("yayaya")
            console.log(jsondata)

        }

    },[jsondata,myArray,admincc,admindata]);
    return(

        <div>

        <HashRouter>
        <Switch>

        <Shop_menu login={loginclick} reg={regclick} shoplist={myArray} vipdata={jsondata} loginout={loginoutgo} isadmin={adminccchange} _adminlogout={adminlogout} _admindata={admindata}>







        <Route exact path="/"  render={()=>{return( <Shop_index/> )}} />
        <Route path="/Shop_detail" render={()=>{return( <Shop_detail _cookieChange={cookieChange} vipdata={jsondata} shoplist={myArray}/> )}}/>
        <Route path="/Shop_carlist" render={()=>{return( <Shop_carlist shoplist={myArray} _cookieDelete={cookieDelete} _shopidfunction={shopidfunction} vipdata={jsondata} _userlogin={userlogin}/> )}}/>
        <Route path="/Shop_check_list" render={()=>{return( <Shop_check_list _shopidfunction={shopidfunction}/> )}}/>
        <Route path="/Shop_finish_report" render={()=>{return( <Shop_finish_report _shopidfunction={shopidfunction}/> )}}/>
        <Route path="/Shop_order_list" render={()=>{return( <Shop_order_list _shopidfunction={shopidfunction} _userlogin={userlogin}/> )}}/>
        <Route path="/Admin_login"  render={()=>{return( <Admin_login _adminlogin={adminlogin}/> )}} />
        <Route path="/Admin_index"  render={()=>{return( <Admin_index _checkadmindata={checkadmindata} /> )}} />
        <Route path="/Admin_updatalist"  render={()=>{return( <Admin_updatalist _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_updata"  render={()=>{return( <Admin_updata _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_orderlist"  render={()=>{return( <Admin_orderlist _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_order_check"  render={()=>{return( <Admin_order_check _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_viplist"  render={()=>{return( <Admin_viplist _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_vip_check"  render={()=>{return( <Admin_vip_check _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_bannerlist"  render={()=>{return( <Admin_bannerlist _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_banner"  render={()=>{return( <Admin_banner _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />
        <Route path="/Admin_imgupload"  render={()=>{return( <Admin_imgupload _checkadmindata={checkadmindata} _checkadminContentdata={checkadminContentdata} /> )}} />

    </Shop_menu>


    </Switch>
    </HashRouter>

    
    { admincc ? <Shop_footer /> : null }



    { logincc ? <Shop_login login={loginclick} loginsend={logingo} /> : null }
    { regcc ? <Shop_register reg={regclick} regsend={reggo} /> : null }

        

    </div>


    );
    }
        export default Shop;
