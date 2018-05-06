package com.xuzijia.admin.base.interceptor;

import com.xuzijia.admin.base.entity.User;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.aspectj.weaver.ast.Var;
import org.json.JSONObject;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;

/**
 * 登陆拦截器
 * Created by xuzijia
 * 2018/5/6 19:40
 */
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        HttpSession session = request.getSession();
        //如果session中没有用户信息 则不放行 跳转到登陆页面
        User user = (User) session.getAttribute("user");
        if(user==null){
            if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ //如果是ajax请求响应头会有x-requested-with
                PrintWriter out = response.getWriter();
                ResultData errorResult = new ResultUtil().createErrorResult("not login");
                JSONObject json=new JSONObject(errorResult);
                System.out.println(json.toString());
                out.print(json.toString());//session失效
                out.flush();
                return false;
            }
            response.sendRedirect("/admin/login.html");
            return false;
        }else{
            return true;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
