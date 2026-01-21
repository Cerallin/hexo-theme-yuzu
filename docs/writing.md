## 学术写作 cheatsheet

### 三线表格

```md
| key          | value                    |  type   |
| :----------- | :----------------------- | :-----: |
| num          | 65535                    | integer |
| post         | {id: 4, content: "text"} | object  |
| article_list | [{id: 1}, {id: 2}]       |  array  |
: 表格名 {#tbl:tbl-name}
```

### 图

```md
![figure description](/path/to/figure.jpg){#fig:fig-name}
```

### 公式

```md
$$
f(x) = \int_0^t a x^2 + b x + c
$$ {#eq:eq-name}
```
