package com.xuzijia.wechat.controller;

import com.xuzijia.wechat.common.CheckUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 *微信开发服务接入
 * Created by xuzijia
 * 2018/4/25 15:03
 */
@Controller
@RequestMapping("/wechat/")
public class WechatController {
    @RequestMapping("check_token.do")
    public void checkToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String signature = request.getParameter("signature");
        String timestamp = request.getParameter("timestamp");
        String nonce = request.getParameter("nonce");
        String echostr = request.getParameter("echostr");
        if(signature==null || timestamp==null || nonce==null || echostr==null){
            return;
        }
        PrintWriter p = response.getWriter();
        if (CheckUtil.checkSignature(signature, timestamp, nonce)) {
            p.print(echostr);
        }
    }
}
