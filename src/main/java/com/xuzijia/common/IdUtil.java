package com.xuzijia.common;

import java.util.UUID;

/**
 * 获取一个uuid
 * Created by xuzijia
 * 2018/4/18 22:22
 */
public class IdUtil {
    public static String getUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }
}
