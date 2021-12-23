# Hexo-Theme-Yuzu
本项目从 [hexo-theme-orange](https://github.com/Orange-way/hexo-theme-orange) fork 出来，鉴于无法找到原作者联系方式，本项目将由[Cerallin](https://github.com/Cerallin)继续维护。

**当前分支为 v1.x 版本**，该分支对于小说写作来说足矣，不会有太大的变动了。

## 示例网站

- 主题展示网站：[cerallin.github.io](https://cerallin.github.io)
- 学术写作指南：[notes.cerallin.top](https://notes.cerallin.top/2021/12/12/%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E4%B8%80%E4%B8%AA%E5%AD%A6%E6%9C%AF%E5%86%99%E4%BD%9C%E5%8D%9A%E5%AE%A2/)

什么？你问我小说站在哪？我才不会告诉你呢(/ω•＼*)。

## 特色
- 黑白色调，风格质朴简约。
- 针对文章创作优化，学术博客也是可以的 (?)。
- 支持深色模式，自适应电脑/手机深浅色模式。

## 功能
- 支持分页（hexo-generator-*）
- 支持显示 CC（Creative Commons）版权声明
- 文章文字两端对齐
- 适配学术写作（pandoc）

## 禁止用户复制粘贴网页内容

**注** 本选项仅为君子协定，通过插件可以轻易破解。
将`@/theme/hexo-theme-yuzu/_config.yml`中的`selectable`值改为`false`。

## 深色模式

将`@/theme/hexo-theme-yuzu/_config.yml`中的`dark_mode`值改为`true`。

## 学术写作指南
### 三线表格

使用非 pandoc 的渲染引擎：
```md
<div class="table-container">

<p class="table-title">表格名，自动编号</p>

| key          | value                    |  type   |
| :----------- | :----------------------- | :-----: |
| num          | 65535                    | integer |
| post         | {id: 4, content: "text"} | object  |
| article_list | [{id: 1}, {id: 2}]       |  array  |

</div>
```

使用 pandoc：
```md
| key          | value                    |  type   |
| :----------- | :----------------------- | :-----: |
| num          | 65535                    | integer |
| post         | {id: 4, content: "text"} | object  |
| article_list | [{id: 1}, {id: 2}]       |  array  |
: 表格名，自动编号
```

### 图

使用非 pandoc 的渲染引擎：
```md
<div class="figure-container">

![](/images/xxx.jpg)

<p class="figure-title">图名，自动编号</p>
</div>
```

使用 pandoc：
```md
![figure title](/path/to/figure.jpg)
```

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


## License

This project is under MIT License.

    Copyright (c) 2018 XiaotaoNie
    Copyright (c) 2021 Cerallin   <cerallin@cerallin.top>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
