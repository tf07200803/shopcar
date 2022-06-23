import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';


const Shop_index=(props)=>{


    const mounted=useRef();
    const [jsondata, datachange] = useState(null);




    useEffect(()=>{
        if(!mounted.current){ //componentDidMount
            mounted.current=true;
            datachange(props._jsondata)




        }
        else{ //componentDidUpdate
                console.log(jsondata)
        }

    });
    return(

        <div>

{jsondata === null ? "" :
<div>


<div className='row'>


    <div className='col-12 greenborder mt-3 px-0 py-0'>

        <div className='right_carlist_title justify-content-center'>訂單編號：{jsondata.eqno}</div>
        <div className='right_content'>


            配送方式：宅配 <br />
            付款方式：實體ATM<br />
            銀行戶名：陳冠林<br />
            銀行代碼：822<br />
            銀行帳號：602540138144<br />
            付款方式為ATM匯款<br />
            匯款完成後，請至訂單查詢，填寫匯款資料，謝謝您。


        </div>


    </div>

    <div className='col-12 checklisttable mt-3'>


        {Object.entries(jsondata.shop_data).map((t, k) =>

            <div className='col-12 pb-3 pt-3  checklisthsop' key={k}>


                <div className='row'>

                    <div className='col-3'>

                        <img src={t[1].thumb} className='w-100' />


                    </div>

                    <div className='col-9'>

                        <div className='row shoplistptnum'>
                            <div className=' col-12'>{t[1].title}</div>
                            <div className='col-12 detailshopnumber  mt-1'>
                                {/*t[1].shop_color === null ? "" : '顏色：'+t[1].shop_color[t[1].shop_color_target]*/}
                                {/*t[1].shop_size === null ? "" : '尺寸：'+t[1].shop_size[t[1].shop_size_target]*/}

                                {Object.entries(t[1].shop_list).map((t2, k2) =><div>{t2[1].id==t[1].shop_list_target ? t2[1].content:''}</div>



                                )}
                                {/*t[1].shop_list === null ? "" : '種類：'+t[1].shop_list[t[1].shop_list_target].content*/}
                                單價：{t[1].shop_prize}<br />
                                數量：{t[1].buy}<br />
                                小計：{t[1].shop_prize*t[1].buy}

                            </div>



                        </div>
                    </div>





                </div>



            </div>

        )}



    </div>






    <div className='left_carlist col-12 mt-3 greenborder px-0 py-0'>

        <div className='left_carlist_title'>結帳金額</div>
        <div className='left_carlist_top lasttd'>

            <table width="100%">
                <tbody>
                <tr>
                        <td>合計有{jsondata.buy_totalnum}項產品</td>
                        <td></td>
                    </tr>
                <tr>
                        <td>入單日期</td>
                        <td>{jsondata.inputtime}</td>
                    </tr>
                    
                    <tr>
                        <td>小計金額</td>
                        <td>{jsondata.buy_prize}</td>
                    </tr>
                    <tr>
                        <td>運費</td>
                        <td>{jsondata.buy_freight}</td>
                    </tr>

                    <tr>
                        <td>訂單總計</td>
                        <td>{jsondata.shop_total}</td>
                    </tr>
                </tbody>
            </table>



        </div>

    </div>






    <div className='col-12 greenborder mt-3 px-0 py-0'>

        <div className='right_carlist_title justify-content-center'> 收件人資訊</div>
        <div className='right_content'>


            <div className='row'>
                <div className='col-12 tdpadding10'>
                    <table>
                        <tbody>
                            <tr>
                                <td>姓名</td>
                                <td>{jsondata.geter_data.geter_name} {jsondata.geter_data.geter_sex == 'boy' ? '先生' : '女士'}</td>
                            </tr>
                            <tr>
                                <td>EMAIL</td>
                                <td>{jsondata.geter_data.geter_email}</td>
                            </tr>
                            <tr>
                                <td>電話</td>
                                <td>{jsondata.geter_data.geter_tel}</td>
                            </tr>
                            <tr>
                                <td>地址</td>
                                <td>{jsondata.geter_data.geter_address}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>



            </div>







        </div>


    </div>


    <div className='col-11 mt-3 right_carlist'>

已付款金額： <span className='fs-2 textcolor1'>{jsondata.finishmoney=='' ? 0 :jsondata.finishmoney}</span>


                                    </div>






</div>


</div>
}

    </div>


);
}
export default Shop_index;
