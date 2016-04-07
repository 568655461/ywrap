/* Common JS, By lcc807@ikoo8.com */

Window_Alert_Time = null;
window.alert = function (text, title, time, callback) {
    text = jQuery.trim(text) ? text : "";
    var speed = 200;
    var Window_Alert = $("#Window_Alert");
    var Window_Alert_Html = $("#Window_Alert_Html");
    if (!document.getElementById("Window_Alert")) {
        $(document.body).append('<div id="Window_Alert" style="display:none;background-color: #000;background-position:center;background-repeat: no-repeat; width: 100%;height: 100%; left:0;top:0;filter:alpha(opacity=30);opacity:0.3;z-index:1000;position:fixed !important;"></div>');
    }
    if (!document.getElementById("Window_Alert_Html")) {
        $(document.body).append('<div id="Window_Alert_Html" style="display:none;background-color:#FFF;z-index:1001;left:50%;top:50%;position:fixed !important;overflow: hidden;">' +
            '<div style="background:#f7f7f7;padding:10px 15px;" class="Window_Alert_Top clearfix">' +
            '<div class="f_l Window_Alert_Title" style="color:#333;font-size:16px;">' + (title ? title : '提示') + '</div>' +
            '<div class="f_r"><a href="javascript:void(0);" id="Window_Alert_Close" style="width:16px;height:16px;display:block;"><img src="/svg_file?path=/web/images/icon_guanbi.svg&rgb=9,9,9" style="width:100%;height:100%;"/></a></div>' +
            '</div>' +
            '<div style="font-size:14px;padding:20px 15px;position:relative;text-align:center;vertical-align:middle;display: table-cell;" id="Window_Alert_Middle" class="clearfix">' +
            '</div>' +
            //'<div style="text-align:center;color:#CCC;font-size:14px;padding:10px;" class="Window_Alert_Bottom clearfix">' +
            //'<a href="javascript:void(0);" id="Window_Alert_Close" style="background:#F33;width:100px; height:30px; margin:0 auto;line-height:30px; text-align:center; color:#FFF; font-size:16px;display:block; border-radius:5px;text-decoration:none;">确认</a>' +
            //'</div>' +
            '</div>');
    }
    var Window_Alert = $("#Window_Alert");
    var Window_Alert_Html = $("#Window_Alert_Html");
    var Window_Alert_Middle = $("#Window_Alert_Middle");
    var Window_Alert_Close = $("#Window_Alert_Close");
    Window_Alert_Middle.html(text);
    if (Window_Alert_Html.width() < 300) {
        Window_Alert_Html.css("width", 300);
    }
    Window_Alert_Html.css({
        "box-shadow": "#999 0px 0px 10px", "border": "4px solid #000",
        "left": $(window).width() / 2 - Window_Alert_Html.outerWidth() / 2,
        "top": $(window).height() / 2 - Window_Alert_Html.outerHeight() / 2
    });
    Window_Alert.fadeIn(speed, function () {
        Window_Alert_Html.fadeIn(speed);
    });
    Window_Alert_Close.bind('click', closeAlert);
    $(window).bind('resize', moveAlert);
    function moveAlert() {
        Window_Alert_Html.stop(true).animate({
            top: $(window).height() / 2 - Window_Alert_Html.outerHeight() / 2,
            left: $(window).width() / 2 - Window_Alert_Html.outerWidth() / 2
        }, speed);
    }
    function closeAlert() {
        Window_Alert_Html.fadeOut(speed, function () {
            Window_Alert.fadeOut(speed, function () {
                if (typeof (callback) == 'function')
                    callback.call(this);
            });
        }).remove();
    }
    if (!Window_Alert_Time) {
        clearTimeout(Window_Alert_Time);
    }
    if (time > 0) {
        Window_Alert_Time = setTimeout(function () {
            closeAlert();
            clearTimeout(Window_Alert_Time);
        }, time * 1000);
    }
};

Window_Confirm_Time = null;
Window_Confirm_Options = {};
window.confirm = function (text, options) {
    text = jQuery.trim(text) ? text : "";
    defaults = {
        title: '确认',
        content: text,
        isHtml: 0,
        autoClose: 0,
        confirmButton: '确认',
        cancelButton: '取消',
        confirmButtonBackground: '#F33',
        cancelButtonBackground: '#BBB',
        confirm: function () { },
        confirmClose: true,
        cancel: function () { }
    };
    Window_Confirm_Options = $.extend({}, defaults, options);
    var speed = 200;
    var Window_Confirm = $("#Window_Confirm");
    var Window_Confirm_Html = $("#Window_Confirm_Html");
    if (!document.getElementById("Window_Confirm")) {
        $(document.body).append('<div id="Window_Confirm" style="display:none;background-color: #000;background-position:center;background-repeat: no-repeat; width: 100%;height: 100%; left:0;top:0;filter:alpha(opacity=30);opacity:0.3;z-index:998;position:fixed !important;"></div>');
    }
    if (document.getElementById("Window_Confirm_Html")) {
        Window_Confirm_Html.remove();
    }
    if (!document.getElementById("Window_Confirm_Html")) {
        $(document.body).append('<div id="Window_Confirm_Html" style="display:none;background-color:#FFF;z-index:999;left:50%;top:50%;position:fixed !important;overflow: hidden;">' +
            '<div style="background:#f7f7f7;padding:10px 15px;" class="Window_Confirm_Top clearfix">' +
            '<div class="f_l Window_Confirm_Title" style="color:#333;font-size:16px;">' + Window_Confirm_Options.title + '</div>' +
            '<div class="f_r"></div>' +
            '</div>' +
            '<div style="font-size:14px;padding:' + (Window_Confirm_Options.isHtml ? '0' : '20px') + ' 15px;position:relative;text-align:left;vertical-align:middle;display: table-cell;" id="Window_Confirm_Middle" class="clearfix">' +
            '</div>' +
            '<div style="text-align:center;color:#CCC;font-size:14px;padding:10px;" class="Window_Confirm_Bottom clearfix">' +
            '<a href="javascript:void(0);" id="Window_Confirm_Ok" style="background:' + Window_Confirm_Options.confirmButtonBackground + ';height:30px; padding:0 20px;margin:0 10px;line-height:30px; text-align:center; color:#FFF; font-size:16px;display:inline-block; text-decoration:none;">' + Window_Confirm_Options.confirmButton + '</a>' +
            '<a href="javascript:void(0);" id="Window_Confirm_Close" style="background:' + Window_Confirm_Options.cancelButtonBackground + ';height:30px; padding:0 20px;margin:0 10px;line-height:30px; text-align:center; color:#FFF; font-size:16px;display:inline-block; text-decoration:none;">' + Window_Confirm_Options.cancelButton + '</a>' +
            '</div>' +
            '</div>');
    }
    var Window_Confirm = $("#Window_Confirm");
    var Window_Confirm_Html = $("#Window_Confirm_Html");
    var Window_Confirm_Middle = $("#Window_Confirm_Middle");
    var Window_Confirm_Ok = $("#Window_Confirm_Ok");
    var Window_Confirm_Close = $("#Window_Confirm_Close");
    Window_Confirm_Middle.html(Window_Confirm_Options.content);
    if (Window_Confirm_Html.width() < 300) {
        Window_Confirm_Html.css("width", 300);
    }
    Window_Confirm_Html.css({
        "box-shadow": "#999 0px 0px 10px", "border": "4px solid #000",
        "left": $(window).width() / 2 - Window_Confirm_Html.outerWidth() / 2,
        "top": $(window).height() / 2 - Window_Confirm_Html.outerHeight() / 2
    });
    Window_Confirm.fadeIn(speed, function () {
        Window_Confirm_Html.fadeIn(speed);
    });
    Window_Confirm_Close.bind('click', closeConfirm);
    Window_Confirm_Ok.bind('click', okConfirm);
    $(window).bind('resize', moveConfirm);
    function moveConfirm() {
        Window_Confirm_Html.stop(true).animate({
            top: $(window).height() / 2 - Window_Confirm_Html.outerHeight() / 2,
            left: $(window).width() / 2 - Window_Confirm_Html.outerWidth() / 2
        }, speed);
    }
    function closeConfirm() {
        Window_Confirm_Html.fadeOut(speed, function () {
            Window_Confirm.fadeOut(speed, function () {
                if (typeof (Window_Confirm_Options.cancel) == 'function')
                    Window_Confirm_Options.cancel.call(this);
            });
        }).remove();
    }
    function okConfirm() {
        if (Window_Confirm_Options.confirmClose) {
            Window_Confirm_Html.fadeOut(speed, function () {
                Window_Confirm.fadeOut(speed, function () {
                    if (typeof (Window_Confirm_Options.confirm) == 'function')
                        Window_Confirm_Options.confirm.call(this);
                });
            });
        } else {
            if (typeof (Window_Confirm_Options.confirm) == 'function')
                Window_Confirm_Options.confirm.call(this);
        }
    }
    if (!Window_Confirm_Time) {
        clearTimeout(Window_Confirm_Time);
    }
    if (Window_Confirm_Options.autoClose > 0) {
        Window_Confirm_Time = setTimeout(function () {
            closeConfirm();
            clearTimeout(Window_Confirm_Time);
        }, Window_Confirm_Options.autoClose * 1000);
    }
};
window.confirmClose = function () {
    var speed = 200;
    var Window_Confirm = $("#Window_Confirm");
    var Window_Confirm_Html = $("#Window_Confirm_Html");
    if (Window_Confirm.length > 0 && Window_Confirm_Html.length > 0) {
        Window_Confirm_Html.fadeOut(speed, function () {
            Window_Confirm.fadeOut(speed);
        });
    } else if (Window_Confirm_Html.length > 0 ) {
        Window_Confirm_Html.fadeOut(speed);
    } else if (Window_Confirm.length > 0) {
        Window_Confirm.fadeOut(speed);
    }
}

    function Window_Close() {
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
                window.opener = null;
                window.close();
            } else {
                window.open('about:blank', '_top');
                window.top.close();
            }
        } else if (navigator.userAgent.indexOf("Firefox") > 0) {
            window.location.href = 'about:blank';
            window.close();
        } else {
            window.open("/", '_self').close();
        }
        return;
    }

    //自定义JS 脚本 

    mobileReg = /^1\d{10}$/;
    emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    $(function () {
        Init();
        $(window).resize(function () { Init(); });
        function Init() {
            //var bodyHeight = $("body").height(), windowHeight = $(window).height();
            //var footer_div = $('footer');
            //var footer_div_height = footer_div.outerHeight();
            //if ((windowHeight - bodyHeight - footer_div_height < footer_div_height) || (bodyHeight > windowHeight)) {
            //    console.log('FA: ' + bodyHeight + ' - ' + windowHeight + ' - ' + footer_div_height);
            //    footer_div.css({
            //        "position": "static",
            //        "bottom": "0",
            //    });
            //} else {
            //    console.log('OK: ' + bodyHeight + ' - ' + windowHeight + ' - ' + footer_div_height);
            //    footer_div.css({
            //        "position": "fixed",
            //        "bottom": "0",
            //    });
            //}
        }

        //Plus 
        $('input[type="checkbox"]').iCheck({
            checkboxClass: 'icheckbox_minimal-orange',
            radioClass: 'iradio_minimal',
            increaseArea: '20%'
        });
    
        $('input[cs=1]').iCheck("disable");

        //Body
        $('body').click(function (event) {
            event.stopPropagation();
            if (!$('.header_search_input').is(":focus")) {
                $('.header_search_input').stop().animate({
                    'width': '0'
                }, 'normal', 'swing', function () {
                    $(this).css({
                        'border-bottom': '0'
                    })
                });
            }
            if (!$('header .nav_ico').is(":hidden")) {
                $('header .nav').slideUp();
            }
        });

        $(window).on("scroll", function () {
            if ($(document).scrollTop() > 200) {
                $('.scroll_top').fadeIn(200);
            } else {
                $('.scroll_top').fadeOut(200);
            }
        })
        $(".scroll_top").click(function () {
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });

        //Header
        $('header .nav a').hover(function () {
            $(this).stop().animate({ 'opacity': '0.5' });
        }, function () {
            $(this).not('.active').stop().animate({ 'opacity': '1' });
        });
        $('.login_next').hover(function () {
            $(this).find('.login_hover').stop().slideDown();
        }, function () {
            $(this).find('.login_hover').stop().slideUp();
        });
        $('header .search a').click(function (event) {
            event.stopPropagation();
            if ($('.header_search_input').width() > 0 ) {
                $('.header_search_input').stop().css({
                    'border-bottom': '1px solid #424944'
                }).animate({
                    'width': '0'
                });
            } else{
                $('.header_search_input').stop().css({
                    'border-bottom': '1px solid #424944'
                }).animate({
                    'width': '200px'
                });
            }
        });
        $('.header_search_input').focus(function () {
            $(this).keydown(function (e) {
                if (e.keyCode == 13) {
                    var keyword = $(this).val();
                    //处理搜索
                    //alert(keyword);
                    var url = "/search?keys=" + escape(keyword);
                    location.href = url;
                }
            });
        });
        $('header .nav_ico a').click(function (event) {
            event.stopPropagation();
            $('header .nav').slideToggle();
        });
        $(window).resize(function () {
            if ($(window).width() >= 900) {
                $('header .nav').fadeIn(100);
            } else {
                $('header .nav').fadeOut(0);
            }
        });
    
    });

    function Body_Load() {
        $("#body_load") ? eval($("#body_load").html()) : "";
        $('section .nav_title') && $('section .nav_title') ? $('header .nav_title').html($('section .nav_title').html()) : '';
    }

    function allowNumeric(obj) {
        obj.value = obj.value.replace(/[^0-9]/g, '');
    }

    function loginAlert() {
        var html = $('#loginTemplate').html();
        alert(html, '登录', 0, '');
    }

    var G_CALLBACK = null;
    function checkLogin(str)
    {
        $.getJSON("/ckuser", function (json) {
            if (json.success)
            {
                if ($.isFunction(str))
                {
                    str();
                } else {
                    if (str) location.href = str;
                }
            } 
            else {
                var html = $('#loginTemplate').html();

                G_CALLBACK = function () {
                    if ($.isFunction(str)) {
                        str();
                    } else {
                        if (str)
                            location.href = str;
                    }
                };
                alert(html, '登录', 0,'');
            }
        });
    }