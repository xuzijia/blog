layui.use(['table', 'jquery', 'layer', 'form', 'flow', 'upload', 'element','util'], function () {
    table = layui.table;
    $ = layui.$;
    layer = layui.layer;
    form = layui.form;
    flow = layui.flow;
    upload = layui.upload;
    element = layui.element;
    util=layui.util;

    //固定块
    util.fixbar({
        bar1: false
        , css: {right: 10, bottom: 25}
        , bgcolor: '#9F9F9F'

    });
    var load = layer.load(1,{time: 10*1000});
    //加载分类和标签
    $.ajax({
        url: '/admin/blog/findCategory.do',
        success: function (res) {
            if (res.code == 0) {
                //设置表单
                $.each(res.data, function (index, item) {
                    $("#category").append("<option value='" + item.id + "'>" + item.name + "</option>");
                });
                form.render("select");
            }
        }
    });
    $.ajax({
        url: '/admin/blog/findTag.do',
        success: function (res) {
            if (res.code == 0) {
                //设置表单
                $.each(res.data, function (index, item) {
                    //<input type="checkbox" name="labelId" title="springmvc~" value="1">
                    $(".label").append('<input type="checkbox" name="labelId" title="' + item.name + '" value="' + item.id + '">');
                });
                form.render("checkbox");
            }
        }
    });


    //封面上传
    upload.render({
        elem: '#thumb-upload',
        url: '/admin/blog/uploadThumbPic.do',
        field:'upfile',
        size:4096,
        data:{"flag":"true"},
        done: function (res) {
            if (res.code == 0) {
                var src = res.object.src;
                //显示图片
                var thumbhtml = '<div class="show-thumb"><img src="' + src + '" alt="找不到图片~"><i class="iconfont icon-unie046 del-thumb"></i></div>';

                $(".show-thumb-p").html(thumbhtml);

                //设置url到表单中
                $(".thumbPic").val(src);
            } else {
                layer.msg("封面上传失败,请重试");
            }
        },
        error: function () {
            layer.msg("封面上传失败,请重试");
        }
    });

    //删除缩略图
    $(document).on("click", ".del-thumb", function () {
        $(".show-thumb-p").html("");
        //删除表单中的信息
        $(".thumbPic").val("");
    });
    //实例化编辑器
    ue = UE.getEditor('myEditor');

    layer.close(load);
    var id;
   $(function () {
       //回显文章数据
       var search = window.location.search;
       var data={};
       if(search!=""){
           data= getParams(search);
       }
       if(data.id){
           id=data.id;
           var load = layer.load(1,{time: 10*1000});
           $.ajax({
               url:'/admin/blog/findArticleById.do',
               data:data,
               success:function(data) {
                   if (data.code == 0) {
                       data=data.object;
                       $(".title").text("修改文章");
                       //设置待修改的值
                       $("input[name=id]").val(data.id);
                       $("input[name=title]").val(data.title);
                       $("textarea[name=summary]").val(data.summary);
                       $("select[name=categoryId]").find("option[value="+data.categoryId+"]").attr("selected","selected");
                       if(data.labelId!=undefined){
                           var labels = data.labelId.split(",");
                           layui.each(labels, function (index, item) {
                               $("input[name=labelId][value="+item+"]").attr("checked","checked");
                           });
                       }
                       $("input[name=isPublic][value=" + data.isPublic + "]").attr("checked",true);
                       if(data.isTop==0){
                           $("input[name=isTop]").attr("checked",false);
                       }else{
                           $("input[name=isTop]").attr("checked",true);
                       }
                       $("input[name=status][value=" + data.status + "]").attr("checked",true);
                       $("input[name=isOriginal][value=" + data.isOriginal + "]").attr("checked",true);
                       $("input[name=sourceUrl]").val(data.sourceUrl);
                       if (data.isComment == 0) {
                           $("input[name=isComment]").attr("checked",false);
                       }else{
                           $("input[name=isComment]").attr("checked",true);
                       }
                       if (data.thumbPic) {
                           var thumbhtml = '<div class="show-thumb"><img src="' + data.thumbPic + '" alt="' + data.thumbPic + '"><i class="iconfont icon-unie046 del-thumb"></i></div>';
                           $(".show-thumb-p").html(thumbhtml);
                           //设置url到表单中
                           $(".thumbPic").val(data.thumbPic);
                       }
                       // console.log(data.content);

                       ue.ready(function() {
                           ue.setContent(data.content);
                       });

                   }else{
                       layer.alert(data.msg);
                   }
                   form.render();
                   layer.close(load);
               }
           });
       }
       //监听提交
       form.on('submit(add)', function (data) {
            submitArticle(data,true);
       });

       //保存文章
       function submitArticle(data,flag){
           var content = ue.getContent();
           $("textarea[name='content']").text(content);
           var summary = $("textarea[name='summary']").val();

           //判断转载时来源地址是否为空
           if(data.field.isOriginal==0){
               var sourceUrl = $("input[name=sourceUrl]").val();
               if(sourceUrl==""){
                   layer.msg("转载请声明转载地址！", {icon: 5});
                   return ;
               }
           }

           //判断是否有内容
           var c = ue.getContent();
           var ct=ue.getContentTxt();
           if (c.length == 0) {
               layer.msg("请输入内容!!!!", {icon: 5});
               return;
           }
           if(ct.length==0 && summary.length==0){
               layer.alert("因为内容没有包含文字信息,请输入摘要吧~", {icon: 5});
               return;
           }

           //判断摘要是否为空 如果为空截取内容部分
           if (summary == '' || summary == undefined) {
               if (ct.length <= 250) {
                   //截取内容前250字 如果没有250字截取全部
                   summary = ct;
               } else if (ct.length > 250) {
                   //截取前250
                   summary=ct.substring(0,250);
               }
               //summary+="...";
               //设置到摘要
               $("textarea[name='summary']").val(summary);
           }
           var formdata = $(data.form).serialize();
           //开关off时不传值问题
           if(data.field.isTop==undefined){
               formdata+="&isTop=0";
           }
           if(data.field.isComment==undefined){
               formdata+="&isComment=0";
           }

           // console.log(data.field);
           // console.log(formdata);
           $.ajax({
               url: '/admin/blog/addArticle.do',
               method: 'post',
               data: formdata,
               // contentType:"application/json",
               dataType: 'json',
               success: function (result) {
                   if (result.code == 0) {
                       //关闭添加窗口 并刷新文章列表
                        if(flag){
                            parent.layer.closeAll();
                            parent.table.reload("article-list");
                            parent.layer.msg("操作成功！", {icon: 1});
                        }
                   } else {
                       layer.alert("文章添加失败！系统错误~", {icon: 5});
                       return false;
                   }
               }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                   layer.alert("文章添加失败！请稍后再试~", {icon: 5});
                   return false;
               }
           });
       }

   });
});