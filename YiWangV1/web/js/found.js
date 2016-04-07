var _ = {};

var DEBUG = !0;
var maxPx = 50;
var minPx = 10;
_.moneys = [], _.i = 0;
_.moneys = _gmoney;
_.moneys.sort();
_.GETMAX = function (tmp) {
    var max = tmp[0];
    for (var i = 1; i < tmp.length; i++) max < tmp[i] && (max = tmp[i]);
    return max;
}, _.GETMIN = function (tmp) {
    var max = tmp[0];
    for (var i = 1; i < tmp.length; i++) max > tmp[i] && (max = tmp[i]);
    return max;
};

var V_MAX = _.GETMAX(_.moneys),
        V_MIN = _.GETMIN(_.moneys);

function _n() {
    var can = $('canvas');
    var _30 = 30;
    can.attr("width", $("#price_slider").width()), can.attr("height", _30);
    can.css("top",-_30);
    var cans = can[0].getContext('2d'),
        WIDTH = can.width(),
        HEIGHT = can.height(),
        X = can.offset().left,
        _20 = 0,
        MINPX = Math.max(Math.min(can.width() / 20, maxPx), minPx),
        Y = HEIGHT - _20;
    cans.fillStyle = "rgba(196,196,196,0.3)", cans.lineWidth = 0.5;
    
     var   COUNT = ~~(WIDTH / MINPX),
        len = (V_MAX) / COUNT,
        COUNTS = [];

    

    for (var i = 0; i < COUNT; i++) COUNTS[i] = 0;
    for (var i = 0; i < _.moneys.length; i++) COUNTS[Math.floor((_.moneys[i]-0.01) / len)]++;
    //for (var i = 0; i < COUNT && DEBUG; i++) COUNTS[i] = Math.pow(COUNTS[i], 6);
    var MAXHEIGHT = _.GETMAX(COUNTS),
        HEIGHTLEN = MAXHEIGHT / (HEIGHT - _20 * 2);

    function DRAW() {
        cans.clearRect(0, 0, WIDTH, HEIGHT), cans.moveTo(0 + WIDTH, Y + 1), cans.lineTo(0, Y + 1), cans.stroke();
        for (var i = 0; i < COUNT; i++) cans.fillRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN);
    }
    DRAW();
    can.off("mousemove", null);
    can.on("mousemove", function (e) {
        e = window.event || e;
        var eX = e.pageX - $(this).offset().left;
        var eY = e.pageY - $(this).offset().top;

        DRAW();
        for (var i = 0; i < COUNT; i++) eX > (i * MINPX) && eX <= ((i + 1) * MINPX) && (cans.fillStyle = "rgba(100,100,100,0.1)", cans.fillRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN));//,cans.fillStyle = "rgba(0,0,0,1)", cans.fillText(COUNTS[i] + "件", eX, eY));
    });

    can.off("click", null);
    can.on("click", function (e) {
        e = window.event || e;
        var eX = e.pageX - $(this).offset().left;
        var eY = e.pageY - $(this).offset().top;

        for (var i = 0; i < COUNT; i++) if (eX > (i * MINPX) && eX <= ((i + 1) * MINPX)) {
            if ($(".temp_jiage").length > 0) {
                $(".temp_jiage").html( parseInt( i * len) + "-" + parseInt( (i + 1) * len) + ">" + COUNTS[i]);
            }
        }
    });
};



var __ = {};
//20151130 lxw create
//艺术生活 or 艺术收藏
__.bigleibie = "艺术生活";
//作品类别
//__.zplb = "";
//呈现空间
__.cxkj = "";
__.cxkj_1 = "";
__.cxkj_2 = "";
__.cxkj_3 = "";
__.cxkj_4 = "";
//艺术分类
__.xsfl = "";
__.xsfl_1 = "";
__.xsfl_2 = "";
//题材
__.tc = "";
//风格
__.fg = "";
//尺寸
__.cctj = "";
__.cc = "";
//所在地区
__.szdq = "";
//出生年代
__.csnd = "";
//创作时间
__.czsj = "";
//查询条件
__.where = "";
//色彩
__.secai = "";          
//价格
__.jiage_1 = "";
__.jiage_2 = "";
//日期排序
__.ob_rq = "";
//出售情况
__.ob_zt = "";
//价格排序
__.ob_jg = "";
__.kuan_s = "";
__.gao_s = "";

var _pager = {};
function GETV(o) {
    var v = o.attr("v");
    if (v == "") return ""; return $.trim(v || o.html());
}
function _init() {
    _pager.page_s = 1;//小页
    _pager.page_s_count = 9;//小页显示数据条数
    _pager.page_b = 1;//查询数据翻页
    _pager.page_b_count = 27;//翻页数据pagesize
    _pager.data = null;
}
_init();

function openDetail(detail) {
    window.open("/artworks/" + detail);
}
function like(ths)
{  
    var ths = $(ths);
    checkLogin(function () {
        if (ths.hasClass("active"))
            ths.removeClass("active");
        else
            ths.addClass("active");

        var para = { "id": ths.attr("vid"), "leibie": "1" };
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
            }
        });
    });
}

$(function () {
    var remoteDataCallTimer = null;
    function loaddata(_flag) {
        _flag = _flag || 0;
        _flag == 0 && (_init(),$('#container').html(''));
        __.page = _pager.page_b;
        __.ps = _pager.page_b_count;

        //先清空，不然还会显示新的数据
        _pager.data = null;

        remoteDataCallTimer && clearTimeout(remoteDataCallTimer);

        $('.image_load').fadeIn(2000);

        //连续点击太快就不要执行。
        remoteDataCallTimer = setTimeout(function () {            
            $.getJSON("found_data", __, function (json) {
                _pager.data = json.data;
                //$(".recordcount").text(json.recordcount);
                $('.image_load').hide();
                loadMeinv();
            });
        }, 800);
        
    }

    $(".lxw_danxuan>a").on("click", function () {
        var ths = $(this);
        var v = GETV(ths.parent());
        if (v == "") return;
        if (ths.hasClass("active")) return;

        $("a",ths.parent()).removeClass("active");
        ths.addClass("active");

        var lazy = ths.parent().attr("lazy") || "";
        if (lazy == "1") return;

        var va = GETV(ths);
        eval("__." + v + "='" + va + "'");
        if (va == '雕塑') {
            $('#item_cc_custom .hou').stop().fadeIn(200);
        } else {
            $('#item_cc_custom .hou').stop().fadeOut(200);
        }

        $(".lxw_danxuan_2[v='" + v + "']>li").each(function () {
            var ths = $(this).find("a");
            if (GETV(ths) == va) {
                $(this).addClass("active");
                var strong = $(this).closest(".select").find("strong");

                //价格特殊处理一下
                if(v == "jg") _priceload(ths);

                strong.html(va == "" ? strong.attr("v") : (ths.html() ? ths.html() : strong.html(va)));
            } else {
                $(this).removeClass("active")
            }
        });
        loaddata();
    });

    $(".lxw_cc").change(function () {
        __.cctj = $(this).val();
        if (__.cctj == 'my') {
            $('#item_cc_select').fadeOut(100, function () {
                $('#item_cc_custom').fadeIn(100);
            });
        } else {
            $('#item_cc_custom').fadeOut(100, function () {
                $('#item_cc_select').fadeIn(100);
            });
            loaddata();
        }
    });

    $(".lxw_danxuan_2>li>a").on("click", function () {
        var v = $(this).parent().parent().attr("v");
        var text = GETV($(this));
        if ($(this).hasClass("active")) return;

        $(".lxw_danxuan[v='" + v + "']>a").each(function () {
            var ths = $(this);               
            GETV(ths) == text&&ths.trigger("click");
        });
    });

    $(".lxw_color>a").on("click", function () {
        var ths = $(this);
        if (ths.hasClass("active")) return;

        $(".lxw_color>a").removeClass("active");
        ths.addClass("active");

        __.secai = ths.attr("v");
        
        $(".lxw_color_2>div").removeClass("active");
        $(".lxw_color_2>div[v='" + __.secai + "']").addClass("active");

        $(".lxw_color_title").html($(".lxw_color_2>div[v='" + __.secai + "']").html());
        loaddata();
    });

    $(".lxw_color_2>div").on("click", function () {
        var v = $(this).attr("v");
        $(".lxw_color>a[v='" + v + "']").trigger("click");
    });

    $(".lxw_search").click(function () {
        __.where = $(".lxw_key").val();
        $(".lxw_danxuan[lazy=1]").each(function () {
            eval("__." + $(this).attr("v") + "='" + GETV($(this).find("a.active").eq(0)) + "'");
        });

        loaddata();
    });

    $(".lxw_cancel").click(function () {
        __.where = "";
        $(".lxw_key").val(__.where);

        $(".lxw_danxuan[lazy=1]").each(function () {
            $(this).find("a").eq(0).trigger("click");
        });

        loaddata();

        $('.filter2_c').slideToggle();
    });
    //价格
    $(".lxw_jgsubmit").click(function () {
        //__.jiage_1 = $(".lxw_jg_s").val();
        //__.jiage_2 = $(".lxw_jg_e").val();

        //loaddata();
        buttonData();
    });
    //重置价格
    $(".lxw_jgreset").click(function () {
        $("#slider-range").slider({
            range: true,
            min: slider_min,
            max: slider_max,
            values: [V_MIN, V_MAX],
            slide: function (event, ui) {
                $('#slider-set-start').val(ui.values[0]);
                $('#slider-set-end').val(ui.values[1]);
            }
        });
        $("#slider-set-start").val($("#slider-range").slider("values", 0));
        $("#slider-set-end").val($("#slider-range").slider("values", 1));

        //__.jiage_1 = $(".lxw_jg_s").val();
        //__.jiage_2 = $(".lxw_jg_e").val();

        //loaddata();
        buttonData();
    });

    //尺寸
    $(".lxw_ccsubmit").click(function () {
        //__.kuan_s = $(".mxl_jg_s").val();
        //__.gao_s = $(".mxl_jg_e").val();
        //loaddata();
        buttonData();
    });

    //尺寸重置
    $(".lxw_ccreset").click(function () {
        $(".mxl_jg_s").val("");
        $(".mxl_jg_e").val("");
        //__.kuan_s = $(".mxl_jg_s").val();
        //__.gao_s = $(".mxl_jg_e").val();
        //loaddata();
        buttonData();
    });

    function buttonData()
    {
        __.jiage_1 = $(".lxw_jg_s").val();
        __.jiage_2 = $(".lxw_jg_e").val();
        __.kuan_s = $(".mxl_jg_s").val();
        __.gao_s = $(".mxl_jg_e").val();
        loaddata();
    }

    $(".lxw_select").change(function () {
        eval("__." + $(this).attr("v") + "='" + $(this).val() + "'");
        loaddata();
    });

    //呈现空间全部或者其他
    $(".ckcxkj_o").click(function () {
        var v = GETV($(this));
        $(".ckcxkj_a[v='" + v + "']").trigger("click");
    });

    $("input", $(".lxw_duoxuan_2>li>ul")).on("ifClicked",function (event) {
        var v1 = $(this).attr("v1");
        var obj = $("a[v1='"+v1+"']");
        
        var text = $.trim($(this).parent().parent()[0].innerText);

        //先激活面板，再选择对应的数据
        if (!obj.hasClass("active")) {
            obj.trigger("click");
        }

        //然后选择对象
        $(".category_div_more>a").each(function () {
            var v = $.trim(this.innerText);
            if (v == text)
                $(this).trigger("click");
        });

    });

    $('.lxw_duoxuan_2>a').click(function () {
        if ($(this).hasClass("active")) return;

        $("a", $(this).parent()).removeClass("active");
        $(this).addClass("active");

        if ($(this).parents('.item').find('.category_div_more')) {
            $(this).parents('.item').find('.category_div_more').find('a').remove();
            $(this).parents('.item').find('.category_div_more').fadeOut(0);

            if (!$(this).attr('_data')) {
                var v = GETV($(this).parent());
                var v1 = GETV($(this));
                //清除选择
                $(".ck" + v + "_o").parent().removeClass("active");
                $(".ck" + v + "_o[v='" + v1 + "']").parent().addClass("active");

                //移除选择
                $('input', $(".ck" + v + "_o").parent().parent()).iCheck('uncheck');

                eval("__." + v + "='" + v1 + "'");
                loaddata();
                return;
            }
            var data = $(this).attr('_data').split(",");

            if (data) {
                var v = GETV($(this).parent());
                var v1 = GETV($(this));
                $('input', $(".ck" + v + "_o").parent().parent()).iCheck('uncheck');
                $(".ck" + v + "_o").parent().removeClass("active");

                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<a href='javascript:void(0)' class='lxw_duoxuan' v='" + $(this).attr("v1") + "'>" + data[i] + "</a>";
                }
                $(this).parents('.item').find('.category_div_more .arrow').css({ 'left': $(this).position().left + ($(this).width() / 2) + 4 });
                $(this).parents('.item').find('.category_div_more').append(html).fadeIn(0);

                eval("__." + v + "='" + v1 + "'");
                loaddata();
            }

            //触发二级
            $(".lxw_duoxuan").click(function () {
                var ths = $(this);
                var bactive = ths.hasClass("active");
                if (ths.hasClass("active"))
                    ths.removeClass("active");
                else
                    ths.addClass("active");

                var v = $(".active", ths.parent()).map(function () {
                    return $(this).html();
                }).get().join(",");

                var arr = $(this).attr("v").split("_");
                for (var i = 1; i < parseInt(arr[1]) ; i++) eval("__." + arr[0] + "_" + i + "=''");

                eval("__." + arr[0] + "_" + arr[2] + "='" + v + "'");

                //通过v查找浮动层
                var pv = GETV(ths);
                var text1 = ths[0].innerText;
                var px = GETV(ths.parent().prev());

                //移除全部或者其他
                $(".ck" + px + "_o").parent().removeClass("active");

                $(".lxw_duoxuan_2[v='" + px + "']>li>ul").each(function () {
                    var nv = GETV($(this));
                    if (nv != pv.split('_')[2])
                        $("input", $(this)).iCheck("uncheck");
                    else {
                        $(this).find("li").each(function () {
                            var text = $.trim($(this).find("label")[0].innerText);
                            if (text == text1)
                                $("input", $(this)).iCheck(bactive ? "uncheck" : "check");
                        });
                    }
                });

                loaddata();
            });
        }
    });

    //拉下选择价格 (lxw 20160112 已经去掉，不起作用了)
    $(".lxw_jg_xl>li>a").on("click", function () {
        if ($(this).parents('li').hasClass("active")) return;
        $(".lxw_jg_xl>li").removeClass("active");
        $(this).parents('li').addClass("active");

        

        buttonData();
    });

    function _priceload(ths)
    {
        var price = ths.attr('v');
        var price_ = price.split(',');
        var start = price_[0];
        var end = price_[1];
        start = (start < slider_min ? slider_min : start);
        end = (end > slider_max ? slider_max : (end < start ? start + 1 : end));
        $("#slider-range").slider({
            values: [start, end]
        });
        $("#slider-set-start").val($("#slider-range").slider("values", 0));
        $("#slider-set-end").val($("#slider-range").slider("values", 1));
    }

    images_nodata_str = "抱歉，未找到符合筛选条件的艺术品";
    display_status = 0;
    load_status = 0;

    //图片数量
    var imageCount = 0;
    function getBlobImage($img)
    {
        var url = $img.parent().attr("lazyimg");
        window.URL = window.URL || window.webkitURL;
        if (typeof history.pushState == "function") {
            var xhr = new XMLHttpRequest();
            xhr.open("get", url, true);
            xhr.responseType = "blob";
            xhr.onload = function () {
                if (this.status == 200) {
                    var blob = this.response;
                    $img[0].onload = function (e) {
                        window.URL.revokeObjectURL($img[0].src); 
                    };
                    $img[0].src = window.URL.createObjectURL(blob);
                }
            }
            xhr.send();
        } else {
        }
    }

    function loadMeinv() {
        if (!_pager.data) return;

        if (load_status == 1) {
            return;
        }
        load_status = 1;

        for (var i = 0; i < _pager.page_s_count; i++) {
            load_status = 1;
            if (!_pager.data||(_pager.page_s - 1) * _pager.page_s_count + i >= _pager.data.length) break;
            var img_data = _pager.data[(_pager.page_s - 1) * _pager.page_s_count + i];
            if (img_data && img_data.tupian) {
                var title = "";
                if (img_data.zhongwen != "" && img_data.zhongwen != undefined)
                    title = img_data.zhongwen;
                else if (img_data.mingcheng != "" && img_data.mingcheng != undefined)
                    title = img_data.mingcheng;
                else
                    title = "无题";
                var html = "";
                //状态：已售：over，锁定：lock 
                html = '<div class="item transparent">' +
                        '<div class="thumb lxw_thumb" onclick="openDetail(\'' + img_data.detail + '\')" lazyimg=' + GTUPIANIMGIMG + img_data.tupian.replace(/\\/ig, "/").replace(/%5C/ig, "/") + '.jpg_small01><img src="' + GTUPIANIMGIMG + img_data.tupian.replace(/\\/ig, "/").replace(/%5C/ig, "/") + '.jpg_small01" class="imgblob' + imageCount + '"/>' +
                        '<span class="status ' + (img_data.chushou == 1 ? 'over">已售' : '">') + '</span>' +//lock 锁定
                        '</div>' +
                        '<div class="detail">' +
                        '<p><a href="/artist/' + img_data.ysjid + '" target="_blank">' + img_data.zuozhe + '</a> ' + '</p>' +
                        '<p><span>' + title + '</span>' + 
                         '<span>' + img_data.cailiao + '</span><span>' + img_data.size + '</span>'  + ($.trim(img_data.chuangzuoriqix) == "" ? '' : '<span>' + img_data.chuangzuoriqix + '</span></p>') +
                        '<p class="price">¥' + img_data.jiage + '</p>' +
                        '<div class="image_list_icon">' +
                        '<a href="javascript:void(0)" onclick="like(this);" vid="' + img_data.detail + '" class="icon_a ' + (img_data.sfsc == 1 ? 'active"' : '') + ' " ><img src="/svg_file?path=/web/images/icon_heart_empty_o.svg&rgb=74,74,74" class="defualt"/><img src="/svg_file?path=/web/images/icon_heart_empty_o.svg&rgb=255,3,3" class="hover"/><img src="/svg_file?path=/web/images/icon_heart_o.svg&rgb=255,3,3" class="active"/></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                $("#container").append(html);
                //' + GTUPIANIMG + img_data.tupian.replace(/\\/ig, "/").replace(/%5C/ig, "/") + '.jpg_small01
                //getBlobImage($(".imgblob" + imageCount))
                //imageCount++;

                
            }
        }
        _pager.page_s++, _pager.page_s > 1 && _pager.page_s % 3 == 1 && (_pager.page_b++, loaddata(1), _pager.page_s = 1);


        $('#container .transparent').each(function () {
            $(this).animate({ "opacity": "1" }).removeClass('transparent');
        });
        $('.image_load').fadeOut(200);
        setTimeout(function () {
            blocksit_fu();
        }, 100);
    }

    $('.second_display .select').hover(function () {
        $('.second_display .select').removeClass('active');
        $('.second_display .select ul').fadeOut(100);
        $(this).addClass('active');
        $(this).find('>ul').css({
            'top': $(this).position().top + $(this).outerHeight() - 2,
            'left': 0,
            'min-width': $(this).outerWidth()
        }).fadeIn(100);
        var select_width = $(this).find('>ul').width() - 40;
        select_width > 0 ? $(this).css({ 'width': $(this).find('>ul').width() - 40, 'text-align': 'center' }) : '';
    }, function () {
        $('.second_display .select').removeClass('active');
        $('.second_display .select ul').fadeOut(100);
    });
    $('.second_display li>a').hover(function () {
        $('.second_display li').find('ul').fadeOut(100);
        $(this).next('ul').css({
            'top': $(this).position().top,
            'left': $(this).position().left + $(this).outerWidth() - 1,
            'min-width': $(this).outerWidth()
        }).fadeIn(100);
    }, function () {
        if ($(this).next('ul').is(":hidden")) {
            $('.second_display li').find('ul').fadeOut(100);
        }
    });
    $('.second_display .bar_a').click(function () {
        if ($('.second_display').is(":hidden")) {
            $('.default_display').slideUp()
            $('.second_display').slideDown();
        } else {
            $('.second_display').slideUp()
            $('.default_display').slideDown();
        }
    });
    $('.filter_close').click(function () {
        $('.default_display').slideUp()
        $('.second_display').slideDown();
    });
    //$('.second_display .color_choice_div .color_choice').click(function () {
    //    $('.second_display .color_choice_div .color_choice').removeClass('active');
    //    $(this).addClass('active');
    //    $('.second_display strong .color_choice i').attr('class', $(this).find('i').attr('class'));
    //});

    function triggerDiv(key,value)
    {
        
        $(".lxw_danxuan[v='" + key + "']>a").each(function () {
            
            var v = $(this).html();
            var v1 = $(this).attr("v")
            if (v == value || v1 == value)
                $(this).trigger("click");
        });

    }

    function changetab(ths) {
        $('.nav_banner a, .item_banner a').removeClass('active');
        if (ths.hasClass('item_2')) {
            $('.page_1').fadeOut(0);
            $('.page_2').fadeIn(0);
            $('.nav_banner a').eq(1).addClass('active');
            $('.item_banner_1').addClass('_hidden');
            $('.item_banner_2').removeClass('_hidden');
            $('.second_display .bg').css({ 'display': 'none' });
            $('.second_display .bg_2').css({ 'display': 'block' });
        } else {
            $('.page_2').fadeOut(0);
            $('.page_1').fadeIn(0);
            $('.nav_banner a').eq(0).addClass('active');
            $('.item_banner_2').addClass('_hidden');
            $('.item_banner_1').removeClass('_hidden');
            $('.second_display .bg').css({ 'display': 'none' });
            $('.second_display .bg_1').css({ 'display': 'block' });
        }

        __.bigleibie = $(".nav_banner").find("A.active").eq(0).attr("v");
        //浮动层
        if (display_status == 1) {
            resetPanle(1);
        } else {
            resetPanle();
        }
    }

    /** second_display 下面的触发，请使用resetPanle(1),参数给 1  **/
    function resetPanle(mini) {
        if (display_status == 1) {
            display_status = 2;
        }
        if (mini) {
            $('.default_display').fadeOut(0);
            $('.content').css({ 'margin-top': 0, 'position': 'relative' });
            $('html, body').animate({ scrollTop: 0 }, '1000');
        }
        setTimeout(function () {
            $('#container').html('');
            //$('.image_no_date').html(images_nodata_str).fadeIn(0);
            //如果传递过来参数，这里马上触发，如果触发太快，只执行最后一次。

            for (var k in SEARCH)
                if (SEARCH[k])
                    triggerDiv(k, SEARCH[k]);

            loaddata();
        }, (mini ? 1000 : 0));
    }

    if (__lb != "")
    {
        var ths = $(".nav_banner>a[link='" + __lb + "']");
        changetab(ths);
    } else {
        //加载数据
        resetPanle();
    }
    

    $('.item_banner_1').hover(function () {
        $('.item_banner_1 a').eq(1).fadeIn(100);
    }, function () {
        $('.item_banner_1 a').eq(1).fadeOut(100);
    });

    $('.item_banner_2').hover(function () {
        $('.item_banner_2 a').eq(1).fadeIn(100); 
    }, function () {
        $('.item_banner_2 a').eq(1).fadeOut(100);
    });

    //点击的效果
    $('.nav_banner a, .item_banner a').click(function () {
        var link = $(this).attr("link");
        location.href = "/buy?f=" + link;
    });

   
    $(window).on("scroll", function () {
        if ($(document).scrollTop() + 120 >= $(document).height() - $(window).height()) {
            loadMeinv();
        }

        if ($(document).scrollTop() >= $('header').height() + $('.second_display').height()) {
            if ($('.second_display').is(":hidden")) {
                $('.filter_close').click();
            }

            $('.second_display').addClass('fixed');
            if (display_status == 0) {
                display_status = 1;
            }
        } else {
            if (display_status == 1) {
                $('.second_display').removeClass('fixed');
                display_status = 0;
            }
        }
        if ($(document).scrollTop() < 10) {
            $('.second_display').removeClass('fixed');
            display_status = 0;
        }
    })

    setInterval(function () {
        blocksit_fu();
    }, 500);
    //window resize
    var currentWidth = 1100;
    $(window).resize(function () {
        _n();
        blocksit_fu();
    });

    function blocksit_fu() {
        var winWidth = $(window).width();
        var conWidth;
        if (winWidth < 450) {
            conWidth = winWidth;
            col = 1
        } else if (winWidth < 768) {
            conWidth = winWidth;
            col = 2
        } else if (winWidth < 1300) {
            conWidth = winWidth;
            col = 3
        } else if (winWidth < 1900) {
            conWidth = winWidth;
            col = 4
        } else if (winWidth < 2400) {
            conWidth = winWidth;
            col = 5
        } else {
            conWidth = winWidth;
            col = 5;
        }
        if (conWidth != currentWidth) {
            currentWidth = conWidth;
            $('#container').width(conWidth);
        }
        $('#container').css({ 'width': $('.image_list_ver').width() - 40, 'padding': '20px 0 20px 20px', 'left': '20px' });
        $('#container').BlocksIt({
            numOfCol: col,
            offsetX: 2,
            offsetY: 2,
            blockElement: '.item'
        });
        if ($('#container .item').length < 1) {
            $('.image_no_date').fadeIn(100);
            display_status == 2 ? $('footer').addClass('fixed') : '';
            $('body').css({ 'background': '#F6F6F6' });
        } else {
            $('.image_no_date').fadeOut(100);
            $('footer').removeClass('fixed');
            $('.content').removeClass('nobg');
            $('body').css({ 'background': '#F8F8F8' });
        }
        load_status = 0;
    }

    $('.filter .search_input').focus(function () {
        $(this).animate({ width: "390px" });
    });
    $('.filter .search_input').blur(function () {
        $(this).animate({ width: "150px" });
    });

    /** SLIDER Controller **/
    var slider_min = V_MIN;
    var slider_max = V_MAX;
    $("#slider-range").slider({
        range: true,
        min: slider_min,
        max: slider_max,
        values: [V_MIN, V_MAX],
        slide: function (event, ui) {
            $('#slider-set-start').val(ui.values[0]);
            $('#slider-set-end').val(ui.values[1]);
        }
    });
    $(".slider-data-left").html("¥" + slider_min);
    $(".slider-data-right").html("¥" + slider_max);

    $("#slider-set-start").val($("#slider-range").slider("values", 0));
    $("#slider-set-end").val($("#slider-range").slider("values", 1));

    $('.slider-set .confirm').click(function () {
        var start = parseInt($('#slider-set-start').val());
        var end = parseInt($('#slider-set-end').val());
        start = (start < slider_min ? slider_min : start);
        end = (end > slider_max ? slider_max : (end < start ? start + 1 : end));
        $("#slider-range").slider({
            values: [start, end]
        });
        $("#slider-set-start").val($("#slider-range").slider("values", 0));
        $("#slider-set-end").val($("#slider-range").slider("values", 1));
    });


    
});

var timer_price = null;
$(function () {
    timer_price = setInterval(function () {
        //console.log($("#price_slider").width());
        //console.log($("#price_slider").height());
        if (timer_price != null && parseInt($("#price_slider").height())>0)
        {
            clearInterval(timer_price);
            _n();
        }
    }, 100);
});
