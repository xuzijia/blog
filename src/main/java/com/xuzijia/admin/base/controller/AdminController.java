package com.xuzijia.admin.base.controller;

import com.xuzijia.admin.base.entity.User;
import com.xuzijia.admin.base.service.UserService;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 后台用户
 * Created by xuzijia
 * 2018/5/6 15:30
 */
@Controller
@RequestMapping("/admin/")
public class AdminController {
    @Autowired
    private UserService userService;

    /**
     * 登陆
     * @param user
     * @return
     */
    @RequestMapping("login.do")
    @ResponseBody
    public ResultData login(User user, HttpSession session, HttpServletResponse response){
        //todo md5
        String p = DigestUtils.md5Hex(user.getPassword());
        user.setPassword(p);
        //身份校验
        User checkUser = userService.checkUser(user);
        if(checkUser!=null){
            session.setAttribute("user",checkUser);
            Cookie cookie=new Cookie("username",user.getUsername());
            response.addCookie(cookie);
            return new ResultUtil().createSuccessResult();
        }
        return new ResultUtil().createErrorResult("登陆失败");
    }

    /**
     * 退出登陆
     * @return
     */
    @RequestMapping("logout.do")
    public String logout(HttpSession session){
        session.removeAttribute("user");
        return "redirect:/admin/login.html";
    }

    @RequestMapping("main.do")
    public String toMain(){
        return "blog";
    }


}
