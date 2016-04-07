/*
create beijing lxw 2016-1-3
主要用于图片网站的大图预览，拖动小窗口里面的层，背后的大图也跟随移动，这样可以方便用户观察大图片中的一些细节，对一些艺术品网站的图片非常使用。
增加了鼠标滚轴放大缩小功能
增加了边界限制，可以放大缩小的最大值和最小值设置
增加全屏预览功能
如果要修改样式，请直接修改css
增加拖动动画效果

一个页面只允许出现一个大图像的放大缩小，不允许同时出现多个容器，请考虑使用场景

QQ/email:7103505@qq.com
*/

if (!PREVIEW_DROP) {
    var PREVIEW_DROP = (function () {
        var _ = {};
        var img = new Image();

        function out() {
            var s = "";
            var numargs = arguments.length;
            for (i = 0 ; i < numargs; i++) {
                s += i + ">：" + arguments[i] + ";";
            }
            if (console && console.log)
                console.log(s);
        }
        //container 需要操作的容器
        //minsize 预览区域的矩形大小 [200,200]
        //minspansize 预览区域的拖动框最小大小,如果太小，可能不好拖动 [30,30]
        //moremin 当拖动框已经快超过预览矩形大小，是否还允许拖动，这里设置的最小比例，如果设置为0，代表不能缩放，如果设置为大于0，小于1，代表可以缩放。这里不能大于1.
        function view(container, minsize, minspansize, moremin) {

            _.MinSize = minsize||[200,200];
            //如果是小于30，可能就无法拖动了。
            _.MinSpanSize = minspansize||[30,30];

            //如果需要，就打开
            moremin && moremin > 0 && (_.SFMIN = moremin);

            _.preview_container = container;

            _.lxwBigKuang = _.preview_container.find("div").eq(0);
            _.lxwBigImage = _.lxwBigKuang.find("img").eq(0);
            _.lxwSmallKuang = _.lxwBigKuang.find(".preview").eq(0);
            _.lxwSmallImage = _.lxwSmallKuang.find("img").eq(0);
            _.lxwDrop = _.lxwBigKuang.find("span").eq(0);

            var url = _.lxwBigImage.attr("src");
            _.lxwSmallImage.attr("src", url);

            img.onload = function () {
                _.Width = this.width;
                _.Height = this.height;
                SetSize();
                SetDrop();
                SetWheel();
                $('.gallery_big >img').css('display', 'none');
                Full(1);
                _.preview_container.show();
            }

            img.src = url;
            //"http://yw2015.oss-cn-beijing.aliyuncs.com/yw/201512241719088941362iRZD1JWXrJuWAc3I.jpg";
        }

        function SetWheel() {
            $('div,img').mousewheel(function (event, delta, deltaX, deltaY) {
                event.stopPropagation();
                //console.log(delta);

                if (delta) {
                    _.IMGBL += 0.1 * delta;
                }

                //得到正确数据，0.2 和 3 是需要计算的，最小应该是多少，最大应该是多少
                _.IMGBL = GetTrueNumber(_.SF[0], _.SF[1], _.IMGBL);

                Zoom();
            });
        }

        function Zoom()
        {
            var dropPostion = _.lxwDrop.position();
            var pos = {
                top: dropPostion.top + _.lxwDrop.height() / 2,
                left: dropPostion.left + _.lxwDrop.width() / 2
            };

            var bigImgPostion = _.lxwDrop.position();
            var posbig = {
                top: bigImgPostion.top + _.lxwBigImage.height() / 2,
                left: bigImgPostion.left + _.lxwBigImage.width() / 2
            };

            

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

            //out(_.IMGBL);
            if (_.lxwBigImage.height() < $(window).height() || _.lxwBigImage.width() < $(window).width()) {
                
                _.lxwBigImage.stop().animate({
                    width: _.Width * _.IMGBL,
                    height: _.Height * _.IMGBL,
                    top: _.lxwBigKuang.height() / 2 - _.Height * _.IMGBL / 2,
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

            if ((_.lxwBigImage.height() > $(window).height() - $('header').height() || _.lxwBigImage.width() > $(window).width()) && !$('.gallery_big').is(':hidden')) {
                $('.gallery, header').stop().animate({
                    'opacity': '0.5'
                });
                picturesListenerStart();
                $('#pictures_big').attr('data_moveStop', 0);
            } else {
                picturesListenerStop();
                $('.gallery, header').stop().animate({
                    'opacity': '1'
                });
                $('#pictures_big').attr('data_moveStop', 1);
            }

            
            if (w > _.lxwSmallKuang.width() || h > _.lxwSmallKuang.height()) {
                _.lxwSmallKuang.hide();
            } else {
                _.lxwSmallKuang.show();
            }
           

            var time = new Date().getTime();
            $('#pictures_big').attr('data_timer', time);
        }

        function SetSize(first) {
            var blx = _.Width / _.MinSize[0];
            var bly = _.Height / _.MinSize[1];

            var oldbl = _.BL;

            
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




            if (first != 2) {
                //这里应该考虑一个适合的比例，最大和最小
                //当拖动框最小的时候，就是图片放大到最大的时候
                //当拖动框最大的时候，就是图片缩小到最小的时候

                //拖动框的大小为 30 - 200
                var _blx = _.lxwBigKuang.width() / _.lxwSmallKuang.width();
                var _bly = _.lxwBigKuang.height() / _.lxwSmallKuang.height();
                if (_blx > _bly) {
                    _.SF = [
                        _.SFMIN || _.lxwBigKuang.width() / _.BL / _.MinSize[0],
                        _.lxwBigKuang.width() / _.BL / _.MinSpanSize[0],
                        _.lxwBigKuang.width() / _.BL / _.MinSize[0]
                    ]
                } else {
                    _.SF = [
                        _.SFMIN || _.lxwBigKuang.height() / _.BL / _.MinSize[1],
                        _.lxwBigKuang.height() / _.BL / _.MinSpanSize[1],
                        _.lxwBigKuang.height() / _.BL / _.MinSize[1]
                    ];
                }

                //默认比例
                _.IMGBL = _.SF[0] + (_.SF[1] - _.SF[0]) / 2;
                //out(_.SF[0], _.SF[1]);



                if (first == 1) {
                    //out((_.lxwBigKuang.width() - _.Width * _.IMGBL) / 2, (_.lxwBigKuang.height() - _.Height * _.IMGBL) / 2);

                    _.lxwBigImage.css({
                        left: (_.lxwBigKuang.width() - _.Width * _.IMGBL) / 2,
                        top: (_.lxwBigKuang.height() - _.Height * _.IMGBL) / 2
                    });

                    _.lxwDrop.css({
                        left: (_.lxwSmallKuang.width() - _.lxwBigKuang.width() / _.BL / _.IMGBL) / 2,
                        top: (_.lxwSmallKuang.height() - _.lxwBigKuang.height() / _.BL / _.IMGBL) / 2
                    });
                }

                _.lxwBigImage.stop().animate({
                    width: _.Width * _.IMGBL,
                    height: _.Height * _.IMGBL
                },50);

                _.lxwDrop.stop().animate({
                    opacity: 0.4,
                    width: _.lxwBigKuang.width() / _.BL / _.IMGBL,
                    height: _.lxwBigKuang.height() / _.BL / _.IMGBL
                },50);

                //_.lxwSmallKuang.css({
                //    top: 20 + $('header').height(),
                //    left: $(window).width() - _.lxwSmallKuang.width() - 20
                //});

                //if (first == 2) {
                //    var poi = _.lxwDrop.position();

                //    var top, left;
                //    top = GetTrueNumber(0, _.lxwSmallKuang.height() - _.lxwDrop.height(), poi.top);
                //    left = GetTrueNumber(0, _.lxwSmallKuang.width() - _.lxwDrop.width(), poi.left);

                //    _.lxwDrop.css({
                //        top: top,
                //        left: left
                //    });

                //    //计算大图滚动
                //    _.lxwBigImage.css({
                //        top: -top * _.BL * _.IMGBL,
                //        left: -left * _.BL * _.IMGBL
                //    }, 50);
                //}
            } else {
                //2的时候
                _.lxwDrop.css({
                    width: _.lxwBigKuang.width() / _.BL / _.IMGBL,
                    height: _.lxwBigKuang.height() / _.BL / _.IMGBL
                });

                if (_.lxwBigImage.height() > $(window).height()|| _.lxwBigImage.width() > $(window).width()) {
                    _.lxwBigImage.css({
                        top: _.lxwBigKuang.height() / 2 - _.Height * _.IMGBL / 2,
                        left: _.lxwBigKuang.width() / 2 - _.Width * _.IMGBL / 2
                    });

                    _.lxwDrop.stop().animate({
                        top: _.lxwSmallKuang.height() / 2 - _.lxwDrop.height() / 2,
                        left: _.lxwSmallKuang.width() / 2 - _.lxwDrop.width() / 2
                    },50);
                }
            }

            if (_.lxwBigKuang.width() / _.BL / _.IMGBL > _.lxwSmallKuang.width() || _.lxwBigKuang.height() / _.BL / _.IMGBL > _.lxwSmallKuang.height()) {
                _.lxwSmallKuang.hide();
            } else {
                _.lxwSmallKuang.show();
            }
        }


        //增加拖动事件
        function SetDrop() {
            _.lxwDrop.on("mousedown touchstart", function (e) {
                _.drop = true;
                _.location = { w: e.pageX, h: e.pageY };
                _.start = { left: _.lxwDrop.position().left, top: _.lxwDrop.position().top }
            });
            _.lxwDrop.on("mouseup touchend", function (e) {
                _.drop = false;
                _.location = { w: e.pageX, h: e.pageY };
            });

            _.lxwDrop.on("mouseout", function (e) {
                _.drop = false;
                _.location = { w: e.pageX, h: e.pageY };
            });

            _.lxwDrop.on("mousemove touchmove", function (e) {
                if (_.drop)
                    moveSpan({ w: e.pageX, h: e.pageY });
            });

            /*
            //给容器增加拖动选择
            _.lxwBigImage.on("mousedown touchstart", function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                _.drop_s = true;
                _.start_s = { w: e.pageX, h: e.pageY }
            });
            _.lxwBigImage.on("mouseup touchend", function (e) {
                _.drop_s = false;
                endDrop({ w: e.pageX, h: e.pageY },true);

            });

            _.lxwBigImage.on("mouseout", function (e) {
                _.drop_s = false;
                endDrop({ w: e.pageX, h: e.pageY }, false);
            });

            _.lxwBigImage.on("mousemove touchmove", function (e) {
                if (_.drop_s)
                    drawSpan({ w: e.pageX, h: e.pageY });
            });
            */
        }

        function endDrop(poi,flag)
        {
            var $div = $(".select_div");
            if ($div.length == 0) return;
            //对象移除
            $div.remove();

            if (!flag) return;

            var w = poi.w - _.start_s.w;
            var h = poi.h - _.start_s.h;

            out(Math.abs(w) / 100);
            //先定义100
            _.IMGBL += w / Math.abs(w) * Math.max(0.1, Math.abs(w) / 200);

            //得到正确数据，0.2 和 3 是需要计算的，最小应该是多少，最大应该是多少
            _.IMGBL = GetTrueNumber(_.SF[0], _.SF[1], _.IMGBL);

            //如果比例符合要求，是可以考虑计算中心坐标，如果比例不符合要求，应该就是原来的信息

            Zoom();
        }

        //出现选择层
        function drawSpan(poi)
        {
            var $div = $(".select_div");
            if ($div.length == 0) {
                $div = $("<div class='select_div'></div>");
                _.lxwBigKuang.append($div);
                //out("xx");
            }
                
            var w = poi.w - _.start_s.w;
            var h = poi.h - _.start_s.h;


            var offset = _.lxwBigKuang.offset();

            //out(_.IMGBL);

            $div.css({
                left: w > 0 ? (_.start_s.w - offset.left -4) : (_.start_s.w + w - offset.left + 4),
                top: h > 0 ? (_.start_s.h - offset.top - 4) : (_.start_s.h + h - offset.top + 4),
                width: Math.abs(w),
                height:Math.abs(h)
            });
        }
        

        //取适合的区间数据
        function GetTrueNumber(min, max, value) {
            return Math.max(min, Math.min(max, value));
        }

        //移动对象
        function moveSpan(poi) {
            var _left = poi.w - _.location.w;
            var _top = poi.h - _.location.h;

            var top, left;
            top = GetTrueNumber(0, _.lxwSmallKuang.height() - _.lxwDrop.height(), _.start.top + _top);
            left = GetTrueNumber(0, _.lxwSmallKuang.width() - _.lxwDrop.width(), _.start.left + _left);

            _.lxwDrop.css({
                top: top,
                left: left
            });

            //计算大图滚动
            _.lxwBigImage.stop().animate({
                top: -top * _.BL * _.IMGBL,
                left: -left * _.BL * _.IMGBL
            }, 50);
        }

        //全屏预览
        function Full(first) {
            _.preview_container.css({
                width: $(window).width(),
                height: $(window).height(),
                'position': 'fixed',
                'top': 0
            });
            _.lxwBigKuang.css({
                width: $(window).width(),
                height: $(window).height()
            });
            SetSize(first);
        }

        return { view: view, full: Full };
    })();
}
