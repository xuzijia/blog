package com.xuzijia.admin.blog.entity.vo;

import lombok.Data;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * 富文本上传响应json数据格式
 * Created by xuzijia
 * 2018/4/12 8:29
 */
@Data
public class UMeditorData {
    private String name;
    private String originalName;
    private long size;
    private String state;
    private String type;
    private String url;

}
