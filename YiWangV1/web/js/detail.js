/* Detail JS, By lcc807@ikoo8.com */
_ = {};
_.page = 1;
_.pagesize = 5;

$(function () {

    /** Init **/
    var win_width = $(window).width();
    var win_height = $(window).height();
    setTimeout(function () {
        gallerySet();
        roll_img_Set();

        //remove resize controller
        loadCommet(0);
        loadMoreProject();
    }, 100);
    $(window).resize(function () {
        win_width = $(window).width();
        win_height = $(window).height();
        //win_width = win_width < 1200 ? 1200 : win_width;

        gallerySet();
        roll_img_Set();
        mp_Set();

        if (!$('.preview_container').is(":hidden")) {
            Gallery_Resize();
            PREVIEW_DROP.full(2);
        }
    });

    /** Window Scroll Controller **/
    $(window).on("scroll", function () {
        if ($(document).scrollTop() >= $('#price_float_address').offset().top - 100) {
            $('.price_float').stop().fadeIn(200);
        } else {
            $('.price_float').stop().fadeOut(200);
        }
    })

    /** Gallery Controller **/
    var img_ratio = 0.5,
        detail_width = 390,
        detail_height = 550,
        detail_padding = 70,
        detail_small = false,
        detail_small2 = false,
        golden_section = 0.618;
    $('.gallery .pictures img').click(function () {
        Gallery_Init();
        $(document).on("mousemove", "#pictures_big", function (event, delta) {
            var time = new Date().getTime();
            $('#pictures_big').attr('data_timer', time);
        });

        $(".preview_container").each(function () {
            PREVIEW_DROP.view($(this), [200, 200], [100, 100], 0.2);//,[200,200],[30,30]
        });
    });
    function gallerySet() {
        var galleryHeight = win_height - $('header').height();
        //galleryHeight = galleryHeight < 700 ? 700 : galleryHeight;
        //$('body').css({'min-width': 1200});
        $('.gallery').css({ 'height': galleryHeight, 'width': '100%' });
        $('.gallery .pictures').css({ 'height': galleryHeight - galleryHeight * 0.14, 'width': win_width }).addClass('loading');

        var images_src = $('.gallery .pictures img').attr('_src');
        var images_thumb = new Image();
        images_thumb.src = images_src;
        if (images_thumb.complete) {
            imgSet(images_src, images_thumb.width, images_thumb.height, win_width, $('.gallery .pictures').height());
        } else {
            images_thumb.onload = function () {
                imgSet(images_src, images_thumb.width, images_thumb.height, win_width, $('.gallery .pictures').height());
            }
        }
    }

    function imgSet(img, img_w, img_h, div_w, div_h) {
        var s_w = 0, s_h = 0;
        s_h = div_h * img_ratio;
        s_w = s_h * img_w / img_h;
        if (img_w < div_w && img_h < div_h) {
            s_w = img_w;
            s_h = img_h
        }

        $('.gallery .pictures img')
            .attr('data_width', img_w)
            .attr('data_height', img_h)
            .attr('data_divW', div_w)
            .attr('data_divH', div_h)
            .attr('data_sW', s_w)
            .attr('data_sH', s_h)
        ;

        $('.gallery .pictures img').css({
            'width': s_w,
            'height': s_h,
            'position': 'absolute',
            'top': $('.gallery .pictures').height() / 2 - s_h / 2,
            'left': $('.gallery .pictures').width() / 2 - s_w / 2
        }).attr('src', img);
        $('.gallery .pictures').removeClass('loading');

        detailSet();
    }

    $('.gallery .detailBox .btn_info, .gallery .detailBox .detail').hover(function () {
        var _left = 0;
        if ($('.gallery .pictures').width() - ($('.gallery .pictures img').position().left + $('.gallery .pictures img').width()) < detail_width + detail_padding * 2) {
            _left = $('.gallery .pictures').width() - detail_width - ($('.gallery .pictures').width() - $('.gallery .detailBox .btn_a').width() - $('.gallery .detailBox .btn_a').position().left);
        } else {
            console.log($('.gallery .detailBox .btn_info').width());
            _left = $('.gallery .detailBox .btn_a').position().left - detail_width / 2 + $('.gallery .detailBox .btn_info').outerWidth() / 2;
        }
        $('.gallery .detailBox .detail').stop().animate({
            'opacity': 1,
            height: detail_height,
            width: detail_width,
            left: _left,
            top: $('.gallery .detailBox').height() / 2 - detail_height / 2
        }, 400, 'swing', function () {
            detailHover();
        });
    }, function () {
        $('.gallery .detailBox .detail').stop().animate({
            'opacity': 0,
            height: 43,
            width: 47,
            'top': $('.gallery .detailBox .btn_info').offset().top - $('.gallery .detailBox .btn_info').height(),
            'left': $('.gallery .detailBox .btn_info').offset().left
        }, 400, 'swing', function () {
            detailHover();
        });
    });
    function detailSet() {
        $('.gallery .detailBox').css({ 'height': $('.gallery .pictures').height(), 'width': $('.gallery .pictures').width() }).show();
        var btn_a_w = 0;
        detail_small = false,
        detail_small2 = false;
        if ($('.gallery .pictures').width() - ($('.gallery .pictures img').position().left + $('.gallery .pictures img').width()) < detail_width + detail_padding * 2) {
            btn_a_w = 51;
            btn_a_l = ($('.gallery .pictures').width() - ($('.gallery .pictures img').position().left + $('.gallery .pictures img').width())) * golden_section + $('.gallery .pictures img').position().left + $('.gallery .pictures img').width();
            detail_small = true;
            if ($('.gallery .pictures').width() - btn_a_l - btn_a_w < detail_padding) {
                btn_a_l = $('.gallery .pictures').width() - (btn_a_w + detail_padding * 2) / 2;
                detail_small2 = true;
            }
        } else {
            btn_a_w = detail_width;
            btn_a_l = $('.gallery .pictures img').position().left + $('.gallery .pictures img').width() + (detail_width + detail_padding * 2) / 2;
        }
        $('.gallery .detailBox .btn_a').css({
            'top': $('.gallery .detailBox').height() / 2 - $('.gallery .detailBox .btn_a').outerHeight() / 2,
            'width': btn_a_w + 'px',
            'left': btn_a_l
        });
        $('.gallery .detailBox .detail').css({ 'opacity': 0, 'width': 47, 'height': 43, 'top': $('.gallery .detailBox .btn_info').offset().top - $('.gallery .detailBox .btn_info').height(), 'left': $('.gallery .detailBox .btn_info').offset().left, 'display': 'block' });
        if (detail_small2) {
            var s_w = 0, s_h = 0;
            s_h = parseFloat($('.gallery .pictures img').attr('data_sH'));
            s_w = parseFloat($('.gallery .pictures img').attr('data_sW'));
            var _left = 0;
            if ($('.gallery .pictures').width() / 2 - s_w / 2 + s_w > $('.gallery .detailBox .btn_a').position().left - detail_padding) {
                _left = $('.gallery .detailBox .btn_a').position().left - detail_padding - s_w;
            }else{
                _left = $('.gallery .pictures').width() / 2 - s_w / 2;
            }
            $('.gallery .pictures img').css({
                'left': _left
            });
        }
    }

    function detailHover() {
        if (
            $('.gallery .detailBox .detail').position().left - detail_padding
            <
            $('.gallery .pictures img').position().left + $('.gallery .pictures img').width()
        ) {
            $('.gallery .pictures img').stop().animate({ 'left': $('.gallery .detailBox .detail').position().left - $('.gallery .pictures img').width()  - 70 });
        } else {
            var s_w = 0, s_h = 0;
            s_h = parseFloat($('.gallery .pictures img').attr('data_sH'));
            s_w = parseFloat($('.gallery .pictures img').attr('data_sW'));

            var _left = 0;
            if ($('.gallery .pictures').width() / 2 - s_w / 2 + s_w > $('.gallery .detailBox .btn_a').position().left - detail_padding && detail_small) {
                _left = $('.gallery .detailBox .btn_a').position().left - detail_padding - s_w;
            } else {
                _left = $('.gallery .pictures').width() / 2 - s_w / 2;
            }
            $('.gallery .pictures img').stop().animate({ 'left': _left });
        }
    }

    $('.gallery .detailBox .detail .buy').hover(function () {
        $(this).stop().animate({
            'height': '295px',
            'margin-top': '-255px'
        }).removeClass('default');
    }, function () {
        $(this).stop().animate({
            'height': '89px',
            'margin-top': '0'
        }).addClass('default');
    });

    /** Roll_img Controller **/
    $('.roll_img_div').css({
        'width': $('.roll_img a').width() * $('.roll_img_div a').length,
        'position': 'absolute',
        'left': '0'
    });
    $('.roll_img_prev, .roll_img_next').hover(function () {
        $(this).animate({ 'opacity': '0.8' });
        $(this).find('span').animate({ 'opacity': '0.5' });
    }, function () {
        $(this).animate({ 'opacity': '0.5' });
        $(this).find('span').animate({ 'opacity': '0.1' });
    });
    $('.roll_img_next').click(function () {
        if (Math.abs($('.roll_img_div').position().left) + $('.roll_img').outerWidth() > $('.roll_img_div').width() - $('.roll_img_div a').width()) {
            $('.roll_img_div').stop().animate({ 'left': 0 - ($('.roll_img_div').width() - $('.roll_img').outerWidth()) });
        } else {
            $('.roll_img_div').stop().animate({ 'left': $('.roll_img_div').position().left - $('.roll_img_div a').width() });
        }
    });
    $('.roll_img_prev').click(function () {
        if (Math.abs($('.roll_img_div').position().left) < $('.roll_img_div a').width()) {
            $('.roll_img_div').stop().animate({ 'left': 0 });
        } else {
            $('.roll_img_div').stop().animate({ 'left': $('.roll_img_div').position().left + $('.roll_img_div a').width() });
        }
    });
    $('.roll_img_div a').click(function () {
        var imgSrc = $(this).find('img').attr('_src');
        imageFullScreenView_Init(imgSrc);
    });
    function roll_img_Set() {
        if (Math.abs($('.roll_img_div').position().left) + $('.roll_img').outerWidth() > $('.roll_img_div').width() - $('.roll_img_div a').width()) {
            $('.roll_img_div').stop().animate({ 'left': 0 - ($('.roll_img_div').width() - $('.roll_img').outerWidth()) });
        }
        if (Math.abs($('.roll_img_div').position().left) < $('.roll_img_div a').width()) {
            $('.roll_img_div').stop().animate({ 'left': 0 });
        }
        if ($('.roll_img').outerWidth() > $('.roll_img_div').width()) {
            $('.roll_img_div').stop().animate({ 'left': $('.roll_img').outerWidth() / 2 - $('.roll_img_div').width() / 2 });
        }
    }

    /** Comment **/
    var loadComment_Status = 0;
    $('.box_nav a').click(function () {

        if ($('.box_nav a').hasClass("active"))
        {
            $('.box_nav a').removeClass("active");
        }
        $(this).addClass("active");

        loadCommet($(this).index());

    });
    function loadCommet(type) {
        //debugger;
        if (loadComment_Status) {
            return false;
        }
        loadComment_Status = 1;
        var html = "";
        $('.question_comment .list ul').fadeOut(0, function () {
            $('.question_comment .list .loading').fadeIn(0);
        }).html(html);
        
        $.get((type ? '/ywzixun_data' : "/ywpinglun_data") + "?yishupinid=" + ywyishupinid, function (ret) {
            if (ret.code == 0) {
                var data = ret.data;
                for (var i = 0; i < data.length; i++) {
                    var _data = data[i];
                    html += '<li>' +
                            '<div class="plus clearfix" ' + (i > 2 ? 'style="display:none;"' : '') + '>' +
                            '<img src="' + (_data.zhaopian == "" ? '/svg_file?path=/web/images/avatar_default.svg&rgb=236,240,241' : (OSS + "face/" + _data.zhaopian)) + '"  class="avatar"/>' +
                            '<div class="name">' +
                            '<span>' + _data.xingming + '</span>' +
                            '<span>' + _data.tianjiariqi + '</span>' +
                            '</div>' +
                            '</div>' +
                            '<span ' + (i > 2 ? 'class="small"' : '') + '>' + (type ? '购买咨询' : '作品评论') + '：' + _data.neirong + '</span>' +
                            '</li>';
                }
                $('.question_comment .list .loading').fadeOut(0, function () {
                    $('.question_comment .list ul').fadeIn(0).html(html);
                });
                loadComment_Status = 0;

                $('body').on("click", ".question_comment .list li", function () {
                    $(this).find('.plus').fadeIn(100);
                    $(this).find('.small').removeClass('small');
                });
            }
        });
    }
    $(".question_comment .input_div textarea").keyup(function () {
        if ($.trim($(this).val()) == '') {
            $(".question_comment .input_div a").css({ 'display': 'none' });
        } else {
            $(".question_comment .input_div a").css({'display': 'block'});
        }
    });

    /** More_Project **/
    var loadMp_End = 0; //当所有数据都加载结束后，将这个赋值为1
    function mp_Set() {
        var mp_width = 0;
        $('.more_project li').each(function () {
            if (($(this).position().left + $(this).outerWidth() + 20) < $('.more_project .other_all').position().left) {
                $(this).stop().animate({
                    'opacity': '1'
                });
            } else {
                $(this).stop().animate({
                    'opacity': '0'
                });
            }
        });
        if (mp_width < $(window).width() - 80) {
            if (!loadMp_End) { loadMoreProject(); }
            //$('.more_project .other_all').fadeOut(100);
        } else {
            //$('.more_project .other_all').fadeIn(100);
        }
    }

    function loadMoreProject(page) {

        $('.more_project .loading').fadeIn(0);
        _.pagesize = 1;
        $.get("/yishupinbyyishujia?page="+_.page+"&ps="+_.pagesize+"&ywyishujiaid=" + ywyishujiaid, function (ret) {
            if (ret.code == 0)
            {
                /**
                var html = "";
                var data = ret.data;
                for (var i = 0; i < ret.data.length; i++) {
                    var img_data = ret.data[i];
                    html += '<li><a href="/artworks/' + img_data.xiangqing + '"  target="_blank"><img src="' + GTUPIANIMG + img_data.tupian + '.jpg_small04" /></a></li>';
                    //console.log(img_data.xiangqing);
                }
                $('.more_project .loading').fadeOut(0);
                $('.more_project ul').append(html);
                //下面这句不知道做什么用的，感觉是测试用，被注释
                setTimeout(function () { mp_Set(); }, 100);

                //赋值1 表示没有更多作品了
                if (ret.data.length < _.pagesize)
                    loadMp_End = 1;
                _.page++;
                **/

                var img_data = ret.data[0];
                if (img_data) {
                    imgSrc = GTUPIANIMGIMG + img_data.tupian + '.jpg_small04';
                    var images_thumb = new Image();
                    images_thumb.src = imgSrc;
                    if (images_thumb.complete) {
                        loadMoreProjectComplete(img_data, images_thumb.width, images_thumb.height);
                    } else {
                        images_thumb.onload = function () {
                            loadMoreProjectComplete(img_data, images_thumb.width, images_thumb.height);
                        }
                    }
                }

                //赋值1 表示没有更多作品了
                if (ret.data.length < _.pagesize) {
                    loadMp_End = 1;
                    $('.more_project .loading').fadeOut(0);
                }
                _.page++;
            }
        });
    }
    function loadMoreProjectComplete(img_data, img_w, img_h) {
        var a_h = 280,
            a_w_o = a_h / img_h * img_w,
            a_w = parseInt(a_w_o);
        html = '<li><a href="/artworks/' + img_data.xiangqing + '"  target="_blank"><img src="' + GTUPIANIMGIMG + img_data.tupian + '.jpg_small04" style="width:' + a_w + ';height:' + a_h + ';"/></a></li>';
        $('.more_project .loading').fadeOut(0);
        $('.more_project ul').append(html);
        $('.more_project ul').css({
            'width': $('.more_project ul').outerWidth() + a_w_o + 21
        });
        setTimeout(function () { mp_Set(); }, 100);
    }

    //立即购买
    $(".mxl_buy").click(function () {

        checkLogin(function () {
            if ($(".buy_div .status").text() == "已售") {
                alert("对不起，此作品已售，请选择其他艺术品！");
                return;
            }

            var para = { "id": ywyishupinid, "count": "1" };
            var json = [];
            json[0] = para;
            $.post("/buy_cart_create", { json: JSON.stringify(json) }, function (ret) {

                if (ret.indexOf("ok|") != -1) {
                    location.href = "/buy_order?new=" + ret.split('|')[1] + "&id=" + ret.split('|')[2];
                }
                else {
                    alert("AAAA"+ret.split('|')[1]);
                }
            });
        });
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

            var para = { "id": ywyishupinid, "count": "1" };
            $.post("/add_buy_cart", { json: JSON.stringify(para) }, function (ret) {

                if (ret.indexOf("ok|") != -1) {
                    alert('已添加至购物车','提示',2);
                    $(".mxl_button .mxl_cart").text("已在购物车");
                    if (!$(".mxl_svg .mxl_cart").hasClass("active"))
                        $(".mxl_svg .mxl_cart").addClass("active");
                    //location.href = "/buy_cart";
                }
                else {
                    alert(ret.split('|')[1]);
                }
            });
        });
    });
    //评论、咨询  发表
    var enable = true;
    $(".mxl_input_div a").click(function () {
        checkLogin(function () {
            if (enable) {
                enable = false;
                var type = $(".mxl_box_nav").find(".active").attr("v");

                var url = type == "pinglun" ? "/ywpinglun_add" : "/ywzixun_add";

                var json = {};
                json["ywyishupinid"] = ywyishupinid;
                json["neirong"] = $(".mxl_input_div textarea").val();
                $.post(url, { json: JSON.stringify(json) }, function (ret) {
                    enable = true;
                    if (ret.indexOf("ok") != -1) {
                        alert("成功");
                        $(".mxl_input_div textarea").val("");
                        var index = $('.box_nav').find(".active").index();
                        loadCommet(index);
                    }
                    else {
                        alert("失败");
                    }
                });
            }
        });
    });

    //点赞
    $(".mxl_like").click(function () {
        var ths = $(this);

        checkLogin(function () {
            if (ths.hasClass("active")) 
                $(".mxl_like").removeClass("active");
            else
                $(".mxl_like").addClass("active");

            var para = { "id": ywyishupinid, "leibie": "1" };
            $.post("/shoucang_add", para, function (ret) {

                if (ret.indexOf("ok|") != -1) {
                    //应该加一个标红的效果
                    //alert("操作成功");
                }
                else {
                    if (ths.hasClass("active"))
                        $(".mxl_like").removeClass("active");
                    else
                        $(".mxl_like").addClass("active");
                    alert(ret.split('|')[1]);
                }
            });

        });
    });

    $(".mxl_weibo").click(function () {
        //微博分享
        var openUrl = $(this).attr("v");//弹出窗口的url
        var iWidth = 630; //弹出窗口的宽度;
        var iHeight = 360; //弹出窗口的高度;
        var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
        var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
        window.open(openUrl, "target", "height=" + iHeight + ", width=" + iWidth + ", top=" + iTop + ", left=" + iLeft);
    });

});