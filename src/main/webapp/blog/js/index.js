layui.config({
    base: 'js/'
}).extend({
    // article:'article'
});

layui.use(['layer', 'form', 'laypage', 'laydate', 'element', 'util', 'flow', 'layedit','jquery',], function () {
     layer = layui.layer
        , laypage = layui.laypage
        , laydate = layui.date
        , element = layui.element
        , util = layui.util
        , form = layui.form
        , flow = layui.flow
        , layedit = layui.layedit
        , $=layui.jquery
    var $body = $("body");
    var hasChat = false;
    //首页固定块
    util.fixbar({
        bar1: false
        , css: {right: 10, bottom: 25}
        , bgcolor: '#9F9F9F'

    });

    //加载评论富文本框
    layedit.build('comment-input', {
        hideTool: ['image']
        , height: 150
    }); //建立编辑器

    //搜索
    $("input[name=title]").on("keydown",function(event){
        if(event.which == 13) {
            var q=$(this).val();
           location.href="/blog/index?q="+q;
        }
    });

    //tab事件监听
    element.on('tab(mine-tab)', function (data) {
        console.log(data);
    });

    //获取url参数
    var search=location.search;
    var data={}
    if(search!=""){
        data = getParams(search);
    }


    //流加载文章列表
    flow.load({
        elem:"#article-list",
        done:function(page,next){
            showArticle(page,next,data);
        },
        isAuto:false
    });

    var agent = navigator.userAgent;
    var affixed = !(agent.indexOf("Edge/") > -1) && !(agent.indexOf("Firefox/") > -1);
    // if (document.getElementById("main-body") != null && affixed) {
    //     $("#index-affix-side").hcSticky({
    //         stickTo: '#main-body'
    //         , innerSticker: '#search-panel'
    //         , queries: {
    //             980: {
    //                 disable: true
    //             }
    //         }
    //         , top: 10
    //     });
    // }
    //博文页右侧固定div
    if (document.getElementById("blog-body") !== null) {
        $("#affix-side").hcSticky({
            stickTo: '#blog-body'
            , queries: {
                980: {
                    disable: true
                }
            }
            , top: 15
        });
    }
    if (document.getElementById("note-body") !== null) {
        $("#note-operate").hcSticky({
            stickTo: '#note-body'
            , top: 10
        });
    }



    //菜单隐藏
    $("#side-nav").click(function () {
        var $sideNav = $(".nav-header .layui-nav-side");
        if ($sideNav.css("width") !== "0px") {
            $sideNav.animate({
                width: "0"
            }, 200)
        } else {
            $sideNav.animate({
                width: "200px"
            }, 200);
            layer.open({
                type: 1
                , title: false
                , shade: [0.6, '#f8f8f8']
                , shadeClose: true
                , closeBtn: 0
            })

        }
    });
    //点击显示菜单
    $body.click(function () {
        var $sideNav = $(".nav-header .layui-nav-side");
        if ($sideNav.css("width") !== "0px") {
            $sideNav.animate({
                width: "0"
            }, 200)
        }
    })

});


