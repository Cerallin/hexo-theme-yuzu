# Hexo-Theme-Yuzu
本项目从 [hexo-theme-orange](https://github.com/Orange-way/hexo-theme-orange) fork 出来，鉴于无法找到原作者联系方式，本项目将由[Cerallin](https://github.com/Cerallin)继续维护。

## 特色
黑白色调，风格质朴简约。针对文章创作优化。

## 功能
- 支持分页（hexo-generator-*）
- 支持显示 CC（Creative Commons）版权声明
- 文章文字两端对齐

## 学术写作指南
### 三线表格

<div class="table-container">

<p class="table-title">表格名，本主题会自动编号</p>

| key          | value                    |  type   |
| :----------- | :----------------------- | :-----: |
| num          | 65535                    | integer |
| post         | {id: 4, content: "text"} | object  |
| article_list | [{id: 1}, {id: 2}]       |  array  |

</div>

### Mathjax 插件
推荐使用 hexo-filter-mathjax 渲染生成

### 中英文间距插件
墙裂推荐：使用 [hexo-filter-text-autospace](https://github.com/cerallin/hexo-filter-text-autospace) 为中文段落中的英文自动添加间距

## 安装使用
```
$ git clone https://github.com/Cerallin/hexo-theme-yuzu
$ mv ./hexo-theme-yuzu $hexo_root/themes
```

将 `config.yml` 中 `theme` 字段改为 `hexo-theme-yuzu`，在 `config.yml` 中添加如下内容：

```yml
since_year: 2020

post_copy:
  text: 署名-非商业性使用-相同方式共享
  text_en: CC BY-NC-SA 2.5 CN
  link: https://creativecommons.org/licenses/by-nc-sa/2.5/cn/

# 自定义侧边栏
menu:
  Archives:
    widget: Archives # 三种：Archives | Posts | Tags
    link: /archives
  Posts1:
    name: Posts
    widget: Posts
    link: /categories/posts1
  Posts2:
    name: Posts2
    widget: Posts
    link: /categories/your-link
  Tags:
    widget: Tags
    link: /tags

# 右上角
otherMenu2:
  关于: /about

# 备案
beian:
  enable: true
  icp: 京ICP备2021005293号

# toc
toc: true
```

## TODOs
- [X] 修复分类页面
- [ ] 为 stylus 添加更多自定义变量
- [ ] 生成分享链接
- [ ] 本地化
