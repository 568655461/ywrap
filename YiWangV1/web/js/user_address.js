$(function () {
    $('.insert .title').click(function () {
        $('.insert .form').slideToggle(500);
    });

    $('.s_edit').click(function () {
        $('.insert .form').slideToggle(500);
        var ths = $(this);

        $.getJSON("user_address_edit?ywdizhiid="+ths.attr("v"), function (yonghu) {
            $("input[name='shouhuoren']").val(yonghu.shouhuoren);
            $("select[name='suozaidiqu']").val(yonghu.suozaidiqu);
            $("input[name='xiangxidizhi']").val(yonghu.xiangxidizhi);
            $("input[name='youzhengbianma']").val(yonghu.youzhengbianma);
            $("input[name='shoujihao2']").val(yonghu.shoujihao2);
            $("select[name='shoujihao1']").val(yonghu.shoujihao1);
            $("select[name='dianhuahaoma1']").val(yonghu.dianhuahaoma1);

            $("input[name='dianhuahaoma2']").val(yonghu.dianhuahaoma2);
            $("input[name='dianhuahaoma3']").val(yonghu.dianhuahaoma3);
            $("input[name='dianhuahaoma4']").val(yonghu.dianhuahaoma4);
            //dizhibieming
            if (yonghu.shifoumoren == 1) {
                $("input[name='shifoumoren']").attr("checked", true);
                $("input[name='shifoumoren']").parent().addClass("checked");
            }
            else {
                $("input[name='shifoumoren']").removeAttr("checked");
                $("input[name='shifoumoren']").parent().removeClass("checked");
            }
            
            $("input[name='dizhibieming']").val(yonghu.dizhibieming);
            $("input[name='ywdizhi']").val(yonghu.ywdizhi);

            addressInit('s1', 's2', 's3', yonghu.sheng, yonghu.shi, yonghu.xian);
        });
    });

    //设置默认地址
    $('.s_default').on("click", function () {
        var ths = $(this);
        $.get("user_address_default?ywdizhiid=" + ths.attr("v"), function () {
        });
    });

    $('.s_delete').on("click", function () {
        var ths = $(this);
        $.get("user_address_delete?ywdizhiid=" + ths.attr("v"), function () {
            location.href = "user_address?t="+new Date();
        });
    });

    $('.insert .form .save').click(function () {
        //验证信息，那些是必须填写
        //提交信息
        $("form").ajaxSubmit({
            type: "post",
            url: "user_address_save",
            success: function (ret) {
                if (ret != "ok") {
                    alert(ret);
                    return;
                }

                if ($('#form_type').val() > 0) {
                    swal("修改成功！", "", "success")
                } else {
                    swal("保存成功！", "", "success")
                }
                $('.insert .form').slideUp(500);
                $('.insert .title').text('+ 新增收货地址');

                //重新刷新一下
                location.href = "user_address";
            }
        });
    });

    $('.insert .form .cancel').click(function () {
        $('.insert .title').text('+ 新增收货地址');
        $('.insert .form').slideUp(500);
    });

    $('.address li').hover(function () {
        $(this).find('.controller').fadeIn(200);
    }, function () {
        $(this).find('.controller').fadeOut(200);
    });
    $('.address .controller .s_default').click(function () {
        $('.address li').removeClass('defualt');
        $(this).parents('li').addClass('defualt');
    });
    $('.address .controller .s_edit').click(function () {
        $('.insert .form').slideDown(500);
        $('.insert .title').text('+ 修改收货地址');
        $('#form_type').val('1');
    });
    $('.address .controller .s_del').click(function () {

        var ths = $(this);
        //$messager.defaults = { ok: "shi", cancel: "for" };
        confirm("将要删除" + ths.attr("yhf"), {
            
            confirm: function (data) {
                //if (data) { alert("是"); } else { alert("否"); }
                $.get("user_address_delete?ywdizhiid=" + ths.attr("v"), function (yonghu) {
                    location.href = "user_address?t=" + new Date();
                });

                ths.parents('li').fadeOut(200, function () { ths.remove(); });
            }
        });

      
    });
});