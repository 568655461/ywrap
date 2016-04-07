//var _ = {};

//var DEBUG = !0;
//var maxPx = 50;
//var minPx = 10;
//_.moneys = [], _.i = 0; while (_.i++ < 10000) _.moneys[_.moneys.length] = Math.random() * 60000; _.moneys.sort(); _.GETMAX = function (tmp) { var max = tmp[0]; for (var i = 1; i < tmp.length; i++) max < tmp[i] && (max = tmp[i]); return max; }, _.GETMIN = function (tmp) { var max = tmp[0]; for (var i = 1; i < tmp.length; i++) max > tmp[i] && (max = tmp[i]); return max; }; function n() { var can = $('canvas'); can.attr("width", $(".price_slider").width()), can.attr("height", $(".price_slider").height()); var cans = can[0].getContext('2d'), WIDTH = can.width(), HEIGHT = can.height(), X = can.offset().left, _20 = 0, MINPX = Math.max(Math.min(can.width() / 20, maxPx), minPx), Y = HEIGHT - _20; cans.fillStyle = "rgba(0,0,0,1)", cans.lineWidth = 0.5; var V_MAX = _.GETMAX(_.moneys), V_MIN = _.GETMIN(_.moneys), COUNT = (WIDTH / MINPX + 1), len = (V_MAX - V_MIN) / COUNT, COUNTS = []; for (var i = 0; i < COUNT; i++) COUNTS[i] = 0; for (var i = 0; i < _.moneys.length; i++) COUNTS[Math.floor(_.moneys[i] / len)]++; for (var i = 0; i < COUNT && DEBUG; i++) COUNTS[i] = Math.pow(COUNTS[i], 6); var MAXHEIGHT = _.GETMAX(COUNTS), HEIGHTLEN = MAXHEIGHT / (HEIGHT - _20 * 2); function DRAW() { cans.clearRect(0, 0, WIDTH, HEIGHT), cans.moveTo(0 + WIDTH, Y + 1), cans.lineTo(0, Y + 1), cans.stroke(); for (var i = 0; i < COUNT; i++) cans.strokeRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN); } DRAW(); can.off("mousemove", null); can.on("mousemove", function (e) { e = window.event || e; var eX = e.pageX - this.offsetLeft; var eY = e.pageY - this.offsetTop; DRAW(); for (var i = 0; i < COUNT; i++) eX > (i * MINPX) && eX <= ((i + 1) * MINPX) && (cans.fillStyle = "rgba(128,128,128,0.5)", cans.fillRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN), cans.fillStyle = "rgba(0,0,0,1)", cans.fillText(COUNTS[i] + "件", eX, eY)); }); }; $(function () { n(); }); $(window).resize(n);

var _ = {};

var DEBUG = !0;
var maxPx = 50;
var minPx = 10;
_.moneys = [], _.i = 0;
while (_.i++ < 10000) _.moneys[_.moneys.length] = Math.random() * 60000;
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

function n() {
    var can = $('canvas');
    can.attr("width", $(".price_slider").width()), can.attr("height", $(".price_slider").height());
    var cans = can[0].getContext('2d'),
        WIDTH = can.width(),
        HEIGHT = can.height(),
        X = can.offset().left,
        _20 = 0,
        MINPX = Math.max(Math.min(can.width() / 20, maxPx), minPx),
        Y = HEIGHT - _20;
    cans.fillStyle = "rgba(100,100,100,0.3)", cans.lineWidth = 0.5;
    var V_MAX = _.GETMAX(_.moneys),
        V_MIN = _.GETMIN(_.moneys),
        COUNT = (WIDTH / MINPX + 1),
        len = (V_MAX - V_MIN) / COUNT,
        COUNTS = [];
    for (var i = 0; i < COUNT; i++) COUNTS[i] = 0;
    for (var i = 0; i < _.moneys.length; i++) COUNTS[Math.floor(_.moneys[i] / len)]++;
    for (var i = 0; i < COUNT && DEBUG; i++) COUNTS[i] = Math.pow(COUNTS[i], 6);
    var MAXHEIGHT = _.GETMAX(COUNTS),
        HEIGHTLEN = MAXHEIGHT / (HEIGHT - _20 * 2);

    function DRAW() {
        cans.clearRect(0, 0, WIDTH, HEIGHT), cans.moveTo(0 + WIDTH, Y + 1), cans.lineTo(0, Y + 1), cans.stroke();
        for (var i = 0; i < COUNT; i++) cans.fillRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN);
    }
    DRAW();
    can.off("mousemove", null);
    can.on("mousemove", function (e) {
        //e = window.event || e;
        //var eX = e.pageX - this.offsetLeft;
        //var eY = e.pageY - this.offsetTop;
        //DRAW();
        //for (var i = 0; i < COUNT; i++) eX > (i * MINPX) && eX <= ((i + 1) * MINPX) && (cans.fillStyle = "rgba(128,128,128,0.5)", cans.fillRect(i * MINPX, HEIGHT - _20 - COUNTS[i] / HEIGHTLEN, MINPX, COUNTS[i] / HEIGHTLEN), cans.fillStyle = "rgba(0,0,0,1)", cans.fillText(COUNTS[i] + "件", eX, eY));
    });
};
$(function () {
    n();
});
$(window).resize(n);


var __ = {};
//20151130 lxw create
//艺术生活 or 艺术收藏
__.bigleibie = "艺术生活";
//作品类别
__.zplb = "";
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
__.ob_rq = "0";
//出售情况
__.ob_zt = "0";

var _pager = {};
function _init() {
    _pager.page_s = 1;//小页
    _pager.page_s_count = 9;//小页显示数据条数
    _pager.page_b = 1;//查询数据翻页
    _pager.page_b_count = 27;//翻页数据pagesize
    _pager.data = null;
}
_init();

$(function () {
    function loaddata(_flag) {
        _flag = _flag || 0;
        _flag == 0 && (_init(),$('#container').html(''));
        __.page = _pager.page_b;
        __.ps = _pager.page_b_count;

        $.getJSON("found_data", __, function (json) {                
            _pager.data = json.data;

            loadMeinv();
        });
    }

    function GETV(o) {
        var v = o.attr("v");
        if (v == "") return "";

        return $.trim(o.attr("v") || o.html());
    }

    $(".lxw_danxuan>a").on("click", function () {
        var ths = $(this);
        var v = ths.parent().attr("v") || "";
        if (v == "") return;
        if (ths.hasClass("active")) return;

        $("a",ths.parent()).removeClass("active");
        ths.addClass("active");

        var lazy = ths.parent().attr("lazy") || "";
        if (lazy == "1") return;

        var va = GETV(ths);
        eval("__." + v + "='" + va + "'");

        $(".lxw_danxuan_2[v='" + v + "']>li").each(function () {
            var ths = $(this).find("a");
            if (GETV(ths) == va) {
                $(this).addClass("active");
                var strong = $(this).parent().prev().prev();
                va == "" ? strong.html(strong.attr("v")) : strong.html(va);
            } else {
                $(this).removeClass("active")
            }
        });
        loaddata();
    });

    $(".lxw_cc").change(function () {
        __.cctj = $(this).val();
        loaddata();
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

    //呈现空间的状态查询
    $(".ckcxkj").on("ifClicked", function () {
        //alert(this.outerHTML);
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
    });

    $(".lxw_color_2>div").on("click", function () {
        var v = $(this).attr("v");
        $(".lxw_color>a[v='" + v + "']").trigger("click");
    });

    $(".lxw_search").click(function () {
        //执行查询条件
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

    $(".lxw_jgsubmit").click(function () {
        __.jiage_1 = $(".lxw_jg_s").val();
        __.jiage_2 = $(".lxw_jg_e").val();
        loaddata();
    });

    $(".lxw_select").change(function () {
        eval("__." + $(this).attr("v") + "='" + $(this).val() + "'");
        loaddata();
    });

   

    images_nodata_str = "未找到符合筛选条件的艺术品，请再试一下";
    display_status = 0;
    load_status = 0;

    function loadMeinv() {
        if (load_status == 1) {
            return;
        }
        load_status = 1;
        $('.image_load').fadeIn(200);

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
                //状态：已售：over，锁定：lock http://www.etuling.com:10008
                html = '<div class="item transparent">' +
                        '<div class="thumb"><img src="' + GTUPIANIMG + img_data.tupian.replace("\\", "/") + '.jpg_small01" />' +
                        '<span class="status ' + (img_data.chushou == 1 ? 'over">已售' : '">') + '</span>' +//lock 锁定
                        '</div>' +
                        '<div class="detail">' +
                        '<p><strong>' + title + '</strong></p>' +
                        '<p>' + img_data.zuozhe + '</p>' +
                        '<p>' + img_data.leibie + '</p>' +
                        '<p>' + img_data.gao + '×' + img_data.kuan + 'CM</p>' +
                        '<p>¥' + img_data.jiage + '</p>' +
                        '</div>' +
                        '</div>';
                $("#container").append(html);
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
    //$('.second_display .color_choice_div .color_choice').click(function () {
    //    $('.second_display .color_choice_div .color_choice').removeClass('active');
    //    $(this).addClass('active');
    //    $('.second_display strong .color_choice i').attr('class', $(this).find('i').attr('class'));
    //});

    /** second_display 下面的触发，请使用resetPanle(1),参数给 1  **/
        
    function resetPanle(mini) {
        if (display_status == 1) {
            display_status = 2;
        }
        if (mini) {
            $('.content').css({ 'margin-top': $('.second_display').height() - $('header').height(), 'position': 'absolute' });
            $('html, body').animate({ scrollTop: 10 }, '1000');
            $('.default_display').fadeOut(0);
        }
        setTimeout(function () {
            $('#container').html('');
            $('.image_no_date').html(images_nodata_str).fadeIn(0);
            loaddata();
        }, (mini ? 500 : 0));
    }

    //加载数据
    resetPanle();

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

    $('.nav_banner a, .item_banner a').click(function () {
        $('.nav_banner a, .item_banner a').removeClass('active');
        if ($(this).hasClass('item_2')) {
            $('.page_1').fadeOut(0);
            $('.page_2').fadeIn(0);
            $('.nav_banner a').eq(1).addClass('active');
            $('.item_banner_1').addClass('_hidden');
            $('.item_banner_2').removeClass('_hidden');
        } else {
            $('.page_2').fadeOut(0);
            $('.page_1').fadeIn(0);
            $('.nav_banner a').eq(0).addClass('active');
            $('.item_banner_2').addClass('_hidden');
            $('.item_banner_1').removeClass('_hidden');
        }

        __.bigleibie = $(".nav_banner").find("A.active").eq(0).attr("v");
        //浮动层
        if (display_status == 1) {
            resetPanle(1);
        } else {
            resetPanle();
        }
    });


    $(window).on("scroll", function () {
        if ($(document).scrollTop() + 120 >= $(document).height() - $(window).height()) {
            loadMeinv();
        }

        if ($(document).scrollTop() >= $('header').height() + $('.default_display').height()) {
            $('.second_display').fadeIn(200);
            if (display_status == 0) {
                display_status = 1;
            }
        } else {
            if (display_status == 1) {
                $('.second_display').fadeOut(200);
                display_status = 0;
            }
        }
        if ($(document).scrollTop() < 10) {
            $('.content').css({ 'margin-top': 0, 'position': 'relative' });
            $('.second_display').fadeOut(0);
            $('.default_display').slideDown("slow");
            display_status = 0;
        }
    })

    setInterval(function () {
        blocksit_fu();
    }, 1000);
    //window resize
    var currentWidth = 1100;
    $(window).resize(function () {
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
        $('#container').BlocksIt({
            numOfCol: col,
            offsetX: 8,
            offsetY: 8,
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

    $('.filter .category_div >a').click(function () {
        if ($(this).parents('.item').find('.category_div_more')) {
            $(this).parents('.item').find('.category_div_more').find('a').remove();
            $(this).parents('.item').find('.category_div_more').fadeOut(0);

            if (!$(this).attr('_data')) return;
            var data = $(this).attr('_data').split(",");

            if (data) {
                var html = "";
                for (var i = 0; i < data.length; i++) {
                    html += "<a href='javascript:void(0)' class='lxw_duoxuan' v='" + $(this).attr("v1") + "'>" + data[i] + "</a>";
                }
                $(this).parents('.item').find('.category_div_more .arrow').css({ 'left': $(this).position().left + ($(this).width() / 2) + 4 });
                $(this).parents('.item').find('.category_div_more').append(html).fadeIn(0);
            }

            $(".lxw_duoxuan").click(function () {
                var ths = $(this);
                if (ths.hasClass("active"))
                    ths.removeClass("active");
                else
                    ths.addClass("active");

                var v = $(".active", ths.parent()).map(function () {
                    return $(this).html();
                }).get().join(",");

                var arr = $(this).attr("v").split("_");
                for (var i = 1; i < parseInt(arr[1]) ; i++)eval("__." + arr[0] + "_"+i+"=''");

                eval("__." + arr[0] + "_"+arr[2]+"='" + v + "'");
                    
                loaddata();
            });
        }
    });

    $('.filter .search_input').focus(function () {
        $(this).animate({ width: "390px" });
    });
    $('.filter .search_input').blur(function () {
        $(this).animate({ width: "150px" });
    });


    /** SLIDER Controller **/
    var slider_min = 10;
    var slider_max = 500;
    $("#slider-range").slider({
        range: true,
        min: slider_min,
        max: slider_max,
        values: [75, 300],
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