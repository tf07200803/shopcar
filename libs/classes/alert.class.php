<?php

class alert {


	/**
	 * 析构函数
	 * @param $ps_api_url 接口域名
	 * @param $ps_auth_key 加密密匙
	 */
	public function __construct() {

	}


	public function message($status,$message,$data=''){
        $res = [
            'status' => $status,
            'msg'  => $message,
            'data'  => $data,
        ];
        echo json_encode($res);
        /*if($status==-1){
            die();
		}*/
        die();
	}


}



?>
