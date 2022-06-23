<?php $show_header = $show_validator = $show_scroll = 1; include $this->admin_tpl('header', 'attachment');?>
<link href="<?php echo JS_PATH?>swfupload/swfupload.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript" src="<?php echo JS_PATH?>swfupload/swfupload.js"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo JS_PATH?>swfupload/fileprogress.js"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo JS_PATH?>swfupload/handlers.js"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo JS_PATH?>swfupload/fabric.js"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo JS_PATH?>swfupload/exif.js"></script>
<script type="text/javascript">
<?php echo initupload($_GET['module'],$_GET['catid'],$args,$this->userid,$this->groupid,$this->isadmin,$userid_flash)?>
</script>
<div class="pad-10">
    <div class="col-tab">
        <ul class="tabBut cu-li">
            <li id="tab_swf_1" <?php echo $tab_status?> onclick="SwapTab('swf','on','',7,1);"><?php echo L('upload_attachment')?></li>
            <li id="tab_swf_2" onclick="SwapTab('swf','on','',7,2);"><?php echo L('net_file')?></li>
            <?php if($allowupload && $this->admin_username && $_SESSION['userid']) {?>
            <li id="tab_swf_3" onclick="SwapTab('swf','on','',7,3);set_iframe('album_list','index.php?m=attachment&c=attachments&a=album_load&args=<?php echo $args?>');"><?php echo L('gallery')?></li>
            <li id="tab_swf_4" onclick="SwapTab('swf','on','',7,4);set_iframe('album_dir','index.php?m=attachment&c=attachments&a=album_dir&args=<?php echo $args?>');"><?php echo L('directory_browse')?></li>
            <?php }?>
            <?php if($att_not_used!='') {?>
            <li id="tab_swf_5" class="on icon" onclick="SwapTab('swf','on','',7,5);"><?php echo L('att_not_used')?></li>
            <?php }?>
            <li id="tab_swf_6" onclick="SwapTab('swf','on','',7,6);">上傳圖片</li>
            <li id="tab_swf_7" onclick="SwapTab('swf','on','',7,7);">base64</li>
        </ul>
         <div id="div_swf_1" class="content pad-10 <?php echo $div_status?>">
        	<div>
				<div class="addnew" id="addnew">
					<span id="buttonPlaceHolder"></span>
				</div>
				<input type="button" id="btupload" value="<?php echo L('start_upload')?>" onClick="swfu.startUpload();" />
                <div id="nameTip" class="onShow"><?php echo L('upload_up_to')?><font color="red"> <?php echo $file_upload_limit?></font> <?php echo L('attachments')?>,<?php echo L('largest')?> <font color="red"><?php echo $file_size_limit?></font></div>
                <div class="bk3"></div>

                <div class="lh24"><?php echo L('supported')?> <font style="font-family: Arial, Helvetica, sans-serif"><?php echo str_replace(array('*.',';'),array('','、'),$file_types)?></font> <?php echo L('formats')?></div><input type="checkbox" id="watermark_enable" value="1" <?php if(isset($watermark_enable) &&$watermark_enable == 1) echo 'checked'?> onclick="change_params()"> <?php echo L('watermark_enable')?>
        	</div>
    		<div class="bk10"></div>
        	<fieldset class="blue pad-10" id="swfupload">
        	<legend><?php echo L('lists')?></legend>
        	<ul class="attachment-list"  id="fsUploadProgress">
        	</ul>
    		</fieldset>
    	</div>
        <div id="div_swf_2" class="contentList pad-10 hidden">
        <div class="bk10"></div>
        	<?php echo L('enter_address')?><div class="bk3"></div><input type="text" name="info[filename]" class="input-text" value=""  style="width:350px;"  onblur="addonlinefile(this)">
		<div class="bk10"></div>
        </div>
    	<?php if($allowupload && $this->admin_username && $_SESSION['userid']) {?>
        <div id="div_swf_3" class="contentList pad-10 hidden">
            <ul class="attachment-list">
        	 <iframe name="album-list" src="#" frameborder="false" scrolling="no" style="overflow-x:hidden;border:none" width="100%" height="345" allowtransparency="true" id="album_list"></iframe>
        	</ul>
        </div>
        <div id="div_swf_4" class="contentList pad-10 hidden">
            <ul class="attachment-list">
        	 <iframe name="album-dir" src="#" frameborder="false" scrolling="auto" style="overflow-x:hidden;border:none" width="100%" height="330" allowtransparency="true" id="album_dir"></iframe>
        	</ul>
        </div>
        <?php }?>
        <?php if($att_not_used!='') {?>
        <div id="div_swf_5" class="contentList pad-10">
        	<div class="explain-col"><?php echo L('att_not_used_desc')?></div>
            <ul class="attachment-list" id="album">
            <?php if(is_array($att) && !empty($att)){ foreach ($att as $_v) {?>
			<li>
				<div class="img-wrap">
					<a onclick="javascript:album_cancel(this,<?php echo $_v['aid']?>,'<?php echo $_v['src']?>')" href="javascript:;" class="off"  title="<?php echo $_v['filename']?>"><div class="icon"></div><img width="<?php echo $_v['width']?>"  path="<?php echo $_v['src']?>" src="<?php echo $_v['fileimg']?>" title="<?php echo $_v['filename']?>"></a>
				</div>
			</li>
			<?php }}?>
        	</ul>
        </div>
        <?php }?>


        <div id="div_swf_6" class="contentList pad-10 hidden">
            <form method="post" action="?m=admin&c=index&a=upload" enctype="multipart/form-data">
                <input name='uploads[]' type="file" multiple style="float: left;">
                <input type="submit" id="btupload" name="uploadpic" value="上传">
            </form>
        </div>

        <div id="div_swf_7" class="contentList pad-10 hidden">
            <form method="post" action="?m=admin&c=index&a=uploadbase64" enctype="multipart/form-data" id="baseform">

                <input id="imageInput" type="file" name="myPhoto" onchange="loadImageFile();" />
                <div class="setbase" style="padding: 10px; border: 1px solid #cccccc; margin: 20px;"><canvas id="c" width="300" height="225"></canvas></div>
                <input type="hidden" name="code" id="code">
                <input type="button" id="btupload" name="uploadpic" value="上传" onclick="base64upload()">
                <div id="picurl"></div>

            </form>

        </div>



    <div id="att-status" class="hidden"></div>
     <div id="att-status-del" class="hidden"></div>
    <div id="att-name" class="hidden"></div>
<!-- swf -->
</div>
</body>
<script type="text/javascript">
if ($.browser.mozilla) {
	window.onload=function(){
	  if (location.href.indexOf("&rand=")<0) {
			location.href=location.href+"&rand="+Math.random();
		}
	}
}
function imgWrap(obj){
	$(obj).hasClass('on') ? $(obj).removeClass("on") : $(obj).addClass("on");
}

function SwapTab(name,cls_show,cls_hide,cnt,cur) {
    for(i=1;i<=cnt;i++){
		if(i==cur){
			 $('#div_'+name+'_'+i).show();
			 $('#tab_'+name+'_'+i).addClass(cls_show);
			 $('#tab_'+name+'_'+i).removeClass(cls_hide);
		}else{
			 $('#div_'+name+'_'+i).hide();
			 $('#tab_'+name+'_'+i).removeClass(cls_show);
			 $('#tab_'+name+'_'+i).addClass(cls_hide);
		}
	}
}

function addonlinefile(obj) {
	var strs = $(obj).val() ? '|'+ $(obj).val() :'';
	$('#att-status').html(strs);
}

function change_params(){
	if($('#watermark_enable').attr('checked')) {
		swfu.addPostParam('watermark_enable', '1');
	} else {
		swfu.removePostParam('watermark_enable');
	}
}
function set_iframe(id,src){
	$("#"+id).attr("src",src);
}
function album_cancel(obj,id,source){
	var src = $(obj).children("img").attr("path");
	var filename = $(obj).attr('title');
	if($(obj).hasClass('on')){
		$(obj).removeClass("on");
		var imgstr = $("#att-status").html();
		var length = $("a[class='on']").children("img").length;
		var strs = filenames = '';
		$.get('index.php?m=attachment&c=attachments&a=swfupload_json_del&aid='+id+'&src='+source+'&filename='+filename);
		for(var i=0;i<length;i++){
			strs += '|'+$("a[class='on']").children("img").eq(i).attr('path');
			filenames += '|'+$("a[class='on']").children("img").eq(i).attr('title');
		}
		$('#att-status').html(strs);
		$('#att-status').html(filenames);
	} else {
		var num = $('#att-status').html().split('|').length;
		var file_upload_limit = '<?php echo $file_upload_limit?>';
		if(num > file_upload_limit) {alert('<?php echo L('attachment_tip1')?>'+file_upload_limit+'<?php echo L('attachment_tip2')?>'); return false;}
		$(obj).addClass("on");
		$.get('index.php?m=attachment&c=attachments&a=swfupload_json&aid='+id+'&src='+source+'&filename='+filename);
		$('#att-status').append('|'+src);
		$('#att-name').append('|'+filename);
	}
}
var iosimg=false;
var canvas;
function composite(url){
    canvas = this.__canvas = new fabric.Canvas('c',{backgroundColor : "#000"});
    canvas.on({
        /*'object:moving': function(e) {
          e.target.opacity = 0.5;
        },
        'object:modified': function(e) {
          e.target.opacity = 1;
        }*/
    });

    fabric.Image.fromURL(url, function(img) {

        composite_img=img
        imgurl=url


        img.originX= 'center'
        img.originY= 'center'

        if(iosimg){
            img.angle=90
            img.scaleY= 300 / img.height
            img.scaleX= img.scaleY
        }else{
            img.scaleX= 300 / img.width
            img.scaleY= img.scaleX
        }
        img.left=300/2
        img.top=225/2
        canvas.add(img)
    })
}


function base64upload(){
    var dataURL = canvas.toDataURL("image/png");
    /*$.ajax({
        url: "index.php?m=admin&c=index&a=uploadbase64",
        data: {code: dataURL},
        type: "POST",
        dataType: "json",
        success: function(data) {
            console.log(data)
        }
    });
    var img = $('<img id="dynamic" width="100%">');
    img.attr('src', dataURL);
    img.appendTo('#picurl');*/

    $("#code").val(dataURL)
    $("#baseform").submit()
}


</script>

    <script type="text/javascript">

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
    </script>


</html>
