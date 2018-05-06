package com.xuzijia.admin.blog.mapper;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.vo.ArticleQueryVo;
import com.xuzijia.admin.blog.entity.vo.ArticleVo;
import com.xuzijia.admin.blog.entity.vo.FrontArticleVo;
import com.xuzijia.common.PageQuery;

import java.util.List;

/**
 * 博客文章Mapper层
 * Created by xuzijia
 * 2018/4/10 14:50
 */
public interface ArticleMapper {
    /**
     * 添加文章
     * @param article
     */
    void addArticle(Article article) throws Exception;

    /**
     * 查询文章
     * @param articleQueryVo
     * @return
     * @throws Exception
     */
    List<ArticleVo> findArticle(ArticleQueryVo articleQueryVo) throws Exception;

    Integer findArticleCount(ArticleQueryVo articleQueryVo) throws Exception;

    Article findArticleById(String id) throws Exception;

    void updateArticle(Article article)throws Exception;

    void delArticle(String id) throws Exception;

    /**
     * 查询文章列表 前台显示
     * @return
     * @throws Exception
     */
    List<Article> findArticleList(ArticleQueryVo articleQueryVo)throws Exception;

    Integer findArticleListCount(ArticleQueryVo articleQueryVo)throws Exception;

    List<Article> findHotArticleList()throws Exception;

    List<Article> findarticleByCid(Integer categoryId);
}
