package com.xuzijia.admin.blog.entity.vo;

import com.xuzijia.common.PageQuery;
import lombok.Data;

/**
 * Created by xuzijia
 * 2018/4/10 21:10
 */
@Data
public class ArticleQueryVo {
    private PageQuery pageQuery;
    private ArticleCustom articleCustom;
}
