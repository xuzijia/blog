<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="stylesheet" href="/commons/layui/css/layui.css">
    <link rel="stylesheet" href="/commons/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="/commons/animate/animate.min.css">
    <link rel="stylesheet" href="css/style.css">
    <title>文章页</title>
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
        <a><cite>关于网站</cite></a>
     </span>
    </blockquote>
</div>
<!--统计、时间戳或部分结束-->
<!--正文部分-->
<div id="mine-body" class="layui-container">
    <div class="layui-tab layui-tab-brief" lay-filter="mine-tab">
        <ul class="layui-tab-title">
            <li class="layui-this"><i class="fa fa-chrome"></i> 关于「博客系统」</li>
            <li><i class="fa fa-book"></i> 关于「我」</li>
            <li><i class="fa fa-user"></i> 关于「网站」</li>
        </ul>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <ul class="layui-timeline" style="margin-top: 20px">
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">2018年5月6日</h3>
                            <p>
                                一个基于layui的个人博客基本完成~ <i class="layui-icon"></i>
                            </p><br>

                            <p>将项目部署到阿里云服务中</p><br>
                            <p style="color: red">博客系统正式上线啦 <i class="layui-icon"></i>~~~~~</p>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">2018年3月6日~2018年5月5日(个人博客系统开发阶段)</h3>
                            <div style="color: #00b7ee">
                                <p>开发工具：IDEA</p>
                                <p>版本构建工具：MAVEN</p>
                                <p>后端开发语言：javaWeb</p>
                                <p>系统架构：springmvc+spring+mybatis+freemarker</p>
                            </div>
                            <br>

                            <p style="font-weight: bold">前台主要功能</p>
                            <ul>
                                <li>主页文章列表展示</li>
                                <li>文章分类功能</li>
                                <li>文章标签功能</li>
                                <li>文章搜索功能</li>
                                <li>文章详情页展示</li>
                                <li style="color: red">文章评论功能（支持多楼层评论）</li>
                            </ul>
                            <p style="font-weight: bold">后台主要功能</p>
                            <ul>
                                <li>文章管理</li>
                                <li>评论管理</li>
                                <li>文章分类标签管理</li>
                                <li style="color:red;">还有更多的功能正在开发中...</li>
                            </ul>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                        <div class="layui-timeline-content layui-text">
                            <h3 class="layui-timeline-title">2018年3月1日</h3>
                            <p>时间过的真快，转眼间四年的学习生活就要结束了~回想起来，自己好像还没做出什么大的项目，萌生出要做一个毕业设计的念头，说干就干~ </p>
                            <p style="font-weight: bold;color: red">决定做一个《个人的博客系统》</p>
                            <ul>
                                <li>系统分析阶段,编写需求文档~~</li>
                                <li>前端页面的布局设计等~</li>
                                <li>系统数据库的设计</li>
                                <li>....</li>
                            </ul>
                        </div>
                    </li>
                    <li class="layui-timeline-item">
                        <i class="layui-icon layui-timeline-axis">&#xe63f;</i>
                        <div class="layui-timeline-content layui-text">
                            <div class="layui-timeline-title">很久之前~</div>
                        </div>
                    </li>
                </ul>

            </div>
            <div class="layui-tab-item">
                <div class="layui-tab-item layui-text layui-show"><p></p>
                    <p></p>
                    <p></p>
                    <ul>
                        <li>简介：<span style="color: #c24f4a;">90后码农，主研方向：Java、前端web</span>
                        </li>
                        <li>学习方向：<span style="">Java工程师</span></li>
                        <li>GitHub：<span style=""><a target="_blank" href="https://github.com/xuzijia">https://github.com/xuzijia</a></span>
                        </li>
                        <li>邮箱：<span style="">2295443695@qq.com</span></li>
                    </ul>

                </div>


            </div>
            <div class="layui-tab-item">
                <p>服务器提供商：阿里云</p>
                <p>服务器配置：CPU：1GHz，Memory：1G，Max Bandwidth：20Mbps，OS：CentOS 6.4</p>
                <p>网站域名：www.91cloud.top</p>
            </div>
        </div>
    </div>
</div>
<!--正文部分结束-->
<#include "blog/footer.ftl">

<script src="/commons/layui/layui.js"></script>
<script src="js/index.js"></script>
<script src="js/svg.js"></script>

<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
<!--[if lt IE 9]>
<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
<script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</body>
</html>