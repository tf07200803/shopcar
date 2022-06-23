import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import Shop_check from "./Shop_check";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Link } from 'react-router-dom';
const Admin_order_check = (props) => {


    const mounted = useRef();
    const [jsondata, datachange] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const history = useHistory();
    //const shopid=props._shopidfunction()
    const [admindata, admindataChange] = useState(null)
    const admincc = useRef();
    const shopid=history.location.search.split("=")[1]
    const pagechange = (url) => {

        history.push(url);
    }

    const openalert=(id)=>{
        confirmAlert({
            title: '刪除資料',
            message: '確定要刪除id='+id,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deletethis(id)
              },
              {
                label: 'No',
                
              }
            ]
          });
    }

    const passthis=(id,step)=>{
        axios.get('index.php?m=content&c=content&a=pass&ajax_preview=1&catid=6&steps='+step+'&webtype=react&id='+id+'&pc_hash=' + admindata['data']['pc_hash'], {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {


                alert(res.msg)
                pagechange('/Admin_orderlist')

            }

        }).catch(function (err) {
            console.log(err);
        });




    }


    const deletethis=(id)=>{
        

        var bodyFormData = new FormData();
        bodyFormData.set('ids[0]', id);

        axios({
            method: 'post',
            url: 'index.php?m=content&c=content&a=delete&dosubmit=1&catid=6&steps=0&webtype=react&pc_hash=' + admindata['data']['pc_hash'],
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {

                    alert(res.msg)
                    pagechange('/Admin_orderlist')



                }

            })
            .catch(function (response) {

                console.log(response);
            });
    }


    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            props._checkadmindata(function (data) {
                admindataChange(data)

            })
            axios.get('index.php?m=content&c=index&a=show&catid=6&id='+shopid, {
            }).then(function (response) {

                var res = response.data;

                if(res.status==-1){
                    alert(res.msg)
                }else if(res.status==1){
                    res.data.shop_data = JSON.parse(res.data.shop_data.replace(/&quot;/g, '"'))
                    res.data.buyer_data = JSON.parse(res.data.buyer_data.replace(/&quot;/g, '"'))
                    res.data.geter_data = JSON.parse(res.data.geter_data.replace(/&quot;/g, '"'))
                    console.log(res)
                    datachange(res.data)

                }
                



            }).catch(function (err) {

                console.log(err);
            });



        }
        else { //componentDidUpdate
            if (admindata && !admincc.current) {
                admincc.current = true;
            
            }
        }

    }, [props, jsondata,admindata]);
    return (

        <div>
            {jsondata === null ? "" :
                <div className='webwidth' style={{
                    backgroundColor: '#fff',
                
                  }}>
                    <div className='shoplisttop checklistpage'>
                        <div className="row justify-content-center">



                        <div className='detailshopbtn col-xl-12 col-12 mt-4'>

<div className='row justify-content-center'>

    <Link to='Admin_orderlist'>
        <div className='col-xl-6 col-6'>
            <div className='detailbtnclass btncolor2 w99-5 float-end'>返回上一頁</div>
        </div>
    </Link>
</div>


</div>




                            <div className='col-12 col-xl-12 carlisttop2'>



                                <div className='row justify-content-center'>

                                    




                                    
                                    <div className='col-11 mt-3 right_carlist'>
                                    <Shop_check _jsondata={jsondata}/>
                                    </div>



                                    






                                </div>






                            </div>



                            <div className='col-12 mt-3 carlisttop3'>



                                <div className='row'>





                                    <div className='detailshopbtn col-12'>

                                        <div className='row justify-content-center'>

                                            <div className='col-xl-3 col-5'>
                                                <div className='detailbtnclass btncolor1' onClick={(event)=>openalert(jsondata.id)}>刪除此訂單</div>
                                            </div>
                                            <div className='col-xl-3 col-5'>
                                                <div className='detailbtnclass btncolor2' onClick={(event)=>passthis(jsondata.id,jsondata.status)}>確認{jsondata.status==2 ? '付款':jsondata.status==3 ? '出貨':jsondata.status==4 ? '交易完成':''}</div>
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
export default Admin_order_check;
