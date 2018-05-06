function showArticle(page,next,data){
    //初始化每页显示多少条
    var limit=5;
    var list=[];
    $.ajax({
        url:"/blog/findArticleList.do?page="+page+"&limit="+limit,
        data:data,
        success:function(data){
            if(data.code==0){
                layui.each(data.data,function(key,item){
                    //加载文章url
                    var url="/blog/article/"+item.id;

                    //加载标签和是否置顶
                    var topTag="";
                    if(item.isTop){
                        topTag+="<span class=\"layui-badge layui-bg-cyan\">置顶</span>";
                    }
                    //是否原创
                    var isOriginal=""
                    if(item.isOriginal==1){
                        isOriginal+="<span class=\"layui-badge layui-bg-blue\">原创</span>";
                    }
                    console.log(item.isOriginal);

                    var tagHtml="";
                    if(item.tagList.length!=0){
                        $.each(item.tagList,function(key,tag){
                            tagHtml+="<span class=\"layui-badge-rim\"><i class=\"fa fa-tag\"></i> <span>"+tag.name+"</span></span>"
                        });
                    }else{
                        tagHtml+="<span>暂无标签~</span>";
                    }
                    //加载文章列表
                    var content;
                    if(!item.thumbPic){
                        content="<div class=\"layui-collapse layui-panel layui-article\">\n" +
                            "                <div class=\"layui-colla-item\">\n" +
                            "                    <div class=\"layui-colla-content layui-show layui-article\">\n" +
                            "                        <fieldset class=\"layui-elem-field layui-field-title\">\n" +
                            "                            <legend class=\"center-to-head\">"+isOriginal+"\n" +
                            "                                "+topTag+"&nbsp;<span class=\"layui-badge layui-bg-green\">"+item.categoryName+"</span>\n" +
                            "                                \n" +
                            "                                <a href=\""+url+"\">"+item.title+"</a>\n" +
                            "                            </legend>\n" +
                            "                            <div class=\"layui-field-box\">\n" +
                            "                                &nbsp;&nbsp;&nbsp;&nbsp;"+item.summary+"...<a class=\"loading select-none\" href=\""+url+"\"> 阅读全文<i\n" +
                            "                                    class=\"fa fa-angle-double-right\"></i> </a>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"operation\">\n" +
                            "                                <div class=\"tags\">\n" +
                            "                                    "+tagHtml+"\n" +
                            "                                </div>\n" +
                            "                                <div class=\"info\">\n" +
                            "                                    <span class=\"views select-none\"><i class=\"fa fa-eye\"></i> "+item.readCount+"</span>\n" +
                            "                                    <span class=\"datetime select-none\"><i class=\"fa fa-clock-o\"></i> "+new Date(item.createTime).format('yyyy-MM-dd')+"</span>\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                        </fieldset>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "            </div>";
                    }else{
                        content="<div class=\"layui-collapse layui-panel layui-article\">\n" +
                            "                <div class=\"layui-colla-item\">\n" +
                            "                    <div class=\"layui-colla-content layui-show layui-article\">\n" +
                            "                        <fieldset class=\"layui-elem-field layui-field-title\">\n" +
                            "                            <legend class=\"center-to-head\">"+isOriginal+"\n" +
                            "                                "+topTag+"&nbsp;<span class=\"layui-badge layui-bg-green\">"+item.categoryName+"</span>\n" +
                            "                                <a href=\""+url+"\" target='_blank'>"+item.title+"</a>\n" +
                            "                            </legend>\n" +
                            "                            <div class=\"layui-field-box has-pic\" style=\"word-break: break-all;\">\n" +
                            "                                <div class=\"layui-row layui-col-space10\">\n" +
                            "                                    <div class=\"layui-col-lg10 layui-col-md10 layui-col-sm10 layui-col-xs12\">\n" +
                            "                                        \n" +
                            "                                        "+item.summary+"...\n" +
                            "                                        <a class=\"loading select-none\" href=\""+url+"\" target='_blank'> 阅读全文<i\n" +
                            "                                                class=\"fa fa-angle-double-right\"></i> </a>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"layui-col-lg2 layui-col-md2 layui-col-sm2\">\n" +
                            "                                        <img class=\"panel-pic\"\n" +
                            "                                             src=\""+item.thumbPic+"\"\n" +
                            "                                             alt=\"找不到图片~\">\n" +
                            "                                    </div>\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                            <div class=\"operation\">\n" +
                            "                                <div class=\"tags\">\n" +
                            "                                    "+tagHtml+"\n" +
                            "                                </div>\n" +
                            "                                <div class=\"info\">\n" +
                            "                                    <span class=\"views select-none\"><i class=\"fa fa-eye\"></i> "+item.readCount+"</span>\n" +
                            "                                    <span class=\"datetime select-none\"><i class=\"fa fa-clock-o\"></i> "+new Date(item.createTime).format('yyyy-MM-dd')+"</span>\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                        </fieldset>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "            </div>"
                    }
                    list.push(content);

                });
                //计算页数 count/limit
                var pages = Math.ceil(data.count/limit);
                $(".sum-font").text(data.count);

                next(list.join(''),page<pages);
            }
            else{
                layer.msg("加载文章失败,请稍后重试~",{icon:5});
            }
        }
    });
}