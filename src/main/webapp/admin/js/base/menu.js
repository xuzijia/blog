/*
    menu
 */
layui.use(['table', 'jquery', 'layer', 'form'], function () {
    table = layui.table;
    form = layui.form;
    form.render();
    layer = layui.layer;
    //引入jquery
    $ = layui.$;
    //渲染表格
    table.render({
        elem: '#table-menu'
        , url: 'json/menu.json'
        , cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field: 'id', 'title': '编号', 'width': 100, fixed: 'left'},
            {field: 'name', 'title': '名称', fixed: 'left'},
            {field: 'code', 'title': '字段编码'},
            {field: 'href', 'title': '链接地址', edit: 'text'},
            {field: 'description', 'title': '描述', edit: 'text'},
            {field: 'parent', 'title': '上级菜单'},
            {field: 'status', 'title': '状态', templet: '#switch-status'},
            {title: '操作', templet: '#menu-btn', fixed: 'right'}
        ]]

    });

    //单元格编辑监听
    table.on('edit(table-menu)', function (obj) { //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var load = layer.load(1, {
            time: 10 * 1000
        });
        console.log(obj.value); //得到修改后的值
        console.log(obj.field); //当前编辑的字段名
        console.log(obj.data); //所在行的所有相关数据
        setTimeout(function () {
            layer.close(load);//ajax修改后关闭load
        }, 2000);

    });

    //状态设置监听
    form.on("switch(status)", function (obj) {
        //todo 主键 根据主键修改状态
        console.log($(this).attr("mid"));
        layer.tips(this.name + '：' + obj.elem.checked , obj.othis);
    });

    //批量删除 todo 暂时不实现
    $("#batchdel-menu").on("click",function(){
        layer.msg("暂时不实现",{anim:6});
    });

    //表格按钮监听
    table.on('tool(table-menu)', function (obj) {
        //获取当行信息
        var data = obj.data;
        var event = obj.event;
        //获取操作
        if (event == 'del') {
            //删除操作
            layer.alert("你确定要删除该菜单?", {
                btn: ['确认', '取消'],
                'btn1': function () {
                    layer.msg("确认:" + data.id);
                    //删除行
                    obj.del();
                    //todo 根据id删除即可
                }
            });d

        } else if (event == 'edit') {
            //编辑操作 弹出窗口
            updateLayer(data);
        } else {
        }
    });

    //弹出修改菜单窗口
    function updateLayer(data) {
        //弹出修改菜单选项
        //ajax加载可选菜单列表
        var updatemenuindex = layer.open({
            type: 1,
            content: $('#show-updatemenu'),
            title: '修改菜单',
            area: '600px',
            // btn:['保存','关闭'],
            maxmin: true,
            success: function (layero, index) {
                //todo ajax加载可选菜单列表,以及要修改的表单信息 获取要修改的id
                $.ajax({
                    'url': 'json/editMenu.json',
                    "data":{'id':data.id},//根据id查找菜单
                    success: function (data) {
                        //组装下拉列表
                        var menu = $("#updatemenu-select");
                        var optionList = "";
                        var editdata = data.data;
                        $.each(editdata.parentdata, function (index, item) {
                            if (editdata.id == item.id) {
                                //回显其他表单
                                $("#show-updatemenu").find("input[name='name']").val(item.n);
                                $("#show-updatemenu").find("input[name='code']").val(item.code);
                                $("#show-updatemenu").find("input[name='href']").val(item.href);
                                $("#show-updatemenu").find("textarea[name='description']").val(item.description);
                                $("#show-updatemenu").find("input[name='id']").val(item.id);
                                if (!item.status) {
                                    //启用
                                    $("#show-updatemenu").find("input[name='status']").removeAttr("checked");
                                } else {
                                    //未启用
                                    $("#show-updatemenu").find("input[name='status']").attr("checked", "");
                                }

                            }
                            if (editdata.pid == item.id) {
                                optionList += '<option value="' + item.id + '" selected> ' + item.name + '</option>';
                            } else {
                                optionList += '<option value="' + item.id + '">' + item.name + '</option>';
                            }
                        });
                        menu.append(optionList);

                        //渲染表单
                        form.render();
                    }
                });
                //关闭操作
                $(layero).find(".close-btn").on("click", function () {
                    layer.close(updatemenuindex);
                });
                //修改操作
                form.on("submit(update)", function (data) {
                    var menuData = JSON.stringify(data.field);
                    //todo ajax提交即可~
                    console.log(menuData);
                    window.location.reload();
                });

            }
        });

        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(updatemenuindex);
        });
    }
    //弹出添加菜单窗口
    $("#add-menu").on("click", function () {
        //ajax加载可选菜单列表
        var addmenuindex = layer.open({
            type: 1,
            content: $('#show-addmenu'),
            title: '添加菜单',
            area: '600px',
            // btn:['保存','关闭'],
            maxmin: true,
            success: function (layero, index) {
                //ajax加载可选菜单列表
                $.ajax({
                    'url': 'json/menu.json',
                    success: function (data) {
                        //组装下拉列表
                        var menu = $("#addmenu-select");
                        var optionList = "";
                        $.each(data.data, function (index, item) {
                            optionList += '<option value="' + item.id + '">' + item.name + '</option>';
                        });
                        menu.append(optionList);
                        //渲染表单
                        form.render();
                    }
                });
                //关闭操作
                $(layero).find(".close-btn").on("click", function () {
                    layer.close(addmenuindex);
                });
                //保存操作
                form.on("submit(add)", function (data) {
                    var menuData = JSON.stringify(data.field);
                    console.log(menuData);
                    //todo ajax提交即可~
                    window.location.reload();
                });

            }
        });

        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(addmenuindex);
        });

    });

});