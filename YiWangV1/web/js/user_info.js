                                 
//上传图像本地拖动裁切，最终上传为裁切的图片
//2015-11-9 lxw
var W,H,X,Y;
var BL = 1;
var BL_STEP = 0.1;
var image_target;
var container;
var startmousepoint = null;
function startMoving(e) {
    e.preventDefault();
    e.stopPropagation();
    var touches = e.originalEvent.touches;
    startmousepoint =
        [(e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft(),
            (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop()];

    $(document).on('mousemove touchmove', moving);
    $(document).on('mouseup touchend', endMoving);
}

function moving(e) {
    e.preventDefault();
    e.stopPropagation();

    if (startmousepoint == null) return;
    var mouse = {}, touches;                                        

    touches = e.originalEvent.touches;

    mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
    mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();

    X += -(mouse.x - startmousepoint[0]);
    Y += -(mouse.y - startmousepoint[1]);

    var width = $('.overlay').width();
    var height = $('.overlay').height();

    if (X < -width || Y < -height) {
        X = Math.max(0, X);
        Y = Math.max(0, Y);
        cropImage();
    }

    
    if (X > W - width || Y > H - height) {
        X = Math.min(W - width, X);
        Y = Math.min(H - height, Y);
        cropImage();
    }

    cropImage();
    startmousepoint = [mouse.x,mouse.y];
};

function endMoving(e) {
    e.preventDefault();
    startmousepoint = null;
    $(document).off('mouseup touchend', endMoving);
    $(document).off('mousemove touchmove', moving);
};
                                    
function cropImage() {
    var crop_canvas,
     left = X,
     top = Y,
     width = $('.overlay').width(),
     height = $('.overlay').height();

    crop_canvas = document.createElement('canvas');
    crop_canvas.width = width;
    crop_canvas.height = height;

    var tmp = document.createElement('canvas');
    tmp.width = W;
    tmp.height = H;
    var con = tmp.getContext('2d');
    con.drawImage(image_target, 0, 0, image_target.width, image_target.height, 0, 0, tmp.width, tmp.height);

    crop_canvas.getContext('2d').drawImage(tmp, left, top, width, height, 0, 0, width, height);
    container.attr("src", crop_canvas.toDataURL("image/png"));
}

function FangDa() {
    BL += BL_STEP;
    W = image_target.width * BL;
    H = image_target.height * BL;
    cropImage();
}
function SuoXiao() {
    var width = $('.overlay').width();
    var height = $('.overlay').height();

    BL -= BL_STEP;
    W = image_target.width * BL;
    H = image_target.height * BL;

    if (image_target.width > W && W < width) {
        W = width;
        BL += BL_STEP;
        return;
    }
    if (image_target.height > H && H < height) {
        H = height;
        BL += BL_STEP;
        return;
    }

    cropImage();
}

$(function () {
    container = $(".thumb_o");
    container.on('mousedown touchstart', startMoving);
    $(".btnCropB").on('mousedown touchstart', FangDa);
    $(".btnCropS").on('mousedown touchstart', SuoXiao);

    $("input[type='file']").change(function (event) {
        var img_file = event.target.files[0];
        if (!img_file) return false;

        if (!(/^image\/.*$/.test(img_file.type))) {
            alert('请选择图片文件');
            return false;
        }
        var fReader = new FileReader();
        fReader.readAsDataURL(img_file);
        fReader.onload = function (e) {
            image_target = new Image();
            image_target.src = e.target.result;
            image_target.onload = function () {
                X = Y = 0;
                W = this.width;
                H = this.height;
                cropImage();

                //选择的大图片信息
                $(".lxw_userimagebig").val(e.target.result);

                $('.btnCrop').fadeIn(100);
            };
        };
    });
});


//--------------------start----------------------------
var _ = {};
function DayNumOfMonth(Year,Month)
{
    var day = new Date(Year, Month, 0);
    return day.getDate();
}

function repwd() {
    $('.password_modify').fadeOut(0);
    $('.password_default').fadeIn(0);
    $('input[type="password"]').val('');
}
function rephone() {
    $('.mobile_modify').fadeIn(0);
    $('.mobile_default').fadeOut(0);

        
}

function modifyemail() {
    $('.email_modify').fadeIn(0);
    $('.email_defualt').fadeOut(0);

    $(".lxw_email_send").attr("disabled", false);
    $(".lxw_email_value").attr("disabled", false);
    $(".lxw_email_value").val("");

    $('.lxw_email_send').hide();

    $(".lxw_cancel").show();
}
$(function () {
    $(".lxw_riqi").change(function () {
        var days = DayNumOfMonth(parseInt($(".lxw_n").val()), parseInt( $(".lxw_y").val()));

        $(".lxw_r").empty();
        for(i=1;i<=days;i++) $(".lxw_r").append($("<option>").val(i).text(i));
    });
    //保存密码
    $(".lxw_pwd_save").on("click", function () {
        for(i=1;i<=3;i++)
            eval('var pwd'+i+' = $(".lxw_pwd"+i).val();');
        $.post("user_info_pwd", { pwd1: pwd1, pwd2: pwd2, pwd3: pwd3 }, function (ret) {
            if (ret == "ok") {
                alert("修改密码成功!");
                repwd();
            } else {
                alert(ret);
            }
        });
    });

    //获取验证码
    $(".lxw_getcode").on("click", function () {
        $(this).attr("disabled",true);
        var mobile = $(".lxw_mobile").val();
        var code = $(".lxw_code").val();
            
        $.post("user_info_sendcode", { mobile: mobile, code: code}, function (ret) {
            if (ret.indexOf("ok") != -1) {
                if (ret.indexOf("|") != -1) {
                    alert(ret);
                }
                alert("已经发送验证码!");
                //timer打开
                _.code_time_sms = 60;
                _.code_status_sms = setInterval(function () {
                    $(".lxw_getcode").text(_.code_time_sms + '秒后重新发送');
                    if (_.code_time_sms == 0) {
                        $(".lxw_getcode").attr("disabled", false);
                        clearInterval(_.code_status_sms);
                        $(".lxw_getcode").text('重新短信获取');
                        _.code_status_sms = null;
                        $(this).attr("disabled", false);
                    }
                    _.code_time_sms--
                }, 1000);

            } else {
                alert(ret);
                $(this).attr("disabled", false);
            }
        });
    });

    //保存信息
    $(".lxw_all_save").on("click", function () {
        $(".lxw_userimage").val($(".thumb_o").attr("src"));
           
        var error_num = 0;
        $('.base_info .form input[type="text"]').each(function () {
            if ($.trim($(this).val()) == '') {
                //$(this).parents('.input_div').addClass('border_div_error');
                //error_num = 1;
            } else {
                //$(this).parents('.input_div').removeClass('border_div_error');
            }
        });
        if (error_num > 0) {
            $('.controller_tip').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
            return false;
        }

        $("form").ajaxSubmit({
            type: "post",
            url: "user_info",
            success: function (result) {
                alert(result);
            }
        });

        return false;
            
    });


    //获取验证码
    $(".lxw_mobile_save").on("click", function () {
        $(this).attr("disabled", true);
        var mobile = $(".lxw_mobile").val();
        var code = $(".lxw_code").val();

        $.post("user_info_mobile_save", { mobile: mobile, code: code }, function (ret) {
            if (ret == "ok") {
                $(this).attr("disabled", false);
                $('.mobile_modify').fadeOut(0);
                $('.mobile_default').fadeIn(0);

                $(".lxw_phone").html("+86 *** **** " + mobile.substring(7,4));
            } else {
                alert(ret);
                $(this).attr("disabled", false);
            }
        });
    });

    $(".lxw_email_value").keyup(function () {
        var email = $(this).val();
        if (emailReg.test(email)) $(".lxw_email_send").show();
        else $(".lxw_email_send").hide();

        $(".lxw_email_send").html("未认证发送认证邮件");
    });

    //点击取消，把最近的一次邮件申请设置为取消，用户再点击其实已经过期
    $(".lxw_cancel").click(function () {
        var email = $(".lxw_email_value").val();
        $.post("user_info_email_cancel", { email: email }, function (r) {
                
        });

        $('.email_modify').fadeOut(0), $('.email_defualt').fadeIn(0), _.code_email_chk && clearInterval(_.code_email_chk);

    });

    $(".lxw_email_send").click(function () {
        $(this).attr("disabled", true);
        $(".lxw_email_value").attr("disabled", true);
        var email = $(".lxw_email_value").val();

        $.post("user_info_email_send", { email: email }, function (ret) {
            if (ret == "ok") {
                $(".lxw_email_send").text('验证邮件已发送');
                $(".lxw_cancel").show();

                //开启一个timer
                _.code_email_chk = setInterval(function () {
                    $.post("user_info_email_chk",{email:email},function (r) {
                        if (r == "1") {
                            clearInterval(_.code_email_chk);

                            $('.email_modify').fadeOut(0);
                            $('.email_defualt').fadeIn(0);

                            //修改里面的内容
                            $('.lxw_email').html(email);
                            $('.lxw_email_status').html("已认证");
                        }
                    });
                }, 1500);
                    
            } else {
                alert(ret);
                $(this).attr("disabled", false);
                $(".lxw_email_value").attr("disabled", false);
            }
        });
            
    });
});
//--------------------end------------------------------
code_time = 60;
code_status = null;

$(function () {
    //$(".code_get").click(function () {
    //    if (!code_status) {
    //        $(".code_get").text(code_time + '秒后重新发送').attr("disabled", true);
    //        var time = code_time;
    //        code_status = setInterval(function () {
    //            $(".code_get").text((time--) + '秒后重新发送');
    //            if (time == 0) {
    //                $(".code_get").attr("disabled", false);
    //                clearInterval(code_status);
    //            } else {
    //                $(".code_get").attr("disabled", true);
    //            }
    //        }, 1000);
    //    }
    //});

    //$(".email_code_get").click(function () {
    //    $(this).text('验证邮件已发送');
    //});

    $(".avatar_file").click(function () {
        $("#avatar_file").click();
    });

    //$("#avatar_file").change(function () {
    //    var objUrl = getObjectURL(this.files[0]);





    //    //console.log("objUrl = " + objUrl);
    //    if (objUrl) {
    //        //$(".thumb_o").attr("src", objUrl);
    //    }
    //});

    $(".controller .save").click(function () {
            
    });
});

function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}