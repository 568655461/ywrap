//找回密码，通过邮件找回并重置
//20151125 lxw create
//qq/email:7103505@qq.com

var _ = {};

//重置密码
function savepwd() {
    $('li').removeClass('error').find('.tip').html('').fadeOut(200);
    $.post("forgetpwemail_savepwd", {mima1: $(".lxw_pwd1").val(),mima2:$(".lxw_pwd2").val() },          function (ret) {
        if (ret.indexOf("ok") != -1) {
            $(".lxw_box").html($(".lxw_div_pwd_ok").html());
        }
        else {
            var data = ret.split('|');
            $('.' + data[0]).parents('li').addClass('error').find('.tip').html(data[1]).fadeIn(200);
        }
    });
}