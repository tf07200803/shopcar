<?php
class content_form {
	var $modelid;
	var $fields;
	var $id;
	var $formValidator;

    function __construct($modelid,$catid = 0,$categorys = array()) {
		$this->modelid = $modelid;
		$this->catid = $catid;
		$this->categorys = $categorys;
		$this->fields = getcache('model_field_'.$modelid,'model');
		$this->siteid = get_siteid();
    }

	function get($data = array()) {
        $_groupid = param::get_cookie('_groupid');
        $this->data = $data;
        if(isset($data['id'])) $this->id = $data['id'];
        $info = array();
        $this->content_url = $data['url'];
        foreach($this->fields as $field=>$v) {
            if(defined('IN_ADMIN')) {
                if($v['iscore'] || check_in($_SESSION['roleid'], $v['unsetroleids'])) continue;
            } else {
                if($v['iscore'] || !$v['isadd'] || check_in($_groupid, $v['unsetgroupids'])) continue;
            }
            $func = $v['formtype'];
            $value = isset($data[$field]) ? new_html_special_chars($data[$field]) : '';
            if($func=='pages' && isset($data['maxcharperpage'])) {
                $value = $data['paginationtype'].'|'.$data['maxcharperpage'];
            }
            if(!method_exists($this, $func)) continue;
            $form = $this->$func($field, $value, $v);
            if($form !== false) {
                if(defined('IN_ADMIN')) {
                    if($v['isbase']) {
                        $star = $v['minlength'] || $v['pattern'] ? 1 : 0;
                        $info['base'][$field] = array('name'=>$v['name'], 'tips'=>$v['tips'], 'form'=>$form, 'star'=>$star,'isomnipotent'=>$v['isomnipotent'],'formtype'=>$v['formtype'],'shop_freight'=>$data['shop_freight'] ,'shop_prize'=>$data['shop_prize'] ,'shop_detail'=>$data['shop_detail'],'shop_size'=>$data['shop_size'],'shop_color'=>$data['shop_color']);
                    } else {
                        $star = $v['minlength'] || $v['pattern'] ? 1 : 0;
                        $info['senior'][$field] = array('name'=>$v['name'], 'tips'=>$v['tips'], 'form'=>$form, 'star'=>$star,'isomnipotent'=>$v['isomnipotent'],'formtype'=>$v['formtype']);
                    }
                } else {
                    $star = $v['minlength'] || $v['pattern'] ? 1 : 0;
                    $info[$field] = array('name'=>$v['name'], 'tips'=>$v['tips'], 'form'=>$form, 'star'=>$star,'isomnipotent'=>$v['isomnipotent'],'formtype'=>$v['formtype']);
                }
            }
        }
        /*if(isset($data['shop_prize'])) $info['shop_prize']=$data['shop_prize'];
        if(isset($data['shop_detail'])) $info['shop_detail']=$data['shop_detail'];
        if(isset($data['shop_size'])) $info['shop_size']=$data['shop_size'];
        if(isset($data['shop_color'])) $info['shop_color']=$data['shop_color'];*/
        return $info;
	}
}?>
