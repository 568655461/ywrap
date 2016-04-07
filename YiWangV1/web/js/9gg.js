var arrT = {
    a11: 30,
    a21: 3,
    a31: 5,
    a12: 1,
    a13: 0
};

function clone(obj) {
    function Fn() { }
    Fn.prototype = obj;
    var o = new Fn();
    for (var a in o) {
        if (typeof o[a] == "object") {
            o[a] = clone(o[a]);
        }
    }
    return o;
}

function lxwParse() {

    var ARR = [];
    for (var k2 in arrT)
        for (var i2 = 0; i2 < arrT[k2]; i2++)
            ARR.push(k2);

    var TEMP = ARR.concat();

    //申明一个容器，可以不断的给里面增加
    var __ = [];//存储结果
    var count = 0;//给对象编号
    var rows = 3;//行数
    var cols = 0;//开始列
    var _ = {};//存储被占用的空格
    ARR = [];//一个原始数组

    //1:1可以变成2:2，也可以变成3:3

    //21可以变成4:2?

    //31可以变成9:3

    //先只考虑1:1的变形情况，最终变形完毕的格子能被3整除最好。
    function change(arr, old, _new, count) {
        for (var m = 0; m < arr.length && count > 0; m++) {
            if (arr[m] == old) {
                arr[m] = _new;
                count--;
            }
        }
    }

    //得到对象的长度
    function getlength(arr) {
        var count = 0;
        for (var m = 0; m < arr.length; m++) {
            var t = arr[m];
            count += parseInt(t[1]) * parseInt(t[2]);
        }

        return count;
    }

    //只考虑a11的情况放大，其他情况先不考虑
    function checkArr() {
        //得到1的数量
        var a11count = parseInt(arrT.a11);
        var a31count = parseInt(arrT.a31);

        //for(var j=0;j<a31count;j++){
        //	var arr = TEMP.concat();
        //	change(arr,"a31","a93",(j+1));

        for (var m = 0; m <= a11count; m++) {
            var arr = TEMP.concat();
            change(arr, "a11", "a33", m);

            //m个变成4
            for (var n = 0; n <= a11count - m; n++) {
                //n个变成9
                change(arr, "a11", "a22", n);

                if (getlength(arr) % 3 == 0) {
                    TEMP = arr.concat();
                    return true;
                }
            }
        }
        //}

        return false;
    }

    //单独处理a31,a12,a21的情况，全部是他们，显示效果比较特殊。没有任何组合的时候
    if (TEMP.length == arrT.a31) {
        for (var m = 0; m < TEMP.length; m++) {
            __[count++] = { id: "a31", list: [(m * 3) + "," + 0], w: 3, h: 3 };
        }
        return __;
    }

    if (TEMP.length == arrT.a21) {
        for (var m = 0; m < TEMP.length; m++) {
            __[count++] = { id: "a21", list: [m * 6 + "," + 0], w: 6, h: 3 };
        }
        return __;
    }

    if (TEMP.length == arrT.a12) {
        for (var m = 0; m < TEMP.length; m++) {
            __[count++] = { id: "a12", list: [m * 2 + "," + 0], w: 2, h: 3 };
        }
        return __;
    }

    //数量小于4的时候
    if (TEMP.length <= 4)
    {
        var c = 0;
        for (var k = 0; k < TEMP.length; k++) {
            var a = TEMP[k];
            if (a=="a31") {
                __[count++] = { id: a, list: [c + "," + 0], w: 3, h: 3 };
                c += 3;
            }

            if (a == "a21") {
                __[count++] = { id: a, list: [c + "," + 0], w: 6, h: 3 };
                c += 6;
            }

            if (a == "a12") {
                __[count++] = { id: a, list: [c + "," + 0], w: 2, h: 3 };
                c += 2;
            }
            if (a == "a11") {
                __[count++] = { id: a, list: [c + "," + 0], w: 3, h: 3 };
                c += 3;
            }
            if (a == "a13") {
                __[count++] = { id: a, list: [c + "," + 0], w: 1, h: 3 };
                c += 1;
            }
        }

        return __;
    }


    if (!checkArr()) {
        //console.log("找不到最好的比例？");
        //return null;
    }


    function addnode1(a, v1, w, h) {
        _[v1] = 1;
        __[count++] = { id: a, list: [v1], w: w, h: h };
    }
    function addnode2(a, v1, v2, w, h) {
        _[v1] = 1;
        _[v2] = 1;
        __[count++] = { id: a, list: [v1, v2], w: w, h: h };
    }
    function addnode3(a, v1, v2, v3, w, h) {
        _[v1] = 1;
        _[v2] = 1;
        _[v3] = 1;
        __[count++] = { id: a, list: [v1, v2, v3], w: w, h: h };
    }
    function addnode4(a, v1, v2, v3, v4, w, h) {
        _[v1] = 1;
        _[v2] = 1;
        _[v3] = 1;
        _[v4] = 1;
        __[count++] = { id: a, list: [v1, v2, v3, v4], w: w, h: h };
    }

    function addnode9(a, v1, v2, v3, v4, v5, v6, v7, v8, v9, w, h) {
        _[v1] = 1;
        _[v2] = 1;
        _[v3] = 1;
        _[v4] = 1;
        _[v5] = 1;
        _[v6] = 1;
        _[v7] = 1;
        _[v8] = 1;
        _[v9] = 1;
        __[count++] = { id: a, list: [v1, v2, v3, v4, v5, v6, v7, v8, v9], w: w, h: h };
    }


    //27个格子
    function addnode93(a, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12, v13, v14, v15, v16, v17, v18, v19, v20, v21, v22, v23, v24, v25, v26, v27, w, h) {
        _[v1] = 1; _[v2] = 1; _[v3] = 1; _[v4] = 1; _[v5] = 1; _[v6] = 1; _[v7] = 1; _[v8] = 1; _[v9] = 1;
        _[v11] = 1; _[v12] = 1; _[v13] = 1; _[v14] = 1; _[v15] = 1; _[v16] = 1; _[v17] = 1; _[v18] = 1; _[v19] = 1;
        _[v21] = 1; _[v22] = 1; _[v23] = 1; _[v24] = 1; _[v25] = 1; _[v26] = 1; _[v27] = 1; _[v10] = 1; _[v20] = 1;

        __[count++] = {
            id: a, list: [v1, v2, v3, v4, v5, v6, v7, v8, v9,
                v10, v11, v12, v13, v14, v15, v16, v17, v18,
                v19, v20, v21, v22, v23, v24, v25, v26, v27], w: w, h: h
        };
    }



    //a插入的对象
    //c插入的位置 x坐标
    //r插入的位置 y坐标
    function insert(a, c, r) {
        if (a == "a11") {
            addnode1(a, addc(c) + "," + r, 1, 1);
            return true;
        }

        if (a == "a22") {
            if (r > 1
            || _[(c + 1) + "," + r] === 1
            || _[c + "," + (r + 1)] === 1
            || _[(c + 1) + "," + (r + 1)] === 1
            )
                return false;

            addnode4(a,
            addc(c) + "," + r,
            addc(c + 1) + "," + r,
            addc(c) + "," + (r + 1),
            addc(c + 1) + "," + (r + 1),

            2, 2);
            return true;
        }

        if (a == "a33") {
            //代表9个格子没有任何东西
            if (r > 0
            || _[(c + 0) + "," + (r + 0)] === 1//已经判断过
            || _[(c + 0) + "," + (r + 1)] === 1
            || _[(c + 0) + "," + (r + 2)] === 1
            || _[(c + 1) + "," + (r + 0)] === 1
            || _[(c + 1) + "," + (r + 1)] === 1
            || _[(c + 1) + "," + (r + 2)] === 1
            || _[(c + 2) + "," + (r + 0)] === 1
            || _[(c + 2) + "," + (r + 1)] === 1
            || _[(c + 2) + "," + (r + 2)] === 1
            )
                return false;

            addnode9(a,
            addc(c) + "," + (r + 0),
            addc(c) + "," + (r + 1),
            addc(c) + "," + (r + 2),

            addc(c + 1) + "," + (r + 0),
            addc(c + 1) + "," + (r + 1),
            addc(c + 1) + "," + (r + 2),

            addc(c + 2) + "," + (r + 0),
            addc(c + 2) + "," + (r + 1),
            addc(c + 2) + "," + (r + 2),


            3, 3);
            return true;
        }

        if (a == "a21") {
            if (_[(c + 1) + "," + r] === 1)
                return false;

            addnode2(a, addc(c) + "," + r, addc(c + 1) + "," + r, 2, 1);
            return true;
        }

        if (a == "a31") {
            if (_[(c + 1) + "," + r] === 1 || _[(c + 2) + "," + r] === 1)
                return false;
            addnode3(a, addc(c) + "," + r, addc(c + 1) + "," + r, addc(c + 2) + "," + r, 3, 1);
            return true;
        }

        if (a == "a12") {
            if (r > 1 || _[c + "," + (r + 1)] === 1)
                return false;
            addnode2(a, addc(c) + "," + r, addc(c) + "," + (r + 1), 1, 2);
            return true;
        }
        if (a == "a13") {
            if (r > 0 || _[c + "," + (r + 1)] === 1 || _[c + "," + (r + 2)] === 1)
                return false;
            addnode3(a, addc(c) + "," + r, addc(c) + "," + (r + 1), addc(c) + "," + (r + 2), 1, 3);
            return true;
        }
    }

    function addc(c) {
        cols = Math.max(cols, c);
        return c;
    }

    function poi(x, y) {
        return x + "," + y;
    }

    function _poi(x, y) {
        return _[x + "," + y];
    }

    function findo(c, r) {
        for (var k = 0; k < __.length; k++) {
            var arr = __[k];
            for (var m = 0; m < arr.list.length; m++) {
                if (arr.list[m] == poi(c, r))
                    return arr;
            }
        }

        return null;
    }

    //判断点是否在自己的身上
    function findmy(arr, cr) {
        for (var m = 0; m < arr.length; m++) {
            if (arr[m] == cr)
                return true;
        }

        return false;
    }

    //判断对象是否能够左右移动
    function rightleft(o, f) {
        for (var m = 0; m < o.list.length; m++) {
            var c = parseInt(o.list[m].split(',')[0]) + f;
            var r = parseInt(o.list[m].split(',')[1]);

            if (_[poi(c, r)] === 1 && !findmy(o.list, poi(c, r)))
                return false;
        }

        var len = o.list.length;
        //代表可以移动
        for (var m = 0; m < len; m++) {
            var c = parseInt(o.list[m].split(',')[0]) + f;
            var r = parseInt(o.list[m].split(',')[1]);

            if (_poi(c, r) === 1) continue;
            //设置上点被占用
            _[poi(c, r)] = 1;
            o.list.push(poi(c, r));
        }
        o.w += f;

        return true;
    }

    //上下
    function topbottom(o, f) {
        for (var m = 0; m < o.list.length; m++) {
            var c = parseInt(o.list[m].split(',')[0]);
            var r = parseInt(o.list[m].split(',')[1]) + f;

            if (_[poi(c, r)] === 1 && !findmy(o.list, poi(c, r)))
                return false;
        }

        var len = o.list.length;
        //代表可以移动
        for (var m = 0; m < len; m++) {
            var c = parseInt(o.list[m].split(',')[0]);
            var r = parseInt(o.list[m].split(',')[1]) + f;

            if (_poi(c, r) === 1) continue;
            //设置上点被占用
            _[poi(c, r)] = 1;
            o.list.push(poi(c, r));
        }
        o.h += f;

        return true;
    }

    //处理对象的上下左右的空格情况
    function other(o) {
        //代表已经被别人填充
        if (_[o] === 1) return true;
        //c-1
        var c = parseInt(o.split(',')[0]);
        var r = parseInt(o.split(',')[1]);

        var tmp = 0;

        tmp = r - 1;
        if (tmp >= 0) {
            if (_poi(c, tmp) === 1) {
                var target = findo(c, tmp);
                if (topbottom(target, 1))
                    return true;
            }
        }

        tmp = c - 1;
        if (tmp >= 0) {
            if (_poi(tmp, r) === 1) {
                var target = findo(tmp, r);
                if (rightleft(target, 1))
                    return true;
            }
        }

        tmp = r + 1;
        if (tmp <= rows) {
            if (_poi(c, tmp) === 1) {
                var target = findo(c, tmp);
                if (topbottom(target, -1))
                    return true;
            }
        }

        tmp = c + 1;
        if (tmp <= cols) {
            if (_poi(tmp, r) === 1) {
                var target = findo(tmp, r);
                if (rightleft(target, -1))
                    return true;
            }
        }

        //这里是否可能不太确定？
        //console.log("这里是否可能不太确定？" + o);
        return false;
    }

    function init() {
        __ = [];
        count = 0;
        rows = 3;
        cols = 0;
        _ = {};
        ARR = TEMP.concat();
    }

    //最多随机运行50次，如果50次中发现最好的机会，就使用，否则就用空格最少的组合。
    var MAX = 50;
    var result = [];
    var _new = {};
    var __new = [];

    while (MAX-- > 0) {
        init();
        while (1) {
            if (ARR.length == 0) break;
            var index = parseInt(ARR.length * Math.random());
            var a = ARR[index];


            //查找容器里面哪里有没有数据，然后判断数据是否能够放的下
            var c = 0;
            var r = 0;

            while (1) {
                if (ARR.length == 0) break;
                if (_[c + "," + r] === 1) {
                    r++;
                    if (r % rows == 0) {
                        r = 0;
                        c++;
                        continue;
                    }
                } else {
                    //代表有空，他的右侧不知道是否有空
                    //能不能插入，插入到哪里
                    if (insert(a, c, r)) {
                        //移除
                        ARR.splice(index, 1);
                        break;
                    }
                    else {
                        r++;
                        if (r % rows == 0) {
                            r = 0;
                            c++;
                            continue;
                        }
                    }
                }
            }
        }

        //判断哪里还存在空格，然后进行周围扩充
        //console.log(">>>>>>>>>>>>" + cols);
        var cc = 0;
        var wtckg = [];

        while (cc <= cols) {
            for (var r = 0; r < rows; r++) {
                if (!(_[cc + "," + r] === 1)) {
                    wtckg.push(cc + "," + r);
                    //console.log(cc + "," + r);
                }
            }

            cc++;
        }

        if (result.length == 0) {
            __new = __.concat();
            _new = clone(_);

            result = wtckg.concat();
        }
        else {
            if (wtckg.length < result.length) {
                result = wtckg.concat();

                __new = __.concat();
                _new = clone(_);
            }
        }


        //最佳组合
        if (result.length == 0) {
            break;
        }
    }

    //还原回来
    __ = __new;
    _ = _new;

    //排列出来不一定是最优的结果。
    if (result.length == 0) {
        //__里面就是排列的对象，就是符合要求的。
        //console.log("全部符合要求");
        for (var o in __) {
            //console.log(__[o].id + ">" + __[o].list.join("|") + ">" + __[o].w + "," + __[o].h);
        }
    }
    else {
        //把已经完成的格子循环出来
        //console.log("补充格子之前");
        for (var o in __) {
            ////console.log(__[o].id + ">" + __[o].list.join("|") + ">" + __[o].w + "," + __[o].h);
        }

        //result 里面是没有被填充的对象，是需要考虑变形放大处理
        //排列顺序总是从上到下，从左到右
        //console.log("空格个数" + result.length);
        for (var k = 0; k < result.length; k++) {
            var o = result[k];
            ////console.log(o);
        }

        //console.log("开始进行补充格子");
        for (var k = 0; k < result.length; k++) {
            var o = result[k];
            other(o);
        }

        //console.log("补充格子之后");
        for (var o in __) {
            ////console.log(__[o].id + ">" + __[o].list.join("|") + ">" + __[o].w + "," + __[o].h);
        }
    }

    return __;
}

function create9(json, img_groups_data, id, box_w, box_h) {
    arrT.a11 = json.a11 || 0;
    arrT.a21 = json.a21 || 0;
    arrT.a31 = json.a31 || 0;
    arrT.a12 = json.a12 || 0;
    arrT.a13 = json.a13 || 0;

    //下面是生成代码
    T = lxwParse();
    //T进行排序
    function compare(a, b) {
        var v1 = parseInt(a.list[0].split(',')[0]);
        var v2 = parseInt(b.list[0].split(',')[0]);
        return v1 < v2 ? -1 : 1;
    }

    var T2 = T.sort(compare);
    T = T2;

    var _img_groups_data = clone(img_groups_data);
    reset9(T, _img_groups_data, id, box_w, box_h);
}

function reset9(T, img_groups_data, id, box_w, box_h) {
    var _img_groups_data = clone(img_groups_data);
    var WIDTH = box_w;
    var HEIGHT = box_h;
    
    var id_width = 0;
    var left_offset = 0;
    var _left_offset = 0;
    var left_offset = 0, _left_offset = 0;
    for (var o in T) {
        ////console.log(T[o].list[0]);
        //console.log(T[o].id + ">" + T[o].list.join("|") + ">" + T[o].w + "," + T[o].h);
        //html += ("<div class='note' style='position:absolute;left:" + parseInt(T[o].list[0].split(',')[0]) * WIDTH + "px;top:" + parseInt(T[o].list[0].split(',')[1]) * HEIGHT + "px;width:" + T[o].w * WIDTH + "px;height:" + T[o].h * HEIGHT + "px'>" + T[o].id + "</div>");

        var type = T[o].id;
        if (T[o].id == 'a33' || T[o].id == 'a22') {
            T[o].id = 'a11';
        }
        var data = _img_groups_data[T[o].id].pop();
        var equally_width = T[o].w * WIDTH - 1;
        var equally_height = T[o].h * HEIGHT - 1;
        //if (type == 'a33' || type == 'a13') {  //判断有误
        if (T[o].h == '3') {
            var old_equally_width = equally_width;
            var new_equally_width = equally_height / data.height * data.width + 10;
            var __left_offset = (old_equally_width - new_equally_width) - 20;
            equally_width = new_equally_width + 20;
            _left_offset += __left_offset;
            //console.log(old_equally_width + ' --- ' + new_equally_width + ' -- ' + _left_offset);
        }
        
        if ($("#map_" + o).length == 0) {
            var html = "";
            html +=
                '<div class="note photo" id="map_' + o + '" data_type="' + type + '">' +
                '<div class="note-content" onclick="window.open(\'/artworks/' + data.id + '\')">' +
                '<figure><img src="' + data.src + '" /></figure>' +
                '</div>' +
                '<div class="info">' +
                '<div class="row clearfix">' + 
                '<p class="clearfix">' + (data.name && '<span>' + data.name + '</span>') + '</p>' +
                '<p class="clearfix">' + (data.date && ($.trim(data.date) == "" ? '' : '<span>' + data.date + '</span>')) + (data.size && '<span>' + data.size + '</span>') + '</p>' +
                '</div>' +
                '<div class="f_l">' +
                '<p class="clearfix">' + (data.price && '¥' + data.price + '') + '</p>' +
                '</div>' +
                '<div class="f_r">' +

                '<a href="javascript:void(0);" v1=' + data.id + ' v2=' + data.chushou + ' onclick="addcart(this);" class="icon_a ' + (data.gwc == 1 ? 'active' : '') + '"><img src="/svg_file?path=/web/images/icon_cart_o.svg&rgb=255,255,255" class="defualt"/><img src="/svg_file?path=/web/images/icon_cart_o.svg&rgb=255,3,3" class="active"/></a>' +
                '<a href="javascript:void(0);" v1=' + data.id + ' onclick="mylike(this);" class="icon_a ' + (data.sfsc == 1 ? 'active' : '') + ' "><img src="/svg_file?path=/web/images/icon_heart_empty_o.svg&rgb=255,255,255" class="defualt"/><img src="/svg_file?path=/web/images/icon_heart_o.svg&rgb=255,3,3" class="active"/></a>' +

                '</div>' +
                '</div>' +
                '</div>';
            $("#" + id).append(html);
        }

        var equally_top = parseFloat(T[o].list[0].split(',')[1]) * HEIGHT;
        var equally_left = parseFloat(T[o].list[0].split(',')[0]) * WIDTH - left_offset;
        var equally_style = "position:absolute;left:" + equally_left + "px;top:" + equally_top + "px;width:" + equally_width + "px;height:" + equally_height + "px";
        var note_content_style = 'width:' + equally_width + 'px;height:' + equally_height + 'px';
        var img_style = img_map_style(data.width, data.height, equally_width, equally_height);

        $(equally_style.split(';')).each(function (i,v) {
            $("#map_" + o).css(v.split(':')[0], v.split(':')[1]);
        })
        $(note_content_style.split(';')).each(function (i, v) {
            $("#map_" + o).find('.note-content, figure').css(v.split(':')[0], v.split(':')[1]);
        })
        $(img_style.split(';')).each(function (i, v) {
            $("#map_" + o).find('.note-content img').css(v.split(':')[0], v.split(':')[1]);
        })
        $("#map_" + o).find('.info').css('width', equally_width - 10);

        left_offset = _left_offset;
        id_width = equally_left + equally_width;
    }

    
    document.getElementById(id).style.width = id_width + 'px';

    $('.imagesList').css({
        'width': $('#viewport').outerWidth()
    });

    itemSet();
    proLayoutSet();
}

window.onload = function () {
    //document.getElementById("content").innerHTML = html;
}