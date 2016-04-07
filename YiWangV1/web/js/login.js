var _ = {};
function accountv() {
    return $("#account").val();
}

function refrash_reg_code() {
    $(".lxw_codeimg_reg").attr("src", "login_code_ss?t=" + new Date());
}
function refrash_login_code() {
    $(".lxw_codeimg_login").attr("src", "login_code_ss?t=" + new Date());
}

$('.li_div input').on("keyup", function () {
    $(this).parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
});

$(function () {
    $(".lxw_codeimg_login,.lxw_codeimg_reg").on("click", function () {
        $(this).attr("src", "login_code_ss?t="+new Date());
    })
 
    //注册
    $(".lxw_submit_reg").on("click", function () {
        $(".lxw_submit_reg").attr("disabled", true);
        //判断是邮件还是手机号？
        var email = emailReg.test(accountv()) ? 1 : 0;
        var mobile = mobileReg.test(accountv()) ? 2 : 0;
        //状态
        var lx = Math.max(email, mobile);

        var pwd = $.trim($(".lxw_pwd_reg").val());
        if (pwd == "") {
            $('.lxw_pwd_reg').parents('li').addClass('error').find('.tip').html('请填写注册密码').css({'display': 'block'});
            $(".lxw_submit_reg").removeAttr("disabled");
            return;
        } else {
            $('.lxw_pwd_reg').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        $('li').removeClass('error').find('.tip').html('').fadeOut(200);
        if (lx > 0) {
            $.post("login_chk_reg", {
                user: accountv(),
                code: $(".lxw_code_value").val(),
                pwd: pwd,
                type:lx
            }, function (ret) {
                if (ret.indexOf("ok") != -1) {
                    //这里可以判断层
                    if (G_CALLBACK) {
                        G_CALLBACK();
                    } else {
                        //跳到首页，登录状态
                        location.href = "/index";
                    }
                } else {
                    var data = ret.split('|');
                    $('.' + data[0]).parents('li').addClass('error').find('.tip').html(data[1]).css({'display': 'block'});
                    $(".lxw_submit_reg").removeAttr("disabled");
                }
            });
        }
    });

    var err_count = 0;
    //登录
    $(".lxw_submit_login").on("click", function () {
        $(".lxw_submit_login").attr("disabled", true);
        //判断是邮件还是手机号？
        var email = emailReg.test(accountv()) ? 1 : 0;
        var mobile = mobileReg.test(accountv()) ? 2 : 0;
        //状态
        var lx = Math.max(email, mobile);

        if (!$(".lxw_li_code_login").is(":hidden")) {
            var code = $(".lxw_code_login").val();
            if (code == "") {
                refrash_login_code();
                $(".lxw_submit_login").removeAttr("disabled");
                $('.lxw_code_login').parents('li').addClass('error').find('.tip').html('请填写验证码').css({'display': 'block'});
                return;
            } else {
                $('.lxw_code_login').parents('li').addClass('error').find('.tip').html('').fadeOut(200);
            }
        }

        var account = $.trim($("#account").val());
        if (account == "") {
            $('#account').parents('li').addClass('error').find('.tip').html('请输入手机或邮箱').css({'display': 'block'});
            $(".lxw_submit_login").removeAttr("disabled");
            return;
        } else {
            $('#account').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        var pwd = $.trim($(".lxw_pwd_login").val());
        if (pwd == "" && !$(".lxw_pwd_login").is(":hidden")) {
            $('.lxw_pwd_login').parents('li').addClass('error').find('.tip').html('请填写登录密码').css({'display': 'block'});
            $(".lxw_submit_login").removeAttr("disabled");
            return;
        } else {
            $('.lxw_pwd_login').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        $('li').removeClass('error').find('.tip').html('').fadeOut(200);
        if (lx > 0) {
            $.post("login_chk_login", {
                user: accountv(),
                code: $(".lxw_code_login").val(),
                pwd: pwd,
                type: lx
            }, function (ret) {
                if (ret.indexOf("ok") != -1) {
                    //这里可以判断层
                    if (G_CALLBACK) {
                        G_CALLBACK();
                    } else {
                        //跳到首页，登录状态
                        location.href = "/index";
                    }                    

                } else {
                    var data = ret.split('|');
                    $('.' + data[0]).parents('li').addClass('error').find('.tip').html(data[1]).css({'display': 'block'});
                    $(".lxw_submit_login").removeAttr("disabled");
                    err_count++;
                    //如果操作三次，就必须输入内容
                    if (err_count >= 3) {
                        $(".lxw_li_code_login").fadeIn(0);
                        refrash_login_code();
                    }
                }
            });
        }
    });

    //短信验证码
    $(".lxw_code_sms").on("click", function () {
        if (_.code_status_sms != null) return;

        var mobile = accountv();
        var code = $(".lxw_code_reg").val();

        if (mobile == "") {
            $('.pure-input-1').parents('li').addClass('error').find('.tip').html('请填写手机号').css({'display': 'block'});
            return;
        } else {
            $('.pure-input-1').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        if (code == "") {
            $('.lxw_code_reg').parents('li').addClass('error').find('.tip').html('请填写验证码').css({'display': 'block'});
            return;
        } else {
            $('.lxw_code_reg').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        $.post("login_mobile_code", { mobile: mobile,code:code,type:1,key:"zhuce" }, function (ret) {
            if (ret.indexOf("ok") != -1) {                   
                if (ret.indexOf("|") != -1) {
                    $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html(ret).css({'display': 'block'});
                    setTimeout(function () {
                        $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
                    }, 3000);
                }
                //开始60秒倒计时
                _.code_time_sms = 60;
                _.code_status_sms = setInterval(function () {
                    $(".lxw_code_sms").text(_.code_time_sms + '秒后重新发送');
                    if (_.code_time_sms == 0) {
                        $(".lxw_code_sms").removeAttr("disabled");
                        clearInterval(_.code_status_sms);
                        $(".lxw_code_sms").text('重新短信获取');
                        _.code_status_sms = null;
                    } 
                    _.code_time_sms--
                }, 1000);
            }
            else {
                $('.lxw_code_value').parents('li').addClass('error').find('.tip').html(ret).css({'display': 'block'});
                refrash_reg_code();
            }
        });
    });


    //语音短信验证码
    $(".lxw_code_phone").on("click", function () {
        if (_.code_status_sms != null) return;

        var mobile = accountv();
        var code = $(".lxw_code_reg").val();

        if (mobile == "") {
            $('.pure-input-1').parents('li').addClass('error').find('.tip').html('请填写手机号').css({'display': 'block'});
            return;
        } else {
            $('.pure-input-1').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        if (code == "") {
            $('.lxw_code_reg').parents('li').addClass('error').find('.tip').html('请填写验证码').css({'display': 'block'});
            return;
        } else {
            $('.lxw_code_reg').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        }

        $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        $.post("login_mobile_code", { mobile: mobile, code: code, type: 2,key:"zhuce" }, function (ret) {
            if (ret.indexOf("ok") != -1) {
                if (ret.indexOf("|") != -1) {
                    $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html(ret).css({'display': 'block'});
                    setTimeout(function () {
                        $('.lxw_code_value').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
                    }, 3000);
                }
                //开始60秒倒计时
                _.code_time_phone = 60;
                _.code_status_sms = setInterval(function () {
                    $(".lxw_code_phone").text(_.code_time_phone + '秒后重新发送');
                    if (_.code_time_phone == 0) {
                        $(".lxw_code_phone").removeAttr("disabled");
                        clearInterval(_.code_status_sms);
                        $(".lxw_code_phone").text('重新语音获取');
                        _.code_status_sms = null;
                    } 
                    _.code_time_phone--
                }, 1000);
            }
            else {
                $('.lxw_code_value').parents('li').addClass('error').find('.tip').html(ret).css({'display': 'block'});
                refrash_reg_code();
            }
        });
    });
});


code_time = 60;
code_status = null;
$(function () {
    $('.page_login').mouseover(function (event) {
        event.stopPropagation();
        $('.page_login_make').stop().fadeOut(200);
    });
    $('.page_login').mouseout(function (event) {
        event.stopPropagation();
        $('.page_login_make').stop().fadeIn(200);
    });
    $('.page_login_box').mouseover(function (event) {
        event.stopPropagation();
        $('.page_login_make').stop().fadeIn(200);
    });

    $("#account").keyup(function () {
        var accout_val = $.trim($(this).val());
        if (emailReg.test(accout_val)) {
            var email = $(this).val();
            $.post("login_chk_email", { email: email }, function (ret) {
                //test
                if (ret == "1") { 
                    OpenLogin(1);
                } else {
                    OpenRegister(1);
                }
            });
        } else if (mobileReg.test(accout_val)) {
            var mobile = $(this).val();
            $.post("login_chk_mobile", { mobile: mobile }, function (ret) {
                //test
                if (ret == "1") { 
                    OpenLogin(1);
                } else {
                    OpenRegister(0);
                }
            });
        } else {
            OpenLogin();
            $('.login_div li').eq(0).fadeOut(0);
        }
    });

    /*
    $(".register_div .button_code button").click(function () {
        if (!code_status) {
            $(".register_div .button_code button").text(code_time + '秒后重新发送').attr("disabled", true);

            //发送验证码
            $.post("login_mobile_code", { mobile: $("#account").val() }, function (ret) {
                if (ret != "")
                    alert(ret);
            });

            var time = code_time - 1;
            code_status = setInterval(function () {
                $(".register_div .button_code button").text(time + '秒后重新发送');
                if (time == 0) {
                    $(".register_div .button_code button").removeAttr("disabled");
                    clearInterval(code_status);
                    $(".register_div .button_code button").text('重新获取');
                    code_status = null;
                } else {
                    $(".register_div .button_code button").attr("disabled", true);
                }
                time--
            }, 1000);
        }

    });
    */

    function OpenLogin(chk) {
        //refrash_login_code();
        $('.register_div').fadeOut(0, function () {
            chk ? $('.login_div .button button').text('登录') : $('.login_div .button button').text($('.login_div .button button').attr('ref'));
            chk ? $('.login_third').css({ 'bottom': '-85px' }) : $('.login_third').css({ 'bottom': '0' });
            $('.login_div').fadeIn(0);
            $('.login_div li').eq(0).fadeIn(0);
        });
    }

    
    function OpenRegister(chk) {
        //refrash_reg_code();
        $('.login_third').css({ 'bottom': '-85px' });
        chk ? $('.button_code').fadeOut(0) : $('.login_third').fadeIn(0);
        $('.login_div').fadeOut(0, function () {
            $('.register_div').fadeIn(0);
        });

        chk ? $(".lxw_li_code_reg").fadeOut(0) : $(".lxw_li_code_reg").fadeIn(0);
        !chk ? refrash_reg_code() : 0;
    }

});
