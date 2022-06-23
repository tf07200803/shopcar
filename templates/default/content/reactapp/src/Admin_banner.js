import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Admin_imgupload from "./Admin_imgupload";

const Admin_updata = (props) => {


    const mounted = useRef();
    const admincc = useRef()
    const history = useHistory();
    const shopid = history.location.search.split("=")[1]


    const [callbackmessage, callbackmessageChange] = useState('');

    const [imgsrc, imgsrcChange] = useState(null);
    const uploadpath = 'index.php?m=admin&c=index&a=upload'
    const publicpath = 'index.php?m=link&c=link&a=add'

    const [admindata, admindataChange] = useState(null)
    const [title, titleChange] = useState('')
    const [keywords, keywordsChange] = useState('')
    const [saveimg, saveimgChange] = useState(null)
    const [imgname, imgnamechange] = useState('')
    const imgnameold = useRef('');

    const geteditdata = () => {

        axios.get('index.php?m=link&c=link&a=edit&linkid=' + shopid + '&pc_hash=' + admindata['data']['pc_hash'] + '&webtype=react', {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {

                console.log(res.data)
                titleChange(res.data['name'])
                keywordsChange(res.data['url'])

                imgnameold.current=res.data.logo
                imgnamechange(res.data.logo)


            }

        }).catch(function (err) {
            console.log(err);
        });
    }


    const pagechange = (url) => {

        history.push(url);
    }
    const editclick = () => {
        /**?m=content&c=content&a=edit */
        var bodyFormData = new FormData();

        bodyFormData.set('link[name]', title);
        bodyFormData.set('link[url]', keywords);

        bodyFormData.set('link[logo]', imgname);

        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);

        bodyFormData.set('webtype', 'react');

        bodyFormData.set('dosubmit', true);


        axios({
            method: 'post',
            url: 'index.php?m=link&c=link&a=edit&webtype=react&linkid=' + shopid,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {

                    alert(res.msg)
                    pagechange('/Admin_bannerlist')



                }

            })
            .catch(function (response) {

                console.log(response);
            });




    }
    const updataclick = () => {

        var bodyFormData = new FormData();


        bodyFormData.set('link[name]', title);
        bodyFormData.set('link[url]', keywords);
        bodyFormData.set('link[typeid]', 0);
        bodyFormData.set('link[linktype]', 1);
        bodyFormData.set('link[logo]', imgname);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('webtype', 'react');
        bodyFormData.set('dosubmit', true);



        axios({
            method: 'post',
            url: publicpath,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {

                    alert(res.msg)
                    pagechange('/Admin_bannerlist')



                }

            })
            .catch(function (response) {

                console.log(response);
            });

        console.log(title)
    }

    const onFileUpload = (event) => {




        /*var bodyFormData = new FormData();
        bodyFormData.set('uploads', event.target.files[0]);
        bodyFormData.set('uploadpic', '上传');
        bodyFormData.set('webtype', 'react');
        axios({
            method: 'post',
            url: uploadpath,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {
                    alert(res.msg)
                    imgsrcChange(res.data)
                }

            })
            .catch(function (response) {

                console.log(response);
            });*/

        /*if (window.FileReader) {

            var oPreviewImg = null,
                oFReader = new window.FileReader(),
                rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
            console.log(oFReader)
            oFReader.onload = function (oFREvent) {
                if (!oPreviewImg) {

                }
                console.log(oFREvent.target.result)

            }
            return function() {
                var aFiles = event.target.files;
                if (aFiles.length === 0) {
                    return;
                }
                if (!rFilter.test(aFiles[0].type)) {
                    alert("You must select a valid image file!");
                    return;
                }
                alert(aFiles[0])
                oFReader.readAsDataURL(aFiles[0]);


            }
        }*/

        var file = event.target.files[0];

        if(!file){

        return false;

        }



  var reader = new FileReader();
  reader.onload = function(event) {
    console.log(event)
    saveimgChange(event.target.result)
  };

  reader.readAsDataURL(file);
    }



    const uploadbase64=(code)=>{

//console.log(code)
        imgsrcChange(code)

    }

    const checkbase64=()=>{

        firstuploadimg()


    }

    const firstuploadimg=()=>{

        var bodyFormData = new FormData();


        bodyFormData.set('code', imgsrc);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('webtype', 'react');



        axios({
            method: 'post',
            url: 'index.php?m=admin&c=index&a=uploadbase64',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {

                    alert(res.msg)
                    imgnamechange(res.data)




                }

            })
            .catch(function (response) {

                console.log(response);
            });

    }


    /*

    var loadImageFile = (function() {
    if (window.FileReader) {
        var oPreviewImg = null,
            oFReader = new window.FileReader(),
            rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

        oFReader.onload = function(oFREvent) {
            if (!oPreviewImg) {

            }
           // oPreviewImg.src = oFREvent.target.result;
            composite(oFREvent.target.result)
        };

        return function() {
            var aFiles = document.getElementById("imageInput").files;
            if (aFiles.length === 0) {
                return;
            }
            if (!rFilter.test(aFiles[0].type)) {
                alert("You must select a valid image file!");
                return;
            }
            oFReader.readAsDataURL(aFiles[0]);

            var _file = aFiles[0];

            EXIF.getData(_file, function(){
                var _dataTxt = EXIF.pretty(this);
                var _dataJson = JSON.stringify(EXIF.getAllTags(this));
                var _orientation = EXIF.getTag(this, 'Orientation');


                if (_orientation == 3) {

                } else if (_orientation == 6) {//IPHONE
                 iosimg=true
                } else if (_orientation == 8) {

                };



          });
        }

    }
    if (navigator.appName === "Microsoft Internet Explorer") {
        return function() {
            alert(document.getElementById("imageInput").value);
            document.getElementById("imagePreview").filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = document.getElementById("imageInput").value;

        }
    }



})();

    */



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
                if (shopid) {
                    geteditdata()
                } else {

                }
            }
            if(imgname!=imgnameold.current){

                if(shopid){

                    editclick()

                }else{

                    updataclick()

                }



                imgnameold.current=imgname
            }

        }

    }, [props, imgsrc, admindata, saveimg,imgname]);
    return (

        <div>

            <div className='row justify-content-center'>
                <div className='msgcenterview col-11 col-xl-7'>





                    <div className='msgDetail'>

                        <div className='row'>

                            <div className='col-12'>
                                <div className='row'>

                                    <div className='col-12'>
                                        <div className='row'>
                                            <div className='col-12'>名稱</div>
                                            <div className='col-12'><input type='text' className='w-100' id='uptitle' value={title} onChange={(event) => titleChange(event.target.value)} /></div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>連結網址</div>
                                            <div className='col-12'><input type='text' className='w-100' id='upkeyword' value={keywords} onChange={(event) => keywordsChange(event.target.value)} /></div>
                                        </div>

                                        <div className='row mt-1'>
                                            <div className='col-12'>照片上傳(建議尺寸800X360)</div>
                                            <div className='col-12'><input type="file" onChange={onFileUpload} className='w-100' /></div>
        <div className='col-12'><img src={imgname} className='mt-1 w-100' /></div>
                                        </div>
                                        <div className='row mt-1'>
                                            {saveimg ? <Admin_imgupload _width={800} _height={360} _data={saveimg} _uploadbase64={uploadbase64}/> : ''}



                                        </div>



                                        <div className='col-12 mt-3'>



                                            <div className='row'>





                                                <div className='detailshopbtn col-xl-12 col-12'>

                                                    <div className='row justify-content-center'>
                                                        {!shopid ?
                                                            <div className='col-xl-6 col-6'>
                                                                <div className='detailbtnclass btncolor1 w99-5' onClick={() => firstuploadimg()}>確認送出</div>
                                                            </div>
                                                            :
                                                            <div className='col-xl-6 col-6'>
                                                                <div className='detailbtnclass btncolor1 w99-5' onClick={() => imgsrc==null ? editclick():checkbase64()}>確認修改</div>
                                                            </div>
                                                        }


                                                        <Link to='Admin_bannerlist'>
                                                            <div className='col-xl-6 col-6'>
                                                                <div className='detailbtnclass btncolor2 w99-5 float-end'>返回上一頁</div>
                                                            </div>
                                                        </Link>

                                                    </div>


                                                </div>


                                            </div>


                                        </div>



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
export default Admin_updata;
