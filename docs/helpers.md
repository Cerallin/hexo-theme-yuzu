# 辅助工具类

## 客制化

你可以在`themes/hexo-theme-yuzu/source/css/_helpers`路径下自行添加自定义类。

## 文字对齐

类似 tailwind css。

使用某些扩展了 Markdown 语法的渲染器（比如 pandoc）：

```html
[文字文字文字]{.text-right} <!-- 始终右对齐 -->
[文字文字文字]{.md:text-right} <!-- 屏幕宽度小于750px时右对齐 -->
[文字文字文字]{.md:text-right .md:text-left} <!-- 屏幕宽度小于768px时右对齐，默认左对齐 -->

![图片标题](/path/to/picture.jpg){.text-justify} <!-- 设置图片标题两端对齐 -->
```

不使用 pandoc：

```html
<p class="md:text-justify text-right">
    文字文字文字
</p>
```

以下同理。

## 首行缩进

本主题默认所有段落的首行缩进都是两个字符（2em）。当你需要取消缩进的时候，可以使用 `text-indent-none` 类。

## display

| 类名                   | 样式                   |
| :--------------------- | :--------------------- |
| `display-block`        | disaplay: block        |
| `display-inline`       | disaplay: inline       |
| `display-inline-block` | disaplay: inline-block |
| `display-table`        | disaplay: table        |
| `display-none`         | disaplay: none         |

其他的display没有实现。

和text-*相同，你可以使用 `md:display-{option}` 类。

## 边距

使用 `p{t|r|b|l}-{size}` 功能类控制元素一侧的内边距。
使用 `p{x|y}-{size}` 功能类控制元素水平或竖直方向上的内边距。

例如，`pt-6` 将在元素顶部增加 `1.5em` 的内边距，`pr-4` 将在元素右侧增加 `1em` 的内边距，`pb-8` 将在元素底部增加 `2em` 的内边距，`pl-2` 将在元素左侧增加 `0.5em` 的内边距。

使用 `m{t|r|b|l}-{size}` 功能类控制元素一侧的外边距。
使用 `m{x|y}-{size}` 功能类控制元素水平或竖直方向上的外边距。

`size` 的取值范围总是1-10，或者auto。

## 行高

使用 `leading-{size}` 功能类控制元素行高。其中 `size` 取值范围是3-10。

例如，`leading-3` 将设置元素行高为 `0.75em`，`leading-8` 将设置元素行高为 `2em`。

此外，还提供了四个可读性更好的类：

| 类名              | 行高   |
| :---------------- | :----- |
| `leading-none`    | 1em    |
| `leading-tight`   | 1.25em |
| `leading-normal`  | 1.5em  |
| `leading-relaxed` | 1.75em |

## 字体大小

| 类名         | 字体大小 |
| :----------- | :------: |
| `fs-default` |   16px   |
| `fs-title`   |   24px   |
| `fs-large`   |   30px   |
| `fs-content` |   20px   |
| `fs-info`    |   14px   |

实际上，这些字体与本主题中设定的一系列字体变量保持一致。

## 字重

使用 `fw-{weight}` 可以控制字重。其中 weight 为 100 到 900 的数字，且都是 100 的整数倍。

## 溢出

使用`overflow[-{x|y}]-{hidden|auto|scroll}`控制元素overflow属性。

| 类名                | 样式                |
| :------------------ | :------------------ |
| `overflow-hidden`   | overflow: hidden;   |
| `overflow-x-auto`   | overflow-x: auto;   |
| `overflow-y-scroll` | overflow-y: scroll; |
