# GitHub Pages 上线指南

## 1. 当前部署目标

本项目使用 GitHub Pages 默认项目域名：

```text
https://luffythink.github.io/crypto-clay-network/
```

对应配置必须保持：

```yaml
url: https://luffythink.github.io
baseurl: /crypto-clay-network
```

这是“项目站点”，资源位于 `/crypto-clay-network/` 子路径。不要把 `baseurl` 留空，否则 CSS、图片和内部链接会错误地指向 `https://luffythink.github.io/` 根目录。

第一阶段不配置自定义域名、DNS 或 `CNAME`。第二阶段注册 `yunfuyao.art` 后再切换。

## 2. 当前核验结果

已经具备：

- `_config.yml` 已切换为 GitHub Pages 项目站点配置；
- `.github/workflows/deploy.yml` 已使用 GitHub 官方 Pages Actions；
- `Gemfile.lock` 存在，包含 Linux 平台依赖；
- Docker 中的 Jekyll 构建可以完成；
- `_site/`、缓存和依赖目录已配置为不提交；
- GitHub Actions 构建所需的 Ruby、Python、ImageMagick 和 PurgeCSS 步骤已存在。

首次推送前仍需完成：

- 创建 `luffythink/crypto-clay-network` 公开仓库；
- 初始化本地 Git 仓库并提交文件；
- 审核公开内容和占位资料；
- 决定是否清理模板遗留的非部署 Actions；
- 推送后在仓库设置中选择 `GitHub Actions` 作为 Pages 来源。

## 3. 发布前内容审查

公开仓库中的源文件和 GitHub Pages 页面都可被访问。首次发布前检查：

- `_pages/profiles.md` 中“福老师”“陈同学”仍标记为“个人资料待补充”；
- `_data/socials.yml` 仍使用微信二维码占位图；
- 小红书链接目前是否为空；
- 地图、人物照片、作品照片和书籍封面是否允许公开使用；
- 邮箱、飞书链接和工作坊报名链接是否正确；
- `_drafts/` 中是否存在不应提交的内容；
- 图片或附件中是否包含私人地址、电话号码或其他个人信息。

隐藏导航不等于停止公开。页面只要被 Jekyll 构建，就可能通过 sitemap 或直接 URL 访问。

## 4. 精简 GitHub Actions

真正负责发布的工作流只有：

```text
.github/workflows/deploy.yml
```

当前 `.github/workflows/` 还保留了主题模板工作流，例如 Docker 镜像发布、CodeQL、Prettier、自动更新目录和链接检查。这些工作流不一定阻塞 Pages，但会产生无关的运行记录，部分还可能自动修改仓库。

首次上线建议仅保留 `deploy.yml`。如果暂时不删除，至少确认：

- `update-tocs.yml` 具有写入仓库权限，可能自动提交 Markdown 变更；
- `prettier.yml` 可能报告格式检查失败；
- Docker 镜像工作流不是本站部署所需；
- `broken-links-site.yml` 监听的工作流名称与当前部署工作流不一致，不会按预期触发。

## 5. 创建 GitHub 仓库

在 GitHub 创建公开仓库：

```text
luffythink/crypto-clay-network
```

不要勾选自动创建 README、`.gitignore` 或 License，避免与本地文件冲突。

## 6. 初始化并推送

当前项目目录还不是 Git 仓库。在项目根目录执行：

```bash
git init
git branch -M main
git add .
git status
```

在提交前重点确认 `git status` 中没有：

```text
_site/
.jekyll-cache/
node_modules/
vendor/
.DS_Store
```

然后提交并关联远程仓库：

```bash
git commit -m "Initial GitHub Pages site"
git remote add origin git@github.com:luffythink/crypto-clay-network.git
git push -u origin main
```

如未配置 SSH，可使用 HTTPS：

```bash
git remote add origin https://github.com/luffythink/crypto-clay-network.git
```

`Gemfile.lock` 必须提交。

## 7. 启用 GitHub Pages

进入：

```text
仓库 → Settings → Pages
```

在 `Build and deployment` 中设置：

```text
Source: GitHub Actions
```

然后打开：

```text
仓库 → Actions → Deploy GitHub Pages
```

如果首次推送没有自动运行，可以点击 `Run workflow` 手动执行。

部署工作流会：

1. 安装 Ruby 3.3.5；
2. 安装 Python、ImageMagick 和 `nbconvert`；
3. 执行生产环境 Jekyll 构建；
4. 使用 PurgeCSS 清理样式；
5. 上传 `_site/`；
6. 使用 GitHub 官方 `deploy-pages` 发布。

## 8. 首次验收

Actions 成功后检查：

```text
https://luffythink.github.io/crypto-clay-network/
https://luffythink.github.io/crypto-clay-network/workshops/
https://luffythink.github.io/crypto-clay-network/notes/
https://luffythink.github.io/crypto-clay-network/works/
https://luffythink.github.io/crypto-clay-network/life/
https://luffythink.github.io/crypto-clay-network/community/
https://luffythink.github.io/crypto-clay-network/books/
https://luffythink.github.io/crypto-clay-network/robots.txt
https://luffythink.github.io/crypto-clay-network/sitemap.xml
```

验收标准：

- 首页、导航和详情页均可访问；
- CSS、JavaScript、图片和书籍封面没有 404；
- 页面内链接均包含 `/crypto-clay-network/`；
- canonical 使用 `https://luffythink.github.io/crypto-clay-network/`；
- `robots.txt` 中 sitemap 指向正确的项目站点地址；
- GitHub Actions 的 `Deploy GitHub Pages` 工作流为绿色。

## 9. 评论功能是可选项

Giscus 尚未配置，不影响网站部署。

需要启用时：

1. 在仓库 Settings 中启用 Discussions；
2. 安装 Giscus App；
3. 在 [giscus.app](https://giscus.app/zh-CN) 获取 `repo_id` 和 `category_id`；
4. 更新 `_config.yml`；
5. 在需要评论的文章中加入 `giscus_comments: true`。

推荐使用：

```yaml
giscus:
  repo: luffythink/crypto-clay-network
  repo_id: GISCUS_生成的_REPO_ID
  category: Comments
  category_id: GISCUS_生成的_CATEGORY_ID
  mapping: pathname
```

不要手工猜测 ID。

## 10. 日常更新

本地预览并确认内容后：

```bash
git add .
git commit -m "Update site content"
git push
```

推送到 `main` 后会自动发布。

## 11. 第二阶段切换到 yunfuyao.art

域名注册后按以下顺序切换：

1. 在 GitHub 个人设置的 `Settings → Pages` 验证 `yunfuyao.art` 所有权；
2. 保留 GitHub 提供的 TXT 验证记录；
3. 在仓库 `Settings → Pages → Custom domain` 填写 `yunfuyao.art`；
4. 配置根域名的四条 A 记录：

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

5. 将 `www` 的 CNAME 指向：

   ```text
   luffythink.github.io
   ```

6. 把 `_config.yml` 改为：

   ```yaml
   url: https://yunfuyao.art
   baseurl:
   ```

7. 重新部署，等待证书签发后启用 `Enforce HTTPS`；
8. 验证根域名、`www`、canonical、robots 和 sitemap。

使用自定义 GitHub Actions 发布时不需要根目录 `CNAME` 文件。不要把 `www` 指向带仓库路径的地址，也不要配置通配符 DNS。

## 12. 常见故障

### 页面打开但样式和图片 404

确认：

```yaml
url: https://luffythink.github.io
baseurl: /crypto-clay-network
```

### Actions 找不到依赖

确认 `Gemfile` 和 `Gemfile.lock` 已提交。

### Pages 显示 404

确认：

- 仓库名称严格为 `crypto-clay-network`；
- 默认分支为 `main`；
- Pages Source 已选择 `GitHub Actions`；
- `Deploy GitHub Pages` 工作流成功；
- 访问地址包含 `/crypto-clay-network/`。

### 本地 sitemap 显示 0.0.0.0

`jekyll serve` 会使用本地服务地址生成开发预览，这是正常现象。上线核验应以 GitHub Actions 的生产构建和线上 sitemap 为准。
