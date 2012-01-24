<?php
	class html2json extends Controller
	{
		public function __construct()
		{
			parent::__construct();
			$this->load->helper(array('form', 'url', 'xmlparser'));
		}

		function index(){
			$this->load->view('html2json_view');
		}

		function ajax_leerHtml(){
			 $contents = $this->load->view('html_view', '',true);
			 $result['code'] = xml2array($contents);
			 $this->load->view('json_view',$result);
		}
	}
?>
