
//-------------------------最好放在head里面的代码开始----------------------------//


/** 完善旧浏览器可能不支持的方法 */

;(function()
{
    // 如果不支持trim
    if(!String.prototype.trim)
    {
        String.prototype.trim = function()
        {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }

    // 如果不支持startsWith
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith = function(searchString, position)
        {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }

    // 如果不支持endsWith
    if (!String.prototype.endsWith)
    {
        String.prototype.endsWith = function(searchString, position)
        {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
            {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }
})();



/* 移动字体适配，这段代码不是必须的，根据需要取舍 */
;(function(window, document)
{
    function resize()
    {
        var originalWidth = 720, // 设计稿默认宽度
            originalFontSize = 100, // 设计稿字体默认大小
            elem = document.documentElement, // html根元素
            clientWidth = elem.clientWidth, // 由于宽度一般不存在被系统通知栏或者输入法挡住，所以不需要获取整个屏幕的宽度
            // 高度最好取整个屏幕的，否则输入法弹出来字体会变小，但是不同浏览器获取的高度会不同，Chrome获取的是显示高度，UC获取的真实分辨率高度
            clientHeight = (screen.height > 0 && screen.height <= elem.clientHeight) ? screen.height : elem.clientHeight,
            // 横屏 landscape ，竖屏 portrait ，0或180表示竖屏，90或-90表示横屏
            isPortrait = window.orientation === undefined ? (clientWidth < clientHeight) : (window.orientation % 180 == 0);
        var width = (isPortrait ? clientWidth : clientHeight) || originalWidth;
        width = width < 240 ? 240 : (width > originalWidth ? originalWidth : width);
        elem.style.fontSize = Math.round(originalFontSize * width / originalWidth) + 'px';
    }
    if('onorientationchange' in window) window.addEventListener('onorientationchange', resize, false);
    else window.addEventListener('resize', resize, false); // 输入法弹出来时会触发resize，所以手机上最好不开启resize
    resize(); // 管它三七二十一，先执行一遍再说（不同浏览器可能会有少部分问题）
    document.addEventListener('DOMContentLoaded', resize, false);
})(window, document);


//-------------------------最好放在head里面的代码结束----------------------------//



//TODO 键值封装



/**
 * xei对象的初始化
 */
;(function(window, document)
{
    var slice = [].slice;
    var xei = function(selector, context)
    {
        return new xei.fn.init(selector, context);
    };
    xei.fn = xei.prototype =
        {
            version: '1.0.0', // 版本
            constructor: xei, // 构造器
            selector: '', // 选择器
            length: 0, // 默认对象长度为0
            /**
             * 初始化mJquery对象
             * 目前支持的有：
             * $('字符串') -> 直接调用 document.querySelectorAll
             * $(DOM对象)
             * $(mJquery对象) 返回自身
             * $(fn) 如果参数是一个function，注册DOMContentLoaded事件
             * @param selector 选择器
             * @param context 这个东西
             * @returns 返回一个mJquery对象
             */
            init: function(selector, context)
            {
                //以下5种情况视为无效： undefined、null、 ''、 0、 false
                if(!selector) return this;
                if(selector.nodeType)//如果是DOM元素
                {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                if(typeof selector === 'string' && document.querySelectorAll)
                {
                    selector = document.querySelectorAll(selector);
                }
                // 如果是伪数组（如 HTMLCollection、NodeList等）
                if(typeof selector === 'object' && selector.length)
                {
                    this.context = document;
                    for(var i=0; i<selector.length; i++) this[this.length++] = selector[i];
                    return this;
                }
                // 如果selector本来就是mJquery对象
                if(selector.constructor === xei) return selector;
                if(typeof selector === 'function' && document.addEventListener)
                {
                    document.addEventListener('DOMContentLoaded', selector, false);
                }
                return this;
            },
            size: function()
            {
                return this.length;
            },
            toArray: function()
            {
                return slice.call(this);
            },
            /**
             * 这个属性很重要，加上这个之后返回的东西就是一个类数组的东西了
             */
            splice: [].splice,
            /**
             * 获取指定索引的对象，如果num为空，返回所有对象的数组
             * 否则按索引取，没有返回undefined，如果是-1，取倒数第一个
             * @param num 索引
             * @returns
             */
            get: function(num)
            {
                return num === undefined ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
            },
            /**
             * 简单的添加，不考虑重复问题
             * @param obj
             */
            add: function(obj)
            {
                var temp = this(obj);
                for(var i=0; i<temp.length; i++) this[this.length++] = temp[i];
            }
        };
    xei.fn.init.prototype = xei.fn;

    //扩展方法，类似于jquery的插件扩展
    xei.extend = xei.fn.extend = function(params)
    {
        for(var i in params)
        {
            if(params[i] != undefined) this[i] = params[i];
        }
        return this;
    };
    window.xei = xei;
})(window, document);





/**
 * =====================================
 *               日期相关方法
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 将日期格式化成指定格式的字符串
             * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
             * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
             * @returns 返回格式化后的日期字符串
             */
            formatDate: function(date, fmt)
            {
                date = date == undefined ? new Date() : date;
                date = typeof date == 'number' ? new Date(date) : date;
                //date = new Date(date);
                fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
                var obj =
                    {
                        'y': date.getFullYear(), // 年份，注意必须用getFullYear
                        'M': date.getMonth() + 1, // 月份，注意是从0-11
                        'd': date.getDate(), // 日期
                        'q': Math.floor((date.getMonth() + 3) / 3), // 季度
                        'w': date.getDay(), // 星期，注意是0-6
                        'H': date.getHours(), // 24小时制
                        'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
                        'm': date.getMinutes(), // 分钟
                        's': date.getSeconds(), // 秒
                        'S': date.getMilliseconds() // 毫秒
                    };
                var week = ['天', '一', '二', '三', '四', '五', '六'];
                for(var i in obj)
                {
                    fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
                    {
                        var val = obj[i] + '';
                        if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
                        for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
                        return m.length == 1 ? val : val.substring(val.length - m.length);
                    });
                }
                return fmt;
            },
            /**
             * 将字符串解析成日期
             * @param str 输入的日期字符串，如'2014-09-13'
             * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
             * @returns 解析后的Date类型日期
             */
            parseDate: function(str, fmt)
            {
                fmt = fmt || 'yyyy-MM-dd';
                var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
                fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function(m, $1, $2, $3, $4, idx, old)
                {
                    str = str.replace(new RegExp($1+'(\\d{'+$2.length+'})'+$4), function(_m, _$1)
                    {
                        obj[$3] = parseInt(_$1);
                        return '';
                    });
                    return '';
                });
                obj.M--; // 月份是从0开始的，所以要减去1
                var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
                if(obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
                return date;
            },
            /**
             * 将一个日期格式化成友好格式，比如，1分钟以内的返回“刚刚”，
             * 当天的返回时分，当年的返回月日，否则，返回年月日
             * @param {Object} date
             */
            formatDateToFriendly: function(date)
            {
                date = date || new Date();
                date = typeof date === 'number' ? new Date(date) : date;
                //date=new Date(date);
                var now = new Date();
                if((now.getTime() - date.getTime()) < 60*1000) return '刚刚'; // 1分钟以内视作“刚刚”
                var temp = this.formatDate(date, 'yyyy年M月d');
                if(temp == this.formatDate(now, 'yyyy年M月d')) return this.formatDate(date, 'HH:mm');
                if(date.getFullYear() == now.getFullYear()) return this.formatDate(date, 'M月d日');
                return temp;
            },
            /**
             * 将一段时长转换成友好格式，如：
             * 147->“2分27秒”
             * 1581->“26分21秒”
             * 15818->“4小时24分”
             * @param {Object} second
             */
            formatDurationToFriendly: function(second)
            {
                if(second < 60) return second + '秒';
                else if(second < 60*60) return (second-second%60)/60+'分'+second%60+'秒';
                else if(second < 60*60*24) return (second-second%3600)/60/60+'小时'+Math.round(second%3600/60)+'分';
                return (second/60/60/24).toFixed(1)+'天';
            },
            /**
             * 将时间转换成MM:SS形式
             */
            formatTimeToFriendly: function(second)
            {
                var m = Math.floor(second / 60);
                m = m < 10 ? ( '0' + m ) : m;
                var s = second % 60;
                s = s < 10 ? ( '0' + s ) : s;
                return m + ':' + s;
            },
            /**
             * 判断某一年是否是闰年
             * @param year 可以是一个date类型，也可以是一个int类型的年份，不传默认当前时间
             */
            isLeapYear: function(year)
            {
                if(year === undefined) year = new Date();
                if(year instanceof Date) year = year.getFullYear();
                return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
            },
            /**
             * 获取某一年某一月的总天数，没有任何参数时获取当前月份的
             * 方式一：$.getMonthDays();
             * 方式二：$.getMonthDays(new Date());
             * 方式三：$.getMonthDays(2013, 12);
             */
            getMonthDays: function(date, month)
            {
                var y, m;
                if(date == undefined) date = new Date();
                if(date instanceof Date)
                {
                    y = date.getFullYear();
                    m = date.getMonth();
                }
                else if(typeof date == 'number')
                {
                    y = date;
                    m = month-1;
                }
                var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 非闰年的一年中每个月份的天数
                //如果是闰年并且是2月
                if(m == 1 && this.isLeapYear(y)) return days[m]+1;
                return days[m];
            },
            /**
             * 计算2日期之间的天数，用的是比较毫秒数的方法
             * 传进来的日期要么是Date类型，要么是yyyy-MM-dd格式的字符串日期
             * @param date1 较新日期
             * @param date2 较旧日期
             */
            countDays: function(date1, date2)
            {
                var fmt = 'yyyy-MM-dd';
                // 将日期转换成字符串，转换的目的是去除“时、分、秒”
                if(date1 instanceof Date && date2 instanceof Date)
                {
                    date1 = this.formatDate(fmt, date1);
                    date2 = this.formatDate(fmt, date2);
                }
                if(typeof date1 === 'string' && typeof date2 === 'string')
                {
                    date1 = this.parseDate(date1, fmt);
                    date2 = this.parseDate(date2, fmt);
                    return (date1.getTime() - date2.getTime()) / (1000*60*60*24);
                }
                else
                {
                    console.error('参数格式无效！');
                    return 0;
                }
            }
        });
})(xei);




/**
 * =====================================
 *               URL相关方法
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 从URL中获取string参数
             * @param {Object} 参数名
             * @param {Object} 默认值
             */
            getParam: function(name, defaultValue, url)
            {
                defaultValue = defaultValue == undefined ? '' : defaultValue;
                var result = new RegExp('(\\?|&)'+name+'=(.*?)(&|$)', 'g').exec(url || location.search);
                return result ? result[2] : defaultValue;
            },
            /**
             * 从URL中获取int形参数
             * @param {Object} 参数名
             * @param {Object} 默认值
             */
            getParamInt: function(name, defaultValue, url)
            {
                defaultValue = defaultValue == undefined ? '0' : defaultValue;
                return parseInt(this.getParam(name, defaultValue, url));
            },
            /**
             * 从URL中获取boolean形参数
             * @param {Object} name
             * @param {Object} defaultValue
             */
            getParamBoolean: function(name, defaultValue, url)
            {
                defaultValue = defaultValue == undefined ? 'false' : defaultValue;
                return this.getParam(name, defaultValue, url) == 'true';
            },
            /**
             * 给URL设置参数，如果已经存在，替换之，会自动处理存在hash的情况
             * @param {Object} name 参数名
             * @param {Object} value 参数值
             * @param {Object} url 如果不传默认当前页面URL
             */
            setParam: function(name, value, url)
            {
                url = this.delParam(name, url || location.href); // 无论如何，先删除可能已经存在的参数
                var temp = url.split('#'); // 处理存在hash的情况
                return temp[0] + (url.indexOf('?')<0?'?':'&') + name + '=' + value + (temp[1]?('#'+temp[1]):'');
            },
            /**
             * 从一个URL中删除某一个或者多个参数，会正确处理包含hash的情况
             * @param {Object} name 可以是单个参数，也可以是参数数组
             * @param {Object} url 如果不传默认当前页面URL
             */
            delParam: function(name, url)
            {
                name = name instanceof Array ? name : [name];
                url = url || location.href;
                for(var i=0; i<name.length; i++)
                {
                    /* 这种方法的缺点是最多只能删除一个参数 */
                    /*url = url.replace(new RegExp('(\\?|&)'+name[i]+'=(.*?)(&|#|$)', 'g'), function(m, $1, $2, $3)
                    {
                        return $3 == '&' ? $1 : ($3 == '#' ? $3 : '');
                    });*/
                    /* 这种方法可以删除多个参数，但是会出现"index.html?&a=1#abc"的情况，当然这种情况是合法的 */
                    url = url.replace(new RegExp('(\\?|&)'+name[i]+'=(.*?)(?=&|#|$)', 'g'), function(m, $1, $2)
                    {
                        return $1 == '?' ? '?' : '';
                    });
                }
                return url;
            }
        });
})(xei);



/**
 * =====================================
 *         localStorage相关方法
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 将数据放入缓存，如果不是字符串，自动转字符串
             * @param {Object} name
             * @param {Object} value
             */
            setStorage: function(name, value)
            {
                // 保存之前一律使用JSON.stringify转换，注意，stringify可以正确处理boolean、int、string等非对象类型
                // 在处理String时，JSON.stringify('abc') == '"abc"'，这样可以使用JSON.parse解析
                localStorage[name] = JSON.stringify(value);
            },
            /**
             * 从缓存中获取数据，如果检测到是字符串转换成的对象，会自动解析成对象
             * @param {Object} name
             * @param {Object} defaultValue
             */
            getStorage: function(name, defaultValue)
            {
                var value = localStorage[name] || defaultValue;
                var rNeedParse = /^(\[.*\]|\{.*\}|true|false|\d+|".*")$/g;
                // 理论上只要是通过这里的setStorage设置的都能正常解析，这里为了防止出现解析不了报错的情况，统一做了一下判断
                return (typeof value == 'string' && value && rNeedParse.test(value)) ? JSON.parse(value) : value;
            },
            /**
             * 从缓存中删除某一个数据
             * @param {Object} name
             */
            delStorage: function(name)
            {
                localStorage.removeItem(name);
            }
        });
})(xei);



/**
 * =====================================
 *            cookie相关方法
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 获取cookie
             * @param cookieName cookie名字
             * @param defaultValue 默认值
             * @param parseToNumber 是否强转数字
             * @returns
             */
            getCookie: function(cookieName, defaultValue, parseToNumber)
            {
                var temp = new RegExp('(^|;| )'+cookieName+'=([^;]*)(;|$)', 'g').exec(document.cookie);
                if(temp == null) return defaultValue;
                var value = temp[2];
                if(value == '') return defaultValue;
                if(parseToNumber == true) return parseFloat(value);
                return decodeURIComponent(value);
            },
            /**
             * 设置cookie，对于中文和特殊字符必须先进行编码
             * @param name cookie名称
             * @param value cookie内容，注意cookie内容不能有分号、逗号、等号、空格等特殊字符，中文就更不可以，所以注意使用escape
             * @param day cookie失效天数，默认30天
             * @param path cookie的作用范围，默认“/”
             * @param domain cookie作用域名，不写默认当前域名，域名只能<=当前域名，比如当前是 blog.test.com，可以作用到.test.com
             */
            setCookie: function(name, value, day, path, domain)
            {
                day = day || 30;
                path = path || '/';
                var str = name + '=' + encodeURIComponent(value) + '; ';
                if(day) str += 'expires=' + new Date(Date.now() + day * 24 * 3600 * 1000).toGMTString() + '; ';
                if(path) str += 'path=' + path + '; ';
                if(domain) str += 'domain=' + domain;
                document.cookie = str;//注意，cookie这样设置并不会覆盖之前所有的cookie！除非同名同path
            },
            /**
             * 删除cookie
             * @param name cookie的名字
             * @param path cookie所在的path，默认contextPath
             * @param domain cookie作用域名
             */
            delCookie: function(name, path, domain)
            {
                this.setCookie(name, null, -1, path, domain);
            }
        });
})(xei);









/**
 * =====================================
 *            ajax相关方法
 * =====================================
 */
;(function($)
{
    'use strict';
    var lastScriptId; // 注入jsonp时上一次使用的script的id
    $.extend(
        {
            /**
             * 类似jQuery的get方法<br>
             * 与jQuery不同的是，如果dataType是function类型，那么看成是error
             */
            get: function(url, data, success, dataType)
            {
                return ajaxGetOrPost(url, data, success, dataType, null, 'GET');
            },
            /**
             * 类似jQuery的post方法<br>
             * 与jQuery不同的是，如果dataType是function类型，那么看成是error
             */
            post: function(url, data, success, dataType)
            {
                return ajaxGetOrPost(url, data, success, dataType, null, 'POST');
            },
            /**
             * GET加载一个json接口
             * 与jQuery不同的是，最后面多了一个error参数
             */
            getJSON: function(url, data, success, error)
            {
                return ajaxGetOrPost(url, data, success, 'json', error, 'GET');
            },
            /**
             * 全局的ajax设置
             */
            ajaxSettings:
                {
                    url: '',
                    type: 'POST', // 默认post
                    async: true, // 默认异步
                    data: null, // 需要传递的数据
                    processData: true, // 是否自动处理data，默认true
                    dataType: '', // 响应的数据类型，可以是text、html、json、jsonp、script，目前仅支持json、jsonp
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    success: function(data, textStatus, xhr)
                    {
                        console.log(data);
                    },
                    error: function(xhr, textStatus, errorThrown)
                    {
                        console.error(xhr);
                    }
                },
            /**
             * 可以是$.ajax(url, settings)，也可以是$.ajax(settings)
             * @param url
             * @param settings
             * @returns {___xhr0}
             */
            ajax: function(url, settings)
            {
                if(typeof url == 'object') settings = url;
                else if(typeof url == 'string') settings.url = url;

                var s = {};
                for(var i in this.ajaxSettings)
                {
                    s[i] = settings[i] == undefined ? this.ajaxSettings[i] : settings[i];
                }
                s.type = s.type.toUpperCase(); // 转大写
                if(s.dataType == 'jsonp')
                {
                    this.jsonp(s);
                    return;
                }

                var xhr = null;
                if(window.XMLHttpRequest) xhr = new XMLHttpRequest();
                else if(window.ActiveXObject) xhr = new ActiveXObject("Microsoft.XMLHTTP");
                if(!xhr)
                {
                    console.error('对不起，您的浏览器不支持ajax！');
                    return;
                }
                xhr.onreadystatechange = function()
                {
                    if(xhr.readyState == 4) // 4代表数据发送完毕
                    {
                        var rsp = xhr.responseText || xhr.responseXML; // 服务器端响应
                        //200到300代表访问服务器成功，304代表没做修改访问的是缓存,0为访问的本地
                        if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304|| xhr.status == 0)
                        {
                            var contentType = xhr.getResponseHeader('content-type');
                            if(s.dataType == 'json' || (contentType && contentType.indexOf('application/json')>=0))
                            {
                                try { rsp = eval('(' + rsp + ')'); }
                                catch(e)
                                {
                                    console.error('服务器返回的内容不是json格式！');
                                    console.error(e);
                                }
                            }
                            s.success(rsp, '', xhr);
                        }
                        else s.error(xhr, '');
                    }
                };
                if(s.type == 'GET' && s.data && s.processData)
                {
                    s.url += (s.url.indexOf('?') >= 0 ? '&' : '?') + formatObjectToParams(s.data);
                }
                xhr.open(s.type, s.url, s.async);
                var sendData = s.data;
                if(s.type == 'POST' && s.data)
                {
                    xhr.setRequestHeader('Content-Type', s.contentType);
                    if(typeof s.data == 'object' && s.processData) sendData = formatObjectToParams(s.data);
                }
                xhr.send(sendData);
                return xhr;
            },
            /**
             * 说实话真心不看好jsonp这种方式，以前写的代码，还是保留着吧
             * @param s
             */
            jsonp: function(s)
            {
                var fnName = '_jsonp_' + Date.now();
                window[fnName] = s.success;
                var url = s.url;
                url += (url.indexOf('?') >= 0 ? '&' : '?') + 'callback='+fnName;
                if(lastScriptId)
                {
                    document.getElementById(lastScriptId).src = url;
                }
                else //否则，需要自己创建一个script
                {
                    var element = document.createElement('script');
                    element.id = 'auto_jsonp_'+Date.now();
                    element.setAttribute('type', 'text/javascript');
                    element.setAttribute('src', url);
                    document.body.appendChild(element);
                }
            }
        });

    /**
     * get或者post，调用和jquery完全一样
     * @param url 非空必填
     * @param data 数据，可以直接写回调函数，可以为空
     * @param success 成功的回调函数，可以为空
     * @param dataType 返回的数据类型，可以为空，如果是function，那么看做是error
     * @param _error 失败回调，这个参数仅仅是给getJSON这个方法预留的
     * @param _type 是get还是post
     * @returns
     */
    function ajaxGetOrPost(url, data, success, dataType, _error, _type)
    {
        if(typeof data == 'function')
        {
            dataType = success;
            success = data;
            data = null;
        }
        if(typeof dataType == 'function')
        {
            _error = dataType;
            dataType = undefined;
        }
        return $.ajax({url: url, data: data, success: success, error: _error, dataType: dataType, type: _type});
    }
    /**
     * 将一个对象转换成url参数格式
     */
    function formatObjectToParams(obj)
    {
        var str = '';
        for(var i in obj) str += (str ? '&' : '') + i + '=' + obj[i];
        return str;
    }
})(xei);



/**
 * =====================================
 *            一些简单的方法集中写在这里
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 获取各种随机数，支持如下几种调用方式：<br>
             * getRandom() 返回0-1的随机小数，等同于Math.random()，0 <= result < 1
             * getRandom(start, end) 返回start-end的随机整数，start <= result < end
             * getRandom(end) 返回0-end的随机整数，0 <= result < end
             * getRandom(array) 随机返回数组中的某一个内容
             * getRandom(array, count) 随机从数组中返回长度为count的不重复内容组成的新数组，如果不足count个，返回全部 并乱序
             * @param {Object} start
             * @param {Object} end
             * @return {Object}
             */
            getRandom: function(start, end)
            {
                if(typeof start == 'number')
                {
                    if(typeof end == 'undefined')
                    {
                        end = start;
                        start = 0;
                    }
                    return start + Math.floor( Math.random() * (end - start) );
                }
                else if(start instanceof Array)
                {
                    if(typeof end == 'undefined')
                    {
                        if(start.length == 0) return null;
                        if(start.length == 1) return start[0];
                        return start[Math.floor( Math.random() * start.length )];
                    }
                    else
                    {
                        start.sort(function(a, b){return Math.random() > 0.5 ? 1 : -1;});
                        return start.slice(0, end);
                    }
                }
                return Math.random();
            },
            /**
             * 填充数字到指定长度，比如fixNumber(42, 4)返回'0042'
             * @param num 可以是int或者string类型的数字
             * @param length 目标长度，如果目标长度比当前长度小，则忽略
             * @return string
             */
            fixNumber: function(num, length)
            {
                if(typeof num == 'number') num = num + '';
                if(num.length < length)
                {
                    for(var i=num.length; i< length; i++)
                    {
                        num = '0' + num;
                    }
                }
                return num;
            },
            /**
             * 字符串转下划线形式，示例：getParam 转 get_param<br>
             * @param str
             * @param flag 默认下划线-，也可以传其它字符
             */
            toUnderline: function(str, flag)
            {
                return str.replace(/([A-Z])/g, function(m, $1, idx, str){ return (flag || '_') + $1.toLowerCase(); });
            },
            /**
             * 字符串转驼峰形式<br>
             * 示例一：xei.toHump('get_param')，返回getParam<br>
             * 示例二：xei.toHump('font-size','-')，返回fontSize
             * @param str
             * @param 分割的标志，默认为“_”
             */
            toHump: function(str, flag)
            {
                return str.replace(new RegExp((flag || '_')+'(\\w)', 'g'), function(m, $1, idx, str){ return $1.toUpperCase(); });
            }
        });
})(xei);




/**
 * =====================================
 *            格式化相关方法
 * =====================================
 */
;(function($)
{
    $.extend(
        {
            /**
             * 格式化一段JSON字符串，支持解析非标准JSON
             * 不同于绝大多数格式化工具，本方法支持设置缩进方式以及左大括号是否换行
             * @start 2016-08-24
             * @param {Object} json 要格式化的json串
             * @param {Object} indent 缩进方式，可以是若干个空格和tab，默认tab缩进，如 2个空格："  "、4个空格："    "、tab："	"
             * @param {Object} leftBracesInSameLine 左大括号是否保持在同一行，默认 false
             */
            formatJSON: function (json, indent, leftBracesInSameLine)
            {
                function getIndentStr(level)
                {
                    var str = '';
                    for(var i=0; i<level; i++) str += (indent || '	');
                    return str;
                }
                function format(obj, level)
                {
                    level = level == undefined ? 0 : level;
                    var result = '';
                    if(typeof obj == 'object' && obj != null) // 如果是object或者array
                    {
                        var isArray = obj instanceof Array, idx = 0;
                        result += (isArray ? '[' : '{') + '\n';
                        for(var i in obj)
                        {
                            result += (idx++ > 0 ? ',\n' : ''); // 如果不是数组或对象的第一个内容，追加逗号
                            var nextIsObj = (typeof obj[i] == 'object' && obj[i] != null), indentStr = getIndentStr(level+1);
                            result += (isArray && nextIsObj) ? '' : indentStr; // 如果当前是数组并且子项是对象，无需缩进
                            result += isArray ? '' : ('"' + i + '": ' + (nextIsObj && !leftBracesInSameLine ? '\n' : '') );
                            result += (!nextIsObj || (nextIsObj && leftBracesInSameLine && !isArray)) ? '' : indentStr;
                            result += format(obj[i], level+1); // 递归调用
                        }
                        result += '\n' + getIndentStr(level) + (isArray ? ']' : '}') + '';
                    }
                    else // 如果是 null、number、boolean、string
                    {
                        var quot = typeof obj == 'string' ? '"' : '';//是否是字符串
                        result += (quot + obj + quot + '');
                    }
                    return result;
                }
                return format(eval('(' + json + ')')); // 使用eval的好处是可以解析非标准JSON
            }
        });
})(xei);




/**
 * =====================================
 *            键值封装
 * =====================================
 */
;(function($)
{
    // 封装所有的键值，使用示例：xei.keys.ctrl == 17
    var keys =
        {
            backspace: 8,
            tab: 9,
            clear: 12,
            enter: 13,
            shift: 16,
            ctrl: 17,
            alt: 18,
            esc: 27,
            space: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            insert: 45,
            delete: 46
        };
    // 数字0-9
    for(var i=48; i<=57; i++)
    {
        keys[String.fromCharCode(i)] = i;
    }
    // 字母a-z
    for(var i=65; i<=90; i++)
    {
        keys[String.fromCharCode(i).toLowerCase()] = i;
    }
    // 小键盘数字0-9，这里用n0-n9表示
    for(var i=96; i<=105; i++)
    {
        keys['n' + (i - 96)] = i;
    }
    // f1-f12功能键
    for(var i=112; i<=123; i++)
    {
        keys['f' + (i - 111)] = i;
    }
    $.extend(
        {
            keys: keys
        });
})(xei);




/**
 * =====================================
 *            身份证校验
 * =====================================
 */
;(function($)
{
    /**
     * 获取身份证号第18位校验码
     * @params cid 身份证号码，17或18位均可
     */
    function getIdCardLastChar(cid)
    {
        if(!cid || cid.length <17) return '';
        var weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 十七位数字权重
        var validates = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 校验码
        var sum = 0;
        for(var i=0; i<17; i++) sum += parseInt(cid.charAt(i)) * weights[i];
        return validates[sum % 11];
    }
    /**
     * 检测某个身份证ID是否合法
     * @params cid 身份证号码，必须是18位
     */
    function checkIdCardValidate(cid)
    {
        if(!cid) return false;
        if(typeof cid !== 'string') return false;
        if(cid.length !== 18) return false;
        return getIdCardLastChar(cid) == cid.charAt(17)
    }
    xei.getIdCardLastChar = getIdCardLastChar;
    xei.checkIdCardValidate = checkIdCardValidate;
})(xei);
