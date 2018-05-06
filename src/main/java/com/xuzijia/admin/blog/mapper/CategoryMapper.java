package com.xuzijia.admin.blog.mapper;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.Category;
import com.xuzijia.admin.blog.entity.vo.CategoryVo;

import java.util.List;

/**
 * 文章分类Mapper
 * Created by xuzijia
 * 2018/4/10 19:14
 */
public interface CategoryMapper {
    List<Category> findCategory();
    void addCategory(Category category);

    List<CategoryVo> findCategoryAndCount();

    void delCategory(String id);

    Integer findArticleByCid(String id);

    Integer checkCategoryName(String name);

    void updateCategory(Category category);
}
