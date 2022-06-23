import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import axios from 'axios';
import $ from "jquery";
const Shop_finish_report = (props) => {

    const history = useHistory();
    const mounted = useRef();
    const [jsondata, datachange] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    //const shopid=props._shopidfunction()
    const shopid=history.location.search.split("=")[1]

    const [dd, ddchange] = useState('');
    //const orderpath='index.php?m=content&c=index&a=register'
    const orderpath='index.php?m=member&c=content&a=editreact'
    const pagechange = (url) => {

        history.push(url);
    }


   const sendorder=()=>{




       if($("#fivenumber").val()==''){

           alert("匯款帳號後五碼誤為空")
           return;

       }else if($("#sendtime").val()==''){
           alert("匯款日期誤為空")
           return;

       }else if($("#finishmoney").val()==''){
           alert("匯款金額誤為空")
           return;

       }

       props._loading(true)
       var bodyFormData = new FormData();
       bodyFormData.set('id', jsondata.id);
       bodyFormData.set('info[catid]', 6);
       bodyFormData.set('webtype', 'react');
       bodyFormData.set('dosubmit', '購物車送出');
       bodyFormData.set('info[fivenumber]', $("#fivenumber").val());
       bodyFormData.set('info[sendtime]', $("#sendtime").val());
       bodyFormData.set('info[finishmoney]', $("#finishmoney").val());
       axios({
           method: 'post',
           url: orderpath,
           data: bodyFormData,
           headers: {'Content-Type': 'multipart/form-data' }
       })
           .then(function (response) {


               props._loading(false)

               var res=response.data;

               alert(res.msg)
               if(res.status==-1){

               }else if(res.status==1){

                   window.location.href="./"


               }

           })
           .catch(function (response) {

               console.log(response);
           });



       /*bodyFormData.set('info[shop_data]', JSON.stringify(myArray));
       bodyFormData.set('info[shop_fare]', '實體ATM');
       bodyFormData.set('info[shop_from]', sendtype);
       bodyFormData.set('info[shop_total]', totalprize);
       bodyFormData.set('info[buyer_data]', JSON.stringify(buyerobj));
       bodyFormData.set('info[geter_data]', JSON.stringify(geterobj));
       bodyFormData.set('info[eqno]', eqno);
       bodyFormData.set('info[buy_totalnum]', total);
       bodyFormData.set('info[buy_prize]', prize);
       bodyFormData.set('info[buy_freight]', freight);
       bodyFormData.set('info[catid]', 6);
       bodyFormData.set('info[title]', 'post');
       bodyFormData.set('info[content]', 'post_content');
       bodyFormData.set('webtype', 'react');
       bodyFormData.set('dosubmit', '購物車送出');
       axios({
           method: 'post',
           url: publicpath,
           data: bodyFormData,
           headers: {'Content-Type': 'multipart/form-data' }
       })
           .then(function (response) {

               var res=response.data;

               if(res.status==-1){
                   alert(res.msg)
               }else if(res.status==1){
                   props._shopidfunction(res.data)
                   alldelete()
                   alert(res.msg)


                   pagechange('/Shop_check_list')

               }

           })
           .catch(function (response) {

               console.log(response);
           });*/
   }

    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            props._loading(true)
            mounted.current = true;
            axios.get('index.php?m=content&c=index&a=show&catid=6&id='+shopid, {
            }).then(function (response) {
                props._loading(false)
                var res = response.data;
                if(res.status==-1){
                    alert(res.msg)
                }else if(res.status==1){
                    res.data.shop_data = JSON.parse(res.data.shop_data.replace(/&quot;/g, '"'))
                res.data.buyer_data = JSON.parse(res.data.buyer_data.replace(/&quot;/g, '"'))
                res.data.geter_data = JSON.parse(res.data.geter_data.replace(/&quot;/g, '"'))
                console.log(res)
                var ymd=new Date(res.data.inputtime*1000);
                var ymd2=ymd.format("yyyy-MM-dd hh:mm:ss")

                ddchange(ymd2)

                datachange(res.data)

                }




            }).catch(function (err) {

                console.log(err);
            });





        }
        else { //componentDidUpdate

        }

    }, [props]);
    return (

        <div>
            {jsondata === null ? "" :
            <div className='webwidth'>
                <div className='shoplisttop checklistpage'>
                    <div className="row justify-content-center px-0 py-0 mx-0 my-0">







                        <div className='col-12 col-xl-12 carlisttop2'>



                            <div className='row justify-content-center'>






                                <div className='col-11  right_carlist'>


                                    <div className='row'>








                                        <div className='col-12 greenborder mt-3 px-0 py-0'>

                                            <div className='right_carlist_title justify-content-center'> 匯款通知</div>
                                            <div className='right_content'>


                                                <div className='row'>
                                                    <div className='col-12'>
                                                        <table className='finish_report_table'>
                                                            <tbody>
                                                                <tr>
                                                                    <td>付款方式</td>
                                                                    <td>銀行匯款</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>銀行戶名</td>
                                                                    <td>陳冠林</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>銀行代碼</td>
                                                                    <td>822</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>銀行帳號</td>
                                                                    <td>602540138144</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>訂單編號</td>
                                                                    <td>{jsondata.eqno}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>訂單日期</td>
                                                                    <td>{dd}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>訂單總計</td>
                                                                    <td>{jsondata.shop_total}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>請填寫您的匯款帳號後五碼</td>
                                                                    <td><input type='number' id='fivenumber' className='col-12 col-xl-6' /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>請填寫您的匯款日期</td>
                                                                    <td><input type='date' id='sendtime' className='col-12 col-xl-6' /></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>請填寫您的匯款金額</td>
                                                                    <td><input type='number' id='finishmoney' className='col-12 col-xl-6' /></td>
                                                                </tr>

                                                            </tbody>
                                                        </table>

                                                    </div>



                                                </div>







                                            </div>


                                        </div>






                                    </div>


                                </div>












                            </div>






                        </div>



                        <div className='col-12 mt-3 carlisttop3'>



                            <div className='row'>





                                <div className='detailshopbtn col-12'>

                                    <div className='row justify-content-center'>

                                        <div className='col-xl-3 col-11'>
                                            <div className='detailbtnclass btncolor1' onClick={() => sendorder()}>確認送出</div>
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
export default Shop_finish_report;
