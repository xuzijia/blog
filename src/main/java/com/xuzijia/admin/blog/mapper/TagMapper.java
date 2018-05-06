package com.xuzijia.admin.blog.mapper;

import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.TagVo;

import java.util.List;

/**
 * 文章标签Mapper
 * Created by xuzijia
 * 2018/4/10 19:14
 */
public interface TagMapper {
    List<Tag> findTag();
    void addTag(Tag tag);
    List<TagVo> findTagAndCount();
    void updateTag(Tag tag);
    void delTag(String id);
    Integer checkTagName(String name);

    List<Tag> findTagById(String[] ids);
}
