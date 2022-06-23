import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import axios from 'axios';

const Admin_index = (props) => {


    const mounted = useRef();
    const apipath = 'index.php?m=content&c=index&a=getshop'
    const [jsondata, datachange] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);

    const requireShop = require.context("./shop", true, /\.(png|jpe?g|svg)$/);
    const shopimg = requireShop.keys().map(requireShop);

    const myArray = ['Jack', 'Mary', 'John', 'Krish', 'Navin'];


    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            props._checkadmindata(function(data){


            })

            /*axios.get(apipath, {
            }).then(function (response) {
                var res = response.data;
                datachange(res.data[0].data)




            }).catch(function (err) {

                console.log(err);
            });*/

            console.log(Icons)


        }
        else { //componentDidUpdate


        }

    }, [props, jsondata]);


    return (

        <div>


            <div className='webwidth'>

                <div className='row justify-content-center'>
                    <div className='width100-4'>

                        <div className='row'>


                        <Link to='Admin_updatalist'>
                            <div className='col-6 d-inline-block adminindexmenu'>
                                <div className='adminubdexmenuinside'>

                                    <div className='row align-items-center h-100'>
                                        <div className='col-12'>
                                            <div className='w-100 d-inline-block adminIndexFontSize text-center'><FontAwesomeIcon icon={Icons.faUpload} /></div>
                                            <div className='w-100 d-inline-block adminIndexIconSize text-center'>商品上傳</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
        <Link to='Admin_orderlist'>
                            <div className='col-6 d-inline-block adminindexmenu'>
                                <div className='adminubdexmenuinside'>

                                    <div className='row align-items-center h-100'>
                                        <div className='col-12'>
                                            <div className='w-100 d-inline-block adminIndexFontSize text-center'><FontAwesomeIcon icon={Icons.faSearch} /></div>
                                            <div className='w-100 d-inline-block adminIndexIconSize text-center'>訂單查詢</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </Link>
        <Link to='Admin_viplist'>
                            <div className='col-6 d-inline-block adminindexmenu'>
                                <div className='adminubdexmenuinside'>

                                    <div className='row align-items-center h-100'>
                                        <div className='col-12'>
                                            <div className='w-100 d-inline-block adminIndexFontSize text-center'><FontAwesomeIcon icon={Icons.faUser} /></div>
                                            <div className='w-100 d-inline-block adminIndexIconSize text-center'>會員名單</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </Link>
        <Link to='Admin_bannerlist'>
                            <div className='col-6 d-inline-block adminindexmenu'>
                                <div className='adminubdexmenuinside'>

                                    <div className='row align-items-center h-100'>
                                        <div className='col-12'>
                                            <div className='w-100 d-inline-block adminIndexFontSize text-center'><FontAwesomeIcon icon={Icons.faEdit} /></div>
                                            <div className='w-100 d-inline-block adminIndexIconSize text-center'>廣告設定</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>




                        </div>



                    </div>
                </div>




            </div>












        </div >


    );
}
export default Admin_index;
