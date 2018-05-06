<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>留言板</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/commons/layui/css/layui.css">
    <link rel="stylesheet" href="/blog/css/style.css">
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
       <span class="layui-breadcrumb">
        <a href="/blog/index">网站首页</a>
        <a><cite>留言板</cite></a>
     </span>
        </blockquote>
    </div>
    <!--统计、时间戳或部分结束-->

    <!--正文部分-->
    <div id="main-body" class="layui-container">
        <div class="layui-row layui-col-space10 animated fadeInUp">
            <div class="layui-col-md9">
            <#--留言板区域-->



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
                                    <li>交流反馈：<a target="_blank"
                                                href="">发送留言</a></li>
                                    <li>前端UI：<a href="http://layui.com" target="_blank">layui 2.x</a></li>
                                    <li>后端架构：<a href="javascript:;" target="_blank">JavaWeb-SSM</a> 系列等
                                    </li>
                                </ul>
                            </div>
                            <div class="layui-tab-item">
                                <p style="text-align: center">
                                    <a href=""
                                       class="layui-btn layui-btn-sm layui-btn-primary"><i class="fa fa-qq"></i>
                                        网站用户</a>
                                    <a href="/admin" target="_blank" class="layui-btn layui-btn-sm layui-btn-primary"><i class="fa fa-user-o"></i>
                                        网站管理</a>
                                </p>
                            </div>
                        </div>
                    </div>

                <#--搜索-->
                <#include "blog/search.ftl">
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
</body>
<script src="/commons/layui/layui.js"></script>
<script src="js/index.js"></script>
</html>