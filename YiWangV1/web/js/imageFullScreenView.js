/* imageFullScreenView JS, By lcc807@ikoo8.com */

$(function () {
    $(document).on("mousewheel", "#imageFullScreenView img", function (event, delta) {
        if ($("#imageFullScreenView").find('img').attr('data_enlarge') == '1') {
            var dir = delta > 0 ? true : false,
            vel = Math.abs(delta),
            index = Math.abs($(this).attr('data_index'));
            index = dir ? index + 0.2 : ((index > 1) ? index - 0.2 : 1);
            $(this).css({ 'transform': 'scale3d(' + index + ', ' + index + ', 1)' }).attr('data_index', index);
        }
    });

    $(document).on("mousewheel", "#pictures_big", function (event, delta) {
        var dir = delta > 0 ? true : false,
        vel = Math.abs(delta),

        index = Math.abs($(this).attr('data_index'));

        index = dir ? (index + 0.1) : (index - 0.1);

        index = index > 4 ? 4 : index;
        index = index < 0.1 ? 0.1 : index;

        $(this).css({ 'transform': 'scale3d(' + index + ', ' + index + ', 1)' }).attr('data_index', index);
        var time = new Date().getTime();
        $(this).attr('data_timer', time);


        $(this).attr('data_width_3d', $(this).attr('data_width_o') * index);
        $(this).attr('data_height_3d', $(this).attr('data_height_o') * index);

        $('.gallery_big').imageScroller();

        if (index < 1) {
            $('.gallery_big >img').css({
                'top': $('.gallery_big').height() / 2 - $('.gallery_big >img').outerHeight() / 2,
                'left': $('.gallery_big').width() / 2 - $('.gallery_big >img').outerWidth() / 2
            });
            $('.gallery_big .preview').stop().fadeOut(200);
        } else {
            $('.gallery_big .preview').stop().fadeIn(200);
        }
        if (($(this).offset().top < $('header').height() || $(this).offset().left < 0) && !$('.gallery_big').is(':hidden')) {
            $('.gallery, header').stop().animate({
                'opacity': '0.5'
            });
            imageMove('pictures_big');
            $(this).attr('data_moveStop', 0);
            picturesListenerStart();
        } else {
            picturesListenerStop();
            $('.gallery, header').stop().animate({
                'opacity': '1'
            });
            Gallery_Resize();
            $(this).attr('data_moveStop', 1);
        }
        if (index <= 1) {
            picturesListenerStop();
            $('.gallery, header').stop().animate({
                'opacity': '1'
            });
            Gallery_Resize();
            $(this).attr('data_moveStop', 1);
        }
    });

    $(document).on("mousemove", "#pictures_big", function (event, delta) {
        var time = new Date().getTime();
        $(this).attr('data_timer', time);
    });    
});

pictures_big_EventListenerId = null;
pictures_big_EventListener = 0;
function picturesListenerStart() {
    pictures_big_EventListener = true;
    var method = function () {
        var time = new Date().getTime();
        if ($('#pictures_big').attr('data_moveStop')) {
            //console.log(time);
            if (time - $('#pictures_big').attr('data_timer') > 2000) {
                $('.gallery, header').stop().animate({
                    'opacity': '0'
                }, 10);
            } else {
                $('.gallery, header').stop().animate({
                    'opacity': '0.5'
                }, 10);
            }
        }
    };
    picturesInterval(method, 800);
}
function picturesListenerStop() {
    pictures_big_EventListener = false;
    clearTimeout(pictures_big_EventListenerId);
}
function picturesInterval(fun, time) {
    if (!pictures_big_EventListener) {
        return false;
        clearTimeout(pictures_big_EventListenerId);
    }
    fun();
    if (!pictures_big_EventListenerId) {
        pictures_big_EventListenerId = setTimeout(function () {
            picturesInterval(fun, time);
            clearTimeout(pictures_big_EventListenerId);
        }, time);
    }
}

function imageFullScreenView_Init(imgSrc, enlarge, drag) {
    var imgDiv = $('body').find('#imageFullScreenView');
    if (!imgDiv.length) {
        $('body').append('<div id="imageFullScreenView"><a href="javascript:void(0);" onclick="imageFullScreenView_Close();">×</a><span></span><img src="" id="imageFullScreenViewDrag"/></div>');
        imgDiv = $('body').find('#imageFullScreenView');
    }

    win_width = $(window).width();
    win_height = $(window).height();
    $('html, body').addClass('overeHidden');
    imgDiv.css({
        'position': 'fixed',
        'left': '0',
        'bottom': '0',
        'right': '0',
        'top': '0',
        'z-index': '9999999',
        'text-align': 'center',
        'padding': '0',
        'margin': '0',
        'opacity': '1'
    });
    imgDiv.find('span').css({
        'position': 'absolute',
        'left': '0',
        'bottom': '0',
        'right': '0',
        'top': '0',
        'opacity': '0',
        'background': '#000',
        'z-index': '1',
        'color': '#FFF',
        'font-size': '14px',
        'padding': '10px'
    }).stop().animate({
        'opacity': '0.5'
    }).html('加载中，请稍后...');
    imgDiv.find('a').css({
        'position': 'absolute',
        'right': '20px',
        'top': '20px',
        'z-index': '3',
        'color': '#000',
        'font-size': '20px',
        'border': '1px solid #CCC',
        'width': '35px',
        'height': '35px',
        'line-height': '35px',
        'text-align': 'center',
        'text-decoration': 'none',
        'border-radius': '50%',
        'background': '#FFF',
        'box-shadow': '0, 0, 5px, #000;',
        'transition': 'background, 0.5s',
        'padding': '0',
        'margin': '0'
    }).hover(function () {
        $(this).css({'background': '#AAA', 'color': '#FFF'});
    }, function () {
        $(this).css({ 'background': '#FFF', 'color': '#000' });
    });
    imgDiv.find('img').css({
        'position': 'absolute',
        'z-index': '2',
        'padding': '0',
        'margin': '0',
        'left': win_width / 2 - imgDiv.find('img').outerWidth() / 2,
        'top': win_height / 2 - imgDiv.find('img').outerHeight() / 2
    })
        .attr('src', '/web/images/loading.gif')
        .attr('data_index', '1')
        .attr('data_drag', drag ? 1 : 0)
        .attr('data_enlarge', enlarge ? 1 : 0);
    var images_thumb = new Image();
    images_thumb.src = imgSrc;
    if (images_thumb.complete) {
        imageFullScreenView_Set(imgSrc, images_thumb.width, images_thumb.height);
    } else {
        images_thumb.onload = function () {
            imageFullScreenView_Set(imgSrc, images_thumb.width, images_thumb.height);
        }
    }
}

function imageFullScreenView_Set( img, img_w, img_h ) {
    if (!$("#imageFullScreenView")) {
        return false;
    }
    $("#imageFullScreenView").find('span').html('');
    $("#imageFullScreenView").find('img').css({
        'position': 'absolute',
        'left': 0,
        'top': '0',
        'cursor': 'move',
        'display': 'inline-block',
        'height': 'auto !important',
        'max-height': '80%',
        'max-width': '80%',
        'vertical-align': 'middle',
        'width': 'auto !important',
        'transform': 'scale3d(1, 1, 1)',
        'transition': 'transform 0.3s ease 0s, opacity 0.15s ease 0s'
    })
        .attr('src', img)
        .attr('data_width', img_w)
        .attr('data_height', img_h)
        .attr('data_width_o', $(this).outerWidth())
        .attr('data_height_o', $(this).outerHeight());
    imageFullScreenView_Move();
    imageFullScreenView_Resize();
    $(window).on('resize', imageFullScreenView_Resize);
}

function imageFullScreenView_Resize() {
    win_width = $(window).width();
    win_height = $(window).height();
    setTimeout(function () {
        $("#imageFullScreenView").find('img').css({
            'top': win_height / 2 - $("#imageFullScreenView").find('img').outerHeight() / 2,
            'left': win_width / 2 - $("#imageFullScreenView").find('img').outerWidth() / 2
        });
    }, 1);
}

function imageFullScreenView_Close() {
    $("#imageFullScreenView").fadeOut(500, function () { $(this).remove(); });
    $('html, body').removeClass('overeHidden');
}

function imageFullScreenView_Move() {
    if ($("#imageFullScreenView").find('img').attr('data_drag') == '1') {
        imageMove('imageFullScreenViewDrag');
    }
}

function addEvent(obj, sType, fn) {
    try{
        if (obj.addEventListener) {
            obj.addEventListener(sType, fn, false);
        } else {
            obj.attachEvent('on' + sType, fn);
        }
    }catch(e){}
}
function removeEvent(obj, sType, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(sType, fn, false);
    } else {
        obj.detachEvent('on' + sType, fn);
    }
};
function prEvent(ev) {
    var oEvent = ev || window.event;
    if (oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    return oEvent;
}
function addWheelEvent(obj, callback) {
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        addEvent(obj, 'DOMMouseScroll', wheel);
    } else {
        addEvent(obj, 'mousewheel', wheel);
    }
    function wheel(ev) {
        var oEvent = prEvent(ev),
        delta = oEvent.detail ? oEvent.detail > 0 : oEvent.wheelDelta < 0;
        callback && callback.call(oEvent, delta);
        return false;
    }
}
function imageMove( id ) {
    var oImg = document.getElementById(id);
    addEvent(oImg, 'mousedown', function (ev) {
        return false;
        var oEvent = prEvent(ev),
        oParent = oImg.parentNode,
        disX = oEvent.clientX - oImg.offsetLeft,
        disY = oEvent.clientY - oImg.offsetTop,
        startMove = function (ev) {
            if (oImg.attributes.getNamedItem("data_moveStop").nodeValue == 1) {
                return false;
            }

            if (oParent.setCapture) {
                oParent.setCapture();
            }
            var oEvent = ev || window.event,
            l = oEvent.clientX - disX,
            t = oEvent.clientY - disY;
            oImg.style.left = l + 'px';
            oImg.style.top = t + 'px';
            oParent.onselectstart = function () {
                return false;
            }
        }, endMove = function (ev) {
            if (oParent.releaseCapture) {
                oParent.releaseCapture();
            }
            oParent.onselectstart = null;
            removeEvent(oParent, 'mousemove', startMove);
            removeEvent(oParent, 'mouseup', endMove);
        };
        addEvent(oParent, 'mousemove', startMove);
        addEvent(oParent, 'mouseup', endMove);
        return false;
    });
}


function Gallery_Init() {
    $('html, body').addClass('overeHidden').animate({ scrollTop: 0 }, 'slow');
    $('header').css({ 'z-index': '7' });
    $('.gallery_big').css({
        'position': 'absolute',
        'z-index': '6',
        'width': $('.gallery .pictures').width() * 1,
        'height': $('.gallery .pictures').height(),
        'top': '0',
        'left': '0'
    }).fadeIn(100);
    $('.gallery_big a').css({
        'position': 'absolute',
        'right': '0',
        'top': '20px',
        'z-index': '3',
        'color': '#000',
        'font-size': '20px',
        'border': '1px solid #CCC',
        'width': '30px',
        'height': '30px',
        'line-height': '30px',
        'text-align': 'center',
        'text-decoration': 'none',
        'border-radius': '50%',
        'background': '#FFF',
        'box-shadow': '0, 0, 5px, #000;',
        'transition': 'background, 0.5s',
        'padding': '0',
        'margin': '0'
    }).hover(function () {
        $(this).css({ 'background': '#AAA', 'color': '#FFF' });
    }, function () {
        $(this).css({ 'background': '#FFF', 'color': '#000' });
    });
    $('body').on("click", ".gallery_big a", function () {
        picturesListenerStop(); 
        $('.gallery_big').stop().fadeOut(200, function () {
            $('.gallery, header').stop().animate({
                'opacity': '1'
            });
            Gallery_Resize();
            $('.gallery_big img').attr('data_moveStop', 1).attr('style', '');
            $('html, body').removeClass('overeHidden').animate({ scrollTop: 0 }, 'slow');
            $('header').css({ 'z-index': '1' });
            $('.gallery .detailBox, .gallery .pictures').animate({
                'opacity': '1'
            });
        });
    });
    $('.gallery_big >img').attr('src', '/web/images/loading.gif').attr('id', 'pictures_big').css({
        'position': 'relative',
        'width': 'auto',
        'height': 'auto',
        'display': 'block'
    }).attr('data_index', 1);
    $('.gallery_big >img').css({
        'top': $('.gallery_big').height() / 2 - $('.gallery_big >img').outerHeight() / 2,
        'left': $('.gallery_big').width() / 2 - $('.gallery_big >img').outerWidth() / 2
    }).attr('data_index', 1);

    $('.gallery .detailBox, .gallery .pictures').animate({
        'opacity': '0'
    });

    //setTimeout(function () {  //测试效果。延迟1秒；生产环境去掉。
    //    var images_thumb = new Image();
    //    images_thumb.src = src;
    //    if (images_thumb.complete) {
    //        Gallery_Set(src, images_thumb.width, images_thumb.height);
    //    } else {
    //        images_thumb.onload = function () {
    //            Gallery_Set(src, images_thumb.width, images_thumb.height);
    //        }
    //    }
    //}, 1000);
}
function Gallery_Set(img, img_w, img_h) {
    $('.gallery .detailBox, .gallery .pictures').animate({
        'opacity': '0'
    });
    $('.gallery_big >img').fadeOut(200, function () {
        $(window).on('resize', Gallery_Resize);
        $('.gallery_big >img').attr('id', 'pictures_big').css({
            'position': 'relative',
            'left': 0,
            'top': 0,
            //'cursor': 'move',
            'display': 'inline-block',
            'vertical-align': 'middle',
            'width': '100%',
            'height': 'auto',
            'transform': 'scale3d(1, 1, 1)',
            'transition': 'transform 0.3s ease 0s, opacity 0.15s ease 0s !important',
            'transition': 'opacity 0.15s ease 0s'
        })
            .attr('src', img)
            .attr('data_index', 1)
            .attr('data_width', img_w)
            .attr('data_height', img_h)
            .attr('data_width_o', $(this).outerWidth())
            .attr('data_height_o', $(this).outerHeight())
            .attr('data_width_3d', $(this).outerWidth())
            .attr('data_height_3d', $(this).outerHeight())
        Gallery_Resize();
    });
}
function Gallery_Resize() {
    $('.gallery_big').css({
        'width': $('.gallery .pictures').width(),
        'height': $('.gallery .pictures').height()
    });
    $('.gallery_big >img').css({
        //'top': $('.gallery_big').height() / 2 - $('.gallery_big >img').outerHeight() / 2,
        //'left': $('.gallery_big').width() / 2 - $('.gallery_big >img').outerWidth() / 2
    }).fadeIn(200, function () {
        $('.gallery_big').imageScroller();
    });
}