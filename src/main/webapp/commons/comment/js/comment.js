"use strict";
!function () {
    if (window.jQuery && window.xei || window.jBox) {

        //全局参数配置
        var http = "http"
            , root = "haoji.me"

            //表情url
            , face_url = "//res." + root + "/blog/images/"

            // , root_url = "//blog." + root
            //请求根路径
            , root_url = "/comment"

            //添加评论
            , add_comment_url = "/add_comment.do"

            //删除评论
            , del_comment_url="/del_comment.do"

            //取消赞
            , cancel_zan_comment="/cancel_zan_comment.do"

            //点赞
            , add_zan_comment="/add_zan_comment.do"

            //获取评论列表接口
            ,get_comments="/find_comment_list.do"



            //默认游客头像
            , default_avatar ="/commons/comment/images/default_avatar.gif"

            //微博互联参数
            , weibo_id = "593718136"
            //微博登陆回调
            , weibo_redirect_uri = http + "://blog." + root + "/auth_weibo"

            //qq互联参数
            , qq_id = "101470713"
            //qq登陆回调
            // , qq_redirect_uri = http + "://blog." + root + "/auth_qq"
            , qq_redirect_uri ="http://www.91cloud.top/qqConnect"

            //退出登陆
            , open_user_logout="/open_user_logout.do"

            //查询登陆信息
            , open_user_auth="/open_user_auth.do"


            //根节点id
            , root_dom = $("#xei-cmt-wrapper");

        //全局参数配置


        if (0 != root_dom.length) {
            var commentType = root_dom[0].dataset.commentType
                , commentKey = root_dom[0].dataset.commentKey
                , d = root_dom[0].dataset.commentDesc || "评论"
                , v = "sort_type"
                , sortType = xei.getCookie(v, "newly")
                , x = 0
                , f = "" !== xei.getCookie("BSESSIONID", "")
                , h = null
                , b = null
                , w = 5
                , g = {
                avatar: "",
                nickname: "游客",
                website: "/"
            };
            $(function () {
                var t, e;
                t = '\n\t\t\t<div class="xei-cmt-toolbar" style="visibility:hidden;display:' + (f ? "none" : "block") + '">\n\t\t\t\t<div>\n\t\t\t\t\t<span class="xei-cmt-top-name">' + g.nickname + '</span>\n\t\t\t\t\t<span class="xei-cmt-settings">\n\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t<span class="xei-cmt-icon xei-cmt-icon-settings"></span>\n\t\t\t\t\t\t\t<span>设置</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t<li><a href="javascript:;" id="xei-cmt-logout">退出登录</a></li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t' + getFaceNode() + '<div class="xei-cmt-top">\n\t\t\t\t<a href="javascript:;" class="xei-cmt-count">\n\t\t\t\t\t<span>0</span>条' + d + '\n\t\t\t\t</a>\n\t\t\t\t<div class="xei-cmt-sort">\n\t\t\t\t\t<a href="javascript:;" data-sort-type="early" class="' + ("early" == sortType ? "current" : "") + '">最早</a>\n\t\t\t\t\t<a href="javascript:;" data-sort-type="newly" class="' + ("newly" == sortType ? "current" : "") + '">最新</a>\n\t\t\t\t\t<a href="javascript:;" data-sort-type="hot" class="' + ("hot" == sortType ? "current" : "") + '">最热</a>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="xei-cmt-comments">\n\t\t\t\t<p class="comment-tip">正在加载' + d + "</p>\n\t\t\t</div>",
                    $("#xei-cmt-wrapper").html(t),
                    y(),
                    getComments(),
                    ajaxSubmit(open_user_auth, {}, function (t) {
                        0 == t.code && (g = t.user,
                            setLoginInfo())
                    }, !0),
                    e = '\n\t\t\t<div id="jbox_modal_visitor_post" style="display:none;">\n\t\t\t\t<div class="xei-cmt-login-type-select">\n\t\t\t\t\t<div><a href="javascript:;" class="btn-qq-login">用QQ账号登录</a></div>\n\t\t\t\t\t<div><a href="javascript:;" class="btn-weibo-login"></a></div>\n\t\t\t\t\t<div><a href="javascript:;" class="btn-visitor-login">以游客身份评论</a></div>\n\t\t\t\t</div>\n\t\t\t\t<form class="xei-cmt-visitor-post-form">\n\t\t\t\t\t<p class="top-post-tip">友情提示：以游客身份发表的评论无法删除哦！ <a href="javascript:;" class="back-to-select-login-type">返回继续登录</a></p>\n\t\t\t\t\t<div class="xei-cmt-form-group">\n\t\t\t\t\t\t<label for="visitorName">昵称</label>\n\t\t\t\t\t\t<input type="text" id="visitorName" name="visitorName" placeholder="填写一个你喜欢的昵称" value="' + xei.getCookie("visitor_name", "") + '"/>\n\t\t\t\t\t\t<span class="required-tip">*</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="xei-cmt-form-group">\n\t\t\t\t\t\t<label for="visitorEmail">邮箱</label>\n\t\t\t\t\t\t<input type="text" id="visitorEmail" name="visitorEmail" placeholder="不会被公开，仅为了评论收到回复时邮件提醒" value="' + xei.getCookie("visitor_email", "") + '"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="xei-cmt-form-group">\n\t\t\t\t\t\t<label for="visitorWebsite">个人主页</label>\n\t\t\t\t\t\t<input type="text" id="visitorWebsite" name="visitorWebsite" placeholder="填写个人网站或博客地址，仅为了互相学习交流" value="' + xei.getCookie("visitor_website", "") + '"/>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="xei-cmt-form-group">\n\t\t\t\t\t\t<input type="button" id="visitor_post_comment_btn" value="发表评论"/>\n\t\t\t\t\t\t<span class="visitor-form-post-tip">标 * 为必填项</span>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>',
                    $(e).appendTo($("body")),
                    h = new jBox("Modal", {
                        attach: $("#xei-cmt-wrapper .xei-cmt-visitor-post"),
                        width: 580,
                        height: 300,
                        title: "请登录",
                        overlay: !0,
                        content: $("#jbox_modal_visitor_post"),
                        draggable: "title",
                        closeButton: "title"
                    }),
                    $(".xei-cmt-login-type-select .btn-visitor-login").click(function () {
                        E(!0)
                    }),
                    $(".back-to-select-login-type").click(function () {
                        E(!1)
                    }),
                    $(".xei-cmt-login-type-select .btn-qq-login").click(function () {
                        h.close(),
                            qq()
                    }),
                    $(".xei-cmt-login-type-select .btn-weibo-login").click(function () {
                        h.close(),
                            weibo()
                    }),
                    $("#visitor_post_comment_btn").click(function () {
                        var t = {
                            visitorName: $(".xei-cmt-visitor-post-form #visitorName").val(),
                            visitorEmail: $(".xei-cmt-visitor-post-form #visitorEmail").val(),
                            visitorWebsite: $(".xei-cmt-visitor-post-form #visitorWebsite").val()
                        };
                        !t.visitorName || /^[a-zA-Z0-9\u2E80-\u9FFF]{1,20}$/.test(t.visitorName) ? !t.visitorEmail || /^[a-zA-Z\d][\w-\.]*@([\da-zA-Z](-[\da-zA-Z])?)+(\.[a-zA-Z]+)+$/g.test(t.visitorEmail) ? !t.visitorWebsite || /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(t.visitorWebsite) ? (xei.setCookie("visitor_name", t.visitorName || ""),
                            xei.setCookie("visitor_email", t.visitorEmail || ""),
                            xei.setCookie("visitor_website", t.visitorWebsite || ""),
                            j(h.textarea, t),
                            h.close()) : A("主页地址不合法！") : A("邮箱格式不合法！") : A("昵称只能是字母数字或汉字，长度不超过20个哦！")
                    })
            })
        } else
            console.error('请先在页面准备一个 <div id="xei-cmt-wrapper"></div> ！')
    } else
        alert("本插件依赖jQuery、xei、jBox这3个插件");

    function y() {
        $("#xei-cmt-wrapper").on("click", ".xei-cmt-post-button", function () {
            j($(this).parent().prev()[0])
        }),
            $("#xei-cmt-wrapper").on("click", "[data-del-id]", function () {
                if (confirm("确定要删除该条评论吗？该评论下的所有子评论也都将被删除哦！")) {
                    var id = this.dataset.delId;
                    ajaxSubmit(del_comment_url, {
                        id: id
                    }, function (t) {
                        0 == t.code ? (showCount(parseInt(t.text)),
                            $('#xei-cmt-wrapper [data-cmt-id="' + id + '"]').hide("normal", function () {
                                $(this).remove()
                            })) : A(t.text)
                    })
                }
            }),
            $("#xei-cmt-wrapper").on("click", "[data-reply-id]", function () {
                var t = $(this).parent()
                    , e = (t.next(".xei-cmt-replybox"),
                    this.dataset.replyId);
                if (null == b || ($('[data-reply-id="' + b + '"]').parent().next(".xei-cmt-replybox").remove(),
                    b != e)) {
                    var i = $(this).parents(".xei-cmt-comment:last")[0].dataset.cmtId;
                    t.after(getFaceNode(e, i)),
                        b = e,
                        t.next(".xei-cmt-replybox").find("textarea")[0].focus()
                } else
                    b = null
            }),
            $("#xei-cmt-wrapper").on("click", "[data-zan-id]", function (t) {
                var e = this
                    , i = e.dataset.zanId
                    , a = e.classList.contains("liked");
                ajaxSubmit(a ? cancel_zan_comment : add_zan_comment, {
                    commentId: i,
                    type: 0
                }, function (result) {
                    0 == result.code ? (a ? e.classList.remove("liked") : e.classList.add("liked"),
                        e.querySelector(".zan-count").innerHTML = result.count) : (1 == result.code && e.classList.add("liked"),
                        A(result.msg))
                }, !0)
            }),
            $("#xei-cmt-wrapper [data-sort-type]").click(function (t) {
                $('#xei-cmt-wrapper [data-sort-type="' + sortType + '"]').removeClass("current"),
                    sortType = this.dataset.sortType,
                    $(this).addClass("current"),
                    getComments(),
                    xei.setCookie(v, sortType)
            }),
            $("#xei-cmt-wrapper [placeholder]").click(function (t) {
                var e = $(this).attr("placeholder");
                e && (this.dataset.placeholder = e,
                    $(this).attr("placeholder", ""))
            }),
            $("#xei-cmt-wrapper [placeholder]").on("blur", function (t) {
                var e = this.dataset.placeholder;
                e && (this.dataset.placeholder = "",
                    $(this).attr("placeholder", e))
            }),
            $("#xei-cmt-wrapper").on("keyup", "textarea", function (t) {
                t.ctrlKey && 13 == t.keyCode && j(this)
            }),
            $("#xei-cmt-logout").click(function (t) {
                ajaxSubmit(open_user_logout, {}, function () {
                    g = {
                        avatar: "",
                        nickname: "游客",
                        website: "/"
                    },
                        setLoginInfo(),
                        getComments()
                })
            }),
            $("#xei-cmt-wrapper").on("click", ".xei-cmt-icon-qq", function (t) {
                qq()
            }),
            $("#xei-cmt-wrapper").on("click", ".xei-cmt-icon-weibo", function (t) {
                weibo()
            }),
            $("#xei-cmt-wrapper").on("click", ".xei-cmt-page > [data-page]", function (t) {
                getComments(parseInt(this.dataset.page))
            }),
            window.addEventListener("message", function (t) {
                console.log(t);
                0 == weibo_redirect_uri.indexOf(t.origin) && function (t) {
                    if (0 !== t.code)
                        return A(t.text);
                    g = t.user,
                        setLoginInfo();
                    var e = h.textarea;
                    e && e.value && j(e)
                }(t.data)
            }),
            function () {
                var a = -1
                    ,
                    n = ["微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "可爱", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "大兵", "奋斗", "咒骂", "疑问", "嘘", "晕", "折磨", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "示爱", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "挥手", "激动", "街舞", "献吻", "左太极", "右太极"];

                function r(t, e) {
                    (e = null == e ? $(".xei-qq-face-wrapper") : $(e).parents(".xei-cmt-replybox").children(".xei-qq-face-wrapper"))[t ? "show" : "hide"]("normal"),
                        window[t ? "addEventListener" : "removeEventListener"]("click", i, !0)
                }

                function i(t) {
                    for (var e = $(".xei-qq-face-wrapper")[0], i = t.target, a = i == e, n = i; !a && (n = n.parentElement);)
                        if (n == e) {
                            a = !0;
                            break
                        }
                    a || r(!1)
                }

                $("#xei-cmt-wrapper").on("mousemove", ".xei-qq-face-wrapper a", function (t) {
                    var e = parseInt(this.dataset.idx);
                    if (e != a) {
                        var i = $(".xei-qq-face-wrapper > .face-preview");
                        i.children("img").attr("src", face_url + "face/qq/qq_" + (e + 100) + ".gif"),
                            i.children("span").html(n[e]),
                            0 <= [0, 1, 2, 15, 16, 17, 30, 31, 32].indexOf(e) ? i.addClass("right") : i.removeClass("right"),
                        a < 0 && i.show(),
                            a = e
                    }
                }),
                    $("#xei-cmt-wrapper").on("mouseleave", ".xei-qq-face-wrapper", function (t) {
                        $(".xei-qq-face-wrapper > .face-preview").hide();
                        a = -1
                    }),
                    $("#xei-cmt-wrapper").on("click", ".xei-cmt-icon-emoji", function (t) {
                        r(!0, this)
                    }),
                    $("#xei-cmt-wrapper").on("click", ".xei-qq-face-wrapper a", function (t) {
                        var e = parseInt(this.dataset.idx)
                            , i = $(this).parents(".xei-cmt-replybox").find("textarea")[0];
                        !function (t, e) {
                            if (document.selection)
                                t.focus(),
                                    sel = document.selection.createRange(),
                                    sel.text = e,
                                    sel.select();
                            else if (t.selectionStart || "0" == t.selectionStart) {
                                var i = t.selectionStart
                                    , a = t.selectionEnd
                                    , n = t.scrollTop;
                                t.value = t.value.substring(0, i) + e + t.value.substring(a, t.value.length),
                                0 < n && (t.scrollTop = n),
                                    t.focus(),
                                    t.selectionStart = i + e.length,
                                    t.selectionEnd = i + e.length
                            } else
                                t.value += e,
                                    t.focus()
                        }(i, "[qq_" + (e + 100) + "]"),
                            r(!1)
                    })
            }()
    }

    function qq() {
        alert("qq互联完善中..");
        //openWindow("https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id=" + qq_id + "&redirect_uri=" + encodeURIComponent(qq_redirect_uri) + "&state=ssss")
    }

    function weibo() {
        alert("微博互联完善中..");
        //openWindow("https://api.weibo.com/oauth2/authorize?client_id=" + weibo_id + "&response_type=code&redirect_uri=" + encodeURIComponent(weibo_redirect_uri))
    }

    //获取评论
    function getComments(currentPage, pageSize) {
        currentPage = currentPage || 1,
            pageSize = pageSize || 10,
            //请求评论接口
            // $.get(n + "/query_comment_list", {
            $.get(root_url+get_comments, {
                //请求参数
                type: commentType,
                targetKey: commentKey,
                currentPage: currentPage,
                pageSize: pageSize,
                sortType: sortType
            }, function (result) {
                var e = $("#xei-cmt-wrapper .xei-cmt-comments");
                if (0 == result.code) {
                    $(".comment-count").text(result.commentCount);
                    showCount(result.commentCount);
                    //解析数据
                    var i = function (t) {
                        console.log(t);
                        for (var e = [], i = {}, a = 0; a < t.length; a++)
                            t[a].children = [],
                                i[t[a].id] = t[a];
                        for (var a = 0; a < t.length; a++) {
                            var n = t[a];
                            if ('' == n.parentId)
                                e.push(n);
                            else {
                                var r = i[n.parentId];
                                r && r.children.push(n)
                            }
                        }
                        console.log(e);
                        return e;
                    }(result.pb.dataList);

                    if (0 != i.length) {
                        var a = function t(e, i, a) {
                            i = null == i ? 1 : i;
                            if (!e || !e.length)
                                return "";
                            var n = i <= w;
                            var r = n ? "<ul " + (1 == i ? "" : 'class="xei-cmt-children-wrapper"') + ">" : "";
                            for (var s = 0; s < e.length; s++) {
                                var c = e[s];
                                r += getCommentNode(c, n, i, n ? null : a),
                                    r += t(c.children, i + 1, c),
                                    r += n ? "</li>" : ""
                            }
                            r += n ? "</ul>" : "";
                            return r
                        }(i);
                        a += function (t, e) {
                            if (e <= 1)
                                return "";
                            for (var i = "", a = 0; a < e; a++)
                                i += a + 1 == t ? "<span>" + t + "</span>" : '<a href="javascript:;" data-page="' + (a + 1) + '">' + (a + 1) + "</a>";
                            return '\n\t\t\t\t<div class="xei-cmt-page">\n\t\t\t\t\t<a href="javascript:;" data-page="1">首页</a>\n\t\t\t\t\t' + i + '\n\t\t\t\t\t<a href="javascript:;" data-page="' + e + '">尾页</a>\n\t\t\t\t</div>'
                        }(result.pb.current, result.pb.pageCount),
                            //渲染评论
                            e.html(a)
                    } else
                        e.html('<p class="comment-tip">暂无评论！</p>')
                } else
                    e.html("评论加载失败！")
            })
    }

    //发表评论
    function j(s, t) {
        if (!t && !g.id)
            return e = s,
                h.textarea = e,
                void h.open();
        var e, content = $(s).val();
        if (content) {
            var parent_id = s.dataset.parentId
                , root_id = s.dataset.rootId
                , add_data = {
                type: commentType,
                targetKey: commentKey,
                content: content,
                parentId: parent_id,
                rootId: root_id
            };
            t && (add_data.visitorName = t.visitorName || null,
                add_data.visitorEmail = t.visitorEmail || null,
                add_data.visitorWebsite = t.visitorWebsite || null),
                h.textarea = null,
                ajaxSubmit(add_comment_url, add_data, function (result) {
                    if (s.blur(),
                            parent_id) {
                        var e = $(s).parents("li.xei-cmt-comment:first")
                            , i = parseInt(e[0].dataset.cmtDeep);
                        if (i < w) {
                            (ul = e.children("ul")).length || (ul = $('<ul class="xei-cmt-children-wrapper"></ul>')).appendTo(e),
                                appentCommentNode(ul, result.object, i + 1)
                        } else {
                            var ul = e.parent()
                                , n = e.find("> .xei-cmt-item > .xei-cmt-avatar > a")
                                , r = {
                                userWebsite: n.attr("href"),
                                userName: n.attr("title")
                            };
                            appentCommentNode(ul, result.object, i + 1, r)
                        }
                        $(s).parent().parent().remove()
                    } else {
                        $(s).val(""),
                        (ul = $("#xei-cmt-wrapper .xei-cmt-comments > ul")).length || ($("#xei-cmt-wrapper .xei-cmt-comments").html("<ul></ul>"),
                            ul = $("#xei-cmt-wrapper .xei-cmt-comments > ul")),
                            appentCommentNode(ul, result.object, 1)
                    }
                    showCount(++x)
                });
        } else
            A("评论内容不能为空！")
    }
    //显示页面评论数量
    function showCount(t) {
        x = t,
            $("#xei-cmt-wrapper .xei-cmt-count span").html(x)
    }
    //生成评论节点
    function getCommentNode(t, e, i, a) {
        var adminHtml="";
        //管理员回复
        if(t.user.userType==3){
            adminHtml="<span style='color: #5fc04c'> (博主)</span>";
        }else{
            adminHtml="";
        }
        return '\n\t\t\t<li class="xei-cmt-comment" data-cmt-id="' + t.id + '" data-cmt-deep="' + i + '">\n\t\t\t\t<div class="xei-cmt-item">\n\t\t\t\t\t<div class="xei-cmt-avatar">\n\t\t\t\t\t\t<a href="' + (t.userWebsite || "javascript:;") + '" title="' + t.userName + '" target="_blank">\n\t\t\t\t\t\t\t<img src="' + W(t.userAvatar) + '"/>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="xei-cmt-comment-body">\n\t\t\t\t\t\t<div class="xei-cmt-comment-header">\n\t\t\t\t\t\t\t<a href="' + (t.userWebsite || "javascript:;") + '" target="_blank">' + (t.userName || "") + "</a>"+adminHtml+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<p>" + (a ? '<span class="xei-cmt-content-reply">回复 <a href="' + (a.userWebsite || "javascript:;") + '" target="_blank">' + a.userName + "</a>：</span>" : "") + " " + t.content.replace(/\[qq_(\d+?)\]/g, '<img src="' + face_url + 'face/qq/qq_$1.gif"/>') + '</p>\n\t\t\t\t\t\t<div class="xei-cmt-comment-footer">\n\t\t\t\t\t\t\t<span class="xei-cmt-time" title="' + xei.formatDate(t.commentTime) + '">' + xei.formatDateToFriendly(t.commentTime) + '</span>\n\t\t\t\t\t\t\t<a href="javascript:;" data-reply-id="' + t.id + '">\n\t\t\t\t\t\t\t\t<span class="xei-cmt-icon xei-cmt-icon-reply"></span>回复\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="javascript:;" data-zan-id="' + t.id + '">\n\t\t\t\t\t\t\t\t<span class="xei-cmt-icon xei-cmt-icon-like"></span>顶(<span class="zan-count">' + t.zan + '</span>)\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t<a href="javascript:;" class="xei-cmt-delete-btn" data-del-id="' + t.id + '" style="display:' + (t.user && t.user.id == g.id || f ? "inline" : "none") + '">\n\t\t\t\t\t\t\t\t<span class="xei-cmt-icon xei-cmt-icon-delete"></span>删除\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t' + (e ? "" : "</li>")
    }
    //获取表情面板
    function getFaceNode(t, e) {
        return e = e || "",
            t = t || "",
        '\n\t\t\t<div class="xei-cmt-replybox">\n\t\t\t\t<div class="xei-cmt-avatar">\n\t\t\t\t\t<a href="' + (g.website || "javascript:;") + '" title="' + g.nickname + '" target="_blank">\n\t\t\t\t\t\t<img src="' + W(g.avatar) + '"/>\n\t\t\t\t\t</a>\n\t\t\t\t\t<div class="xei-cmt-nickname">' + g.nickname + '</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="xei-cmt-post-wrapper">\n\t\t\t\t\t<textarea placeholder="不说点啥再走吗~" data-parent-id="' + t + '" data-root-id="' + e + '"></textarea>\n\t\t\t\t\t<div class="xei-cmt-post-toolbar">\n\t\t\t\t\t\t<a href="javascript:;" title="插入表情" class="xei-cmt-icon xei-cmt-icon-emoji"></a>\n\t\t\t\t\t\t<div class="xei-cmt-login-wrapper" style="display:' + (g.id ? "none" : "inline-block") + '">\n\t\t\t\t\t\t\t<span class="xei-cmt-login-tip">使用社交账号登录</span>\n\t\t\t\t\t\t\t<a href="javascript:;" title="使用QQ账号登录" class="xei-cmt-icon-qq"></a>\n\t\t\t\t\t\t\t<a href="javascript:;" title="使用微博账号登录" class="xei-cmt-icon-weibo"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href="javascript:;" class="xei-cmt-post-button">发表</a>\n\t\t\t\t\t\t<span class="xei-cmt-post-tip" style="display:' + (g.id ? "none" : "block") + '">发表评论前请先登录</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t' + function () {
            for (var t = "", e = 0; e < 105; e++)
                t += '<li><a href="javascript:;" data-idx="' + e + '"></a></li>';
            return '\n\t\t\t<div class="xei-qq-face-wrapper">\n\t\t\t\t<div class="face-preview">\n\t\t\t\t\t<img />\n\t\t\t\t\t<span>微笑</span>\n\t\t\t\t</div>\n\t\t\t\t<ul>\n\t\t\t\t\t' + t + "\n\t\t\t\t</ul>\n\t\t\t</div>"
        }() + "\n\t\t\t</div>"
    }

    function E(t) {
        $(".xei-cmt-visitor-post-form")[t ? "show" : "hide"](),
            $(".xei-cmt-login-type-select")[t ? "hide" : "show"]()
    }
    //插入成功后添加节点到页面
    function appentCommentNode(dom, data, count, a) {
        var n = $(getCommentNode(data, !1, count, a));
        n.hide(),
            //添加评论后插入到开头显示
            // "newly" == sortType && null == e.parentId ? t.prepend(n) : t.append(n),
            "newly" == sortType && "" == data.parentId ? dom.prepend(n) : dom.append(n),
            n.show("normal")
    }

    function W(t) {
        return t ? /^(http|\/\/)/g.test(t) ? t :t : default_avatar
    }

    function setLoginInfo() {
        var t = $("#xei-cmt-wrapper .xei-cmt-replybox .xei-cmt-avatar a");
        t.attr("href", g.website || "/"),
            t.attr("title", g.nickname || ""),
            t.children().attr("src", W(g.avatar)),
            $("#xei-cmt-wrapper .xei-cmt-replybox .xei-cmt-nickname").html(g.nickname),
            $("#xei-cmt-wrapper .xei-cmt-toolbar .xei-cmt-top-name").html(g.nickname),
            $("#xei-cmt-wrapper .xei-cmt-replybox .xei-cmt-login-wrapper").css("display", g.id ? "none" : "inline-block"),
            $("#xei-cmt-wrapper .xei-cmt-replybox .xei-cmt-post-tip").css("display", g.id ? "none" : "block"),
            $("#xei-cmt-wrapper .xei-cmt-toolbar").css("visibility", g.id ? "visible" : "hidden")
    }

    //打开新窗口
    function openWindow(url, width, height) {
        width = width || 600,
            height = height || 400;
        var left = (window.screen.width - width) / 2
            , top = (window.screen.height - height) / 2;
        window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left=" + left + ", top=" + top + ", width=" + width + ", height=" + height)
    }

    function S(t, e, i) {
        $.fn.jBox("Notice", {
            content: t,
            autoClose: 1e3 * (i || 2),
            fade: 100,
            animation: "slide",
            color: e || "red"
        })
    }

    function A(t) {
        S(t, "red")
    }

    //评论操作
    function ajaxSubmit(action, data, call, a) {
        // console.log(data);
        $.ajax({
            url: root_url + action,
            xhrFields: {
                withCredentials: !0
            },
            type: "post",
            data: data,
            success: function (result) {
                // console.log(result);
                a ? call(result) : 0 == result.code ? call(result) : A(result.text);
            }
        })
    }
}();
