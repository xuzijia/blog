package com.xuzijia.admin.blog.service.impl;

import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.vo.CategoryVo;
import com.xuzijia.admin.blog.mapper.CategoryMapper;
import com.xuzijia.admin.blog.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 文章分类管理
 * Created by xuzijia
 * 2018/4/10 19:15
 */
@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryMapper categoryMapper;

    public List<Category> findCategory() {
        return categoryMapper.findCategory();
    }

    /**
     * 添加分类
     * @param category
     */
    public void addCategory(Category category) throws Exception {
        //判断是否存在该分类
        Integer count = categoryMapper.checkCategoryName(category.getName());
        if(count==0){
            categoryMapper.addCategory(category);
        }else{
            throw new Exception("添加失败,已经存在该分类啦~");
        }

    }

    /**
     * 查询分类 包括文章数
     * @return
     */
    public List<CategoryVo> findCategoryAndCount() {
        return categoryMapper.findCategoryAndCount();
    }

    /**
     * 删除文章
     * @param ids
     * @return
     */
    public boolean delCategory(String ids) {
        boolean flag=false;
        //判断分类中是否存在文章 如果存在 不删除
        for (String id:ids.split(",")){
            Integer count= categoryMapper.findArticleByCid(id);
            if(count==0){
                categoryMapper.delCategory(id);
            }
            else{
                flag=true;
            }
        }
        return flag;
    }

    /**
     * 修改分类
     * @param category
     * @throws Exception
     */
    public void updateCategory(Category category) throws Exception {
        Integer count = categoryMapper.checkCategoryName(category.getName());
        if(count==0){
            categoryMapper.updateCategory(category);
        }else{
            throw new Exception("修改失败,已经存在该分类啦~");
        }

    }
}
