package com.xuzijia.blog.controller;

import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.service.BlogUserService;
import com.xuzijia.common.QQConfig;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;

/**
 * qq互联授权接口
 * Created by xuzijia
 * 2018/4/29 14:23
 */
@Controller
public class LoginController {
    @Autowired
    private BlogUserService blogUserService;

    @RequestMapping("qqLogin")
    public void qqLogin() throws IOException {
        //Step1：获取Authorization Code
        Document document = Jsoup.connect("https://graph.qq.com/oauth2.0/authorize").data("response_type", "code")
                .data("client_id", QQConfig.APP_ID).data("redirect_uri", "http://www.91cloud.top/qqConnect")
                .data("state", "91cloud").get();
    }

    /**
     * // QQ登录有点特殊，参数放在#后面，后台无法获取#后面的参数，只能用JS做中间转换
     *
     * @param request
     * @param response
     * @throws IOException
     */
    @RequestMapping("qqConnect")
    public void qqConnect(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //location.href = location.href.replace('#', '&').replace('qqConnect', 'auth_qq_redirect');
        String html = "<!DOCTYPE html>" +
                "<html lang=\"zh-cn\">" +
                "<head>" +
                "	<title>QQ登录重定向页</title>" +
                "	<meta charset=\"utf-8\"/>" +
                "</head>" +
                "<body>" +
                "	<script type=\"text/javascript\">" +
                "	location.href = location.href.replace('#', '&').replace('qqConnect', 'auth_qq_redirect');" +
                "	</script>" +
                "</body>" +
                "</html>";
        response.getWriter().print(html);
    }

    /**
     * qq登陆后的回调
     * 获取openid 用户信息 存储到数据库（判断该用户是否存在 存在就修改信息 不存在就添加信息）
     *
     * @param access_token
     * @return
     */
    @RequestMapping("auth_qq_redirect")
    public void authQQRedirect(String access_token, HttpServletResponse response, HttpSession session) throws IOException {
        //获取openid
        Document document = Jsoup.connect("https://graph.qq.com/oauth2.0/me?access_token=" + access_token).get();
        String text = document.text();
        text = text.replace("callback( ", "").replace(");", "");
        JSONObject json = new JSONObject(text);
        String openid = json.getString("openid");
        // 获取用户昵称、头像等信息，{ret: 0, msg: '', nickname: '', ...} ret不为0表示失败
        Document userDoc = Jsoup.connect("https://graph.qq.com/user/get_user_info?access_token=" + access_token + "&oauth_consumer_key=" + QQConfig.APP_ID + "&openid=" + openid).get();
        JSONObject userJson = new JSONObject(userDoc.text());

        //todo 查询该openid是否存在 存在则修改该openid的信息 不存在则增加
        BlogUser user=blogUserService.findUserByOpenid(openid);
        if(user==null){
            user=new BlogUser();
        }
        user.setOpenId(openid);
        user.setAccessToken(access_token);
        user.setCreateTime(new Date());
        user.setUserType(1);
        user.setNickname(userJson.getString("nickname"));
        user.setGender(userJson.getString("gender"));
        user.setAvatar(userJson.getString("figureurl_2"));
        user.setAddress(userJson.getString("province")+userJson.getString("city"));
        user.setYear(userJson.getString("year"));
        if(user.getId()!=null){
            //修改数据
            blogUserService.updateUser(user);
        }else{
            //保存到数据库
            blogUserService.addUser(user);
        }
        session.setAttribute("user",user);
        String html = "<!DOCTYPE html>" +
                "<html lang=\"zh-cn\">" +
                "<head>" +
                "	<title>close</title>" +
                "	<meta charset=\"utf-8\"/>" +
                "</head>" +
                "<body>" +
                "	<script type=\"text/javascript\">" +
                "	window.opener.closeQQWin();" +
                "	</script>" +
                "</body>" +
                "</html>";
        response.getWriter().print(html);

    }
}
