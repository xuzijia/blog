package com.xuzijia.admin.blog.service;

import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.vo.CategoryVo;

import java.util.List;

/**
 * Created by xuzijia
 * 2018/4/10 19:15
 */
public interface CategoryService {
    List<Category> findCategory();
    void addCategory(Category category) throws Exception;
    List<CategoryVo> findCategoryAndCount();

    boolean delCategory(String ids);

    void updateCategory(Category category) throws Exception;
}
