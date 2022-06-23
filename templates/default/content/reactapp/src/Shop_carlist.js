import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import axios from 'axios';
import $ from 'jquery';

const Shop_carlist = (props) => {


    const mounted = useRef();
    const apipath = 'https://demeter.5fpro.com/tw/zipcodes.json'
    const publicpath = 'index.php?m=member&c=content&a=publish'
    const codepath = 'index.php?m=member&c=index&a=codecheck'
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const history = useHistory();
    const [myArray, myArrayChange] = useState(props.shoplist);
    const [total, totalchange] = useState(0);
    const [totalprize, totalprizechange] = useState(0);
    const [sendtype, sendtypechange] = useState('exp');
    const [sex1, sex1change] = useState(null);
    const [sex2, sex2change] = useState('boy');
    const [addArray, addArraychange] = useState([]);
    const [city_name, city_name_change] = useState('plz');
    const [contury_name, contury_name_change] = useState('plz');
    const [city_name2, city_name_change2] = useState('plz');
    const [contury_name2, contury_name_change2] = useState('plz');
    const [addressdata, addressdatachange] = useState(null);
    const [checked, setChecked] = React.useState(false);
    const [prize, prizechange] = useState(0);
    const [regsuccess, regsuccesschange] = useState(true);
    const [codeimg, codeimgchange] = useState('')
    var freight = 0
    const pagechange = (url) => {

        history.push(url);
    }

    const sizechange = (target, key) => {

        const newArr = [...myArray];
        newArr[key].shop_size_target = target
        myArrayChange(newArr)

    }
    const colorchange = (target, key) => {

        const newArr = [...myArray];
        newArr[key].shop_color_target = target
        myArrayChange(newArr)

    }

    const listchange = (target, key) => {

        const newArr = [...myArray];
        newArr[key].shop_list_target = target
        myArrayChange(newArr)

    }

    const buychange = (target, key) => {
        const newArr = [...myArray];
        newArr[key].buy = target
        myArrayChange(newArr)


    }
    const selfdelete = (key) => {

        const newArr = [...myArray];
        newArr.splice(key, 1)
        myArrayChange(newArr)
        props._cookieDelete(newArr)



    }

    const alldelete = () => {

        const newArr = [];
        myArrayChange(newArr)
        props._cookieDelete(newArr)



    }




    const arraychange = () => {
        var total = 0
        var oneprize = 0

        for (var i = 0; i < myArray.length; i++) {

            total += Math.floor(myArray[i].buy)
            oneprize += Math.floor(myArray[i].shop_prize) * Math.floor(myArray[i].buy)
        }

        if (sendtype == 'exp') {
            freight = 0
        } else {
            freight = 0
        }

        prizechange(oneprize)
        totalchange(total)
        totalprizechange(oneprize + freight)
    }
    function getCharacter(flag) {
        var character = "";
        if (flag === "lower") {
            character = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
        }
        if (flag === "upper") {

            for (var i = 0; i < 5; i++) {
                character += String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0));
            }
        }
        return character;
    }

    function getUpperCharacter() {
        return getCharacter("upper");;
    }

    function getLowerCharacter() {
        return getCharacter("lower");;
    }





    const shopclick = () => {

        var days = Date.now()
        var eqno = getUpperCharacter() + days



        if ($("#buyername").val() == '') {

            alert("訂購人姓名誤為空")
            return;

        } else if ($("#buyeremail").val() == '') {
            alert("訂購人EAMIL誤為空")
            return;

        } else if ($("#buyertel").val() == '') {
            alert("訂購人電話誤為空")
            return;

        } else if (contury_name == '' || contury_name == 'plz') {
            alert("訂購人鄉鎮市誤為空")
            return;

        } else if ($("#buyeraddress").val() == '') {
            alert("請詳細填寫訂購人地址")
            return;

        } else if ($("#getername").val() == '') {
            alert("收件人姓名誤為空")
            return;

        } else if ($("#geteremail").val() == '') {
            alert("收件人EAMIL誤為空")
            return;

        } else if ($("#getertel").val() == '') {
            alert("收件人電話誤為空")
            return;

        } else if (contury_name2 == '' || contury_name2 == 'plz') {
            alert("收件人鄉鎮市誤為空")
            return;

        } else if ($("#geteraddress").val() == '') {
            alert("請詳細填寫收件人地址")
            return;

        }

        props._loading(true)
        var bodyFormData = new FormData();


        var buyerobj = { 'buyer_name': $("#buyername").val(), 'buyer_sex': sex1, 'buyer_email': $("#buyeremail").val(), 'buyer_tel': $("#buyertel").val(), 'buyer_address': addressdata[contury_name].zipcode + '-' + addressdata[contury_name].full_name + '-' + $("#buyeraddress").val() }

        var geterobj = { 'geter_name': $("#getername").val(), 'geter_sex': sex2, 'geter_email': $("#geteremail").val(), 'geter_tel': $("#getertel").val(), 'geter_address': addressdata[contury_name2].zipcode + '-' + addressdata[contury_name2].full_name + '-' + $("#geteraddress").val() }


        bodyFormData.set('info[shop_data]', JSON.stringify(myArray));
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
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;
                props._loading(false)
                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {
                    regsuccesschange(false)
                    //props._shopidfunction(res.data)
                    alldelete()
                    props._userlogin()
                    alert(res.msg)


                    pagechange('/Shop_check_list?id=' + res.data)

                }

            })
            .catch(function (response) {

                console.log(response);
            });

    }

    const codecheck=()=>{
        var bodyFormData = new FormData();
        props._loading(true)
        bodyFormData.set('dosubmit', true);
        bodyFormData.set('code', $("#code").val());
        axios({
            method: 'post',
            url: codepath,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    props._loading(false)
                    $("#code").val("")
                    alert(res.msg)
                    changecode()
                } else if (res.status == 1) {


                    shopclick()
                    changecode()


                }

            })
            .catch(function (response) {

                console.log(response);
            });

    }


    const changecode=()=>{

        $("#imgcode").attr('src',$("#imgcode").attr('src')+'&'+Math.random())


    }
    const codeinit=()=>{
        var bodyFormData = new FormData();
        bodyFormData.set('webtype', 'react');
        props._loading(true)
        axios({
            method: 'post',
            url: codepath,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                props._loading(false)
                var res = response.data;

                if (res.status == -1) {

                } else if (res.status == 1) {


                    codeimgchange(res.data)



                }

            })
            .catch(function (response) {

                console.log(response);
            });
    }


    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;

            axios.get(apipath, {
            }).then(function (response) {
                var res = response.data;

                addressdatachange(res)
                var array = []
                for (var i = 0; i < res.length; i++) {

                    if ($.inArray(res[i].city_name, array) == -1) {
                        array.push(res[i].city_name)
                    }
                }
                addArraychange(array)


            }).catch(function (err) {

                console.log(err);
            });

            arraychange()
            codeinit()

        }
        else { //componentDidUpdate
            arraychange()
            if (myArray.length < 1 && regsuccess) {
                alert("購物車為空")
                pagechange('./')
            }
            if (checked) {
                $("#getername").val($("#buyername").val())
                $("#geteremail").val($("#buyeremail").val())
                $("#getertel").val($("#buyertel").val())
                $("#geteraddress").val($("#buyeraddress").val())
                sex2change(sex1 == null ? props.vipdata.sex : sex1)
                city_name_change2(city_name)
                contury_name_change2(contury_name)

            }
            console.log(myArray)
            //console.log(addressdata)

        }

    }, [props, myArray, sendtype, addArray, city_name, contury_name, city_name2, contury_name2, addressdata, checked,codeimg]);
    return (

        <div>
            {addressdata === null || props.vipdata === null ? "" :
                <div className='webwidth'>
                    <div className='shoplisttop carlistpage mt-3'>
                        <div className="row justify-content-center px-0 py-0 mx-0 my-0">




                            <div className='col-12 col-xl-3 carlisttop1 mt-3 mt-xl-0 px-0 py-0'>

                                <div className='row justify-content-center px-0 py-0 mx-0 my-0'>
                                    <div className='left_carlist col-11 col-xl-11'>


                                        <div className='left_carlist_title'>購物明細</div>
                                        <div className='left_carlist_top'>

                                            <table width="100%">
                                                <tbody>
                                                    {Object.entries(myArray).map((t, k) =>
                                                        <tr key={k}>
                                                            <td>{t[1].title}
                                                            {Object.entries(t[1].shop_list).map((t2, k2) =><span key={k2}> {t2[1].id==t[1].shop_list_target ? t2[1].content:''}</span>



                                )}


                                                            </td>
                                                            <td>X{t[1].buy}</td>
                                                            <td><span className='pinkcolor'>{t[1].shop_prize * t[1].buy}</span></td>
                                                        </tr>


                                                    )}
                                                    {sendtype == 'exp' ? <tr><td colSpan="2">運費</td><td><span className="pinkcolor">0</span></td></tr> : null}

                                                    <tr>
                                                        <td colSpan="2">合計{total}樣 共</td>

                                                        <td><span className='pinkcolor size16'>{totalprize}</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>



                                        </div>

                                    </div>

                                </div>



                            </div>


                            <div className='col-12 col-xl-9 carlisttop2'>



                                <div className='row justify-content-center'>
                                    {Object.entries(myArray).map((t, k) =>
                                        <div className='col-11 col-xl-12 shopliststyle' key={k}>



                                            <div className='row'>

                                                <div className='col-3'>

                                                    <img src={t[1].thumb} className='w-100' />


                                                </div>

                                                <div className='col-7'>




                                                    <div className='row shoplistptnum'>
                                                        <div className='shopcarlisttitle col-12'>{t[1].title}</div>




                                                        <div className='mt-3 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12 col-xl-auto me-0 me-xl-3 mt-3 mt-xl-0'>

                                                                    數量：<input type='number' defaultValue={t[1].buy} onChange={(e) => { buychange(e.target.value, k) }} />

                                                                </div>



                                                                <div className='col-12 col-xl-auto me-0 me-xl-3 mt-3 mt-xl-0'>
                                                                    種類：<select id="size_select" name="contact" defaultValue={t[1].shop_list_target} onChange={(e) => { listchange(e.target.value, k) }}>



                                                                        {Object.entries(t[1].shop_list).map((t, k) => <option key={k} value={t[1].id}>{t[1]['content']}</option>)}

                                                                    </select>


                                                                </div>



                                                            </div>




                                                        </div>


                                                        <div className='col-12 priceClass mt-3'> ${t[1].shop_prize * t[1].buy}元 </div>

                                                    </div>







                                                </div>


                                                <div className='col-2'><div className='carlistclose' onClick={(e) => { selfdelete(k) }}><FontAwesomeIcon icon={Icons.faWindowClose} /></div></div>


                                            </div>



                                        </div>
                                    )}



                                    <div className='col-11 col-xl-12 mt-3 right_carlist'>


                                        <div className='row'>


                                            <div className='col-12 greenborder px-0 py-0'>

                                                <div className='right_carlist_title justify-content-center'>選擇金/物流</div>
                                                <div className='right_content'>
                                                    <div className='right_content_title'>付款方式</div>
                                                    <input type="radio" id="pay" name="gg" defaultChecked />
                                                    <label htmlFor="pay"><span></span>實體ATM</label>


                                                    <div className='right_content_title mt-3'>配送方式</div>
                                                    <input type="radio" id="self" name="sendtype" value="self" onChange={(e) => { sendtypechange('self') }} checked={sendtype == 'self'} />
                                                    <label htmlFor="self"><span></span>自取</label>


                                                    <input type="radio" id="exp" name="sendtype" value="exp" onChange={(e) => { sendtypechange('exp') }} checked={sendtype == 'exp'} />
                                                    <label htmlFor="exp"><span></span>宅配</label>


                                                </div>


                                            </div>


                                            <div className='col-12 greenborder mt-3 px-0 py-0'>

                                                <div className='right_carlist_title justify-content-center'> 訂購人資訊</div>
                                                <div className='right_content'>


                                                    <div className='row'>
                                                        <div className='col-lg-6  col-12'>
                                                            <div className='w-100'>姓名</div>
                                                            <div className='w-100'><input type='text' id='buyername' className='' defaultValue={props.vipdata.username} />

                                                                <input type="radio" id="sex1boy" name="sex1" value="boy" onChange={(e) => { sex1change('boy') }} checked={sex1 === null ? props.vipdata.sex == 'boy' ? true : false : sex1 == 'boy' ? true : false} />
                                                                <label htmlFor="sex1boy"><span></span>先生</label>
                                                                <input type="radio" id="sex1girl" name="sex1" value="girl" onChange={(e) => { sex1change('girl') }} checked={sex1 === null ? props.vipdata.sex == 'girl' ? true : false : sex1 == 'girl' ? true : false} />
                                                                <label htmlFor="sex1girl"><span></span>小姐</label>

                                                            </div>
                                                        </div>



                                                    </div>

                                                    <div className='row mt-0 mt-lg-3'>
                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>EMAIL</div>
                                                                <div className='col-11'><input type='email' className='w-100' id='buyeremail' defaultValue={props.vipdata.email} /></div>
                                                            </div>


                                                        </div>

                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>電話</div>
                                                                <div className='col-11'><input type='number' className='w-100' id='buyertel' defaultValue={props.vipdata.tel} /></div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row mt-0 mt-lg-3'>
                                                        <div className='col-lg-6 col-12'>
                                                            {city_name=='plz' ? city_name_change(props.vipdata.cityname):''}
                                                            {contury_name=='plz' ? contury_name_change(props.vipdata.conturyname):''}
                                                            <div className='row'>

                                                                <div className='col-2'>
                                                                    <div className='w-100'>區號</div>
                                                                    <input type='text' className="w-95" value={contury_name != 'plz' ? addressdata[contury_name].zipcode : ''} readOnly />
                                                                </div>
                                                                <div className='col-4'>
                                                                    <div className='w-100'>縣市</div>
                                                                    <select id="city" name="contact" className='w-95' defaultValue={city_name} onChange={(e) => { city_name_change(e.target.value) }}>
                                                                        <option value="plz">請選擇</option>
                                                                        {Object.entries(addArray).map((t, k) => <option key={k} value={t[1]}>{t[1]}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className='col-5'>
                                                                    <div className='w-100'>地區</div>
                                                                    <select id="dist" name="contact" className='w-95' defaultValue={contury_name} onChange={(e) => { contury_name_change(e.target.value) }}>
                                                                        <option value="plz">請選擇</option>


                                                                        {Object.entries(addressdata).map((t, k) => t[1].city_name == city_name ? <option key={k} value={k}>{t[1].name}</option> : '')}

                                                                    </select>
                                                                </div>

                                                            </div>



                                                        </div>

                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>地址</div>
                                                                <div className='col-11'><input type='text' className='w-100' id='buyeraddress' defaultValue={props.vipdata.address} /></div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                </div>


                                            </div>


                                            <div className='col-12 greenborder mt-3 px-0 py-0'>

                                                <div className='right_carlist_title justify-content-center'>收件人資訊 ( <input type='checkbox' defaultChecked={checked} onChange={() => setChecked(!checked)} /> 同訂購人資訊 )</div>
                                                <div className='right_content'>


                                                    <div className='row'>
                                                        <div className='col-lg-6  col-12'>
                                                            <div className='w-100'>姓名</div>
                                                            <div className='w-100'><input type='text' className='' id='getername' />

                                                                <input type="radio" id="sex2boy" name="sex2" value="boy" onChange={(e) => { sex2change('boy') }} checked={sex2 == 'boy'} />
                                                                <label htmlFor="sex2boy"><span></span>先生</label>
                                                                <input type="radio" id="sex2girl" name="sex2" value="girl" onChange={(e) => { sex2change('girl') }} checked={sex2 == 'girl'} />
                                                                <label htmlFor="sex2girl"><span></span>小姐</label>

                                                            </div>
                                                        </div>



                                                    </div>

                                                    <div className='row mt-0 mt-lg-3'>
                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>EMAIL</div>
                                                                <div className='col-11'><input type='email' className='w-100' id='geteremail' /></div>
                                                            </div>


                                                        </div>

                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>電話</div>
                                                                <div className='col-11'><input type='number' className='w-100' id='getertel' /></div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row mt-0 mt-lg-3'>
                                                        <div className='col-lg-6 col-12'>

                                                            <div className='row'>

                                                                <div className='col-2'>
                                                                    <div className='w-100'>區號</div>
                                                                    <input type='text' className="w-95" defaultValue={contury_name2 != 'plz' ? addressdata[contury_name2].zipcode : ''} readOnly />
                                                                </div>
                                                                <div className='col-4'>
                                                                    <div className='w-100'>縣市</div>
                                                                    <select id="city" name="contact" className='w-95' value={city_name2} onChange={(e) => { city_name_change2(e.target.value) }}>
                                                                        <option value="plz">請選擇</option>
                                                                        {Object.entries(addArray).map((t, k) => <option key={k} value={t[1]}>{t[1]}</option>)}
                                                                    </select>
                                                                </div>
                                                                <div className='col-5'>
                                                                    <div className='w-100'>地區</div>
                                                                    <select id="dist" name="contact" className='w-95' value={contury_name2} onChange={(e) => { contury_name_change2(e.target.value) }}>
                                                                        <option value="plz">請選擇</option>


                                                                        {Object.entries(addressdata).map((t, k) => t[1].city_name == city_name2 ? <option key={k} value={k}>{t[1].name}</option> : '')}

                                                                    </select>
                                                                </div>

                                                            </div>



                                                        </div>

                                                        <div className='col-lg-6 col-12'>
                                                            <div className='row'>
                                                                <div className='col-12'>地址</div>
                                                                <div className='col-11'><input type='text' className='w-100' id='geteraddress' /></div>
                                                            </div>
                                                        </div>


                                                    </div>



                                                    <div className='row mt-0 mt-lg-3'>
                                                        <div className='col-lg-12 col-12'>
                                                        <div className='col-12'>驗證碼</div>

                                                                            <div className='col-11'><input type='text' id='code' className='width100-130'/><img src={codeimg} onClick={()=>changecode()} id='imgcode' width={85}/></div>
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




                                    <div className='col-xl-3 col-0'></div>
                                    <div className='detailshopbtn col-xl-9 col-12'>

                                        <div className='row justify-content-center'>

                                            <div className='col-xl-3 col-11'>
                                                <div className='detailbtnclass btncolor1' onClick={() => codecheck()}>下一步</div>
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
export default Shop_carlist;
