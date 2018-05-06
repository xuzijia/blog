<div class="layui-tab layui-tab-card layui-article-cate">
    <div class="layui-tab-content select-none category">
        <p class="title">文章分类</p>
        <hr>
    <#list categoryList as category>
        <p><a href="/blog/index?c=${category.id}"><i class="layui-icon">&#xe60a;</i> ${category.name}<span>(${category.count})</span></a> </p>
    </#list>

    </div>
</div>