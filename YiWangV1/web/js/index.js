/* Index JS, By lcc807@ikoo8.com */

$(function () {
    $('footer').remove();

    headerSet();
    $(window).resize(function () {
        headerSet();
    });
    function headerSet() {
        if ($(window).width() <= 900) {
            $('header').removeClass('transparent');
        } else {
            $('header').addClass('transparent');
            $('.hero_pop').fadeOut(200);
        }
    }

    //Hero 
    $('.searchbar-pop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        $('.hero_pop').css({
            'height': ($('.hero_pop').outerHeight() > $(window).height() - 64 ? $('.hero_pop').outerHeight() : $(window).height() - 64)
        }).fadeIn(200);
    });
    $('.hero_pop .searchbar-back').click(function () {
        $('.hero_pop').fadeOut(200);
    });

    //首页分类切换
    $("#categorytitle li").click(function () {
        var $all = $("#categorytitle li");
        $all.removeClass("active");
        var $li = $(this);
        $li.addClass("active");
        var cname = $li.attr("categoryname");
        var data = { categoryname: cname };
        $.ajax({
            type: 'POST',
            url: '/GetCategoryTopn',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data && data.length > 0) {
                    var html = template("t_category_content", { list: data });
                    $(".category_topn .ysp_panel").html(html);
                }
            },
        });
    });
    $("#categorytitle li:eq(0)").click();

    //首页查询
    $(".lxw_search").click(function () {
        var form = $(this).parents("form");
        var empty = true;

        $("select[v!='']", $(this).parent()).each(function () {
            var key = $(this).attr("v");
            var v = $(this).val();

            var input = $("." + key, form);
            if (input.length == 0) {
                input = $("<input type=hidden class='" + key + "' name='" + key + "' />");
                form.append(input);
            }

            input.val(v);
            if (v) {
                input.val(v);
                empty = false;
            }

        });

        if (empty) {
            //alert("请输入检索条件!");
            //return false;
        }
        form.attr("action", "buy");
        form.attr("method", "post");
        form[0].submit();
        return true;
    });


    //加入购物车
    $(".mxl_cart").click(function () {
        var ths = $(this);

        checkLogin(function () {
            if ($(".buy_div .status").text() == "已售") {
                alert("对不起，此作品已售，请选择其他艺术品！");
                return;
            }

            if ($(".mxl_button .mxl_cart").text() == "已在购物车")
                return;

            var para = { "id": ths.parent().attr("v"), "count": "1" };
            $.post("/add_buy_cart", { json: JSON.stringify(para) }, function (ret) {

                if (ret.indexOf("ok|") != -1) {
                    alert('已添加至购物车', '提示', 2);

                    if (!ths.hasClass("active"))
                        ths.addClass("active");
                    //location.href = "/buy_cart";
                }
                else {
                    alert(ret.split('|')[1]);
                }
            });
        });
    });

    //点赞
    $(".mxl_like").click(function () {
        var ths = $(this);

        checkLogin(function () {
            if (ths.hasClass("active"))
                ths.removeClass("active");
            else
                ths.addClass("active");

            var para = { "id": ths.parent().attr("v"), "leibie": "1" };
            $.post("/shoucang_add", para, function (ret) {

                if (ret.indexOf("ok|") != -1) {
                    //应该加一个标红的效果
                    //alert("操作成功");
                }
                else {
                    if (ths.hasClass("active"))
                        ths.removeClass("active");
                    else
                        ths.addClass("active");
                    alert(ret.split('|')[1]);
                }
            });

        });
    });

});