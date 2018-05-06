layui.use(['table', 'jquery', 'layer', 'form', 'flow','upload'], function () {
    var table = layui.table;
    $ = layui.$;
    layer = layui.layer;
    form = layui.form;
    flow = layui.flow;
    upload=layui.upload;

    form.render();

    //初始化mode
    var mode = window.sessionStorage.getItem("mode");
    console.log(mode);
    if (mode == null || mode == undefined) {
        //默认列表模式
        mode = "list";
    }
    $("#file-mode").attr("mode", mode);
    $("#file-mode").on("click", function () {
        if ($(this).attr("mode") == "list") {
            $(this).attr("mode", "gird");
            window.sessionStorage.setItem("mode", "grid");
        } else if ($(this).attr("mode") == "grid") {
            $(this).attr("mode", "list");
            window.sessionStorage.setItem("mode", "list");
        } else {
        }
        window.location.reload();
    });

    if (mode == "list") {
        //渲染网盘文件 列表模式
        $(".file-gird #selectAll").css("display", "none");
        table.render({
            elem: '#table-file',
            url: '/admin/page/wp/json/allFile.json',
            cols: [[
                {type: 'checkbox'},
                {field: 'name', title: '文件名', sort: true, templet: "#filename"},
                {field: 'size', title: '大小', sort: true},
                {field: 'updateTime', title: '修改时间', sort: true}

            ]],
            //渲染网盘文件 网格模式
            done: function (data, curr, count) {
                console.log(data);
                console.log(count);
            }
        });

    } else if (mode == "grid") {
        $(".file-gird #selectAll").css("display", "block");
        $.ajax({
            "url": '/admin/page/wp/json/allFile.json',
            success: function (data) {
                console.log(data);
                $.each(data.data, function (index, item) {
                    var fileHtml = "<div>";
                    fileHtml += "<div class='icon-img'>";
                    //判断是文件夹还是文件
                    if (!item.type) {
                        //文件夹
                        fileHtml += "<i class='iconfont icon-file-b-'></i>";
                    } else {
                        //文件 需要判断文件类型
                        fileHtml += "<i class='iconfont icon-pdf'></i>";
                    }
                    fileHtml += "</div><div class='filename'><a href='' title='" + item.name + "'>" + item.name + "</a></div>";
                    fileHtml += "<span class='iconfont select'>&#xe62a;</span></div>";
                    $(".icon-file").append(fileHtml);
                });
            }
        });
    }

    //单选
    $(".icon-file").on("click", ".select", function () {
        //判断是不是未选中后点击的
        if ($(this).attr("select")) {

            //取消选中
            $(this).removeAttr("select");
            //删除选中样式
            $(this).parent().removeClass("click-select-file-icon");
            $(this).removeClass("click-select");
        } else {
            //选中
            $(this).attr("select", "true");
            //添加选中样式
            $(this).parent().addClass("click-select-file-icon");
            $(this).addClass("click-select");
        }

    });

    //全选
    $("#selectAll").on("click", function () {
        if ($(this)[0].checked) {
            //全选
            $.each($(".icon-file > div"), function (index, item) {
                $(item).addClass("click-select-file-icon");
                $(item).find("span").attr("select", "true");
                $(item).find("span").addClass("click-select");
            });
        } else {
            //取消全选
            //全选
            $.each($(".icon-file > div"), function (index, item) {
                $(item).removeClass("click-select-file-icon");
                $(item).find("span").removeAttr("select", "true");
                $(item).find("span").removeClass("click-select");
            });
        }
    });

    //渲染回收站
    table.render({
        elem: '#recycle',
        url: '/admin/page/wp/json/recycle.json',
        cols: [[
            {type: 'checkbox'},
            {field: 'name', title: '文件名', templet: "#filename"},
            {field: 'size', title: '大小',},
            {field: 'deleteTime', title: '删除时间'},
            {field: 'validTime', title: '有效时间'}

        ]],
    });


    //下拉加载我的图片
    flow.load({
        elem: '#img-list',
        isAuto:false
        , done: function (page, next) {
            var lis=[];
            //加载数据
            $.get('/admin/page/wp/json/photo.json?page='+page,function(res){
                layui.each(res.data,function(index,item){
                    //遍历图片
                    var itemimg='';
                    layui.each(item.list,function(index,item){
                        itemimg+='<div class="img">' +
                            '<img src="'+item.url+'" layer-src="'+item.url+'" alt="'+item.name+'">' +
                            '</div>';
                    });
                    var imghtml='<div class="photo-item">' +
                        '<div class="img-title">' +
                        '<input type="checkbox">' +
                        '<span> '+item.time+'</span>' +
                        '</div>' +
                        '<div class="img-list">' +itemimg+
                        '</div>' +
                        '</div>';
                    lis.push(imghtml);
                });

                next(lis.join(''),page<res.pages);
            });
        }
    });

    //新建文件夹
    $("#createDir").on("click",function(){
        layer.prompt(
            {
                formType:0,
                title:'请输入文件夹名称'
            },
            function(value,index){
                //发送服务器请求 创建该文件夹
                layer.close(index);
            }
        );

    });

    //上传
    upload.render({
        elem:'#uploadFile',
        url:'/admin/page/wp/json/uploadRes.json',
        accept:'file',
        field:'file',
        multiple:true,
        drag:true,
        choose:function(obj){
            console.log(obj);
        },
        before:function(obj){
            console.log(obj);
        },
        done:function(res,index,upload){
            if(res.code==0){
                console.log(res);
            }else{
                upload();
            }
        },
        allDone:function(obj){
            console.log(obj);
            layer.alert("上传成功");
        },
        error:function(index,upload){
            layer.alert("上传失败");
        }
    });
    //拖动上传


    //图片弹出层
    layer.photos({
        photos: '#img-list',
        anim: 1
    });

    //图片懒加载
    flow.lazyimg();
});