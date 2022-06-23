import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import Shop_check from "./Shop_check";
import axios from 'axios';

const Shop_check_list = (props) => {


    const mounted = useRef();
    const [jsondata, datachange] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const history = useHistory();
    //const shopid=props._shopidfunction()
    const shopid=history.location.search.split("=")[1]
    const pagechange = (url) => {

        history.push(url);
    }


    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            props._loading(true)
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
                    var ymd=new Date(res.data.inputtime*1000);
                    var ymd2=ymd.format("yyyy-MM-dd hh:mm:ss")
                    res.data.inputtime=ymd2
                    console.log(res)
                    datachange(res.data)

                }




            }).catch(function (err) {

                console.log(err);
            });



        }
        else { //componentDidUpdate

        }

    }, [props, jsondata]);
    return (

        <div>
            {jsondata === null ? "" :
                <div className='webwidth'>
                    <div className='shoplisttop checklistpage'>
                        <div className="row justify-content-center px-0 py-0 mx-0 my-0">







                            <div className='col-12 col-xl-12 carlisttop2'>



                                <div className='row justify-content-center'>

                                    <div className='col-11 text-center mt-3'>

                                        <span className='finishicon fs-2'><FontAwesomeIcon icon={Icons.faCheckCircle} /></span> <span className='fs-2 pinkcolor'>訂購已完成，您的訂購明細如下</span>



                                    </div>





                                    <div className='col-11 mt-3 right_carlist'>
                                    <Shop_check _jsondata={jsondata}/>
                                    </div>










                                </div>






                            </div>


                            {jsondata.status!=1 ? '':
                            <div className='col-12 mt-3 carlisttop3'>



                                <div className='row'>





                                    <div className='detailshopbtn col-12'>

                                        <div className='row justify-content-center'>

                                            <div className='col-xl-3 col-11'>
                                                <div className='detailbtnclass btncolor1' onClick={() => pagechange('/Shop_finish_report?id='+shopid)}>填寫匯款資料</div>
                                            </div>


                                        </div>


                                    </div>


                                </div>


                            </div>

}





                        </div>
                    </div>
                </div>
            }
        </div>


    );
}
export default Shop_check_list;
