package com.xuzijia.admin.blog.controller;

import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.vo.CategoryVo;
import com.xuzijia.admin.blog.service.CategoryService;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 文章分类
 * Created by xuzijia
 * 2018/4/10 19:19
 */
@Controller
@RequestMapping("/admin/blog/")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * 查询所有分类
     * @return
     */
    @RequestMapping("findCategory.do")
    @ResponseBody
    public ResultData findCategory(){
        List<Category> categoryList = categoryService.findCategory();
        return new ResultUtil().createSuccessResult(categoryList);
    }
    /**
     * 添加分类
     * @return
     */
    @RequestMapping("addCategory.do")
    @ResponseBody
    public ResultData addCategory(Category category){
        try {
            categoryService.addCategory(category);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult(e.getMessage());
        }
        return new ResultUtil().createSuccessResult();
    }
    /**
     * 查询分类列表 包括该分类下的文章数
     * @return
     */
    @RequestMapping("findCategoryAndCount.do")
    @ResponseBody
    public ResultData findCategoryAndCount(){
        List<CategoryVo> categoryVoList = categoryService.findCategoryAndCount();
        return new ResultUtil<CategoryVo>().createSuccessResult(categoryVoList);
    }

    /**
     * 删除分类 可以删除多个分类
     * @param ids
     * @return
     */
    @RequestMapping("delCategory.do")
    @ResponseBody
    public ResultData delCategory(String ids){
        boolean flag = categoryService.delCategory(ids);
        if(flag){
            return new ResultUtil().createErrorResult("删除成功,但是部分分类存在文章,请删除文章后再进行操作!");
        }
        return new ResultUtil().createSuccessResult("删除成功");
    }
    /**
     * 修改分类
     * @param category
     * @return
     */
    @RequestMapping("updateCategory.do")
    @ResponseBody
    public ResultData updateCategory(Category category){
        try {
            categoryService.updateCategory(category);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult(e.getMessage());
        }
        return new ResultUtil().createSuccessResult();
    }

}
