import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fas } from '@fortawesome/free-solid-svg-icons'

const Shop_detail = (props) => {


    const mounted = useRef();
    const [jsondata, datachange] = useState(null);
    const [size, sizechange] = useState("plz");
    const [color, colorchange] = useState("plz");
    const [chioce, chiocechange] = useState("plz");
    const [buy, buychange] = useState(1);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const getUrlParam = (string) => {
        var obj = new Object();
        if (string.indexOf("?") != -1) {
            var string = string.substr(string.indexOf("?") + 1);
            var strs = string.split("&");
            for (var i = 0; i < strs.length; i++) {
                var tempArr = strs[i].split("=");
                obj[tempArr[0]] = tempArr[1];
            }
        }
        return obj;
    }
    const createMarkup = (str) => {
        return { __html: str };
    }
    const history = useHistory();
    const pagechange = (url) => {

        history.push(url);

    }

    const sendcar = () => {
        var self = this
        if (props.vipdata == null) {

            alert("請先加入會員");
            return;

        }
        var cc = true;
        jsondata.list.some(function (item, index, arry) {

            if (item.id === chioce) {

                if (parseInt(item.number) < parseInt(buy)) {
                    alert("數量已經超過囉")
                    cc = false
                }

                return true
            } else {
                return false
            }
        })



        if (!cc) {
            return;
        }




        if (chioce == 'plz') {

            alert("請選擇種類")
            return;
        }
        var content = {}
        content['id'] = pageid
        content['title'] = jsondata.title
        content['thumb'] = jsondata.thumb
        //content['shop_size']=jsondata.shop_size
        //content['shop_color']=jsondata.shop_color
        //content['shop_size_target']=size
        //content['shop_color_target']=color
        content['shop_list'] = jsondata.list
        content['shop_list_target'] = chioce
        content['buy'] = buy
        content['shop_prize'] = jsondata.shop_prize
        content['shop_freight'] = jsondata.shop_freight

        props._cookieChange(content)


    }


    var data = getUrlParam(window.location.href);
    const pageid = data.id

    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            props._loading(true)
            axios.get('index.php?m=content&c=index&a=show&catid=6&id=' + pageid, {
            }).then(function (response) {
                props._loading(false)
                var res = response.data;
                //res.data.shop_color = JSON.parse(res.data.shop_color)
                res.data.shop_detail = JSON.parse(res.data.shop_detail)
                //res.data.shop_size = JSON.parse(res.data.shop_size)

                datachange(res.data)



            }).catch(function (err) {

                console.log(err);
            });



        }
        else { //componentDidUpdate

            console.log(jsondata)
        }

    }, [props, jsondata]);
    return (

        <div>

            {jsondata === null ? "" :
                <div className='webwidth'>




                    <div className='detailtop shoplisttop'>
                        <div className="row px-0 py-0 mx-0 my-0">




                            <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 px-0 py-0 mx-0 my-0'>
                                <div className='w-100'>
                                    <div className='indexbanner'><img src={jsondata.thumb} className='w-100' /></div>
                                </div>
                            </div>

                            <div className='col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6'>

                                <div className='row detailright px-0 py-0 mx-0 my-0'>




                                    <div className='detailshoptitle col-12'>{jsondata.title}</div>

                                    <div className='detailshopspecial col-12'>
                                        <div className='row align-items-end px-0 py-0 mx-0 my-0'>
                                            <ul className='col-12'>

                                                {Object.entries(jsondata.shop_detail).map((t, k) => t[1] != '' ? <li key={k}>{t[1]}</li> : '')}


                                            </ul>

                                        </div>
                                    </div>

                                    <div className='detailshopprice col-12 priceClass mt-3'>

                                        ${jsondata.shop_prize}

                                    </div>



                                    <div className='col-12 detailshopnumber mt-3'>

                                        <div className='row px-0 py-0 mx-0 my-0'>






                                            <div className='col-12 col-sm-auto me-0 me-sm-3 mt-3 mt-sm-3'>
                                                種類：<select id="color_select" name="contact" defaultValue={chioce} onChange={(e) => { chiocechange(e.target.value) }}>


                                                    <option value="plz">請選擇</option>
                                                    {Object.entries(jsondata.list).map((t, k) => <option key={k} value={t[1]['id']} disabled={t[1]['number'] <= 0 ? 'disabled' : ''}>{t[1]['content']} 數量:{t[1]['number']}</option>)}

                                                </select>
                                            </div>



                                            <div className='col-12 col-sm-auto me-0 me-sm-3 mt-3 mt-sm-3'>
                                                數量：<input type="number" defaultValue={buy} id='shopnumber' onChange={(e) => { buychange(e.target.value) }} />
                                            </div>

                                        </div>



                                    </div>


                                    <div className='col-12'>

                                        <div className='row px-0 py-0 mx-0 my-0'>
                                            <div className='detailshopbtn col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-5'>
                                                <div className='detailbtnclass btncolor1 w99-5' onClick={() => sendcar()}> <FontAwesomeIcon icon={fas.faCartPlus} className='me-2' />放入購物車</div>
                                            </div>
                                            {props.shoplist.length>0 && props.vipdata ?
                                            <div className='detailshopbtn col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 mt-2 mt-sm-5'>
                                            <div className='detailbtnclass btncolor2 w99-5' onClick={() => pagechange('/Shop_carlist')}> <FontAwesomeIcon icon={fas.faCartArrowDown} className='me-2' />購物車內容</div>
                                        </div>
                                        :
                                        ''

                                        }

                                            {/*<div className='detailshopbtn col-4 mt-5'>
                                                <div className='detailbtnclass btncolor2 w99-5'>直接購買</div>
                                            </div>
                                            <div className='detailshopbtn col-4 mt-5 ms-auto'>
                                                <div className='detailbtnclass btncolor3'>加入追蹤</div>
    </div>*/}

                                        </div>

                                    </div>

                                </div>



                            </div>



                        </div>





                        <div className='row px-0 py-0 mx-0 my-0'>

                            <div className="detailtexttitle" dangerouslySetInnerHTML={jsondata == null ? createMarkup('') : createMarkup(jsondata.content)}></div>





                        </div>





                    </div>





                </div>

            }
        </div>


    );
}
export default Shop_detail;
