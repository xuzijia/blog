<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/commons/layui/css/layui.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="/commons/font-awesome/css/font-awesome.min.css">
    <title>Xu Blog</title>
</head>
<body class="animated fadeIn">
<!--顶部导航栏信息-->
<#include "blog/header.ftl">
<!--顶部导航栏结束-->
<hr class="header-hr">
<!--统计、时间戳部分-->
<div class="layui-container">
    <blockquote class="layui-elem-quote">
        博文统计：共【<span class="sum-font"></span>】篇；继续加油，fighting！~\(≧▽≦)/~！
    </blockquote>
</div>
<!--统计、时间戳或部分结束-->
<!--正文部分-->
<div id="main-body" class="layui-container">
    <div class="layui-row layui-col-space10 animated fadeInUp">
        <div id="article-list" class="layui-col-md9">
        <#--流加载文章列表-->
        </div>
        <div class="layui-col-md3">
            <div id="index-affix-side">
                <div class="layui-tab layui-tab-card">
                    <ul class="layui-tab-title select-none">
                        <li class="layui-this">网站信息</li>
                        <li>会员中心</li>
                    </ul>
                    <div class="layui-tab-content">
                        <div class="layui-tab-item layui-show layui-text">
                            <ul>
                                <li>网站名称：Xu Blog</li>
                                <li>博客系统：<a href="/blog/index" target="_blank"
                                            style="font-style: italic;"><i class="layui-icon">&#xe628;</i> XuBlog</a>
                                </li>
                                <#--<li>交流反馈：<a target="_blank"-->
                                            <#--href="">发送留言</a></li>-->
                                <li>前端UI：<a href="http://layui.com" target="_blank">layui 2.x</a></li>
                                <li>后端架构：<a href="javascript:;" target="_blank">JavaWeb-SSM</a> 系列等
                                </li>
                            </ul>
                        </div>
                        <div class="layui-tab-item">
                            <p style="text-align: center">
                                <a href="javascript:;"
                                   class="layui-btn layui-btn-sm layui-btn-primary" id="qqlogin"><i class="fa fa-qq"></i>
                                    网站用户</a>
                                <a href="/admin" target="_blank" class="layui-btn layui-btn-sm layui-btn-primary"><i class="fa fa-user-o"></i>
                                    网站管理</a>
                            </p>
                        </div>
                    </div>
                </div>

            <#--搜索-->
             <#include "blog/search.ftl">
            <#--文章分类-->
            <#include "blog/category.ftl">

                <div class="layui-tab layui-tab-card layui-master-recommend">
                    <div class="layui-tab-content select-none">
                        <p class="title">热门文章</p>
                        <hr>
                    <#list hotList as article>
                        <p><a href="/blog/article/${article.id}">${article.title}</a></p>
                    </#list>
                    </div>
                </div>

                <div class="layui-tab layui-tab-card layui-tags">
                    <div class="layui-tab-content select-none">
                        <p class="title">标签页</p>
                        <hr>
                    <#list tagList as tag>
                        <a href="/blog/index?t=${tag.id}"><span class="layui-badge-rim">${tag.name}</span></a>
                    </#list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<#include "blog/footer.ftl">
<script src="/commons/layui/layui.js"></script>
<script src="/commons/jquery/jquery-2.1.4.min.js"></script>
<script src="/commons/hc-sticky/hc-sticky.min.js"></script>
<script src="/commons/js/common.js"></script>
<script src="js/loadContent.js"></script>
<script src="js/index.js"></script>
<script>
    $(function(){
        $("#qqlogin").on("click",function(){
//            qqLogin();
            alert("qq互联完善中...");
        });
    });

     var qqAuthWin;
    /**
     * 关闭QQ子窗口
     */
    function closeQQWin(){
        var result = $("#qq").val();
        if(result != ""){
            console.log(result);
            qqAuthWin.close();
        }else{
            console.log("值为空");
        }
    }

    /**
     * 封装一个居中打开新窗口的方法
     */
    function openWindow(url, width, height)
    {
        width = width || 600;
        height = height || 400;
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        qqAuthWin=window.open(url, "_blank", "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, left="+left+", top="+top+", width="+width+", height="+height);
    }

    function qqLogin()
    {
        var qqAppId = '101470713'; // 上面申请得到的appid
        var qqAuthPath = 'http://www.91cloud.top/qqConnect'; // 前面设置的回调地址
        var state = 'xuzijia'; // 防止CSRF攻击的随机参数，必传，登录成功之后会回传，最好后台自己生成然后校验合法性
        openWindow('https://graph.qq.com/oauth2.0/authorize?response_type=token&client_id='+qqAppId+'&redirect_uri='+qqAuthPath+'&state='+state);
    }
</script>

<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
<script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</body>
</html>