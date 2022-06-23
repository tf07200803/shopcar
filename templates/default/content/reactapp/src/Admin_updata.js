import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs'
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Admin_imgupload from "./Admin_imgupload";
import { confirmAlert } from 'react-confirm-alert'; // Import

const Admin_updata = (props) => {


    const mounted = useRef();
    const admincc=useRef()
    const history = useHistory();
    const shopid=history.location.search.split("=")[1]

    const [editorState, seteditorstate] = useState(EditorState.createEmpty())
    const [callbackmessage, callbackmessageChange] = useState('');
    const [message, messageChange] = useState('');
    const [imgsrc, imgsrcChange] = useState(null);
    const uploadpath = 'index.php?m=admin&c=index&a=upload'
    const publicpath = 'index.php?m=content&c=content&a=add'
    const [myarray, myarrayChange] = useState({ "shop_detail": new Array(""), "shop_size": new Array(""), "shop_color": new Array("") });
    const [admindata,admindataChange]=useState(null)
    const[title,titleChange]=useState('')
    const[keywords,keywordsChange]=useState('')
    const[description,descriptionChange]=useState('')
    const[shopprize,shopprizeChange]=useState('')
    const [saveimg, saveimgChange] = useState(null)
    const [imgname, imgnamechange] = useState('')
    const imgnameold = useRef('');
    const[shopfreight,shopfreightChange]=useState('')

    const [listarray,listarraychange]=useState(new Array({'content':'','number':'','money':'','eqno':''}))

    const geteditdata=()=>{

        axios.get('index.php?m=content&c=content&a=edit&catid=6&id=' + shopid+'&pc_hash='+admindata['data']['pc_hash']+'&webtype=react', {
        }).then(function (response) {
            var res = response.data;

            if (res.status == -1) {

            } else if (res.status == 1) {

                console.log(res.data)
                titleChange(res.data['title'])
                keywordsChange(res.data['keywords'])
                descriptionChange(res.data['description'])
                shopprizeChange(res.data['shop_prize'])
                shopfreightChange(res.data['shop_freight'])
                res.data.shop_detail = JSON.parse(res.data.shop_detail.replace(/&quot;/g, '"'))
                //res.data.shop_color = JSON.parse(res.data.shop_color.replace(/&quot;/g, '"'))
                //res.data.shop_size = JSON.parse(res.data.shop_size.replace(/&quot;/g, '"'))
                const newArr = { ...myarray };
                newArr['shop_detail']=res.data.shop_detail
                //newArr['shop_color']=res.data.shop_color
                //newArr['shop_size']=res.data.shop_size
                myarrayChange(newArr)


                imgnameold.current = res.data.thumb
                imgnamechange(res.data.thumb)
                transformHtmlToDraftState(res.data.content)
                geteditdatalist()
            }

        }).catch(function (err) {
            console.log(err);
        });
}
const geteditdatalist=()=>{

    axios.get('index.php?m=content&c=content&a=editlist&id=' + shopid+'&pc_hash='+admindata['data']['pc_hash']+'&webtype=react', {
    }).then(function (response) {
        var res = response.data;

        if (res.status == -1) {

        } else if (res.status == 1) {

            
            listarraychange(res.data)

            

        }

    }).catch(function (err) {
        console.log(err);
    });
}



    const editChange = (internaleditorstate: EditorState): void => {
        seteditorstate(internaleditorstate)
        callbackmessageChange(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    }
    const transformHtmlToDraftState = (html = '') => {

        const blocksFromHtml = htmlToDraft(html);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        seteditorstate(EditorState.createWithContent(contentState))
        callbackmessageChange(html)
    }

    const addlist = (id) => {
        const newArr = { ...myarray };
        newArr[id].push("")
        myarrayChange(newArr)
    }

    const removelist =(id)=>{
        const newArr = { ...myarray };
        var idandkey = id.split("-")
        newArr[idandkey[0]].splice(idandkey[1],1)
        myarrayChange(newArr)

    }
    const removelistnewdata =(id)=>{
        
        confirmAlert({
            title: '刪除資料',
            message: '確定要刪除單號為'+id+'的商品',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteeqno(id)
              },
              {
                label: 'No',
                
              }
            ]
          });
        

    }
    
    const listchange = (event) => {

        var idandkey = event.target.name.split("-")
        const newArr = { ...myarray };
        newArr[idandkey[0]][idandkey[1]] = event.target.value
        myarrayChange(newArr)
    }

    const detailchange = (event) => {

        var idandkey = event.target.name.split("-")
        const newArr = [...listarray];

        newArr[idandkey[1]][idandkey[0]] = event.target.value


        listarraychange(newArr)
    }

    const addlistdata = () => {
        const newArr = [...listarray] ;

        newArr.push({'content':'','number':'','money':''})
        listarraychange(newArr)
    }

    const addlistdatasql=()=>{
        uploadnewdata(shopid,'edit')
    }


    const pagechange = (url) => {

        history.push(url);
    }




    const editclick=()=>{
         /**?m=content&c=content&a=edit */

        

         var bodyFormData = new FormData();
         for(var i=0;i<myarray['shop_detail'].length;i++){
             bodyFormData.set('info[shop_detail]['+i+']',myarray['shop_detail'][i])
         }
         /*for(var i=0;i<myarray['shop_size'].length;i++){
             bodyFormData.set('info[shop_size]['+i+']',myarray['shop_size'][i])
         }
         for(var i=0;i<myarray['shop_color'].length;i++){
             bodyFormData.set('info[shop_color]['+i+']',myarray['shop_color'][i])
         }*/
         bodyFormData.set('list', JSON.stringify(listarray));
         bodyFormData.set('info[shop_freight]', shopfreight);
         bodyFormData.set('info[title]', title);
         bodyFormData.set('info[keywords]', keywords);
         bodyFormData.set('info[description]', description);
         bodyFormData.set('info[shop_prize]', shopprize);
         bodyFormData.set('info[thumb]', imgname);
         bodyFormData.set('info[content]', callbackmessage);
         bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
         bodyFormData.set('id', shopid);
         bodyFormData.set('webtype', 'react');
         bodyFormData.set('info[catid]', 6);
         bodyFormData.set('dosubmit', true);
         bodyFormData.set('dosubmit_continue', true);

         axios({
            method: 'post',
            url: 'index.php?m=content&c=content&a=edit',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;

                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {

                    alert(res.msg)
                   
                    pagechange('/Admin_updatalist')



                }

            })
            .catch(function (response) {

                console.log(response);
            });




    }
    const updataclick = () => {

        var bodyFormData = new FormData();

        for(var i=0;i<myarray['shop_detail'].length;i++){
            bodyFormData.set('info[shop_detail]['+i+']',myarray['shop_detail'][i])
        }
        /*for(var i=0;i<myarray['shop_size'].length;i++){
            bodyFormData.set('info[shop_size]['+i+']',myarray['shop_size'][i])
        }
        for(var i=0;i<myarray['shop_color'].length;i++){
            bodyFormData.set('info[shop_color]['+i+']',myarray['shop_color'][i])
        }*/
        bodyFormData.set('info[shop_freight]', shopfreight);
        bodyFormData.set('info[title]', title);
        bodyFormData.set('info[keywords]', keywords);
        bodyFormData.set('info[description]', description);
        bodyFormData.set('info[shop_prize]', shopprize);
        bodyFormData.set('info[thumb]', imgname);
        bodyFormData.set('info[content]', callbackmessage);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('paginationtype', 0);
        bodyFormData.set('maxcharperpage', 10000);

        bodyFormData.set('groupids_view', 1);
        bodyFormData.set('voteid', 0);
        bodyFormData.set('status', 99);
        bodyFormData.set('introcude_length', 200);
        bodyFormData.set('info[catid]', 6);
        bodyFormData.set('webtype', 'react');
        bodyFormData.set('dosubmit', true);
        bodyFormData.set('dosubmit_continue', true);


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
                    //alert(res.data)

                    uploadnewdata(res.data,'frist')
                    //pagechange('/Admin_updatalist')



                }

            })
            .catch(function (response) {

                console.log(response);
            });

            console.log(title)
    }

    const onFileUpload = (event) => {
        var file = event.target.files[0];

        if (!file) {

            return false;

        }



        var reader = new FileReader();
        reader.onload = function (event) {
            console.log(event)
            saveimgChange(event.target.result)
        };

        reader.readAsDataURL(file);

    }

    const deleteeqno=(id)=>{
        var bodyFormData = new FormData();
        bodyFormData.set('eqno', id);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('webtype', 'react');
        axios({
            method: 'post',
            url: 'index.php?m=content&c=content&a=deleteforeqno',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;
                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {
                    alert(res.msg)
                    geteditdatalist()



                }


            })
            .catch(function (response) {

                console.log(response);
            });
    }

    /*
    刪除所有shopid=X
    const editstep1delete=()=>{
        var bodyFormData = new FormData();
        bodyFormData.set('shopid', shopid);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('webtype', 'react');
        axios({
            method: 'post',
            url: 'index.php?m=content&c=content&a=deleteforid',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;
                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {
                    alert(res.msg)
                    uploadnewdata(shopid)



                }


            })
            .catch(function (response) {

                console.log(response);
            });
    }*/

    const uploadnewdata=(id,type)=>{

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
        var days = Date.now()
        var eqno = getUpperCharacter() + days

        var bodyFormData = new FormData();

        if(type=='frist'){
            bodyFormData.set('list', JSON.stringify(listarray));
        }else if(type=='edit'){
            var arr=[{'content':'','number':'','money':'','eqno':''}]
            bodyFormData.set('list', JSON.stringify(arr));
        }
        
        bodyFormData.set('eqno', eqno);
        bodyFormData.set('shopid', id);
        bodyFormData.set('pc_hash', admindata['data']['pc_hash']);
        bodyFormData.set('webtype', 'react');
        axios({
            method: 'post',
            url: 'index.php?m=content&c=content&a=addlist',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {

                var res = response.data;
                if (res.status == -1) {
                    alert(res.msg)
                } else if (res.status == 1) {
                    alert(res.msg)
                    if(type=='frist'){
                        pagechange('/Admin_updatalist')
                    }else if(type=='edit'){
                        geteditdatalist()
                    }



                }


            })
            .catch(function (response) {

                console.log(response);
            });

    }


    const uploadbase64 = (code) => {

        //console.log(code)
        imgsrcChange(code)

    }

    const checkbase64 = () => {

        firstuploadimg()


    }

    const firstuploadimg = () => {

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

    /*const imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          let img = new Image();
          // let url = ''
          reader.onload = function (e) {
            img.src = this.result
            resolve({
              data: {
                link: img.src
              }
            })
          }
        }
      );*/
      const imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          let img = new Image();
          // let url = ''
          reader.onload = function (e) {
            img.src = this.result
          }
          img.onload = function () {
            // console.log(img.src.length)
            // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
    
            // 图片原始尺寸
            var originWidth = this.width;
            var originHeight = this.height;
    
            // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
            var maxWidth = 300,
                maxHeight = 300;
            // 目标尺寸
            var targetWidth = originWidth,
                targetHeight = originHeight;
            // 图片尺寸超过300x300的限制
            if(originWidth > maxWidth || originHeight > maxHeight) {
                if(originWidth / originHeight > maxWidth / maxHeight) {
                    // 更宽，按照宽度限定尺寸
                    targetWidth = maxWidth;
                    targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                } else {
                    targetHeight = maxHeight;
                    targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                }
            }
            // canvas对图片进行缩放
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            // 清除画布
            context.clearRect(0, 0, targetWidth, targetHeight);
            // 图片压缩
            context.drawImage(img, 0, 0, targetWidth, targetHeight);
            /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/
    
            //压缩后的图片转base64 url
            /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
              * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
            var newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式
            // console.log(newUrl.length)
            
            resolve({
              data: {
                link: newUrl
              }
            })
    
            //也可以把压缩后的图片转blob格式用于上传
            // canvas.toBlob((blob)=>{
            //     console.log(blob)
            //     //把blob作为参数传给后端
            // }, 'image/jpeg', 0.92)
          }
        }
      );



    useEffect(() => {
        if (!mounted.current) { //componentDidMount
            mounted.current = true;
            props._checkadmindata(function(data){
                admindataChange(data)

            })




        }
        else { //componentDidUpdate
            if (admindata && !admincc.current) {
                admincc.current = true;
                if(shopid){
                    geteditdata()
                }else{

                }
            }

            if (imgname != imgnameold.current) {

                if (shopid) {

                    editclick()

                } else {

                    updataclick()

                }



                imgnameold.current = imgname
            }
        }

    }, [props, imgsrc, myarray,admindata,saveimg, imgname,listarray]);
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
                                            <div className='col-12'>標題</div>
                                            <div className='col-12'><input type='text' className='w-100' id='uptitle' value={title} onChange={(event)=>titleChange(event.target.value)}/></div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>關鍵詞</div>
                                            <div className='col-12'><input type='text' className='w-100' id='upkeyword' value={keywords} onChange={(event)=>keywordsChange(event.target.value)}/></div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>摘要</div>
                                            <div className='col-12'><input type='text' className='w-100' id='updescription' value={description} onChange={(event)=>descriptionChange(event.target.value)}/></div>
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>單價</div>
                                            <div className='col-12'><input type='text' className='w-100' id='upshopprize' value={shopprize} onChange={(event)=>shopprizeChange(event.target.value)}/></div>
                                        </div>
    <div className='row mt-1'>
        <div className='col-12'>運費</div>
        <div className='col-12'><input type='text' className='w-100' id='upshopfright' value={shopfreight} onChange={(event)=>shopfreightChange(event.target.value)}/></div>
    </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>細項分類</div>
                                            {Object.entries(myarray.shop_detail).map((t, k) =>
                                                <div className='row mb-1' key={k}>
                                                    <div className='col-8 col-lg-10'><input type='text' className='w-95' value={t[1]} onChange={listchange} name={'shop_detail-' + t[0]} /></div>
                                                    <div className='col-4 col-lg-2'>

                                                        <input type='button' className='w-95' value={'刪除'} name={'delete-'+t[0]} onClick={() => removelist('shop_detail-'+t[0])} />
                                                        </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>
                                            <div className='col-12'><input type='button' className='w-100' defaultValue='增加' onClick={() => addlist('shop_detail')}></input></div>
                                            </div>

                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'></div>
                                            {Object.entries(listarray).map((t, k) =>
                                                <div className='row mb-1' key={k}>
                                                    <div className='col-12'>
                                                        <div className='row'>

                                                        <div className='col-12 col-lg-6'>
                                                        種類
                                                        <input type='text' className='w-95' value={t[1].content} onChange={detailchange} name={'content-' + t[0]} />
                                                        </div>

                                                        <div className='col-4 col-lg-2'>
                                                        數量
                                                        <input type='number' className='w-95' value={t[1].number} onChange={detailchange} name={'number-'+t[0]} />
                                                        </div>


                                                        <div className='col-4 col-lg-2'>
                                                            價格
                                                        <input type='number' className='w-95' value={t[1].money} onChange={detailchange} name={'money-'+t[0]} />
                                                        </div>
                                                        <div className='col-4 col-lg-2'>
                                                            操作
                                                        <input type='button' className='w-95' value={'刪除'} name={'delete-'+t[0]} onClick={() => removelistnewdata(t[1].eqno)} />
                                                        </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                        <div className='row mt-1'>
                                            <div className='col-12'>
                                            <div className='col-12'><input type='button' className='w-100' defaultValue='增加' onClick={() => shopid ? addlistdatasql():addlistdata()}></input></div>
                                            </div>
                                        </div>

                                        <div className='row mt-1'>
                                            <div className='col-12'>照片上傳(建議尺寸600X500)</div>
                                            <div className='col-12'><input type="file" onChange={onFileUpload} className='w-100' /></div>
                                            <img src={imgname} className='w-100 mt-1' />
                                        </div>
        <div className='row mt-1'>
        {saveimg ? <Admin_imgupload _width={600} _height={500} _data={saveimg} _uploadbase64={uploadbase64}/> : ''}



    </div>
                                        <div className='row mt-3 editorStateClass'>

                                            <Editor


                                                toolbar={{
                                                    /*options: ['inline', 'blockType', 'fontSize', 'textAlign',
                                                    'history', 'colorPicker'],
                                                    inline: {
                                                    options: ['italic'],
                                                    bold: { className: 'demo-option-custom' },
                                                    italic: { className: 'demo-option-custom' },
                                                    underline: { className: 'demo-option-custom' },
                                                    strikethrough: {className: 'demo-option-custom' },
                                                    monospace: { className: 'demo-option-custom' },
                                                    superscript: {className: 'demo-option-custom'},
                                                    subscript: { className: 'demo-option-custom' }
                                                    },
                                                    blockType: {className: 'demo-option-custom-wide',
                                                    dropdownClassName: 'demo-dropdown-custom'},
                                                    fontSize: { className: 'demo-option-custom-medium' }*/
                                                    image: {
                                                        urlEnabled: false,
                                                        uploadEnabled: true,
                                                        alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                                                        uploadCallback: imageUploadCallBack,
                                                        previewImage: true,
                                                        inputAccept: 'image/*',
                                                        alt: {present: false, mandatory: false}
                                                      },
                                                    
                                                }}
                                                placeholder='請輸入內容'
                                                editorState={editorState}
                                                wrapperClassName='demo-wrapper'
                                                editorClassName='demo-editor'
                                                onEditorStateChange={editChange}
                                                
                                            />
                                            {/*<div dangerouslySetInnerHTML={{__html: message}}></div> */}

                                        </div>


                                        <div className='col-12 mt-3 carlisttop3'>



                                            <div className='row'>





                                                <div className='detailshopbtn col-xl-12 col-12'>

                                                    <div className='row justify-content-center'>
                                                        {!shopid ?
                                                        <div className='col-xl-6 col-6'>
                                                        <div className='detailbtnclass btncolor1 w99-5' onClick={() => firstuploadimg()}>確認送出</div>

                                                    </div>
                                                    :
                                                    <div className='col-xl-6 col-6'>
                                                            <div className='detailbtnclass btncolor1 w99-5' onClick={() => imgsrc == null ? editclick() : checkbase64()}>確認修改</div>

                                                        </div>
                                                    }


                                                        <Link to='Admin_updatalist'>
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
