import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Admin_orderlist = (props) => {

    const history = useHistory();
    const mounted = useRef();
    const admincc = useRef();
    const jsondatacc = useRef();
    const stepnumold=useRef()
    const [admindata, admindataChange] = useState(null)
    const [jsondata, jsondatachange] = useState(null)
    const [stepnum,stepnumchange]=useState(1)
    const [vipdata, vipdatachange] = useState(null)
    const shopid=history.location.search.split("=")[1]



    const getorderlistdata = () => {


        axios.get('index.php?m=content&c=content&a=&menuid=&catid=6&steps=-1&username='+jsondata[0].username+'&webtype=react&pc_hash=' + admindata['data']['pc_hash'], {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {

                
               
                vipdatachange(res.data)
            }

        }).catch(function (err) {
            console.log(err);
        });



    }



    const getorderlist = () => {


        axios.get('index.php?m=member&c=member&a=manage&menuid=72&userid='+shopid+'&webtype=react&pc_hash=' + admindata['data']['pc_hash'], {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {

                console.log(res)
                jsondatacc.current = false
                jsondatachange(res.data)
            }

        }).catch(function (err) {
            console.log(err);
        });



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
                    getorderlist()



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



        }
        else { //componentDidUpdate
            if (admindata && !admincc.current) {
                admincc.current = true;
                getorderlist()

            }
            if (jsondata && !jsondatacc.current) {
                jsondatacc.current = true;
                const newArr = [...jsondata];
                for (var i = 0; i < newArr.length; i++) {
                    var ymd = new Date(newArr[i]['updatetime'] * 1000);
                    var ymd2 = ymd.format("yyyy-MM-dd hh:mm:ss")
                    newArr[i]['newdata'] = ymd2
                    jsondatachange(newArr)
                }
                getorderlistdata()
            }
            if(stepnumold.current!=stepnum && admincc.current){
                getorderlist()
                
            }
            stepnumold.current=stepnum

        }

    }, [props, admindata, jsondata,stepnum]);
    return (

        <div>


            <div className='row justify-content-center'>
                <div className='msgcenterview col-11 col-xl-7'>





                    <div className='msgDetail'>

                        <div className='row'>
                            <div className='col-12 carlisttop3'>



                                <div className='row'>





                                    <div className='detailshopbtn col-xl-12 col-12'>

                                        <div className='row justify-content-center'>

                                            <Link to='Admin_viplist'>
                                                <div className='col-xl-6 col-6'>
                                                    <div className='detailbtnclass btncolor2 w99-5 float-end'>返回上一頁</div>
                                                </div>
                                            </Link>
                                        </div>


                                    </div>


                                    


                                    <div className='col-12'>



{jsondata === null ? "" :

    Object.entries(jsondata).map((t, k) =>
        <div className='row' key={k}>

            



            <div className='col-12 greenborder mt-3'>

<div className='right_content'>


    <div className='row'>
        <div className='col-12 tdpadding10'>
            <table>
                <tbody>
                    <tr>
                        <td>帳號</td>
                        <td>{t[1].username}</td>
                    </tr>
                    <tr>
                        <td>暱稱</td>
                        <td>{t[1].nickname}</td>
                    </tr>
                    <tr>
                        <td>EMAIL</td>
                        <td>{t[1].email}</td>
                    </tr>
                    <tr>
                        <td>電話</td>
                        <td>{t[1].tel}</td>
                    </tr>
                    <tr>
                        <td>地址</td>
                        <td>{t[1].finishaddress}</td>
                    </tr>
                    <tr>
                        <td>性別</td>
                        <td>{t[1].sex == 'boy' ? '先生' : '女士'}</td>
                    </tr>
                    

                </tbody>
            </table>

        </div>



    </div>

    <div className='row mt-4'>

        <div className='col-12 topbottomline pt-3 pb-3'>訂購紀錄</div>

        <div className='col-12'>

    <div className='row'>

        <div className='col-12 greenborder mt-3'>


            <div className='right_content'>


                <div className='row ordertitle'>

                    <div className='col-1 px-1 py-1'>ID</div>
                    <div className='col-2 px-1 py-1'>總金額	</div>
                    <div className='col-3 px-1 py-1'>已付金額	</div>
                    <div className='col-3 px-1 py-1'>发布人		</div>
                    <div className='col-3 px-1 py-1'>後五碼		</div>
                </div>
                {vipdata === null ? "" :

Object.entries(vipdata).map((t, k) =>
                <div className='row'  key={k}>

                    <div className='col-1 px-1 py-1'>
                        {t[1].id}

                    </div>
                    <div className='col-2 px-1 py-1'>{t[1].shop_total}	</div>
                    <div className='col-3 px-1 py-1'>{t[1].finishmoney}	</div>
                    <div className='col-3 px-1 py-1'>{t[1].username}	</div>
                    <div className='col-3 px-1 py-1'>{t[1].fivenumber}</div>
                </div>
)}


                

            </div>


        </div>

    </div>


        </div>



    </div>





</div>


</div>



        </div>
    )}






</div>




                                </div>


                            </div>



                        </div>

                    </div>



                </div>
            </div>



        </div>


    );
}
export default Admin_orderlist;
