package com.xuzijia.blog.entity.vo;

import lombok.Data;

import java.util.List;

/**
 * Created by xuzijia
 * 2018/4/19 9:59
 */
@Data
public class CommentData {
    private Integer current;
    private Integer pageSize;
    private List<CommentListVo> dataList;
    private Integer dataCount;
    private Integer pageCount;

}
