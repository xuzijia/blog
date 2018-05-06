<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/commons/layui/css/layui.css">
    <link rel="stylesheet" href="/commons/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/blog/css/style.css">
    <link rel="stylesheet" type="text/css" href="/commons/comment/css/common.css">
    <link rel="stylesheet" href="/commons/comment/plugin/jbox/jBox.css">
    <link rel="stylesheet" href="/commons/comment/css/comment.css">

    <title>${article.title}</title>
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
        <a href="/blog/index">博客文章</a>
        <a href="/blog/article/${article.id}">${article.title}</a>
        <a><cite>正文</cite></a>
     </span>
    </blockquote>
</div>
<!--统计、时间戳或部分结束-->
<!--正文部分-->
<div id="blog-body" class="layui-container">
    <div class="layui-row layui-col-space10">
        <div id="blog-info" class="layui-col-md9 animated fadeInUp">
            <!--博文开始-->
            <div class="layui-collapse layui-panel layui-article">
                <div class="layui-colla-item">
                    <div class="layui-colla-content layui-show layui-article">
                        <fieldset class="layui-elem-field layui-field-title">
                            <legend class="center-to-head">${article.title}
                            </legend>
                        </fieldset>
                        <div class="layui-text layui-blog-body">
                            <div class="layui-row">
                                <div class="layui-col-md6 layui-col-md-offset3 text-center blog-base-info">
                                    <span><i
                                            class="fa fa-clock-o"></i> ${article.createTime?string("yyyy年MM月dd日")}</span>
                                    <span><i class="fa fa-user-o"></i> <span style="color: red">简单</span> </span>
                                    <span><i class="fa fa-comment-o"></i> <span class="comment-count"></span> </span>
                                    <span><i class="fa fa-eye"></i> ${article.readCount}</span>
                                </div>
                            </div>
                            <hr>
                            &nbsp;<div class="content detail" style="">

                        ${article.content}
                        </div>
                        </div>
                        <div class="layui-row text-center layui-mt20">
                            <div class="layui-btn layui-btn-warm"><i class="fa fa-rmb"></i> 打赏</div>
                            <div class="layui-btn layui-btn-normal"><i class="layui-icon layui-icon-fenxiang1"></i> 分享</div>
                        </div>
                        <div class="layui-row layui-mt20">
                            <#if article.isOriginal==0>
                                <#--转载文章显示区域-->
                                <blockquote class="layui-elem-quote text-center " style="border: none;">
                                <span class="layui-show-md-inline-block layui-hide">文章来源：转载自</span>&nbsp;&nbsp;
                                    <a href="${article.sourceUrl}" target="_blank">${article.sourceUrl}</a>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="color: red">文章来自网络，侵权删除~</span>
                                </blockquote>
                            </#if>
                            <#if article.isOriginal==1>
                                <#--原创文章显示区域-->
                                <blockquote class="layui-elem-quote text-center " style="border: none;">
                                <span class="layui-show-md-inline-block layui-hide">文章来源：<span>Xu Blog</span></span>&nbsp;&nbsp;
                                    <span id="articleUrl"></span>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="color: red">原创文章，转载注明下哦！o(≧v≦)o~~</span>
                                </blockquote>
                            </#if>

                            <#--原创文章显示区域-->
                            <#--<blockquote class="layui-elem-quote text-center " style="border: none;">-->
                                <#--<span class="layui-show-md-inline-block layui-hide">文章出处：xuzijia Blog</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
                                <#--<span class="layui-show-md-inline-block layui-hide">文章地址：<span-->
                                        <#--id="articleUrl"></span></span>&nbsp;&nbsp;&nbsp;&nbsp;-->
                                <#--<span>转载注明下哦！o(≧v≦)o~~</span>-->
                            <#--</blockquote>-->

                        </div>
                        <div class="layui-row layui-mt20">
                            <p class="blog-tags">
                                标签：
                            <#list tagList as tag>
                                <span>${tag.name}</span>
                            </#list>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!--博文结束-->

            <!--评论区 data-comment-key 为文章id data-comment-type为评论类型-->
            <div id="xei-cmt-wrapper" data-comment-type="0" data-comment-key="${article.id}">

            </div>
            <!--评论区结束-->

        </div>
        <div class="layui-col-md3">
            <div id="affix-side">
                <div id="search-panel" class="layui-tab layui-tab-card">
                    <div class="layui-tab-content select-none">
                        <p class="title">搜一搜</p>
                        <hr>
                        <input type="text" name="title" required lay-verify="required" placeholder="键入Enter键以搜索"
                               autocomplete="off" class="layui-input search-box">
                    </div>
                </div>

            <#--文章分类-->
            <#include "blog/category.ftl">

                <div class="layui-tab layui-tab-card layui-similar">
                    <div class="layui-tab-content select-none">
                        <p class="title">相似文章</p>
                        <hr>
                        <#list articleList as article>
                            <p><a href="/blog/article/${article.id}">${article.title}</a></p>
                        </#list>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<#include "blog/footer.ftl">
<script src="/commons/jquery/jquery-2.1.4.min.js"></script>
<script src="/commons/hc-sticky/hc-sticky.min.js"></script>
<script src="/commons/layui/layui.js"></script>
<script src="/blog/js/index.js"></script>
<script src="/blog/js/svg.js"></script>

<script type="text/javascript" src="/commons/comment/plugin/xei/xei.js"></script>
<script type="text/javascript" src="/commons/comment/plugin/jbox/jBox.js"></script>
<script type="text/javascript" src="/commons/comment/js/comment.js"></script>

<script>
    var url = document.location;
    var href='<a href="'+url+'">'+url+'</a>';
    $("#articleUrl").append(href);
</script>

<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
<script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</body>
</html>