/* Artist JS, By lcc807@ikoo8.com */

img_data = {};
img_map = {};
img_groups = [];
layout_w_ratio = 1.6;

$(function () {
    setTimeout(function () {
        var images_src = $.trim($('.author .avatar img').attr('data_src'));
        if (images_src) {
            var images_thumb = new Image();
            images_thumb.src = images_src;
            if (images_thumb.complete) {
                avatarSet(images_src, images_thumb.width, images_thumb.height);
                blocksit_fu();
            } else {
                images_thumb.onload = function () {
                    avatarSet(images_src, images_thumb.width, images_thumb.height);
                }
                blocksit_fu();
            }
        } else {
            avatarSet('', 0, 0);
            blocksit_fu();
        }
    }, 1);
    $(window).resize(function () {
        blocksit_fu();
    });

    artistImagesMap();

    $.mCustomScrollbar.defaults.axis = "x";
    $(".artist_center").mCustomScrollbar({
        theme: "inset-dark",
        autodraggerlength: true,
        documentTouchScroll: true,
        advanced: { autoExpandHorizontalScroll: true },
        callbacks: {
            alwaysTriggerOffsets: true,
            onTotalScrollOffset: 500,
            onTotalScroll: function () { },
            onScroll: function () {
                if ($('#mCSB_1_container').position().left < -300) {
                    $('.go_back').fadeIn(100);
                } else {
                    $('.go_back').fadeOut(100);
                }
            }
        }
    });
    $('.go_back').click(function () {
        $('.artist_center').mCustomScrollbar('scrollTo','left');
    });
});

var img_map_style = function (img_w, img_h, d_w, d_h) {
    var img_ratio = img_w / img_h;
    var div_ratio = d_w / d_h;
    var padding = 20;
    if (img_ratio > div_ratio) {
        return 'height:auto;width:' + (d_w - padding) + 'px;margin-top:' + ((d_h - ((d_w - padding) / img_w * img_h)) / 2) + 'px;';
    } else {

        return 'width:auto;height:' + (d_h - padding) + 'px;margin-top:' + ((d_h - (d_h - padding)) / 2) + 'px;';
    }
}
var img_groups_afresh = function (_img_groups, key) {
    var newObj = [], total = 0;
    for (var i = 0; i < _img_groups[key].length; i++) {
        if (_img_groups[key][i]) newObj.push(_img_groups[key][i]);
    }
    return newObj;
}

function blocksit_fu() {
    var win_width = $(window).width();
    var win_height = $(window).height();
    var set_height = win_height - $('header').height();
    set_height = set_height < 500 ? 500 : set_height;
    $(".pro_layout").css({ 'height': set_height, 'overflow': 'hidden' });
    $(".pro_layout .item").css({ 'height': set_height - 55 });

    proLayoutSet();
    avatarSet($('.author .avatar img').attr('data_src'), $('.author .avatar img').attr('data_w'), $('.author .avatar img').attr('data_h'));
    itemSet();
    proLayoutSet();
}
function proLayoutSet() {
    //各个模块的宽
    var pro_layout_width = 0;
    $(".pro_layout .item").each(function (i) {
        pro_layout_width += $(this).outerWidth();
    });
    //滚动内容总宽
    $(".pro_layout").css("width", pro_layout_width + 61 + "px");
}
function avatarSet(src, img_w, img_h) {
    var win_width = $(window).width();
    var synopsis_width = $('.synopsis').outerWidth();

    $('.synopsis').css({
        'width': win_width * 0.4 - 80,
    });
    $('.author .avatar img').css({
        'height': 'auto',
        'width': win_width * 0.6 - 110,
        'opacity': '0',
        'margin-top': ($(".pro_layout .item").height() - ((win_width * 0.6 - 110) / img_w) * img_h) / 2
    }).stop().animate({
        'opacity': '1'
    })
        .attr('src', (src || 'about:blank'))
        .attr('data_w', img_w)
        .attr('data_h', img_h);
    itemSet();
    proLayoutSet();
}
function itemSet() {
    $('.author .avatar').css({
        'width': $('.author .avatar img').outerWidth()
    });
    $('.author .name i').css({ 'width': $('.author .name').outerWidth() });
    $('.achievement').css({ 'max-width':( $(window).width() - 160 ) * 0.4 });
}

function artistImagesMap() {

    $.post("/artistImagesMap", { id: artistid }, function (d) {
        img_data = d;
        var img_groups_order = ['a11', 'a12', 'a13', 'a21', 'a31'];
        for (var i = 0; i < img_groups_order.length; i++) {
            img_groups[img_groups_order[i]] = [];
            img_map[img_groups_order[i]] = 0;
        }
        for (var i = 0; i < img_data.length; i++) {
            if (img_data[i].width / img_data[i].height >= 0.62 * layout_w_ratio && img_data[i].width / img_data[i].height < 1.6 * layout_w_ratio)           {
                img_groups['a11'].push(img_data[i]);
                img_map['a11']++;
            } else if (img_data[i].width / img_data[i].height <= 0.62 * layout_w_ratio && img_data[i].width / img_data[i].height > 0.4 * layout_w_ratio) {
                img_groups['a12'].push(img_data[i]);
                img_map['a12']++;
            } else if (img_data[i].width / img_data[i].height <= 0.4 * layout_w_ratio) {
                img_groups['a13'].push(img_data[i]);
                img_map['a13']++;
            } else if (img_data[i].width / img_data[i].height >= 1.6 * layout_w_ratio && img_data[i].width / img_data[i].height <= 2.5 * layout_w_ratio) {
                img_groups['a21'].push(img_data[i]);
                img_map['a21']++;
            } else if (img_data[i].width / img_data[i].height > 2.5 * layout_w_ratio) {
                img_groups['a31'].push(img_data[i]);
                img_map['a31']++;
            }
        } 
        var equally_height = ($(window).height() - $('header').height() - 15) / 3;
        var equally_width = parseInt(equally_height * layout_w_ratio);
        create9(img_map, img_groups, 'viewport', equally_width, equally_height);

        var timer1 = null;
        var oldheight = $(window).height() - $('header').height();
        var newheight = 0;
        $(window).resize(function () {
            image_map_resize();
        });

        function image_map_resize() {
            if (T.length > 0) {
                var equally_height = ($(window).height() - $('header').height() - 15) / 3;
                var equally_width = parseInt(equally_height * layout_w_ratio);
                reset9(T, img_groups, 'viewport', equally_width, equally_height);
            }
        }
    });
}
//加入购物车
function addcart(ths) {
    var ths = $(ths);

    checkLogin(function () {
        if (ths.hasClass("active")) return;
        ths.addClass("active");
        if (ths.attr("v2") == "1") {
            alert("对不起，此作品已售，请选择其他艺术品！", "提示", 2);
            return;
        }
        var para = { "id": ths.attr("v1"), "count": "1" };
        $.post("/add_buy_cart", { json: JSON.stringify(para) }, function (ret) {
            if (ret.indexOf("ok|") != -1) {
                //加入购物车成功返回，再次添加样式
                alert("添加购物车成功", "提示", 2);
            }
            else {
                ths.removeClass("active");
                alert(ret.split('|')[1]);
            }
        });
    });
}

//点赞
function mylike(ths) {
    var ths = $(ths);
    checkLogin(function () {
        if (ths.hasClass("active"))
            ths.removeClass("active");
        else
            ths.addClass("active");

        var para = { "id": ths.attr("v1"), "leibie": "1" };
        $.post("/shoucang_add", para, function (ret) {

            if (ret.indexOf("ok|") != -1) {
                //点赞成功，应该加一个标红的效果
                //alert("点赞成功");
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
}