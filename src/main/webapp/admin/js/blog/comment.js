layui.use(['table', 'jquery', 'layer', 'form', 'flow','upload','element'], function () {
    table = layui.table;
    $ = layui.$;
    layer = layui.layer;
    form = layui.form;
    flow = layui.flow;
    element = layui.element;


    table.render({
        elem:'#comment-table',
        url:'/admin/blog/comment/findCommentList.do',
        page:true,
        cols:[[
            {type:'checkbox'},
            {field:'avatar',title:'头像',width:80,templet:'#avatar'},
            {field:'nickname',title:'用户名',width:150},
            {field:'content',title:'内容',templet:'#content',templet:'#content'},
            {field:'articleName',title:'所属文章'},
            {field:'commentTime',title:'评论时间',sort:true,width:200},
            {field:'childCount',title:'会话数量',sort:true,width:120},
            {title:'操作',templet:'#comment-btn',width:200,fixed:'right'},
        ]]
    });

    //事件监听
    $("body").on("click",".hf",function(){
        var id=$(this).attr("data-id");
        var comment;
        //查询评论详细信息
        $.ajax({
            url:'/admin/blog/comment/findCommentByid.do',
            data:{"id":id},
            success:function(result){
                if(result.code==0){
                    comment=result.object;
                    var parentId=comment.id;
                    var rootId;
                    if(comment.rootId==""){
                        rootId=comment.id;
                    }else{
                        rootId=comment.rootId;
                    }
                    layer.prompt({
                        formType: 2,
                        title: '您正在回复 : <span style="color: red">'+comment.visitorName+'</span>&nbsp;&nbsp;<span>'+comment.visitorEmail+'</span>',
                        area: ['800px', '350px'] //自定义文本域宽高
                    }, function(value, index, elem){
                        $.ajax({
                            url:"/admin/blog/comment/replyComment.do",
                            data:{
                                "targetKey":comment.targetKey,
                                "rootId":rootId,
                                "parentId":parentId,
                                "content":value,
                                "email":comment.visitorEmail,
                                "username":comment.visitorName,
                                "sourceContent":comment.content
                            },
                            method:"post",
                            success:function(result){
                                if(result.code==0){
                                    layer.msg("回复成功",{icon:1});
                                }else{
                                    layer.msg(result.msg,{icon:5});
                                }
                            }

                        });
                        layer.close(index);
                        table.reload('comment-table');
                    });

                }
                else{
                    layer.msg("评论加载失败",{icon:5});
                }
            }
        });
    });

    //删除
    $("body").on("click",".del",function(){
        var id=$(this).attr("data-id");
        layer.confirm("你确定要删除该条评论,所有对话将被清空！",function(){
           $.ajax({
              url:'/admin/blog/comment/delComment.do',
              data:{"id":id},
              success:function(result){
                  if(result.code==0){
                      //重新渲染
                      table.reload('comment-table');
                      layer.msg("删除成功",{icon:1});
                  }else{
                      layer.msg("删除失败",{icon:5});
                  }
                  form.render();

              }
           });
        });
    });

    //查看评论对话
    $("body").on("click",".showchild",function(){
        var id = $(this).attr("data-id");
        layer.open({
            type:2,
            content:"childComment.html?id="+id,
            area:['800px','500px'],
            title:"查看对话"
        });
    });

    //批量删除

    $(".batchdel").on("click",function(){
        var selectRow = table.checkStatus("comment-table");
        if(selectRow.data.length==0){
            layer.msg("请选择数据",{icon:5});
            return;
        }
        layer.confirm("你确定要删除这些数据?",function(){
            var data=selectRow.data;
            console.log(data);
            var ids=[];
            $.each(data,function(key,item){
                ids.push(item.id);
            });
            //ajax
            $.ajax({
                url:"/admin/blog/comment/delComment.do",
                method:'post',
                data:{"id":ids.join(",")},
                success:function(data){
                    if(data.code==0){
                        layer.msg("删除成功",{icon:1});
                    }else{
                        layer.msg("删除失败",{icon:5});
                    }
                    //重新渲染文章列表
                    table.reload('comment-table');
                }
            });
        });
    });

});