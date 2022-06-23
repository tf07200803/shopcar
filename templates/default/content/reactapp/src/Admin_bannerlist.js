import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Admin_updatalist = (props) => {


    const mounted = useRef();
    const admincc = useRef();
    const jsondatacc = useRef();
    const [admindata, admindataChange] = useState(null)
    const [jsondata, jsondatachange] = useState(null)
    

    const getorderlist = () => {


        axios.get('index.php?m=link&c=link&a=init&webtype=react&pc_hash=' + admindata['data']['pc_hash'], {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {


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
        bodyFormData.set('linkid[0]', id);

        axios({
            method: 'post',
            url: 'index.php?m=link&c=link&a=delete&webtype=react&pc_hash=' + admindata['data']['pc_hash'],
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
                
            }
        }

    }, [props, admindata, jsondata]);
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
                                        <Link to='Admin_banner'>
                                            <div className='col-xl-6 col-6'>
                                                <div className='detailbtnclass btncolor1 w99-5'>發佈新廣告</div>
                                            </div>
                                            </Link>
                                            <Link to='Admin_index'>
                                            <div className='col-xl-6 col-6'>
                                                <div className='detailbtnclass btncolor2 w99-5 float-end'>返回上一頁</div>
                                            </div>
                                            </Link>
                                        </div>


                                    </div>


                                </div>


                            </div>
                            <div className='col-12'>



                                {jsondata === null ? "" :

                                    Object.entries(jsondata).map((t, k) =>
                                        <div className='row' key={k}>

                                            <div className='col-12 greenborder mt-3'>


                                                <div className='right_content'>


                                                    <div className='row ordertitle'>

                                                        
                                                        <div className='col-2 px-1 py-1'>	</div>

                                                        
                                                        <div className='col-10 px-1 py-1'>標題</div>
                                                    </div>

                                                    <div className='row align-items-center'>

                                                        
                                                        <div className='col-2 px-1 py-1'><img src={t[1].logo} className='mt-1 w-100' /></div>

                                                        <div className='col-10 px-1 py-1'>{t[1].name}	</div>
                                                       
                                                    </div>



                                                    <div className='row justify-content-end'>

                                                        <Link to={'Admin_banner?id='+t[1].linkid}><div className='col-xl-3 col-4'>
                                                            <div className='inforbtnclass btncolor3 text-center py-2 px-2'>修改</div>
                                                        </div>
                                                        </Link>
                                                        <div className='col-xl-3 col-4' onClick={(event)=>openalert(t[1].linkid)}>
                                                            <div className='inforbtnclass btncolor1 text-center py-2 px-2 ms-2'>刪除</div>
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


    );
}
export default Admin_updatalist;
