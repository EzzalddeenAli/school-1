
// Variables
// ------------------------------
var headerHeight = 56;

// ------------------------------
// Browser Detection Plugin
// https://github.com/gabceb/jquery-browser-plugin/
// ------------------------------
!function(a,b){"use strict";var c,d;if(a.uaMatch=function(a){a=a.toLowerCase();var b=/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(iphone)/.exec(a)||/(android)/.exec(a)||/(windows phone)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/i.exec(a)||[];return{browser:b[3]||b[1]||"",version:b[2]||"0",platform:c[0]||""}},c=a.uaMatch(b.navigator.userAgent),d={},c.browser&&(d[c.browser]=!0,d.version=c.version,d.versionNumber=parseInt(c.version)),c.platform&&(d[c.platform]=!0),(d.android||d.ipad||d.iphone||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv){var e="msie";c.browser=e,d[e]=!0}if(d.opr){var f="opera";c.browser=f,d[f]=!0}if(d.safari&&d.android){var g="android";c.browser=g,d[g]=!0}d.name=c.browser,d.platform=c.platform,a.browser=d}(jQuery,window);


// ------------------------------
// =UTILITY BELT
// Psst: Search for '=u' to come straight here. You're welcome.
// ------------------------------
var Utility = {
    str_replace: function(c, d, b) {
        var a = c.split(d);
        return a.join(b);
    },
    str_exists: function(b, c) {
        var a = b.split(c);
        if (a[0] === b) {
            return false;
        } else {
            return true;
        }
    },
    toggle_fullscreen: function(elem) {
        // can fullscreen any element
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    },
    getViewPort: function() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        };
    },
    getSidebarViewportHeight: function () {
        var h;
        h = $(window).height() - headerHeight;
        return h;
    },
    sidebar_resizing: function() {
        if ($('#topnav').hasClass('navbar-fixed-top')) {
            $('.static-sidebar').css('top', headerHeight + 'px');
        } else {
            var scr = $('body').scrollTop();

            $('.static-sidebar').css('top', '0px');


            if (scr < headerHeight) {
                $('.static-sidebar').css('top',(headerHeight - scr) + 'px');
            } else {
                $('.static-sidebar').css('top','0px');
            }
        }

        Utility.initScroller();
    },
    getBrandColor: function (name) {
        // Store Brand colors in JS so it can be called from plugins
        var brandColors = {
            'default':      '#fafafa',
            'gray':         '#9e9e9e',

            'inverse':      '#757575',
            'primary':      '#03a9f4',
            'success':      '#8bc34a',
            'warning':      '#ffc107',
            'danger':       '#e51c23',
            'info':         '#00bcd4',
            
            'brown':        '#795548',
            'indigo':       '#3f51b5',
            'orange':       '#ff9800',
            'midnightblue': '#37474f',
            'teal':         '#009688',
            'pink':         '#e91e63',
            'purple':       '#9c27b0',
            'green':        '#4caf50',
            'deeppurple':   '#673ab7',
            'deeporange':   '#ff5722',
            'lime':         '#cddc39',
            'lime':         '#2196f3'
        };

        if (brandColors[name]) {
            return brandColors[name];
        } else {
            return brandColors['default'];
        }
    },
    toggle_leftbar: function() {
        var menuCollapsed = localStorage.getItem('collapsed_menu');
        
        $('body').toggleClass('sidebar-collapsed');

        if (menuCollapsed == "true")
            localStorage.setItem('collapsed_menu', "false");
        else if (menuCollapsed == "false")
            localStorage.setItem('collapsed_menu', "true");
        
        setTimeout(function(){                  // wait 500ms before calling resize
            $(window).trigger('resize');        // so toggle happens faster instead of
        }, 500);                                // sticking out
    },
    initScroller: function() {
        $(".scroll-pane").nanoScroller({ paneClass: 'scroll-track',  sliderClass: 'scroll-thumb', contentClass: 'scroll-content' });
    },
    destroyScroller: function(elem) {
        $(elem).nanoScroller({ destroy: true });
    },
    animateContent: function () {
        if ($.fn.velocity) {
            $('.animated-content .info-tile, .animated-content .panel')
            .css('visibility', 'visible')
            .velocity('transition.slideUpIn', {stagger: 50});
        }
    }
};
// ------------------------------
// =/U
// ------------------------------


// ------------------------------
// =PLUGINS. custom made shizzle, yo!
// ------------------------------
(function($) {


    // ------------------------------
    // ScrollSidebar
    // ------------------------------
    $.scrollSidebar = function(element, options) {
        var defaults = {};
        var plugin = this;

        plugin.settings = {};
        var $element = $(element),
        element = element;

    }
    $.fn.scrollSidebar = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('scrollSidebar')) {
                var plugin = new $.scrollSidebar(this, options);
                $(this).data('scrollSidebar', plugin);
            };
        });
    };


    // ------------------------------
    // Sidebar Accordion Menu
    // ------------------------------
    $.sidebarAccordion = function(element, options) {
        var defaults = {};
        var plugin = this;

        plugin.settings = {};
        var $element = $(element),
        element = element;

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);

            var menuCollapsed = localStorage.getItem('collapsed_menu');
            if (menuCollapsed === null) {
                localStorage.setItem('collapsed_menu', "false");
            }
            if (menuCollapsed === "true") {
                $('body').addClass('sidebar-collapsed');
            }

            $('body').on('click', 'ul.acc-menu a', function() {
                var LIs = $(this).closest('ul.acc-menu').children('li');
                $(this).closest('li').addClass('clicked');
                $.each( LIs, function(i) {
                    if( $(LIs[i]).hasClass('clicked') ) {
                        $(LIs[i]).removeClass('clicked');
                        return true;
                    }
                    $(LIs[i]).find('ul.acc-menu:visible').slideToggle({duration: 100});
                    $(LIs[i]).removeClass('open');
                });

                if (!$('body').hasClass('sidebar-collapsed') || $(this).parents('ul.acc-menu').length > 1) {
                    if($(this).siblings('ul.acc-menu:visible').length>0)
                        $(this).closest('li').removeClass('open');
                    else
                        $(this).closest('li').addClass('open');
                    $(this).siblings('ul.acc-menu').slideToggle({duration: 100});
                }
            });

            var targetAnchor;
            $.each ($('ul.acc-menu a'), function() {
                if( this.href == window.location ) {
                    targetAnchor = this;
                    return false;
                };
            });

            var parent = $(targetAnchor).closest('li');
            while(true) {
                parent.addClass('active');
                parent.closest('ul.acc-menu').show().closest('li').addClass('open');
                parent = $(parent).parents('li').eq(0);
                if( $(parent).parents('ul.acc-menu').length <= 0 ) break;
            };

            var liHasUlChild = $('li').filter(function(){
                return $(this).find('ul.acc-menu').length;
            });
            $(liHasUlChild).addClass('hasChild');

        };
        plugin.init();
    }
    $.fn.sidebarAccordion = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('sidebarAccordion')) {
                var plugin = new $.sidebarAccordion(this, options);
                $(this).data('sidebarAccordion', plugin);
            }
        });
    }

})(jQuery);
// ------------------------------
// =/P
// ------------------------------


// ------------------------------
// =DOM Ready
// ------------------------------
$(document).ready(function () {

    enquire.register("screen and (max-width: 767px)", {
        match : function() {
            //small
            if (!($('body').hasClass('sidebar-scroll'))) { //if not already added
                $('.static-sidebar').addClass('scroll-pane');
                $('.static-sidebar > .sidebar').addClass('scroll-content');
            }
        },  
        unmatch : function() {
            //big
            if (!($('body').hasClass('sidebar-scroll'))) { //if not already added
                console.log('here');
                $('.static-sidebar').removeClass('scroll-pane has-scrollbar');
                $('.static-sidebar > .sidebar').removeClass('scroll-content');
                $('.static-sidebar > .sidebar').css('margin-right','');
                $('.static-sidebar > .sidebar').css('right','');
                $('.static-sidebar.scroll-pane').nanoScroller({ stop: true });
            }
        }
    });

    // Add These To support nanoScroller
    if ($('body').hasClass('sidebar-scroll')) {
        $('.static-sidebar').addClass('scroll-pane');
        $('.sidebar').addClass('scroll-content');
    }


    // Scrollbar and reinitting scrollbars
    Utility.initScroller();
    $('.toolbar').on('shown.bs.dropdown', function () {Utility.initScroller();});
    $('.widget').on('shown.bs.collapse', function () {Utility.initScroller();});
    $('.widget').on('hidden.bs.collapse', function () {Utility.initScroller();});



    Utility.sidebar_resizing();

    // ------------------------------
    // Sidebar Accordion
    // ------------------------------
    $('body').sidebarAccordion();


    // ------------------------------
    // Toggling Sidebars
    // ------------------------------
    $('#trigger-sidebar>a').click(function () {
        Utility.toggle_leftbar();
    });

    $('#trigger-fullscreen').click(function () {
        Utility.toggle_fullscreen(document.documentElement);
    });

    // ------------------------------
    // Megamenu
    // This code will prevent unexpected menu close 
    // when using some components (like accordion, forms, etc)
    // ------------------------------
    $('body').on('click', '.yamm .dropdown-menu, .dropdown-menu-form', function(e) {
      e.stopPropagation()
  })
    
    // -------------------------------
    // For tabs inside dropdowns
    // -------------------------------
    $('.dropdown-menu a[data-toggle="tab"]').click(function (e) {
        e.stopPropagation();
        $(this).tab('show');
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        $(this).closest('.dropdown').removeClass('active');        
    });

    // -------------------------------
    // Small screen
    // -------------------------------
    //enquire.register("screen and (min-width: 768px)", {
    //    match : function() {
    //        $('.static-sidebar').css('transform','');
    //    }
    //});

    // -------------------------------
    // Back to Top button
    // -------------------------------
    $('#back-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    // -------------------------------
    // Panel Collapses
    // -------------------------------
    $('a.panel-collapse').click(function() {
        $(this).children().toggleClass("fa-chevron-down fa-chevron-up");
        $(this).closest(".panel-heading").next().slideToggle({duration: 200});
        $(this).closest(".panel-heading").toggleClass('rounded-bottom');
        return false;
    });

    // -------------------------------
    // Quick Start
    // -------------------------------
    $('#headerbardropdown').click(function() {
        $('#headerbar').css('top',0);
        return false;
    });

    $('#headerbardropdown').click(function(event) {
      $('html').one('click',function() {
        $('#headerbar').css('top','-1000px');
    });

      event.stopPropagation();
  });


    // -------------------------------
    // FireFox Shim
    // FireFox is the *only* browser that doesn't support position:relative for
    // block elements with display set to table-cell, which is needed for the footer.
    // TODO: Replace $.browser with Modernizer.
    // -------------------------------
    if ($.browser.mozilla) {
        $('footer').css('width',$('footer').parent().width());

        $(window).on('resize', function() {
            $('footer').css('width',$('footer').parent().width());
        });
    }

    // ---------------------------------
    // Faux Off-cavas effect on collapse
    // ---------------------------------
    enquire.register("screen and (max-width: 767px)", {
        match : function() {  //smallscreen
            $('body').addClass('sidebar-collapsed');

            // if ($('body').hasClass('sidebar-collapsed')) {
                setWidthtoContent();
            // }
            $(window).on('resize', setWidthtoContent);
        },
        unmatch : function() {  //bigscreen
            $('body').removeClass('sidebar-collapsed');

            $('.static-content').css('width','');
            $(window).off('resize', setWidthtoContent);
        }
    });

    function setWidthtoContent() {
        var w = $('#wrapper').innerWidth();
        $('.static-content').css('width',(w)+'px');
    }

    // -------------------------------
    // Search on Top
    // -------------------------------
    $('#trigger-toolbar-search').click( function() {
        $("#toolbar-search").toggleClass('active');
        $("#toolbar-search input.form-control").focus();
        $("header#topnav > .toolbar").toggle();
    });

    $('#toolbar-search .input-group-btn:last-child button').click( function() {
        $("#toolbar-search").toggleClass('active');
        $("header#topnav > .toolbar").toggle();
    });

    enquire.register("screen and (max-width: 767px)", {
        unmatch : function() {  //bigscreen
            $("#toolbar-search").removeClass('active');
            $("header#topnav > .toolbar").show();
        }
    });


});
// ------------------------------
// =/D No more D for you.
// ------------------------------


// ------------------------------
// DOM Loaded
// ------------------------------
$(window).bind("load", function() { 
    Utility.animateContent();
    $('body').scrollSidebar();
    $(window).trigger('resize');
});


$(window).scroll(function(){
    Utility.sidebar_resizing();
});

$(window).resize(function(){
    Utility.sidebar_resizing();
});

$.wijets.registerAction( {
    handle: "colorpicker",
    html: '<div class="dropdown"><span class="button-icon has-bg dropdown-toggle" data-toggle="dropdown"><i class="ti ti-palette"></i></span>'+
    '<ul class="panel-color-list dropdown-menu arrow" role="menu">'+
    '<li><span data-style="panel-info"></span></li>'+
    '<li><span data-style="panel-primary"></span></li>'+
    '<li><span data-style="panel-blue"></span></li>'+
    '<li><span data-style="panel-indigo"></span></li>'+
    '<li><span data-style="panel-deeppurple"></span></li>'+
    '<li><span data-style="panel-purple"></span></li>'+
    '<li><span data-style="panel-pink"></span></li>'+
    '<li><span data-style="panel-danger"></span></li>'+
    '<li><span data-style="panel-teal"></span></li>'+
    '<li><span data-style="panel-green"></span></li>'+
    '<li><span data-style="panel-success"></span></li>'+
    '<li><span data-style="panel-lime"></span></li>'+
    '<li><span data-style="panel-yellow"></span></li>'+
    '<li><span data-style="panel-warning"></span></li>'+
    '<li><span data-style="panel-orange"></span></li>'+
    '<li><span data-style="panel-deeporange"></span></li>'+
    '<li><span data-style="panel-midnightblue"></span></li>'+
    '<li><span data-style="panel-bluegray"></span></li>'+
    '<li><span data-style="panel-bluegraylight"></span></li>'+
    '<li><span data-style="panel-black"></span></li>'+
    '<li><span data-style="panel-gray"></span></li>'+
    '<li><span data-style="panel-default"></span></li>'+
    '<li><span data-style="panel-white"></span></li>'+
    '<li><span data-style="panel-brown"></span></li>'+
    '</ul></div>',
    onClick: function () {
    },
    onInit: function () {
        var headerStyle = $(this).getWidgetState('headerStyle');
        if (headerStyle) {
            var widget = $(this).closest('[data-widget]');
            widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
            .addClass(headerStyle);
        }
        var button = $(this);
        $(this).find('.dropdown-menu').bind('click', function (e) {
            e.stopPropagation();
        });
        $(this).find('li span').bind('click', function (e) {
            var widget = button.closest('[data-widget]');
            widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
            .addClass($(this).attr('data-style'));
            $(button).setWidgetState('headerStyle', $(this).attr('data-style'));
            e.stopPropagation();
        });
    }
});

$.wijets.registerAction( {
  handle: "refresh-demo",
  html: '<span class="button-icon"><i class="ti ti-reload"></i></span>',
  onClick: function () {
      var params = $(this).data('actionParameters');
      var widget = $(this).closest('[data-widget]');
      widget.append('<div class="panel-loading"><div class="panel-loader-' + params.type + '"></div></div>');
      setTimeout( function () {
          widget.find('.panel-loading').remove();
      }, 2000);
  }
});
$(function() {

    $.wijets.make();    // Make yo Widjit - see docs for more details.
    prettyPrint();      //Apply Code Prettifier
    $(".bootstrap-switch").bootstrapSwitch(); // Bootstrap Switches


    // Bootstrap JS
    $('.popovers').popover({container: 'body', trigger: 'hover', placement: 'top'}); //bootstrap's popover
    $('.tooltips').tooltip(); //bootstrap's tooltip

    //Tabdrop
    jQuery.expr[':'].noparents = function(a,i,m){
        return jQuery(a).parents(m[3]).length < 1;
    }; // Only apply .tabdrop() whose parents are not (.tab-right or tab-left)
    $('.nav-tabs').filter(':noparents(.tab-right, .tab-left)').tabdrop();

    // Custom Checkboxes
    $('.icheck input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });

    //Demo Background Pattern
    $(".demo-blocks").click(function(){
        $('.layout-boxed').css('background',$(this).css('background'));
        return false;
    });

    
});
$(function() {

    var sidebarColors = "sidebar-default sidebar-bluegraylight sidebar-yellow sidebar-light-blue sidebar-black sidebar-graylight sidebar-gray sidebar-bluegray sidebar-cyan sidebar-red sidebar-orange sidebar-lime sidebar-deep-orange sidebar-light-green sidebar-green sidebar-pink sidebar-deep-purple sidebar-amber sidebar-brown sidebar-midnightblue sidebar-blue sidebar-teal sidebar-purple sidebar-indigo navbar-default navbar-graylight navbar-bluegray navbar-midnightblue navbar-bluegraylight navbar-amber navbar-deep-purple navbar-light-blue navbar-black navbar-brown navbar-orange navbar-pink navbar-lime navbar-red navbar-deep-orange navbar-yellow navbar-blue navbar-teal navbar-light-green navbar-purple navbar-gray navbar-green navbar-indigo navbar-cyan";
    var headerColors = "navbar-default navbar-gray navbar-black navbar-bluegray navbar-midnightblue navbar-green navbar-orange navbar-pink navbar-blue navbar-deep-orange navbar-lime navbar-yellow navbar-light-blue navbar-light-green navbar-deep-purple navbar-graylight navbar-brown navbar-amber navbar-teal navbar-red navbar-purple navbar-bluegraylight navbar-indigo navbar-cyan";
    var fixHeader = "";
    var boxLayout = "";
    var collapseNav = "";
    var topnavColor = "";
    var sidebarColor = "";
    //Show Switcher
    $(".demo-options-icon").click(function () {
        $('.demo-options').toggleClass("active");
    });

    //Switch: Fixed Header
    $('input[name="demo-fixedheader"]').on('switchChange.bootstrapSwitch', function(event, state) {
        $('#topnav').toggleClass("navbar-fixed-top navbar-static-top");
        fixHeader = $('#topnav').attr('class');
        if ($('#topnav').hasClass('navbar-fixed-top')) {
            Submit_data('changeFixHeader',"navbar-fixed-top");
        }else{
            Submit_data('changeFixHeader',"navbar-static-top");
        }
    });

    //Switch: Boxed Layout
    $('input[name="demo-boxedlayout"]').on('switchChange.bootstrapSwitch', function(event, state) {
            //change to layout-boxed
            $('body').toggleClass('layout-boxed');
            //switcher option changes
            $('#demo-boxes').toggleClass('hide');
            boxLayout = $('body').hasClass('layout-boxed')?"layout-boxed":"";
            Submit_data('changeBoxLayout',boxLayout);

            //remove bodybg when closed
            $('body:not(.layout-boxed)').css('background','');
        });

    //Switch: Leftbar
    $('input[name="demo-collapseleftbar"]').on('switchChange.bootstrapSwitch', function(event, state) {
        Utility.toggle_leftbar();
        collapseNav = $('body').hasClass('sidebar-collapsed')?"sidebar-collapsed":"";
        Submit_data('changeCollapseNav',collapseNav);
    });


    //Switch Horizicons
    $('input[name="demo-horizicons"]').on('switchChange.bootstrapSwitch', function(event, state) {
                //if ($('#horizontal-navbar').hasClass('large-icons-nav')) {
                    $('#horizontal-navbar').toggleClass('large-icons-nav');
                //}
            });

    //Detect Changes in main file


    function leftmenu_switchchange() {
        if ($('body').hasClass('sidebar-collapsed')) {
            $('input[name="demo-collapseleftbar"]').bootstrapSwitch('state', true, true);
            collapseNav = "sidebar-collapsed";
            Submit_data('changeCollapseNav',collapseNav);
        } else {
            collapseNav = "";
            Submit_data('changeCollapseNav',collapseNav);
            $('input[name="demo-collapseleftbar"]').bootstrapSwitch('state', false, true);
        }
    }

    function boxedlayout_switchchange() {
        if ($('body').hasClass('layout-boxed')) {
            $('input[name="demo-boxedlayout"]').bootstrapSwitch('state', true, true);
            $('#demo-boxes').removeClass('hide');
        } else {
            $('input[name="demo-boxedlayout"]').bootstrapSwitch('state', false, true);
        }

        if ($('#layout-fixed').hasClass('ui-layout-container')) {
            $('input[name="demo-boxedlayout"]').bootstrapSwitch('disabled', true);
            $('input[name="demo-fixedheader"]').bootstrapSwitch('disabled', true);

                //hacky but works - switches on the leftbar
                $('input[name="demo-collapseleftbar"]').bootstrapSwitch('state', true, true);               
            }

        }


        function horizlayout_switchchange() {
            if ($('body').hasClass('horizontal-nav')) {
                $('#demo-horizicon').removeClass('hide');
                $('#demo-colleft').addClass('hide');

                if ($('#horizontal-navbar').hasClass('large-icons-nav')) {
                    $('input[name="demo-horizicons"]').bootstrapSwitch('state',false, true)
                } else {
                    $('input[name="demo-horizicons"]').bootstrapSwitch('state',true, true)
                }
            }
        }

        function fixedheader_switchchange() {
            if (($('.full-height-content'))==true) {
                $('input[name="demo-fixedheader"]').bootstrapSwitch('disabled', true)
            }
        }

        $('#trigger-sidebar>a').click(function () {
            leftmenu_switchchange();
        });

        $(document).ready(function () {
            leftmenu_switchchange();
            boxedlayout_switchchange();
            horizlayout_switchchange();
            fixedheader_switchchange();
            //TODO: Check in Fixed Sidebar Mode

            var navColor = localStorage.getItem('navbar-color');
            if (navColor) {
                $('#topnav').removeClass(headerColors).addClass(navColor);
            }

            var sideColor = localStorage.getItem('sidebar-color');
            if (sideColor) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-' + sideColor);
                $('#headernav').removeClass(sidebarColors).addClass('navbar-' + sideColor);
            }

        });






        //Header Navbar Styles
        $('#demo-header-color span').click(function() {
            if ($(this).hasClass("demo-default")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-default');
                localStorage.setItem('navbar-color','navbar-default');
            }

            if ($(this).hasClass("demo-bluegray")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-bluegray');
                localStorage.setItem('navbar-color', 'navbar-bluegray');
            }

            if ($(this).hasClass("demo-bluegraylight")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-bluegraylight');
                localStorage.setItem('navbar-color', 'navbar-bluegraylight');
            }

            if ($(this).hasClass("demo-yellow")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-yellow');
                localStorage.setItem('navbar-color', 'navbar-yellow');
            }

            if ($(this).hasClass("demo-black")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-black');
                localStorage.setItem('navbar-color', 'navbar-black');
            }

            if ($(this).hasClass("demo-light-blue")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-light-blue');
                localStorage.setItem('navbar-color', 'navbar-light-blue');
            }

            if ($(this).hasClass("demo-gray")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-gray');
                localStorage.setItem('navbar-color', 'navbar-gray');
            }

            if ($(this).hasClass("demo-graylight")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-graylight');
                localStorage.setItem('navbar-color', 'navbar-graylight');
            }

            if ($(this).hasClass("demo-midnightblue")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-midnightblue');
                localStorage.setItem('navbar-color', 'navbar-midnightblue');
            }

            if ($(this).hasClass("demo-orange")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-orange');
                localStorage.setItem('navbar-color', 'navbar-orange');
            }

            if ($(this).hasClass("demo-blue")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-blue');
                localStorage.setItem('navbar-color', 'navbar-blue');
            }

            if ($(this).hasClass("demo-teal")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-teal');
                localStorage.setItem('navbar-color', 'navbar-teal');
            }

            if ($(this).hasClass("demo-purple")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-purple');
                localStorage.setItem('navbar-color', 'navbar-purple');
            }

            if ($(this).hasClass("demo-indigo")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-indigo');
                localStorage.setItem('navbar-color', 'navbar-indigo');
            }

            if ($(this).hasClass("demo-cyan")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-cyan');
                localStorage.setItem('navbar-color', 'navbar-cyan');
            }

            if ($(this).hasClass("demo-red")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-red');
                localStorage.setItem('navbar-color', 'navbar-red');
            }

            if ($(this).hasClass("demo-pink")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-pink');
                localStorage.setItem('navbar-color', 'navbar-pink');
            }

            if ($(this).hasClass("demo-deep-purple")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-deep-purple');
                localStorage.setItem('navbar-color', 'navbar-deep-purple');
            }

            if ($(this).hasClass("demo-brown")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-brown');
                localStorage.setItem('navbar-color', 'navbar-brown');
            }

            if ($(this).hasClass("demo-green")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-green');
                localStorage.setItem('navbar-color', 'navbar-green');
            }

            if ($(this).hasClass("demo-light-green")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-light-green');
                localStorage.setItem('navbar-color', 'navbar-light-green');
            }

            if ($(this).hasClass("demo-deep-orange")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-deep-orange');
                localStorage.setItem('navbar-color', 'navbar-deep-orange');
            }

            if ($(this).hasClass("demo-lime")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-lime');
                localStorage.setItem('navbar-color', 'navbar-lime');
            }

            if ($(this).hasClass("demo-amber")) {
                $('#topnav').removeClass(headerColors).addClass('navbar-amber');
                localStorage.setItem('navbar-color', 'navbar-amber');
            }
            topnavColor = $(this).attr('class');
            Submit_data("changeTopNavColor",topnavColor);
        });

        //Sidebar Navbar Styles
        $('#demo-sidebar-color span').click(function() {


            if ($(this).hasClass("demo-default")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-default');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-default');

                localStorage.setItem('sidebar-color',"default");
            }

            if ($(this).hasClass("demo-bluegray")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-bluegray');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-bluegray');

                localStorage.setItem('sidebar-color',"bluegray");
            }

            if ($(this).hasClass("demo-bluegraylight")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-bluegraylight');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-bluegraylight');

                localStorage.setItem('sidebar-color',"bluegraylight");
            }

            if ($(this).hasClass("demo-yellow")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-yellow');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-yellow');

                localStorage.setItem('sidebar-color',"yellow");
            }

            if ($(this).hasClass("demo-light-blue")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-light-blue');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-light-blue');

                localStorage.setItem('sidebar-color',"light-blue");
            }

            if ($(this).hasClass("demo-black")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-black');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-black');

                localStorage.setItem('sidebar-color',"black");
            }

            if ($(this).hasClass("demo-gray")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-gray');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-gray');

                localStorage.setItem('sidebar-color',"gray");
            }

            if ($(this).hasClass("demo-graylight")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-graylight');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-graylight');

                localStorage.setItem('sidebar-color',"graylight");
            }

            if ($(this).hasClass("demo-midnightblue")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-midnightblue');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-midnightblue');

                localStorage.setItem('sidebar-color',"midnightblue");
            }

            if ($(this).hasClass("demo-orange")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-orange');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-orange');

                localStorage.setItem('sidebar-color',"orange");
            }

            if ($(this).hasClass("demo-blue")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-blue');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-blue');

                localStorage.setItem('sidebar-color',"blue");
            }

            if ($(this).hasClass("demo-teal")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-teal');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-teal');

                localStorage.setItem('sidebar-color',"teal");
            }

            if ($(this).hasClass("demo-purple")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-purple');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-purple');

                localStorage.setItem('sidebar-color',"purple");
            }

            if ($(this).hasClass("demo-indigo")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-indigo');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-indigo');

                localStorage.setItem('sidebar-color',"indigo");
            }

            if ($(this).hasClass("demo-cyan")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-cyan');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-cyan');

                localStorage.setItem('sidebar-color',"cyan");
            }

            if ($(this).hasClass("demo-red")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-red');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-red');

                localStorage.setItem('sidebar-color',"red");
            }

            if ($(this).hasClass("demo-pink")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-pink');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-pink');

                localStorage.setItem('sidebar-color',"pink");
            }

            if ($(this).hasClass("demo-deep-purple")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-deep-purple');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-deep-purple');

                localStorage.setItem('sidebar-color',"deep-purple");
            }

            if ($(this).hasClass("demo-brown")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-brown');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-brown');

                localStorage.setItem('sidebar-color',"brown");
            }

            if ($(this).hasClass("demo-green")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-green');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-green');

                localStorage.setItem('sidebar-color',"green");
            }

            if ($(this).hasClass("demo-light-green")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-light-green');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-light-green');

                localStorage.setItem('sidebar-color',"light-green");
            }

            if ($(this).hasClass("demo-deep-orange")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-deep-orange');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-deep-orange');

                localStorage.setItem('sidebar-color',"deep-orange");
            }

            if ($(this).hasClass("demo-lime")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-lime');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-lime');

                localStorage.setItem('sidebar-color',"lime");
            }

            if ($(this).hasClass("demo-amber")) {
                $('.static-sidebar-wrapper, .fixed-sidebar-wrapper').removeClass(sidebarColors).addClass('sidebar-amber');
                $('#wrapper>nav.navbar').removeClass(sidebarColors).addClass('navbar-amber');

                localStorage.setItem('sidebar-color',"amber");
            }
            sidebarColor = $(this).attr('class');
            Submit_data('changeSidebarColor',sidebarColor);
        });

        //Boxed Backgrounds
        $('#demo-boxed-bg span').click(function() {
            $('body.layout-boxed').css('background', $(this).css('background'));
            // Submit_data();
        });

        //Fixed Header

        $('#demo-fixedheader').click(function () {
            $('body>header.navbar').toggleClass('navbar-fixed-top navbar-static-top')
            // Submit_data();
        })

        //Reset to default style
        $('.demo-reset').click(function () {
            if (!($('header.navbar').hasClass('navbar-bluegray'))) {
                $('header.navbar').addClass('navbar-bluegray');
                // Submit_data();
            }

        });
        function Submit_data(method,input) {
            $.ajax({
                url: baseUrl+"/ThemeController/"+method,
                type: 'POST',
                dataType: 'json',
                data: {
                    userInput:input,
                },
            });
        }

    });
jQuery(document).ready(function($) {
    var key = "e59ced75fdec9c8e46f8fbc5874ddb3f";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=e59ced75fdec9c8e46f8fbc5874ddb3f";
        setTimeout(function() {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
    })
    .always(function(res) {
        console.log(res);
        var tempF = res.main.temp;
        var tempC = (res.main.temp-32)*5556;
            $('.weather-temp').html(tempF+"F");
            $('.weather-location').text(res.name);
            $('.weather-desc').text(res.weather[0].main);
    });
        }, 1000);
//     {"coord":
//     {"lon":-0.13,"lat":51.51},
//     "weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04d"}],
//     "base":"cmc stations",
//     "main":{"temp":294.54,"pressure":1014,"humidity":64,"temp_min":293.15,"temp_max":296.48},
//     "wind":{"speed":8.2,"deg":210},"clouds":{"all":75},
//     "dt":1473437202,
//     "sys":{"type":1,"id":5091,"message":0.0102,"country":"GB","sunrise":1473398847,"sunset":1473445586},
//     "id":2643743,
//     "name":"London",
//     "cod":200
// }
});