# 网站内容运营手册

本手册用于日常更新以下栏目：

| 栏目 | 访问地址 | 主要内容位置 |
| --- | --- | --- |
| 工作坊 | `/workshops/` | `_workshops/` |
| 陶艺笔记 | `/notes/` | `_posts/` |
| 作品 | `/works/` | `_works/` |
| 生活 | `/life/` | `_data/gallery.yml`、`assets/img/gallery/` |
| 我们 | `/community/` | `_pages/profiles.md`、`_pages/成员介绍.md` |

## 1. 日常更新流程

### 1.1 启动本地预览

在项目根目录执行：

```bash
docker compose up
```

浏览器访问：

```text
http://localhost:8080
```

保存内容文件后，Jekyll 通常会自动构建并刷新页面。

### 1.2 推荐发布流程

每次更新按以下顺序操作：

1. 将图片放入对应目录。
2. 新建或修改 Markdown/YAML 文件。
3. 查看 Docker 日志，确认没有构建错误。
4. 在浏览器中检查桌面端和手机宽度。
5. 点击所有新增链接和图片。
6. 确认无误后再提交代码并发布。

查看构建日志：

```bash
docker compose logs -f jekyll
```

成功时通常会看到：

```text
Regenerating: 1 file(s) changed
done in ... seconds
```

## 2. 通用写作规则

### 2.1 文件名

文件名建议只使用：

- 小写英文字母；
- 数字；
- 连字符 `-`。

推荐：

```text
2026-06-ceramic-workshop.md
summer-tea-cup.md
community-luffythinker.md
```

不推荐：

```text
夏季陶艺工作坊.md
```

文件名会影响页面 URL。文件名确定并发布后，尽量不要随意修改。

### 2.2 Front Matter

Markdown 文件顶部由两行 `---` 包围的部分叫 Front Matter：

```yaml
---
layout: post
title: 夏日陶艺工作坊
date: 2026-06-19 14:00:00 +0800
---
```

注意：

- 必须使用英文半角冒号 `:`；
- 冒号后需要空格；
- 缩进只能使用空格，不要使用 Tab；
- 标题中如果包含冒号，使用引号：

  ```yaml
  title: "工作坊回顾：从泥土到器物"
  ```

### 2.3 Markdown 常用格式

```markdown
# 一级标题

## 二级标题

普通段落文字。

**加粗文字**

[链接文字](https://example.com)

- 列表第一项
- 列表第二项
```

页面标题已经由 Front Matter 的 `title` 生成，正文通常从 `##` 二级标题开始，不要重复写一个一级标题。

### 2.4 图片规范

建议：

- 照片使用 `.jpg` 或 `.webp`；
- 透明图标使用 `.png` 或 `.svg`；
- 单张图片尽量控制在 2 MB 内；
- 文件名使用英文和连字符；
- 图片宽度建议至少 1200 px；
- 不要只修改扩展名，文件真实格式必须与扩展名一致。

替换同名图片后如果页面仍显示旧图，执行：

```bash
touch assets/img/对应图片文件
```

然后强制刷新浏览器：

- macOS：`Command + Shift + R`
- Windows：`Ctrl + F5`

## 3. 更新“工作坊”

工作坊内容位于：

```text
_workshops/
```

工作坊支持两种内容：

1. 列表中的简短通知，不进入详情页；
2. 带标题、图片和正文的完整活动页。

### 3.1 新增完整工作坊页面

新建文件：

```text
_workshops/2026-summer-ceramic-workshop.md
```

复制以下模板：

```markdown
---
layout: post
title: "夏日手捏陶工作坊"
date: 2026-06-19 13:00:00 +0800
event_date: 2026-07-12 14:00:00 +0800
author: 鱼凫共创
last_updated: 2026-06-19
description: 从认识泥料、手捏成形到修整装饰，完成一只可以日常使用的陶杯。
meta: 陶艺体验工作坊
inline: false
tags: [手捏, 杯子, 陶艺体验]
categories: [工作坊]
toc:
  sidebar: right
related_posts: false
---

本次工作坊将从认识泥料开始，一起完成一件可以日常使用的器物。

## 活动信息

- 时间：2026 年 7 月 12 日 14:00–17:00
- 地点：鱼凫窑
- 人数：12 人
- 费用：请填写

## 活动内容

1. 认识泥料与工具；
2. 学习基础手捏方法；
3. 完成一件个人器物；
4. 交流和共食。

## 报名方式

[点击这里报名](https://example.com)
```

生成地址：

```text
/workshops/2026-summer-ceramic-workshop/
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `layout: post` | 使用文章详情布局 |
| `title` | 工作坊名称 |
| `date` | 内容发布日期和排序依据；不要填写未来日期，否则 Jekyll 默认不会生成页面 |
| `event_date` | 活动举办日期；填写后工作坊列表优先显示该日期 |
| `author` | 详情页作者 |
| `last_updated` | 最后更新时间，可选 |
| `description` | 页面摘要和搜索引擎描述 |
| `meta` | 日期和作者旁边显示的补充信息 |
| `inline: false` | 生成可点击详情页 |
| `tags` | 活动主题标签 |
| `categories` | 内容分类 |
| `toc.sidebar: right` | 桌面端显示右侧悬浮目录 |
| `related_posts: false` | 不显示主题推荐文章 |

### 3.2 新增简短通知

```markdown
---
layout: post
title: "6天“指艺”升级之旅"
date: 2026-06-19 13:10:00 +0800
inline: true
redirect: https://mp.weixin.qq.com/s/vlKGw8Ez4V-BXFStQpa9BA
sitemap: false
related_posts: false
---

[6天“指艺”升级之旅](https://mp.weixin.qq.com/s/vlKGw8Ez4V-BXFStQpa9BA){:target="_blank" rel="noopener noreferrer"}
```

`inline: true` 时：

- 内容直接显示在工作坊列表；
- 列表显示正文中的链接，不使用 `title` 作为入口；
- 可以在正文中加入外部报名链接；
- `redirect` 让底层页面在被直接访问时跳转到同一外部地址；
- `sitemap: false` 避免短通知的底层页面进入站点地图；
- 正文应控制在一到两句话。

### 3.3 工作坊配图

图片建议放入：

```text
assets/img/workshops/
```

例如：

```text
assets/img/workshops/2026-summer-workshop.jpg
```

在正文中插入：

```liquid
{% include figure.liquid
   loading="eager"
   path="assets/img/workshops/2026-summer-workshop.jpg"
   class="img-fluid rounded z-depth-1"
   alt="夏日手捏陶工作坊现场"
%}
```

工作坊列表页底部的装饰线稿位于：

```text
assets/img/workshops/background.png
```

该文件使用透明 PNG，只保留线条。替换时建议保持宽幅构图和透明背景；页面会在深色主题下自动将黑色线条转换为浅色。

### 3.4 修改、下线和排序

- 修改：直接编辑 `_workshops/对应文件.md`。
- 下线：在 Front Matter 中加入：

  ```yaml
  published: false
  ```

- 排序：调整 `date`，工作坊列表按日期倒序显示。
- 删除：确认不再需要后，删除对应 Markdown 和不再使用的图片。

## 4. 更新“陶艺笔记”

陶艺笔记使用 Jekyll 标准文章目录：

```text
_posts/
```

如果目录不存在，可以直接创建。

### 4.1 文件命名

必须采用：

```text
YYYY-MM-DD-英文标题.md
```

例如：

```text
_posts/2026-06-19-understanding-clay.md
```

### 4.2 文章模板

```markdown
---
layout: post
title: "认识泥土：陶土、瓷土与炻器土"
date: 2026-06-19 10:00:00 +0800
author: 鱼凫共创
description: 从可塑性、烧成温度和使用场景理解三类常见泥料。
tags: [泥料, 陶艺基础]
categories: [陶艺笔记]
toc:
  sidebar: right
related_posts: false
featured: false
---

泥土不是一种单一材料。不同泥料在可塑性、烧成温度和最终质感上都有明显差异。

## 陶土

填写正文。

## 瓷土

填写正文。

## 炻器土

填写正文。
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `title` | 文章标题 |
| `date` | 发布日期 |
| `author` | 文章作者；团队署名可填写 `鱼凫共创`，个人文章填写真实姓名 |
| `description` | 列表摘要和 SEO 描述 |
| `tags` | 具体主题，可多个 |
| `categories` | 内容大类 |
| `toc.sidebar: right` | 在桌面端右侧显示悬浮目录，移动端移到正文上方；短文章可以删除 |
| `featured: true` | 置于笔记页顶部推荐区 |
| `related_posts` | 是否展示相关文章 |

生成地址类似：

```text
/notes/2026/understanding-clay/
```

### 4.3 笔记配图

图片放入：

```text
assets/img/posts/
```

正文图片：

```liquid
{% include figure.liquid
   path="assets/img/posts/clay-types.jpg"
   class="img-fluid rounded z-depth-1"
   alt="三种常见陶艺泥料"
%}
```

列表缩略图可在 Front Matter 中配置：

```yaml
thumbnail: /assets/img/posts/clay-types.jpg
```

### 4.4 草稿与下线

未完成文章建议放入：

```text
_drafts/
```

草稿文件名不需要日期：

```text
_drafts/understanding-clay.md
```

已发布文章临时下线：

```yaml
published: false
```

不要只把文章正文清空；空文章可能影响相关文章计算和页面质量。

## 5. 更新“作品”

作品内容位于：

```text
_works/
```

每个 Markdown 文件对应一个作品详情页，并在 `/works/` 自动生成作品卡片。

### 5.1 作品图片

封面和详情图片放入：

```text
assets/img/works/
```

推荐封面比例：

```text
4:3 或 1:1
```

### 5.2 文件命名规则

作品文件统一使用：

```text
creator-slug-work-slug.md
```

例如：

```text
zhang-slow-living-teaware.md
```

命名要求：

- 使用小写英文；
- 单词之间使用连字符 `-`；
- 前半部分是稳定的创作者标识，后半部分是作品标识；
- 不使用“老师”“先生”等称谓；
- 不使用日期、中文、空格或特殊符号；
- 文件正式发布后尽量不要改名，否则作品网址会变化。

创作者标识应保持稳定。例如“张老师”使用 `zhang`，同一创作者的其他作品继续使用相同前缀：

```text
zhang-slow-living-teaware.md
zhang-spring-tea-bowl.md
```

如果未来出现同姓创作者，应改用更明确且长期稳定的标识，例如姓名拼音或约定代号。

### 5.3 完整作品模板

新建：

```text
_works/zhang-slow-living-teaware.md
```

内容：

```markdown
---
layout: project
title: "慢下来：自然肌理茶器组"
description: 以四季感知和慢生活为线索完成的一组日用茶器。
img: assets/img/works/slow-living-teaware-cover.svg
importance: 1
date: 2026-06-19
last_updated: 2026-06-19
category: 陶器
tags: [茶器, 手捏, 自然肌理, 慢生活]
creator: 张老师
studio: 鱼凫窑
location: 成都温江
materials: 粗陶土、透明釉、化妆土
technique: 手捏、刻纹、局部施釉
dimensions: 茶杯约 8 × 8 × 7 cm
firing: 氧化气氛，约 1230℃
status: 已完成
toc:
  sidebar: right
---

这组茶器从日常饮茶和四季观察出发，尝试通过泥土、手和火重新打开对生活细节的感受。

## 创作缘起

填写作品为什么发生，以及它回应了什么生活经验。

## 制作过程

填写过程说明。

{% include figure.liquid
   path="assets/img/works/slow-living-teaware-detail.svg"
   class="img-fluid rounded z-depth-1"
   alt="自然肌理茶器组细节"
   caption="填写图片说明"
%}
```

生成地址：

```text
/works/zhang-slow-living-teaware/
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `layout: project` | 使用陶艺作品专用详情模板 |
| `title` | 卡片和详情页标题 |
| `description` | 作品列表摘要和 SEO 描述 |
| `img` | 作品卡片及详情页封面 |
| `importance` | 排序，数字越小越靠前 |
| `date` | 创作或发布日期 |
| `last_updated` | 最后更新时间，可选 |
| `category` | 作品分类，必须与作品页展示分类一致 |
| `tags` | 作品主题标签 |
| `creator` | 创作者 |
| `studio` | 工作室或协作机构 |
| `location` | 创作地点 |
| `materials` | 泥料、釉料等材料 |
| `technique` | 成形与装饰工艺 |
| `dimensions` | 作品尺寸 |
| `firing` | 烧成气氛和温度 |
| `status` | 已完成、展出、收藏或示范作品等状态 |
| `toc.sidebar: right` | 桌面端显示右侧悬浮目录 |

### 5.4 作品分类

当前作品页只显示：

```yaml
display_categories: [陶器]
```

如需增加分类，可编辑 `_pages/works.md`：

```yaml
display_categories: [陶器, 空间, 共创]
```

同时，作品文件中的 `category` 必须完全一致：

```yaml
category: 陶器
```

`github`、`github_stars` 是旧技术项目字段，当前陶艺作品模板不再使用。

分类名称不一致时，作品不会出现在列表中。

### 5.5 下线作品

在作品文件 Front Matter 中加入：

```yaml
published: false
```

若永久删除，同时删除：

- `_works/对应作品.md`；
- 不再被其他页面使用的作品图片。

## 6. 更新“生活”

生活栏目由两部分组成：

```text
_data/gallery.yml
assets/img/gallery/
```

### 6.1 图片准备

生活栏目优先保留图片完整构图，不要求所有照片裁成相同尺寸。建议：

- 图片宽度至少 1200 px；
- 使用 JPEG、PNG 或 WebP；
- 拼贴图、海报和包含文字的图片不要强制裁成统一比例；
- 文件名使用小写英文和连字符；
- 页面通过 `orientation` 和 `featured` 控制布局，不通过破坏性裁剪控制尺寸。

例如：

```text
assets/img/gallery/kiln-and-hands.jpg
```

### 6.2 添加照片

第一步，将照片放入：

```text
assets/img/gallery/kiln-and-hands.jpg
```

第二步，在 `_data/gallery.yml` 增加一项：

```yaml
- url: kiln-and-hands.jpg
  alt: "龙窑、工作室、陶壶和拉坯过程组成的拼贴画面"
  title: "窑火与手"
  caption: "从工作室入口、装窑和烧成，到泥在双手之间逐渐成为器物。"
  date: "2026年6月"
  location: "成都温江"
  category: "窑与工作室"
  credit: "鱼凫窑资料图"
  orientation: landscape
  featured: true
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `url` | 图片文件名 |
| `alt` | 无障碍描述，应客观描述画面 |
| `title` | 卡片及弹窗标题 |
| `caption` | 图片故事或背景说明 |
| `date` | 拍摄、制作或整理时间 |
| `location` | 拍摄或事件地点 |
| `category` | 内容分类，例如陶艺日常、器物观察 |
| `credit` | 摄影者、创作者或图片来源 |
| `orientation` | 图片构图类型：`landscape`、`square` 或 `portrait` |
| `featured` | `true` 时在桌面端占据整行，作为重点图片 |

图片显示顺序与 `_data/gallery.yml` 中的排列顺序一致。

页面会完整显示图片原始比例。移动端统一为单列，点击图片后打开原图和完整字段说明。

### 6.3 推荐写法

`alt` 描述画面，不写宣传文案：

```yaml
alt: "一把破损陶壶的碎片与拼合过程"
```

`caption` 可以写背景故事：

```yaml
caption: "破损让器物内部的泥层、连接和烧成状态显露出来。"
```

不要把地点、日期和署名混入 `caption`，应分别填写 `location`、`date` 和 `credit`，方便页面统一展示。

`featured: true` 应控制在少量重点图片，通常每组内容只设置一张。

### 6.4 修改和删除

- 修改说明：编辑 `_data/gallery.yml`。
- 替换照片：替换图片文件；同名替换后执行 `touch`。
- 调整顺序：移动整段 YAML。
- 下线照片：删除对应 YAML 段落。
- 永久删除：再删除 `assets/img/gallery/` 中的图片。

不要只删除图片而保留 YAML，否则页面会出现破图。

正式上线前应确认照片使用权，并将“资料图”“示范”等临时署名替换为准确来源。

## 7. 更新“我们”

“我们”页面的成员顺序和基本配置位于：

```text
_pages/profiles.md
```

成员图片放入：

```text
assets/img/community/
```

成员正文统一放入：

```text
_pages/community-content/
```

该目录已在 `_config.yml` 中排除，不会把成员介绍 Markdown 源文件单独发布到网站。

### 7.1 新增成员介绍文件

例如新建：

```text
_pages/community-content/zhang.md
```

该文件不添加 Front Matter，直接写正文：

```markdown
## 张老师

职业陶瓷艺术工作者，二山与鱼凫窑创始人。

### 实践方向

- 传统制陶技艺研究与实践；
- 泥料、釉料配制与烧成测试；
- 窑炉设计与建造；
- 茶器艺术创作。
```

### 7.2 在成员列表中引用

修改 `_pages/profiles.md`：

```yaml
profiles:
  - name: 张老师
    role: 职业陶瓷艺术工作者
    affiliation: 二山、鱼凫窑创始人
    summary: 从传统制陶技艺出发，持续实践泥釉配制、窑炉设计建造与个人茶器艺术创作。
    image: community/zhang.jpg
    image_alt: 张老师在工作室中的黑白肖像
    content: community-content/zhang.md
```

图片保存为：

```text
assets/img/community/zhang.jpg
```

字段说明：

| 字段 | 作用 |
| --- | --- |
| `name` | 人物姓名，显示在图片遮罩中 |
| `role` | 职业或在共创网络中的角色 |
| `affiliation` | 工作室、机构或协作关系 |
| `summary` | 供后续扩展使用的两句话以内简介，当前卡片不显示 |
| `image` | `assets/img/` 下的图片相对路径 |
| `image_alt` | 图片替代文字，用于无障碍访问和图片加载失败时的说明 |
| `content` | `_pages/` 下的成员介绍相对路径 |

页面交互规则：

- 图片上始终显示姓名、身份和“查看介绍”，不使用鼠标悬停触发；
- 桌面端使用六列、平板四列、手机两列，适合持续增加成员；
- 所有成员使用等宽、等高卡片，不通过尺寸表达人物主次；
- 点击人物图片后展开完整介绍；
- 手机端同样直接显示基本信息，点击后展开完整介绍；
- 长篇履历写在 `community-content/` 中，不要全部放入 `summary`。

### 7.3 当前人物示范

当前页面以三位成员展示拼图效果，其中张老师为完整资料示范，陈同学和福老师为待补充资料示范：

```text
_pages/community-content/zhang.md
_pages/community-content/chen.md
_pages/community-content/fu.md
assets/img/community/zhang.jpg
assets/img/community/chen.jpg
assets/img/community/fu.jpg
```

人物资料发布前应核对姓名、机构身份、学习经历、技术描述和照片使用授权。不要根据宣传需要自行增加未经当事人确认的奖项、展览、任职或项目经历。

标记为“示范”或“资料待补充”的人物不能作为正式资料长期保留。收到本人信息后，应同步替换 `role`、`affiliation`、`summary` 和对应 Markdown 正文。

### 7.4 成员退出或暂时隐藏

- 暂时隐藏：从 `profiles:` 下移除该成员块，介绍和图片可暂时保留。
- 永久删除：同时删除成员块、介绍 Markdown 和不再使用的头像。

### 7.5 更新静态地图

“我们”页面的人物墙下方显示鱼凫部落静态地图。地图图片位于：

```text
assets/img/community/location-map.jpg
```

位置配置在 `_pages/profiles.md`：

```yaml
location:
  name: 鱼凫部落
  address: 四川省成都市温江区幸福田园
  image: community/location-map.jpg
  image_alt: 成都温江幸福田园及周边区域地图，标记幸福田园景区位置
  navigation_url: https://uri.amap.com/marker?position=103.799918,30.759532&name=...
```

- 页面不再加载交互地图瓦片，避免网络不稳定导致地图缺块；
- 点击静态地图或“打开地图导航”会进入高德地图；
- 替换地图截图时应保留清晰的位置标记和足够的周边参照；
- `navigation_url` 中的 `position` 使用高德 GCJ‑02 坐标；
- 若地点不是公开场所，不应填写私人住宅或未经授权的精确位置。

## 8. 首页内容联动

首页位于：

```text
_pages/about.md
```

首页当前会自动显示最近 5 条工作坊信息：

```yaml
announcements:
  enabled: true
  limit: 5
```

修改 `limit` 可控制条数：

```yaml
limit: 3
```

如果希望首页显示最新陶艺笔记：

```yaml
latest_posts:
  enabled: true
  title: 创作记
  tag: 创作记
  limit: 3
```

当前首页按以下配置展示“创作记”：

- 只读取 `_posts/` 中的陶艺笔记；
- 只展示 `tags` 包含 `创作记` 的文章；
- 按文章日期倒序；
- 最多展示 3 篇；
- 点击板块标题进入全部陶艺笔记 `/notes/`。

需要在首页出现的文章必须包含：

```yaml
tags: [创作记]
```

也可以同时添加其他标签：

```yaml
tags: [创作记, 茶杯, 拉坯]
```

标签必须与首页配置中的 `tag: 创作记` 完全一致。

## 9. 更新“陶艺书架”

书架入口位于 `/books/`，书目文件放在：

```text
_books/
```

每本书使用一个 Markdown 文件，文件名采用简短英文，例如：

```text
_books/the-craft-and-art-of-clay.md
```

基础模板：

```yaml
---
layout: book-review
title: "《中文书名》"
original_title: "Original Title"
author: 作者
cover: assets/img/book_covers/example.jpg
cover_source: https://openlibrary.org/books/对应版本ID
categories: [陶艺基础]
tags: [成型, 釉料]
date: 2026-01-01
released: 1992
---
```

Front Matter 下方依次撰写：

- 一段内容简介；
- `## 推荐理由`；
- `## 适合读者`。

封面统一放在：

```text
assets/img/book_covers/
```

当前使用低分辨率真实书封，图片保存在项目本地，详情页通过 `cover_source` 标注来源。新增书封时只使用出版社或公共书目服务提供的缩略图，不上传高清扫描文件；文件路径变化时同步修改书目中的 `cover`。

书架按 `date` 正序排列。该日期用于控制展示顺序，不代表图书出版时间；出版年份填写在 `released`。

## 10. 发布前检查清单

### 内容

- 标题、日期、地点和报名链接正确；
- 正文没有模板占位文字；
- 联系方式没有使用个人旧账号；
- 图片有明确 `alt` 文本；
- 引用他人照片时已取得授权并注明来源。

### 页面

- 导航可以进入栏目；
- 卡片封面没有拉伸或破图；
- 详情页标题和摘要正确；
- 手机端没有横向溢出；
- 深色模式下文字仍可阅读；
- 旧页面和下线内容不再出现在 sitemap。

### 技术

```bash
docker compose logs --tail=100 jekyll
```

确保日志中没有：

```text
Liquid Exception
No such file or directory
YAML Exception
Error
```

## 11. 常见问题

### 保存后页面没有更新

先执行：

```bash
docker compose logs -f jekyll
```

如果 Jekyll 没有恢复：

```bash
docker compose down
docker compose up --force-recreate
```

### 图片文件存在，但页面仍报找不到

检查：

- 文件名大小写是否完全一致；
- `.jpg`、`.JPG`、`.jpeg`、`.png` 是否写对；
- 路径是否从项目根目录开始；
- 文件真实格式是否与扩展名一致。

### 页面没有出现在列表中

检查：

- Front Matter 是否有成对的 `---`；
- `published` 是否被设为 `false`；
- 作品 `category` 是否在 `display_categories` 中；
- 文件是否放在正确目录；
- 日期是否有效。

### 删除内容后 `_site` 仍有旧文件

`_site/` 是生成目录，可以清理后重新构建。不要直接把 `_site/` 当作内容源编辑。

```bash
docker compose down
rm -rf _site
docker compose up
```
