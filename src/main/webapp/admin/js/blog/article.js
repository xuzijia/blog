layui.use(['table', 'jquery', 'layer', 'form', 'flow','upload','element'], function () {

    table = layui.table;
    $ = layui.$;
    layer = layui.layer;
    form = layui.form;
    flow = layui.flow;
    upload = layui.upload;
    element = layui.element;

    //渲染文章列表
    table.render({
        elem:'#article-list',
        url:'/admin/blog/findArticle.do',
        page:true,
        cols:[[
            {type: 'checkbox',fixed:'left'},
            {field:'id',title:'id',width:120},
            {field:'title',title:'文章标题',templet:"#title"},
            {field:'categoryName',title:'所属分类',width:120},
            {field:'cTime',title:'发布时间',sort:true,width:200},
            {field:'isOriginal',title:'文章来源',width:100,templet:'#source'},
            {field:'status',title:'发布状态',templet:'#article-status',align:'center',width:150},
            {field:'isPublic',title:'是否公开',templet:'#article-isPublic',width:150},
            {field:'isTop',title:'是否置顶',templet:'#article-isTop',width:150},
            {field:'readCount',title:'阅读量',sort:true,width:120},
            {title:'操作',templet:'#article-btn',width:200,fixed:'right'},

        ]]
    });

    //####事件监听

    //serach
    $("#search").on("click",function(e){
        var q=$("input[name=search]").val();
        //table reload
        table.reload('article-list',{
            url:'/admin/blog/findArticle.do',
            where:{"q":q}
        });
    });

    //batch del
    $(".del").on("click",function(){
        var selectRow = table.checkStatus("article-list");
        if(selectRow.data.length==0){
            layer.msg("请选择数据",{icon:5});
            return;
        }
        layer.confirm("你确定要删除这些数据?",function(){
            var data=selectRow.data;
            var ids=[]
            $.each(data,function(key,item){
                ids.push(item.id);
            });
            //ajax
            $.ajax({
                url:"/admin/blog/delArticle.do",
                method:'post',
                data:{"id":ids.join(",")},
                success:function(data){
                    if(data.code==0){
                        layer.msg("删除成功",{icon:1});
                    }else{
                        layer.msg("删除失败",{icon:5});
                    }
                    //重新渲染文章列表
                    table.reload('article-list');
                }
            });
        });
    });

    //是否公开操作
    form.on('switch(isPublic)',function(obj){
         var id=$(this).attr("aid");
         //layer.tips(this.name + '：' + obj.elem.checked , obj.othis);
         var index=layer.load(1,{time: 10*1000});
        //执行修改操作
        if(obj.elem.checked){
            var data={"id":id,"isPublic":1};
        }else{
            var data={"id":id,"isPublic":0};
        }
        ajaxUpdate(data);
        layer.close(index);
    });

    function ajaxUpdate(data){
        console.log(data);
        $.ajax({
            url:'/admin/blog/addArticle.do',
            data:data,
            success:function(res){
                if(res.code==0){
                    layer.msg("操作成功",{icon:1});
                }else{
                    layer.msg("操作失败",{icon:5});
                }
            },
            error:function(){
                layer.msg("操作失败",{icon:5});
            }
        });
    }

    //是否置顶操作
    form.on("checkbox(isTop)",function(obj){
        var id=$(this).attr("aid");
        var index=layer.load(1,{time: 10*1000});
        //执行修改操作
        if(obj.elem.checked){
            var data={"id":id,"isTop":1};
        }else{
            var data={"id":id,"isTop":0};
        }
        ajaxUpdate(data);
        layer.close(index);
    });

    //发布操作
    $(document).on("click",".fb",function(){
        //获取要发布的id
        var span=$(this);
        layer.confirm("你确定要发布吗",function(index){
            var id=span.attr("aid");
            //执行修改操作
            var data={"id":id,"status":1};
            ajaxUpdate(data);

        });
    });

    //取消发布操作
    $(document).on("click",".nfb",function(){
        //获取要发布的id
        var span=$(this);
        layer.confirm("你确定要取消发布该文章吗?",function(index){
            var id=span.attr("aid");
            //执行修改操作
            var data={"id":id,"status":0};
            ajaxUpdate(data);
        });

    });

    //删除修改操作
    table.on('tool(article-list)', function (obj) {
        //获取当行信息
        var data = obj.data;
        var event = obj.event;
        //获取操作
        if (event == 'del') {
            //删除操作
           layer.confirm("你确定要删除该文章吗?",function(index){
               $.ajax({
                   url:"/admin/blog/delArticle.do",
                   data:{"id":data.id},
                   success:function(res){
                       if(res.code==0){
                           layer.msg("删除成功！",{icon:1});
                       }
                       //重新渲染文章列表
                       table.reload('article-list');
                   },
                   error:function(){
                       layer.msg("删除失败",{icon:5});
                   }
               });
           });

        } else if (event == 'edit') {
            //编辑操作 弹出窗口
            addUpdate_article(data);
        } else {
        }
    });

    //添加文章页面
    $(".add-article").on("click", function () {
        addUpdate_article();
    });

    //添加文章或者修改文章
    function addUpdate_article(data){
        var url="/admin/page/blog/addArticle.html";
        if(data){
            url+="?id="+data.id;
        }
        var index = layer.open({
            type: 2,
            content: url,
            maxmin: true,
            success:function(layero,index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        });
        layer.full(index);

    }


    //重新渲染文章列表
    table.reload('article-list');
});