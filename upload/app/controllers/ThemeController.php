<?php

class ThemeController extends \BaseController {

	var $data = array();
	var $panelInit;
	var $layout = 'dashboard';

	public function __construct() {
		$this->panelInit = new \DashboardInit();
		$this->data['panelInit'] = $this->panelInit;
		$this->data['breadcrumb']['Settings'] = \URL::to('/theme/configuration');
		$this->data['users'] = \Auth::user();
		if ($this->data['users']->role != "admin") {
			exit;
		}
	}
	public function changeTopNavColor() {
		$ThemeConfiguration = new ThemeConfiguration();
		$ThemeConfiguration = ThemeConfiguration::find($this->data['users']->id);
		if (!$ThemeConfiguration) {
			$ThemeConfig = new ThemeConfiguration();
			$ThemeConfig->topNavColor = Input::get('userInput');
			return $this->create_new($ThemeConfig);
		}
		$ThemeConfiguration->topNavColor = Input::get('userInput');

		$ThemeConfiguration->save();

		return $ThemeConfiguration;
	}
	public function changeBoxLayout() {
		$ThemeConfiguration = new ThemeConfiguration();
		$ThemeConfiguration = ThemeConfiguration::find($this->data['users']->id);
		if (!$ThemeConfiguration) {
			$ThemeConfig = new ThemeConfiguration();
			$ThemeConfig->boxLayout = Input::get('userInput');
			return $this->create_new($ThemeConfig);
		}
		$ThemeConfiguration->boxLayout = Input::get('userInput');
		$ThemeConfiguration->save();

		return $ThemeConfiguration;
	}
	public function changeCollapseNav() {

		$ThemeConfiguration = new ThemeConfiguration();
		$ThemeConfiguration = ThemeConfiguration::find($this->data['users']->id);
		if (!$ThemeConfiguration) {
			$ThemeConfig = new ThemeConfiguration();
			$ThemeConfig->collapseNav = Input::get('userInput');
			return $this->create_new($ThemeConfig);
		}
		$ThemeConfiguration->collapseNav = Input::get('userInput');
		$ThemeConfiguration->save();

		return $ThemeConfiguration;
	}
	public function changeFixHeader() {
		$ThemeConfiguration = new ThemeConfiguration();
		$ThemeConfiguration = ThemeConfiguration::find($this->data['users']->id);
		if (!$ThemeConfiguration) {
			$ThemeConfig = new ThemeConfiguration();
			$ThemeConfig->fixHeader = Input::get('userInput');
			return $this->create_new($ThemeConfig);
		}
		$ThemeConfiguration->fixHeader = Input::get('userInput');
		$ThemeConfiguration->save();

		return $ThemeConfiguration;
	}
	public function changeSidebarColor() {
		$ThemeConfiguration = new ThemeConfiguration();
		$ThemeConfiguration = ThemeConfiguration::find($this->data['users']->id);
		if (!$ThemeConfiguration) {
			$ThemeConfig = new ThemeConfiguration();
			$ThemeConfig->sidebarColor = Input::get('userInput');
			return $this->create_new($ThemeConfig);
		}
		$ThemeConfiguration->sidebarColor = Input::get('userInput');
		$ThemeConfiguration->save();

		return $ThemeConfiguration;
	}
	public function create_new($ThemeConfig) {
		$ThemeConfig->id = $this->data['users']->id;
		$ThemeConfig->user_id = $this->data['users']->id;
		$ThemeConfig->save();
		return $ThemeConfig;
	}

}
