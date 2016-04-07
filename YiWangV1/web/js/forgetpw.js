//找回密码，通过邮件找回和通过手机号找回
//需要输入图形验证码
//如果是手机找回，需要输入手机短信验证码（短信验证码的发送形式是两种，一种是短信告知，另外一种是语音告知）
//输入手机短信验证码，后台验证编码和手机号，然后更改用户最新的密码？

//如果是邮件通知，给用户发送一个找回密码的地址，然后用户点击地址需要录入新的页面输入新的密码。
//20151125 lxw create
//qq/email:7103505@qq.com

var _ = {};

//重置密码
function savepwd() {
    $('li').removeClass('error').find('.tip').html('').fadeOut(200);
    $.post("forgetpw_savepwd", {mobile:_.mobile, mima1: $(".lxw_pwd1").val(),mima2:$(".lxw_pwd2").val() },          function (ret) {
        if (ret.indexOf("ok") != -1) {
            $(".lxw_box").html($(".lxw_div_pwd_ok").html());
        }
        else {
            var data = ret.split('|');
            $('.' + data[0]).parents('li').addClass('error').find('.tip').html(data[1]).fadeIn(200);
        }
    });
}

$(function () {
    $(".lxw_codeimg").on("click", function () {
        $(".lxw_codeimg").attr("src", "login_code_ss?t="+new Date());
    });

    $(".lxw_submit").on("click", function () {
        var code = $(".lxw_code").val();
        var mobile = $(".lxw_user").val();

        var smscode = $(".lxw_smscode").val();
        var type = $(".lxw_sms_div").is(":hidden") ? "email" : "mobile";

        $('li').removeClass('error').find('.tip').html('').fadeOut(200);
        $.post("forgetpw_save", { mobile: mobile, code: code, type: type, smscode: smscode }, function (ret) {
            if (ret.indexOf("oke") != -1) {
                _.email = mobile;//email;
                $(".lxw_box").html($(".lxw_div_email").html());
                $(".lxw_email").html(_.email);
                return;
            }
            if (ret.indexOf("okm") != -1) {
                _.mobile = mobile;
                $(".lxw_box").html($(".lxw_div_pwd").html());
                return;
            }
            var data = ret.split('|');
            $('.' + data[0]).parents('li').addClass('error').find('.tip').html(data[1]).fadeIn(200);
        });
    });

    $(".lxw_user").on("keyup", function () {
        var accout_val = $.trim($(this).val());
        if (emailReg.test(accout_val)) {
            $(".lxw_code_div").show();
            $(".lxw_codeimg").attr("src", "login_code_ss?t=" + new Date());
            $(".lxw_sms_div").hide();
        } else if (mobileReg.test(accout_val)) {
            $(".lxw_code_div").show();
            $(".lxw_codeimg").attr("src", "login_code_ss?t=" + new Date());
            $(".lxw_sms_div").show();
        } else {
            $(".lxw_code_div").hide();
            $(".lxw_sms_div").hide();
        }
    });

    $(".lxw_btn_sms").on("click", function () {
        var code = $(".lxw_code").val();
        var mobile = $(".lxw_user").val();

        $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        $.post("login_mobile_code", { mobile: mobile, code: code, type: 1, key: "forgetpw" }, function (ret) {
            if (ret.indexOf("ok") != -1) {
                if (ret.indexOf("|") != -1) {
                    $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html(ret).fadeIn(200);
                    setTimeout(function () {
                        $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
                    }, 3000);
                }
                //开始60秒倒计时
                _.code_time_sms = 60;
                _.code_status_sms = setInterval(function () {
                    $(".lxw_btn_sms").text(_.code_time_sms + '秒后重新发送');
                    if (_.code_time_sms == 0) {
                        $(".lxw_btn_sms").removeAttr("disabled");
                        clearInterval(_.code_status_sms);
                        $(".lxw_btn_sms").text('重新短信获取');
                        _.code_status_sms = null;
                    }
                    _.code_time_sms--
                }, 1000);
            }
            else {
                $('.lxw_smscode').parents('li').addClass('error').find('.tip').html(ret).fadeIn(200);
                $(".lxw_codeimg").trigger("click");
            }
        });
    });

    $(".lxw_btn_phone").on("click", function () {
        var code = $(".lxw_code").val();
        var mobile = $(".lxw_user").val();

        $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
        $.post("login_mobile_code", { mobile: mobile, code: code, type: 2, key: "forgetpw" }, function (ret) {
            if (ret.indexOf("ok") != -1) {
                if (ret.indexOf("|") != -1) {
                    $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html(ret).fadeIn(200);
                    setTimeout(function () {
                        $('.lxw_smscode').parents('li').removeClass('error').find('.tip').html('').fadeOut(200);
                    }, 3000);
                }
                //开始60秒倒计时
                _.code_time_phone = 60;
                _.code_status_phone = setInterval(function () {
                    $(".lxw_btn_phone").text(_.code_time_phone + '秒后重新发送');
                    if (_.code_time_phone == 0) {
                        $(".lxw_btn_phone").removeAttr("disabled");
                        clearInterval(_.code_status_phone);
                        $(".lxw_btn_phone").text('重新语音获取');
                        _.code_status_phone = null;
                    }
                    _.code_time_phone--
                }, 1000);
            }
            else {
                $('.lxw_smscode').parents('li').addClass('error').find('.tip').html(ret).fadeIn(200);
                $(".lxw_codeimg").trigger("click");
            }
        });
    });


})

/*
code_time = 2;
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
            $('.button_code_img').fadeIn(100);
        } else if (mobileReg.test(accout_val)) {
            $('.button_code_img, .button_code_num').fadeIn(100);
        } else {
            $('.button_code_img, .button_code_num').fadeOut(100);
        }
    });

    $(".button_code button").click(function () {
        if (!code_status) {
            $(".button_code button").text(code_time + '秒后重新发送').attr("disabled", true);
            var time = code_time - 1;
            code_status = setInterval(function () {
                $(".button_code button").text(time + '秒后重新发送');
                if (time == 0) {
                    $(".button_code button").removeAttr("disabled");
                    clearInterval(code_status);
                    $(".button_code button").text('重新获取');
                    code_status = null;
                } else {
                    $(".button_code button").attr("disabled", true);
                }
                time--;
            }, 1000);
        }
    });

    $('.set_next').click(function () {
        $('.button_code_img, button_code_num').removeClass('error');
        $('#account').parents('li').removeClass('error');

        var accout_val = $.trim($("#account").val());
        if (emailReg.test(accout_val)) {
            if ($.trim($(".button_code_img input").val()) == '') {
                $('.button_code_img').addClass('error');
                return;
            }
            //SEND EMAIL
            $('.page_login_box').html($('#reset_email').html());
            $('#reset_email').html("");
        } else if (mobileReg.test(accout_val)) {
            if ($.trim($(".button_code_img input").val()) == '') {
                $('.button_code_img').addClass('error');
                return;
            }
            if ($.trim($(".button_code_num input").val()) == '') {
                $('.button_code_img').addClass('error');
                return;
            }
            //RESET PASSWORD
            $('.page_login_box').html($('#reset_form').html());
            $('#reset_form').html("");
        } else {
            $('#account').parents('li').addClass('error');
        }
    });
});

function RF() {
    $('.new_pw, new_pw2').removeClass('error');
    if ($.trim($(".new_pw").val()) == '') {
        $('.new_pw').parents('li').addClass('error');
        return;
    }
    if ($(".new_pw").val() != $(".new_pw2").val()) {
        $('.new_pw, .new_pw2').parents('li').addClass('error');
        return;
    }
    $('.page_login_box').html($('#reset_ok').html());
}
*/