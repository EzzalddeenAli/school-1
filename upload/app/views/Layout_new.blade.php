<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title><?php echo $panelInit->settingsArray['siteTitle'] . " | " . $panelInit->language['dashboard'];?></title>
  <base href="<?php echo $panelInit->baseURL;?>/" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="description" content="Avenxo Admin Theme">
  <meta name="author" content="KaijuThemes">
  <link type='text/css' href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400italic,600' rel='stylesheet'>
  <link type="text/css" href="{{URL::asset('assets/new_theme/fonts/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet">        <!-- Font Awesome -->
  <link type="text/css" href="{{URL::asset('assets/new_theme/fonts/themify-icons/themify-icons.css')}}" rel="stylesheet">              <!-- Themify Icons -->
  <link type="text/css" href="{{URL::asset('assets/new_theme/plugins/codeprettifier/prettify.css')}}" rel="stylesheet">                <!-- Code Prettifier -->
  <link type="text/css" href="{{URL::asset('assets/new_theme/plugins/iCheck/skins/minimal/blue.css')}}" rel="stylesheet">              <!-- iCheck -->
  <link rel="stylesheet" href="{{URL::asset('assets/plugins/skylo/vendor/styles/skylo.css')}}" />
    <!--[if lt IE 10]>
    <script type="text/javascript" src="{{URL::asset('assets/js/media.match.min.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/respond.min.js')}}"></script>
    <script type="text/javascript" src="{{URL::asset('assets/js/placeholder.min.js')}}"></script>
    <![endif]-->
    <!-- The following CSS are included as plugins and can be removed if unused-->
    <link type="text/css" href="{{URL::asset('assets/new_theme/plugins/fullcalendar/fullcalendar.css')}}" rel="stylesheet">             <!-- FullCalendar -->
    <link type="text/css" href="{{URL::asset('assets/new_theme/plugins/jvectormap/jquery-jvectormap-2.0.2.css')}}" rel="stylesheet">      <!-- jVectorMap -->
    <link type="text/css" href="{{URL::asset('assets/new_theme/plugins/switchery/switchery.css')}}" rel="stylesheet">
  <link type="text/css" href="{{URL::asset('assets/new_theme/css/styles.css')}}" rel="stylesheet">                                     <!-- Core CSS with all styles -->
  </head>
  <script>
    var baseUrl = "{{URL::to('/')}}";
  </script>
<body class="hold-transition <?php echo $panelInit->defTheme . " " . $theme['sidebarColor'] . " " . $theme['boxLayout'] . " " . $theme['collapseNav'];?> sidebar-mini" ng-app="schoex" ng-controller="mainController">
  <header id="topnav" class="navbar <?php echo $theme['topNavColor'] . " " . $theme['fixHeader'];?>" role="banner">
    <div class="logo-area">
      <span id="trigger-sidebar" class="toolbar-trigger toolbar-icon-bg">
        <a data-toggle="tooltips" data-placement="right" title="Toggle Sidebar">
          <span class="icon-bg">
            <i class="ti ti-menu"></i>
          </span>
        </a>
      </span>
      <a class="navbar-brand" href="index.html">Avenxo</a>
      <div class="toolbar-icon-bg hidden-xs" id="toolbar-search">
        <div class="input-group">
          <span class="input-group-btn"><button class="btn" type="button"><i class="ti ti-search"></i></button></span>
          <input type="text" class="form-control" placeholder="Search...">
          <span class="input-group-btn"><button class="btn" type="button"><i class="ti ti-close"></i></button></span>
        </div>
      </div>
    </div><!-- logo-area -->
    <ul class="nav navbar-nav toolbar pull-right">
      <li class="toolbar-icon-bg visible-xs-block" id="trigger-toolbar-search">
        <a href="#"><span class="icon-bg"><i class="ti ti-search"></i></span></a>
      </li>
      <li class="toolbar-icon-bg hidden-xs">
        <a href="#" ng-click="chgAcYearModal()"><span class="icon-bg"><i class="ti ti-calendar"></i></span></i></a>
      </li>
      <li class="toolbar-icon-bg hidden-xs" id="trigger-fullscreen">
        <a href="#" class="toggle-fullscreen"><span class="icon-bg"><i class="ti ti-fullscreen"></i></span></i></a>
      </li>
      <li class="dropdown toolbar-icon-bg hidden-xs">
        <a href="#" class="hasnotifications dropdown-toggle" data-toggle='dropdown'><span class="icon-bg"><i class="ti ti-email"></i></span><span
          class="badge badge-deeporange">{{$stats['newMessages']==0?"":$stats['newMessages']}}</span></a>
          <div class="dropdown-menu notifications arrow">
            <div class="topnav-dropdown-header">
              <span>Messages</span>
            </div>
            <div class="scroll-pane">
              <ul class="media-list scroll-content">
              <?php foreach ($messages as $key => $msg): ?>

                <li class="media notification-message">
                  <a href="#/messages/"<?=$msg->id?>>
                    <div class="media-left">
                      <img class="img-circle avatar" src="{{URL::to('/dashboard/profileImage/'.$msg->userId)}}" alt="" />
                    </div>
                    <div class="media-body">
                      <h4 class="notification-heading"><strong><?=$msg->fullName?></strong> <span class="text-gray"><?=$msg->lastMessage?></span></h4>
                      <span class="notification-time">{{time_elapsed_string($msg->lastMessageDate)}}</span>
                    </div>
                  </a>
                </li>

              <?php endforeach?>
              </ul>
            </div>
            <div class="topnav-dropdown-footer">
              <a href="#">See all messages</a>
            </div>
          </div>
        </li>
        <li class="dropdown toolbar-icon-bg">
          <a href="#/mobileNotif" class="hasnotifications dropdown-toggle" data-toggle='dropdown'><span class="icon-bg"><i class="ti ti-bell"></i></span><span class="badge badge-deeporange">{{count($alerts)}}</span></a>
          <div class="dropdown-menu notifications arrow">
            <div class="topnav-dropdown-header">
              <span>Notifications</span>
            </div>
            <div class="scroll-pane">
              <ul class="media-list scroll-content">
              @foreach ($alerts as $alert)

                <li class="media notification-success">
                  <a href="#">
                    <div class="media-left">
                      <span class="notification-icon"><i class="ti ti-check"></i></span>
                    </div>
                    <div class="media-body">
                      <h4 class="notification-heading">{{$alert['notifData']}}</h4>
                      <span class="notification-time">{{time_elapsed_string(@$alert['notifDate'])}}</span>
                    </div>
                  </a>
                </li>

              @endforeach
              </ul>
            </div>
            <div class="topnav-dropdown-footer">
              <a href="#">See all notifications</a>
            </div>
          </div>
        </li>
        <li class="dropdown toolbar-icon-bg">
          <a href="#" class="dropdown-toggle username" data-toggle="dropdown">
            <img src="{{URL::to('/dashboard/profileImage/'.$users['id'])}}" class="img-responsive img-circle">
          </a>
          <ul class="dropdown-menu userinfo arrow">
            <li><a href="#/"><i class="ti ti-user"></i><span>Profile</span><span class="badge badge-info pull-right">80%</span></a></li>
            <li><a href="#/"><i class="ti ti-panel"></i><span>Account</span></a></li>
            <li><a href="#/"><i class="ti ti-settings"></i><span>Settings</span></a></li>
            <li class="divider"></li>
            <li><a href="#/"><i class="ti ti-stats-up"></i><span>Earnings</span></a></li>
            <li><a href="#/"><i class="ti ti-view-list-alt"></i><span>Statement</span></a></li>
            <li><a href="#/"><i class="ti ti-money"></i><span>Withdrawals</span></a></li>
            <li class="divider"></li>
            <li><a href="#/"><i class="ti ti-shift-right"></i><span>Sign Out</span></a></li>
          </ul>
        </li>
      </ul>
    </header>
    <div id="wrapper">
      <div id="layout-static">
        <div class="static-sidebar-wrapper sidebar-default">
          <div class="static-sidebar">
            <div class="sidebar">
              <div class="widget">
                <div class="widget-body">
                  <div class="userinfo">
                    <div class="avatar">
                      <img src="{{URL::to('/dashboard/profileImage/'.$users['id'])}}" class="img-responsive img-circle">
                    </div>
                    <div class="info">
                      <span class="username">{{$users['fullName']}}</span>
                      <span class="useremail">{{$users['username']}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="widget stay-on-collapse" id="widget-sidebar">
                <nav role="navigation" class="widget-body">
                  <ul class="acc-menu">
                    <li class="nav-separator"><span>Explore</span></li>
                                  <?php
if ($users->role == "admin" AND $users->customPermissionsType == "custom") {
	$userPerm = $users->customPermissionsAsJson();
	$performPermScan = true;
}
while (list($key, $value) = each($panelInit->panelItems)) {
	if (isset($value['activated']) AND !strpos($panelInit->settingsArray['activatedModules'], $value['activated'])) {continue;}
	if (!in_array($users->role, $value['permissions'])) {
		continue;
	}
	if (isset($performPermScan) AND isset($value['cusPerm']) AND $value['cusPerm'] != "") {
		if (!in_array($value['cusPerm'], $userPerm)) {
			continue;
		}
	}
	echo "<li ";
	if (isset($value['children'])) {
		echo "class='hasChild'";
	}
	echo ">";
	echo "<a ";
	if (!isset($value['children'])) {
		echo "class='aj'";
	}
	if (isset($value['url'])) {
		echo " href='" . URL::to($value['url']) . "'";
	}
	echo ">";
	echo "<i class='" . $value['icon'] . "'></i><span>";
	if (isset($panelInit->language[$value['title']])) {
		echo $panelInit->language[$value['title']];
	} else {
		echo $value['title'];
	}
	echo "</span>";
	echo "</a>";
	if (isset($value['children'])) {
		echo '<ul class="acc-menu">';
		while (list($key2, $value2) = each($value['children'])) {
			if (isset($value2['activated']) AND !strpos($panelInit->settingsArray['activatedModules'], $value2['activated'])) {continue;}
			if (!in_array($users->role, $value2['permissions'])) {
				continue;
			}
			if (isset($performPermScan) AND isset($value2['cusPerm']) AND $value2['cusPerm'] != "") {
				if (!in_array($value2['cusPerm'], $userPerm)) {
					continue;
				}
			}
			echo "<li>";
			echo "<a class='aj' href='" . URL::to($value2['url']) . "'>";
			echo "<i class='" . $value2['icon'] . "'></i> ";
			if (isset($panelInit->language[$value2['title']])) {
				echo $panelInit->language[$value2['title']];
			} else {
				echo $value2['title'];
			}
			echo "</a>";
			echo "</li>";
		}
		echo "</ul>";
	}

	echo "</li>";
}
?>
                    </ul>
                  </nav>
                </div>
                <div class="widget" id="widget-progress">
                  <div class="widget-heading">
                    Progress
                  </div>
                  <div class="widget-body">
                    <div class="mini-progressbar">
                      <div class="clearfix mb-sm">
                        <div class="pull-left">Bandwidth</div>
                        <div class="pull-right">50%</div>
                      </div>
                      <div class="progress">
                        <div class="progress-bar progress-bar-lime" style="width: 50%"></div>
                      </div>
                    </div>
                    <div class="mini-progressbar">
                      <div class="clearfix mb-sm">
                        <div class="pull-left">Storage</div>
                        <div class="pull-right">25%</div>
                      </div>
                      <div class="progress">
                        <div class="progress-bar progress-bar-info" style="width: 25%"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="static-content-wrapper">
            <div class="static-content">
              <div class="page-content">
                <ol class="breadcrumb">
                  <!-- <li class=""><a href="index.html">Home</a></li>
                  <li class="active"><a href="index.html">Dashboard</a></li> -->
                </ol>
                <div class="container-fluid" ng-view>
                  <div id='overlay'>
                    <div class="loading">
                      <div class="dot"></div>
                      <div class="dot2"></div>
                    </div>
                  </div>
                </div> <!-- .container-fluid -->
              </div> <!-- #page-content -->
            </div>
            <footer role="contentinfo">
              <div class="clearfix">
                <ul class="list-unstyled list-inline pull-left">
                  <li><h6 style="margin: 0;"> <strong><?php echo $panelInit->settingsArray['footer'];?></strong> -  <a target="_BLANK" href="{{URL::to('/terms')}}"><?php echo $panelInit->language['schoolTerms'];?></a></h6></li>
                </ul>
                <button class="pull-right btn btn-link btn-xs hidden-print" id="back-to-top"><i class="ti ti-arrow-up"></i></button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <!-- Switcher -->
      <div class="demo-options">
        <div class="demo-options-icon"><i class="ti ti-paint-bucket"></i></div>
        <div class="demo-heading">Theme Settings</div>
        <div class="demo-body">
          <div class="tabular">
            <div class="tabular-row">
              <div class="tabular-cell">Fixed Header</div>
              <div class="tabular-cell demo-switches"><input class="bootstrap-switch" type="checkbox" checked data-size="mini" data-on-color="success" data-off-color="default" name="demo-fixedheader" data-on-text="&nbsp;" data-off-text="&nbsp;"></div>
            </div>
            <div class="tabular-row">
              <div class="tabular-cell">Boxed Layout</div>
              <div class="tabular-cell demo-switches"><input class="bootstrap-switch" type="checkbox" data-size="mini" data-on-color="success" data-off-color="default" name="demo-boxedlayout" data-on-text="&nbsp;" data-off-text="&nbsp;"></div>
            </div>
            <div class="tabular-row">
              <div class="tabular-cell">Collapse Leftbar</div>
              <div class="tabular-cell demo-switches"><input class="bootstrap-switch" type="checkbox" data-size="mini" data-on-color="success" data-off-color="default" name="demo-collapseleftbar" data-on-text="&nbsp;" data-off-text="&nbsp;"></div>
            </div>
          </div>
        </div>
        <div class="demo-body">
          <div class="option-title">Topnav</div>
          <ul id="demo-header-color" class="demo-color-list">
            <li><span class="demo-cyan"></span></li>
            <li><span class="demo-light-blue"></span></li>
            <li><span class="demo-blue"></span></li>
            <li><span class="demo-indigo"></span></li>
            <li><span class="demo-deep-purple"></span></li>
            <li><span class="demo-purple"></span></li>
            <li><span class="demo-pink"></span></li>
            <li><span class="demo-red"></span></li>
            <li><span class="demo-teal"></span></li>
            <li><span class="demo-green"></span></li>
            <li><span class="demo-light-green"></span></li>
            <li><span class="demo-lime"></span></li>
            <li><span class="demo-yellow"></span></li>
            <li><span class="demo-amber"></span></li>
            <li><span class="demo-orange"></span></li>
            <li><span class="demo-deep-orange"></span></li>
            <li><span class="demo-midnightblue"></span></li>
            <li><span class="demo-bluegray"></span></li>
            <li><span class="demo-bluegraylight"></span></li>
            <li><span class="demo-black"></span></li>
            <li><span class="demo-gray"></span></li>
            <li><span class="demo-graylight"></span></li>
            <li><span class="demo-default"></span></li>
            <li><span class="demo-brown"></span></li>
          </ul>
        </div>
        <div class="demo-body">
          <div class="option-title">Sidebar</div>
          <ul id="demo-sidebar-color" class="demo-color-list">
            <li><span class="demo-cyan"></span></li>
            <li><span class="demo-light-blue"></span></li>
            <li><span class="demo-blue"></span></li>
            <li><span class="demo-indigo"></span></li>
            <li><span class="demo-deep-purple"></span></li>
            <li><span class="demo-purple"></span></li>
            <li><span class="demo-pink"></span></li>
            <li><span class="demo-red"></span></li>
            <li><span class="demo-teal"></span></li>
            <li><span class="demo-green"></span></li>
            <li><span class="demo-light-green"></span></li>
            <li><span class="demo-lime"></span></li>
            <li><span class="demo-yellow"></span></li>
            <li><span class="demo-amber"></span></li>
            <li><span class="demo-orange"></span></li>
            <li><span class="demo-deep-orange"></span></li>
            <li><span class="demo-midnightblue"></span></li>
            <li><span class="demo-bluegray"></span></li>
            <li><span class="demo-bluegraylight"></span></li>
            <li><span class="demo-black"></span></li>
            <li><span class="demo-gray"></span></li>
            <li><span class="demo-graylight"></span></li>
            <li><span class="demo-default"></span></li>
            <li><span class="demo-brown"></span></li>
          </ul>
        </div>
      </div>
      <modal visible="chgAcYearModalShow">
        <div>
            <select class="form-control" id="selectedAcYear" ng-model="dashboardData.selectedAcYear">
              <option ng-selected="year.id == '<?php echo $panelInit->selectAcYear;?>'" ng-repeat="year in $root.dashboardData.academicYear" value="@{{year.id}}" ng-if="year.isDefault == '0'">@{{year.yearTitle}}</option>
              <option ng-selected="year.id == '<?php echo $panelInit->selectAcYear;?>'" ng-repeat="year in $root.dashboardData.academicYear" value="@{{year.id}}" ng-if="year.isDefault == '1'">@{{year.yearTitle}} - Default Year</option>
            </select>
            <br/>
            <a class="floatRTL btn btn-success btn-flat pull-right marginBottom15 ng-binding" ng-click="chgAcYear()"><?php echo $panelInit->language['chgYear'];?></a>
            <div class="clearfix"></div>
        </div>
    </modal>
      <!-- /Switcher -->
      <!-- Load site level scripts -->
<!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script> -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/js/jquery-1.10.2.min.js')}}"></script>               <!-- Load jQuery -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/js/jqueryui-1.10.3.min.js')}}"></script>               <!-- Load jQueryUI -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/js/bootstrap.min.js')}}"></script>                 <!-- Load Bootstrap -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/js/enquire.min.js')}}"></script>                   <!-- Load Enquire -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/velocityjs/velocity.min.js')}}"></script>          <!-- Load Velocity for Animated Content -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/velocityjs/velocity.ui.min.js')}}"></script>
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/wijets/wijets.js')}}"></script>                <!-- Wijet -->
  <script src="{{URL::asset('assets/plugins/datepicker/bootstrap-datepicker.js')}}"></script>
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/codeprettifier/prettify.js')}}"></script>        <!-- Code Prettifier  -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/bootstrap-switch/bootstrap-switch.js')}}"></script>    <!-- Swith/Toggle Button -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/bootstrap-tabdrop/js/bootstrap-tabdrop.js')}}"></script>  <!-- Bootstrap Tabdrop -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/iCheck/icheck.min.js')}}"></script>              <!-- iCheck -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/nanoScroller/js/jquery.nanoscroller.min.js')}}"></script> <!-- nano scroller -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/js/application.js')}}"></script>
  <!-- End loading site level scripts -->
  <!-- Load page level scripts-->
  <!-- Charts -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.min.js')}}"></script>              <!-- Flot Main File -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.pie.min.js')}}"></script>             <!-- Flot Pie Chart Plugin -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.stack.min.js')}}"></script>        <!-- Flot Stacked Charts Plugin -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.orderBars.min.js')}}"></script>    <!-- Flot Ordered Bars Plugin-->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.resize.min.js')}}"></script>          <!-- Flot Responsive -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.tooltip.min.js')}}"></script>    <!-- Flot Tooltips -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/charts-flot/jquery.flot.spline.js')}}"></script>         <!-- Flot Curved Lines -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/sparklines/jquery.sparklines.min.js')}}"></script>        <!-- Sparkline -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/jvectormap/jquery-jvectormap-2.0.2.min.js')}}"></script>       <!-- jVectorMap -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/jvectormap/jquery-jvectormap-world-mill-en.js')}}"></script>   <!-- jVectorMap -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/switchery/switchery.js')}}"></script>              <!-- Switchery -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/easypiechart/jquery.easypiechart.js')}}"></script>
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/fullcalendar/moment.min.js')}}"></script>          <!-- Moment.js Dependency -->
  <script type="text/javascript" src="{{URL::asset('assets/new_theme/plugins/fullcalendar/fullcalendar.min.js')}}"></script>        <!-- Calendar Plugin -->
  <!-- <script type="text/javascript" src="{{URL::asset('assets/new_theme/demo/demo-index.js')}}"></script> -->
  <script src="{{URL::asset('assets/js/intlTelInput.min.js')}}"></script>
  <!-- <script src="bower_components/oclazyload/dist/ocLazyLoad.min.js"></script> -->
  <script src="{{URL::asset('assets/plugins/skylo/vendor/scripts/skylo.js')}}"></script>
  <div ng-spinner-loader></div>
  <input type="hidden" id="rooturl" value="{{URL::asset('/')}}"/>
  <input type="hidden" id="utilsScript" value="{{URL::asset('assets/js/utils.js')}}"/>
  <script src="{{URL::asset('assets/js/schoex.js')}}" type="text/javascript"></script>
  <script src="{{URL::asset('assets/js/Angular/angular.min.js')}}" type="text/javascript"></script>
  <script src="{{URL::asset('assets/js/Angular/AngularModules.js')}}" type="text/javascript"></script>
  <script src="{{URL::asset('assets/js/Angular/app.js')}}"></script>
  <script src="{{URL::asset('assets/js/Angular/routes.js')}}" type="text/javascript"></script>             <!-- Initialize scripts for this page-->
  <!-- End loading page level scripts-->
  <!-- Main Footer -->
</body>
</html>