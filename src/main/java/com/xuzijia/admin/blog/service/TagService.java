package com.xuzijia.admin.blog.service;

import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.TagVo;

import java.util.List;

/**
 * 文章标签
 * Created by xuzijia
 * 2018/4/10 19:15
 */
public interface TagService {
    List<Tag> findTag();
    void addTag(Tag tag)throws Exception;

    List<TagVo> findTagAndCount();
    void updateTag(Tag tag)throws Exception;
    void delTag(String ids);

    List<Tag> findTagByid(String ids);
}
