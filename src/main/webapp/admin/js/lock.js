/**
 * lock锁屏
 */
layui.use(['form','jquery',"layer"],function() {

    var form = layui.form,
        $ = layui.jquery,
        layer = parent.layer === undefined ? layui.layer : top.layer;


    $(".lockcms").on("click",function(){
        window.sessionStorage.setItem("lockcms",true);
        lockPage();
    })
    // 判断是否显示锁屏
    if(window.sessionStorage.getItem("lockcms") == "true"){
        lockPage();
    }
    // 解锁
    $("body").on("click","#unlock",function(){
        if($(this).siblings(".admin-header-lock-input").val() == ''){
            layer.msg("请输入解锁密码！",{shift:6});
            $(this).siblings(".admin-header-lock-input").focus();
        }else{
            if($(this).siblings(".admin-header-lock-input").val() == "123456"){
                window.sessionStorage.setItem("lockcms",false);
                $(this).siblings(".admin-header-lock-input").val('');
                layer.closeAll("page");
            }else{
                layer.msg("密码错误，请重新输入！",{shift:6});
                layer.title("标题变了",lockPageId);
                $(this).siblings(".admin-header-lock-input").val('').focus();
            }
        }
    });
    //回车操作确认密码
    $(document).on('keydown', function(event) {
        var event = event || window.event;
        if(event.keyCode == 13) {
            $("#unlock").click();
        }
    });
    //全局监控shift+L进行锁屏
    $(document).on('keydown','body',function(event){
            var event = event || window.event;
            if(event.keyCode==76 && event.shiftKey){
                window.sessionStorage.setItem("lockcms",true);
                lockPage();
            }
    });

    //锁屏
    var lockPageId;
    function lockPage(){
        lockPageId=layer.open({
            title : false,
            type : 1,
            content : '<div class="admin-header-lock" id="lock-box">'+
            '<div class="admin-header-lock-img"><img src="images/face.jpg" class="userAvatar"/></div>'+
            '<div class="admin-header-lock-name" id="lockUserName">简单</div>'+
            '<div class="input_btn">'+
            '<input type="password" class="admin-header-lock-input layui-input" autocomplete="off" placeholder="请输入密码解锁.." name="lockPwd" id="lockPwd" />'+
            '<button class="layui-btn layui-extends-btn" id="unlock">解锁</button>'+
            '</div>'+
            '<p>请输入“123456”进行解锁</p>'+
            '</div>',
            closeBtn : 0,
            shade : 1,
            success : function(){
                //判断是否设置过头像，如果设置过则修改顶部、左侧和个人资料中的头像，否则使用默认头像
                if(window.sessionStorage.getItem('userFace') &&  $(".userAvatar").length > 0){
                    $(".userAvatar").attr("src",$(".userAvatar").attr("src").split("images/")[0] + "images/" + window.sessionStorage.getItem('userFace').split("images/")[1]);
                }
            }
        });
        setTimeout(function(){
            $(".admin-header-lock-input").focus();
        },100);

    }

})