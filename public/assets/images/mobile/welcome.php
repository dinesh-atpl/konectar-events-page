<?php
/**
*
*@author 
*@since
*@package application.controllers	
*@created on 
*/
class Welcome extends Controller {

	function Welcome()
	{
		parent::Controller();	
	}
	
	function index()
	{
		$this->load->view('welcome_message');
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */