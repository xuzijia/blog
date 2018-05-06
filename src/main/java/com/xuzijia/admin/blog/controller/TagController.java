package com.xuzijia.admin.blog.controller;

import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.TagVo;
import com.xuzijia.admin.blog.service.TagService;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 文章标签
 * Created by xuzijia
 * 2018/4/10 19:19
 */
@Controller
@RequestMapping("/admin/blog/")
public class TagController {

    @Autowired
    private TagService tagService;

    /**
     * 查询所有标签
     * @return
     */
    @RequestMapping("findTag.do")
    @ResponseBody
    public ResultData findTag(){
        List<Tag> tagList = tagService.findTag();
        return new ResultUtil().createSuccessResult(tagList);
    }
    /**
     * 添加标签
     * @return
     */
    @RequestMapping("addTag.do")
    @ResponseBody
    public ResultData addTag(Tag tag){
        try {
            tagService.addTag(tag);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult(e.getMessage());
        }
        return new ResultUtil().createSuccessResult();
    }
    /**
     * 查找所有标签包括所属文章数量
     * @return
     */
    @RequestMapping("findTagAndCount.do")
    @ResponseBody
    public ResultData findTagAndCount(){
        List<TagVo> tagVoList = tagService.findTagAndCount();
        return new ResultUtil<TagVo>().createSuccessResult(tagVoList);
    }
    /**
     * 修改标签
     * @return
     */
    @RequestMapping("updateTag.do")
    @ResponseBody
    public ResultData updateTag(Tag tag){
        try {
           tagService.updateTag(tag);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil<TagVo>().createErrorResult(e.getMessage());
        }
        return new ResultUtil<TagVo>().createSuccessResult();
    }
    /**
     * 删除标签
     * @return
     */
    @RequestMapping("delTag.do")
    @ResponseBody
    public ResultData delTag(String ids){
        tagService.delTag(ids);
        return new ResultUtil<TagVo>().createSuccessResult();
    }
}
