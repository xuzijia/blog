layui.use(['table', 'jquery', 'layer', 'form', 'flow','upload','element'], function () {

    table = layui.table;
    $ = layui.$;
    layer = layui.layer;
    form = layui.form;
    flow = layui.flow;
    upload = layui.upload;
    element = layui.element;

    //渲染分类表格
    table.render({
        elem:'#category-table',
        url:'/admin/blog/findCategoryAndCount.do',
        cols:[[
            {type:'checkbox'},
            {field:'id',title:'id'},
            {field:'name',title:'分类名称',edit:'text'},
            {field:'count',title:'文章数量',templet:"#category-count",sort:true}
        ]]
    });

    //添加分类
    $(".add-category").on("click",function(){
        var index=layer.prompt({
            title:"请输入分类名称",
            formType:0,
        },function(value,index,elem){
            $.ajax({
                url:'/admin/blog/addCategory.do',
                data:{"name":value},
                method:'post',
                success:function(res){
                    if(res.code==0){
                        layer.close(index);
                        layer.msg("添加成功",{icon:1});

                    }else{
                        layer.close(index);
                        layer.msg(res.msg,{icon:5});
                    }
                    table.reload('category-table');

                }
            });
        });
    });

    //修改分类
    table.on('edit(category)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        // console.log(obj.value); //得到修改后的值
        // console.log(obj.field); //当前编辑的字段名
        // console.log(obj.data); //所在行的所有相关数据

        var index = layer.load(1);
        $.ajax({
            url:'/admin/blog/updateCategory.do',
            data:obj.data,
            method:'post',
            success:function(res){
                if(res.code==0){
                    layer.close(index);
                    layer.msg("修改成功",{icon:1});
                }else{
                    layer.close(index);
                    layer.msg(res.msg,{icon:5});
                }
                table.reload('category-table');
            }
        })

    });


    //删除分类
    $(".del-category").on("click",function(event){
        //获取选中的数据
        var checkStatus = table.checkStatus('category-table'); //test即为基础参数id对应的值

        if(checkStatus.data.length==0){
            layer.msg("请选中后操作~",{icon:5});
        }else{
            layer.confirm("您是否确定删除这些数据",{icon: 3, title:'提示'},function(index){
                //发送请求
                var data = checkStatus.data;
                var ids=[];
                $.each(data,function(index,item){
                    ids.push(item.id);
                });
                console.log(ids.join(","));
                $.ajax({
                    url:'/admin/blog/delCategory.do',
                    method:'post',
                    data:{"ids":ids.join(",")},
                    success:function(res){
                        if(res.code==0){
                            layer.close(index);
                            layer.msg(res.msg);
                            table.reload("category-table");
                        }else{
                            layer.close(index);
                            layer.msg(res.msg,{icon:5});
                            table.reload("category-table");
                        }
                    },error:function(){
                        layer.close(index);
                        layer.msg("操作失败",{icon:5});
                    }
                });
            });

        }

    });


    //添加标签
    $(".add-tag").on("click",function(){
        $(".show-add-tag").find("input[name='name']").val("");
        layer.open({
            type:1,
            title:'添加标签',
            content:$(".show-add-tag"),
            success:function(layero, index){
                //关闭窗口
                $(layero).find(".close-btn").on("click", function () {
                    layer.close(index);
                });
                //添加操作
                form.on("submit(add)", function (data) {
                    var tagData = $(data.form).serialize();
                    //todo ajax提交即可~
                    console.log(tagData);
                    $.ajax({
                        url:'/admin/blog/addTag.do',
                        data:tagData,
                        method:'post',
                        success:function(res){
                            if(res.code==0){
                                layer.close(index);
                                layer.msg("添加成功",{icon:1});

                            }else{
                                layer.close(index);
                                layer.msg(res.msg,{icon:5});
                            }
                            table.reload('tag-table');
                        }
                    });


                });
            }
        });
    });

    //修改标签
    table.on('edit(tag)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var index = layer.load(1);
        $.ajax({
            url:'/admin/blog/updateTag.do',
            data:obj.data,
            method:'post',
            success:function(res){
                if(res.code==0){
                    layer.close(index);
                    layer.msg("修改成功",{icon:1});
                }else{
                    layer.close(index);
                    layer.msg(res.msg,{icon:5});
                }
                table.reload('tag-table');
            }
        })

    });

    //删除标签
    $(".del-tag").on("click",function(event){
        //获取选中的数据
        var checkStatus = table.checkStatus('tag-table'); //test即为基础参数id对应的值

        if(checkStatus.data.length==0){
            layer.msg("请选中后操作~",{icon:5});
        }else{
            layer.confirm("您是否确定删除这些数据",{icon: 3, title:'提示'},function(index){
                //发送请求
                var data = checkStatus.data;
                var ids=[];
                $.each(data,function(index,item){
                    ids.push(item.id);
                });
                console.log(ids.join(","));
                $.ajax({
                    url:'/admin/blog/delTag.do',
                    method:'post',
                    data:{"ids":ids.join(",")},
                    success:function(res){
                        if(res.code==0){
                            layer.close(index);
                            layer.msg("操作成功",{icon:1});
                            table.reload("tag-table");
                        }
                    },error:function(){
                        layer.close(index);
                        layer.msg("操作失败",{icon:5});
                    }
                });

            });

        }

    });


    //渲染标签表格
    table.render({
        elem:'#tag-table',
        url:'/admin/blog/findTagAndCount.do',
        cols:[[
            {type:'checkbox'},
            {field:'id',title:'id'},
            {field:'name',title:'标签名称',templet:"#tag-name",edit:'text'},
            // {field:'count',title:'文章数量',templet:'#tag-count'},
            {field:'categoryId',title:'所属分类',templet:"#cat"}
        ]]
    });



});