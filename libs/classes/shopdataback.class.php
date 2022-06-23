<?php

class shopdataback {
    var $db;

	/**
	 * 析构函数
	 * @param $ps_api_url 接口域名
	 * @param $ps_auth_key 加密密匙
	 */
	public function __construct() {

	}
    public function checktimeout(){


        $content_db = pc_base::load_model('content_model');
        $content_db->table_name='news';
        $infos = $content_db->listinfo(array('status'=>1),'id ASC');

        foreach($infos as $field=>$value) {
            //var_dump($value['inputtime']);
            //echo date("Y-m-d H:i:s",$value['inputtime']).'<br>';
            $value['inputtime']+=21600;
            $time = time();
            if($value['inputtime']<$time){

                $content_db->update(array('status'=>66), array('id'=>$value['id']));

                self::read($value['id']);
            }

        }


    }

    public function read($id){

        $content_db = pc_base::load_model('content_model');
        $content_db->table_name='news';

        $r = $content_db->get_one(array('id'=>$id));
        $shop=$r['shop_data'];

        $arr=json_decode( html_entity_decode( stripslashes ($shop ) ) );


        foreach ($arr as &$value) {
            $a=array();
            $sid=$value->shop_list_target;
            $list=$value->shop_list;

            $eqno='';
            foreach ($list as &$value2) {
                if ($value2->id==$sid){
                    $eqno= $value2->eqno;

                }
            }
            for ( $i=0 ; $i<$value->buy ; $i++ ) {
                array_push($a,$eqno);

            }


            $link_db = pc_base::load_model(list_model);
            foreach($a as $field=>$value) {
                //echo $value .'<br>';
                $infos = $link_db->get_one(array('eqno'=>$value));
                $oldnumber= $infos['number'];
                $oldnumber++;
                $link_db->update(array('number'=>$oldnumber), array('eqno'=>$value));
            }
        }
    }


}



?>
