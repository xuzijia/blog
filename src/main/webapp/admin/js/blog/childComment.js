var layout = [
    {name: 'node', treeNodes: true, headerClass: 'value_col', colClass: 'value_col'},
    {name: '用户名', treeNodes: false, headerClass: 'value_col', colClass: 'value_col',render:function(row){
        if(row.userId==1){
            return "简单<span style='color: red'>(博主)</span>";
        }
        return row.visitorName;
    }},
    {name: '内容', treeNodes: false, headerClass: 'value_col', colClass: 'value_col',render:function(row){
        return row.content;
    }},
    {name: '评论时间', treeNodes: false, headerClass: 'value_col', colClass: 'value_col',
        render:function(row){
            return new Date(row.commentTime).format("yyyy-MM-d hh:mm:ss");
        }
    },
    {name: '操作', treeNodes: false, headerClass: 'value_col', colClass: 'value_col',render:function(row){
        return '' +
            '        <a href="javascript:;" title="回复" class="hf" data-id="'+row.id+'">\n' +
            '            <i class="iconfont icon-edit" style="color: #5fc04c" ></i>\n' +
            '        </a>\n' +
            '        <a href="javascript:;" title="删除" class="del" data-id="'+row.id+'">\n' +
            '            <i class="iconfont icon-unie046 btn" style="color: red;font-size: 20px"></i>\n' +
            '        </a>';
    }},
];
var search=location.search;
var data={};
if(search!=""){
    data= getParams(search);
}



layui.use(['tree', 'layer', 'form'], function(){
    var layer = layui.layer, $ = layui.jquery;
    var form = layui.form;
    //请求数据
    var resultData;

    //查询根评论信息
    $.ajax({
       url:"/admin/blog/comment/findCommentById.do",
       data:data,
       success:function(result){
           if(result.code==0){
               var obj=result.object;
               $("#username").text(obj.visitorName);
               $("#content").text(obj.content);
               $("#commentTime").text(new Date(obj.commentTime).format("yyyy-MM-d hh:mm:ss"));
               $("#count").text(obj.count);
           }

       }
    });

    $.ajax({
        url:"/admin/blog/comment/getChildDataJson.do",
        data:data,
        success:function(result){
            resultData=JSON.parse(result)
            console.log(resultData);
            //遍历树
            layui.treeGird({
                elem: '#demo',   //传入元素选择器
                checkbox:true,
                spreadable:false,
                nodes: resultData,
                layout:layout
            });
            form.render();
        }
    });

});