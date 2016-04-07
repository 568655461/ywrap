var _ = {};
var img = new Image();

$(function () {
    loadbody();

    $(".fullscreen").click(function () {
        fullscreen();
    });
});

function out() {
    var s = "";
    var numargs = arguments.length;
    for (i = 0 ; i < numargs; i++) { 
        s += i+">：" + arguments[i] + ";";
    }
    if (console && console.log)
        console.log(s);
}

function loadbody() {
    img.onload = function () {
        _.Width = this.width;
        _.Height = this.height;
        
        _.MinSize = [200, 200];
        //如果是小于30，可能就无法拖动了。
        _.MinSpanSize = [30, 30];

        //如果需要，就打开
        _.SFMIN = 0.2;
        _.lxwBigKuang = $(".lxw_bigkuang");
        _.lxwBigImage = $(".lxw_bigimage");
        _.lxwSmallKuang = $(".lxw_smallkuang");
        _.lxwSmallImage = $(".lxw_smallimage");
        _.lxwDrop = $(".indicator");

        _.lxwBigImage.attr("src", img.src);
        _.lxwSmallImage.attr("src", img.src);

        SetSize();
        SetDrop();
        SetWheel();
    }

    img.src = "http://yw2015.oss-cn-beijing.aliyuncs.com/yw/201512241719088941362iRZD1JWXrJuWAc3I.jpg"; 
}

function SetWheel() {
    $('div,img').mousewheel(function (event, delta, deltaX, deltaY) {
        event.stopPropagation();
        console.log(delta);

        if (delta) {
            _.IMGBL += 0.1 * delta;
        }

        //得到正确数据，0.2 和 3 是需要计算的，最小应该是多少，最大应该是多少
        _.IMGBL = GetTrueNumber(_.SF[0], _.SF[1], _.IMGBL);

        if (_.IMGBL < _.SF[2]) {
            _.lxwSmallKuang.hide();
        } else {
            _.lxwSmallKuang.show();
        }

        var pos = {
            top: _.lxwDrop.position().top + _.lxwDrop.height() / 2,
            left: _.lxwDrop.position().left + _.lxwDrop.width() / 2
        };
        var posbig = {
            top: _.lxwBigImage.position().top + _.lxwBigImage.height() / 2,
            left: _.lxwBigImage.position().left + _.lxwBigImage.width() / 2
        };

        out(_.IMGBL);

        var w = _.lxwBigKuang.width() / _.BL / _.IMGBL;
        var h = _.lxwBigKuang.height() / _.BL / _.IMGBL;
        var t = GetTrueNumber(0, _.lxwSmallKuang.height() - h, pos.top - h / 2);
        var l = GetTrueNumber(0, _.lxwSmallKuang.width() - w, pos.left - w / 2);

        _.lxwDrop.stop().animate({
            width: w,
            height: h,
            //top:  pos.top - h / 2,
            //left: pos.left - w / 2
            top: t,
            left: l
        });
         
        if (_.IMGBL < _.SF[2]) {
            _.lxwBigImage.stop().animate({
                width: _.Width * _.IMGBL,
                height: _.Height * _.IMGBL,
                top: _.lxwBigKuang.height()/2 - _.Height * _.IMGBL / 2,
                left: _.lxwBigKuang.width() / 2 - _.Width * _.IMGBL / 2
            });
        } else {
            _.lxwBigImage.stop().animate({
                width: _.Width * _.IMGBL,
                height: _.Height * _.IMGBL,
                top: -t * _.BL * _.IMGBL,
                left: -l * _.BL * _.IMGBL
            }, 50);
        }
    });
}

function SetSize() {
    //缩小大200,200中间
    var blx = _.Width / _.MinSize[0];
    var bly = _.Height / _.MinSize[1];

    if (blx > bly) {
        _.smallWidth = _.Width / blx;
        _.smallHeight = _.Height / blx;
        _.BL = blx;
    } else {
        _.smallWidth = _.Width / bly;
        _.smallHeight = _.Height / bly;
        _.BL = bly;
    }

    _.lxwSmallKuang.css({
        width: _.smallWidth,
        height: _.smallHeight
    });
    _.lxwSmallImage.css({
        width: _.smallWidth,
        height: _.smallHeight
    });

    //这里应该考虑一个适合的比例，最大和最小
    //当拖动框最小的时候，就是图片放大到最大的时候
    //当拖动框最大的时候，就是图片缩小到最小的时候

    //拖动框的大小为 30 - 200
    var _blx = _.lxwBigKuang.width() / _.lxwSmallKuang.width();
    var _bly = _.lxwBigKuang.height() / _.lxwSmallKuang.height();
    if (_blx > _bly) {
        _.BLType = "K";
        _.SF = [
            _.SFMIN||_.lxwBigKuang.width() / _.BL / _.MinSize[0],
            _.lxwBigKuang.width() / _.BL / _.MinSpanSize[0],
            _.lxwBigKuang.width() / _.BL / _.MinSize[0]
        ]
    } else {
        _.BLType = "G";
        _.SF = [
            _.SFMIN || _.lxwBigKuang.height() / _.BL / _.MinSize[1],
            _.lxwBigKuang.height() / _.BL / _.MinSpanSize[1],
            _.lxwBigKuang.height() / _.BL / _.MinSize[1]
        ];
    }

    _.IMGBL = _.SF[0] + (_.SF[1] - _.SF[0]) / 2;
    out(_.SF[0], _.SF[1]);
    //_.IMGBL = 2;

    _.lxwBigImage.stop().animate({
        width: _.Width * _.IMGBL,
        height: _.Height * _.IMGBL
    });
    //这个地方不一定是这样，如果太大的话？

    _.lxwDrop.stop().animate({
        opacity:0.4,
        width: _.lxwBigKuang.width() / _.BL / _.IMGBL,
        height: _.lxwBigKuang.height() / _.BL / _.IMGBL
    });
}


//拖动
function SetDrop() {
    _.lxwDrop.on("mousedown", function (e) {
        _.drop = true;
        _.location = { w: e.pageX, h: e.pageY };
        _.start = {left:_.lxwDrop.position().left, top: _.lxwDrop.position().top }
    });
    _.lxwDrop.on("mouseup", function (e) {
        _.drop = false;
        _.location = { w: e.pageX, h: e.pageY };
    });

    _.lxwDrop.on("mouseout", function (e) {
        _.drop = false;
        _.location = { w: e.pageX, h: e.pageY };
    });

    _.lxwDrop.on("mousemove", function (e) {
        if (_.drop)
            moveSpan({ w: e.pageX, h: e.pageY });
    });
}

function GetTrueNumber(min, max, value) {
    return Math.max(min, Math.min(max, value));    
}

function moveSpan(poi) {
    var _left = poi.w - _.location.w;
    var _top = poi.h - _.location.h;

    var top, left;
    top = GetTrueNumber(0, _.lxwSmallKuang.height() - _.lxwDrop.height(),_.start.top + _top);
    left = GetTrueNumber(0, _.lxwSmallKuang.width() - _.lxwDrop.width(), _.start.left + _left);

    _.lxwDrop.css({
        top: top,
        left: left
    });

    //计算大图滚动
    _.lxwBigImage.stop().animate({
        top: -top * _.BL * _.IMGBL,
        left: -left * _.BL * _.IMGBL
    },50);
}

//全屏预览
function fullscreen() {
    var continer = $(".lxw_container");

    continer.css({
        width: $(window).width(),
        height: $(window).height()
    });

    _.lxwBigKuang.css({
        width: $(window).width(),
        height: $(window).height()
    });

    SetSize();
}