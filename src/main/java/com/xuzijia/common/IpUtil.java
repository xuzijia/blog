package com.xuzijia.common;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * 获取ip地址
 * Created by xuzijia
 * 2018/4/17 10:29
 */
public class IpUtil {
    /**
     * 获取Ip地址
     * @param request
     * @return
     */
    public static String getIpAdrress(HttpServletRequest request) {
        String Xip = request.getHeader("X-Real-IP");
        String XFor = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = XFor.indexOf(",");
            if(index != -1){
                return XFor.substring(0,index);
            }else{
                return XFor;
            }
        }
        XFor = Xip;
        if(StringUtils.isNotEmpty(XFor) && !"unKnown".equalsIgnoreCase(XFor)){
            return XFor;
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("Proxy-Client-IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("WL-Proxy-Client-IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_CLIENT_IP");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (StringUtils.isBlank(XFor) || "unknown".equalsIgnoreCase(XFor)) {
            XFor = request.getRemoteAddr();
        }
        return XFor;
    }

    /**
     * 根据ip获取所在地
     * 例如：59.39.146.130 --> 中国广东惠州(电信)
     * @param ip
     * @return
     */
    public static String getIpInfo(String ip) throws IOException {
        String apiUrl=API.IP.getIpInfo;
        apiUrl=apiUrl.replace("{ip}",ip);
        Document document = Jsoup.connect(apiUrl)
                .get();
        JSONObject jsonObject = new JSONObject(document.text());
        JSONObject data = jsonObject.getJSONObject("data");
        String country = data.getString("country");
        String region = data.getString("region");
        String city = data.getString("city");
        String isp = data.getString("isp");
        return country+region+city+"("+isp+")";
    }
}
