package com.xuzijia.admin.blog.service.impl;

import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.TagVo;
import com.xuzijia.admin.blog.mapper.TagMapper;
import com.xuzijia.admin.blog.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 标签管理
 * Created by xuzijia
 * 2018/4/10 19:15
 */
@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagMapper tagMapper;

    public List<Tag> findTag() {
        return tagMapper.findTag();
    }

    public void addTag(Tag tag) throws Exception {
        Integer count = tagMapper.checkTagName(tag.getName());
        if(count==0){
            tagMapper.addTag(tag);
        }else{
            throw new Exception("该标签已经存在");
        }
    }

    public List<TagVo> findTagAndCount() {
        return tagMapper.findTagAndCount();
    }

    public void updateTag(Tag tag) throws Exception {
        Integer count = tagMapper.checkTagName(tag.getName());
        if(count==0){
            tagMapper.updateTag(tag);
        }else{
            throw new Exception("该标签已经存在");
        }
    }

    public void delTag(String ids) {
       for (String id:ids.split(",")){
           tagMapper.delTag(id);
       }
    }

    public List<Tag> findTagByid(String ids) {
        return tagMapper.findTagById(ids.split(","));
    }

}
