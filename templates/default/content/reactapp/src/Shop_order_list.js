




import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/fontawesome-free-solid"
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import $ from 'jquery';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import ReactPaginate from 'react-paginate';

const Shop_order_list = (props) => {


    const mounted = useRef();
    const loadcc = useRef(true);
    const totalcc = useRef(true);
    const totalshow = useRef(1)

    const [jsondata2, datachange2] = useState(null);
    const requireContext = require.context("./indexbanner", true, /\.(png|jpe?g|svg)$/);
    const images = requireContext.keys().map(requireContext);
    const history = useHistory();
    const [callbackmessage, callbackmessageChange] = useState('');
    const [oldcallbackmessage, oldcallbackmessageChange] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [items, itemChange] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, itemsPerPageChange] = useState(3);



    const pagechange = (url) => {

        history.push(url);
    }

    const shopidchange = (id) => {

        props._shopidfunction(id)
        pagechange('/Shop_finish_report')
    }


    const deleteshop = (id) => {


        const deletepath = 'index.php?m=member&c=content&a=delete&catid=6&id=' + id

        axios.get(deletepath, {
        }).then(function (response) {

            var res = response.data;
            alert(res.msg)
            if (res.status == -1) {

            } else if (res.status == 1) {
                loadorder(1)
                props._userlogin()
            }


        }).catch(function (err) {

            console.log(err);
        });
    }


    const loadorder = (page) => {
        axios.get('index.php?m=content&c=index&a=getorder&page=' + page, {
        }).then(function (response) {

            var res = response.data.data[0];

            //console.log(res)
            //datachange(res.data[0].data)

            res.data.forEach(function (item) {
                item.shop_data = JSON.parse(item.shop_data.replace(/&quot;/g, '"'))
                item.buyer_data = JSON.parse(item.buyer_data.replace(/&quot;/g, '"'))
                item.geter_data = JSON.parse(item.geter_data.replace(/&quot;/g, '"'))
            });

            datachange2(res)
            props._userlogin()
            loadcc.current = true


        }).catch(function (err) {

            console.log(err);
        });
    }
    const transformHtmlToDraftState = (html = '') => {

        callbackmessageChange(html)

        totalcc.current = true
    }
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        //console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);


        setItemOffset(newOffset);
        loadorder(event.selected + 1)
    };


    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;



            loadorder(1)




        }
        else { //componentDidUpdate


            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            //console.log(`Loading items from ${itemOffset} to ${endOffset}`);


            setPageCount(Math.ceil(items.length / itemsPerPage));


            if (jsondata2 && loadcc.current) {
                loadcc.current = false
                if (jsondata2.data.length < 1) {
                    alert("訂單列表為空")
                    pagechange('./')
                }
                transformHtmlToDraftState(jsondata2.pages)


            }


            if (callbackmessage && oldcallbackmessage != callbackmessage) {

                oldcallbackmessageChange(callbackmessage)


                const $mc = $(callbackmessage)
                totalshow.current = $mc.find('.totalnum').html()
                console.log(totalshow.current)
                if (totalshow.current) {
                    itemChange([...Array(parseInt(totalshow.current)).keys()])
                }

            }





            /**/
        }

    }, [props, jsondata2, itemOffset, itemsPerPage, callbackmessage, items]);
    return (

        <div>
            {jsondata2 === null ? "" :
                <div className='webwidth'>
                    <div className='shoplisttop checklistpage'>
                        <div className="row justify-content-center px-0 py-0 mx-0 my-0">







                            <div className='col-12 col-xl-12 carlisttop2'>



                                <div className='row justify-content-center'>






                                    <div className='col-11 right_carlist ordertdstyle'>


                                        <div className='row'>




                                            {Object.entries(jsondata2.data).map((a, b) =>


                                                <div className='col-12 greenborder mt-3 px-0 py-0' key={b}>

                                                    <div className='right_carlist_title justify-content-center'>訂單編號：{a[1].eqno}</div>
                                                    <div className='right_content'>


                                                        <div className='row ordertitle'>

                                                            <div className='col-5 px-1 py-1'>購買商品</div>
                                                            <div className='col-2 px-1 py-1'>小計金額	</div>
                                                            <div className='col-1 px-1 py-1'>運費</div>
                                                            <div className='col-2 px-1 py-1'>訂單總計	</div>
                                                            <div className='col-2 px-1 py-1'>訂單狀態	</div>
                                                        </div>

                                                        <div className='row'>

                                                            <div className='col-5 px-1 py-1'>
                                                                {Object.entries(a[1].shop_data).map((t, k) => <span key={k}>{t[1].title}X{t[1].buy}<br></br></span>)}

                                                            </div>
                                                            <div className='col-2 px-1 py-1'>{a[1].buy_prize}	</div>
                                                            <div className='col-1 px-1 py-1'>{a[1].buy_freight}</div>
                                                            <div className='col-2 px-1 py-1 pinkcolor'>{a[1].shop_total}	</div>
                                                            <div className='col-2 px-1 py-1 pinkcolor orderlink' onClick={() => pagechange('/Shop_check_list?id=' + a[1].id)}>{a[1].status == 1 ? '待付款' : '' || a[1].status == 2 ? '已付款待確認' : '' || a[1].status == 3 ? '待出貨' : '' || a[1].status == 4 ? '以出貨' : '' || a[1].status == 66 ? '訂單無效' : ''}	</div>
                                                        </div>

                                                        {a[1].status != 1 ? '' :

                                                            <div className='row justify-content-end'>

                                                                <div className='col-xl-3 col-4'>
                                                                    <div className='inforbtnclass btncolor3 text-center py-2 px-2' onClick={() => deleteshop(a[1].id)}>取消訂單</div>
                                                                </div>

                                                                <div className='col-xl-3 col-4'>
                                                                    <div className='inforbtnclass btncolor1 text-center py-2 px-2 ms-2' onClick={() => pagechange('/Shop_finish_report?id=' + a[1].id)}>填寫匯款資料</div>
                                                                </div>

                                                            </div>
                                                        }
                                                    </div>


                                                </div>

                                            )}


                                            <div className='col-12 mt-3'>


                                                <div className='text-center'>





                                                    {/*<div dangerouslySetInnerHTML={{__html: callbackmessage}}></div>*/}



                                                    <ReactPaginate
                                                        nextLabel="next >"
                                                        onPageChange={handlePageClick}
                                                        pageRangeDisplayed={3}
                                                        marginPagesDisplayed={2}
                                                        pageCount={pageCount}
                                                        previousLabel="< previous"
                                                        pageClassName="page-item pe-2 ps-2"
                                                        pageLinkClassName="page-link"
                                                        previousClassName="page-item"
                                                        previousLinkClassName="page-link"
                                                        nextClassName="page-item"
                                                        nextLinkClassName="page-link"
                                                        breakLabel="..."
                                                        breakClassName="page-item"
                                                        breakLinkClassName="page-link"
                                                        containerClassName="pagination justify-content-center"
                                                        activeClassName="active"

                                                        renderOnZeroPageCount={null}
                                                    />



                                                </div>


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
export default Shop_order_list;
