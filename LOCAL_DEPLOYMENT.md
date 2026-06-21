# 本地部署指南

## 1. 结论先行

本项目是基于 [Jekyll](https://jekyllrb.com/) 和 al-folio 主题构建的静态网站，不包含数据库、后端 API 或常驻业务服务。

本地使用分为两种目标：

1. **开发预览**：编辑 Markdown、Liquid、SCSS 或配置后自动重建，推荐使用 Docker。
2. **生产构建预览**：生成 `_site/` 静态文件，并用本地 HTTP 服务检查最终产物。

推荐路径：

- 日常开发：Docker Compose。
- 需要调试 Ruby/Jekyll 插件：Ruby 3.3.x 原生环境。
- 离线或内网交付：不能直接照搬当前配置，需额外本地化第三方资源，见“离线部署限制”。

## 2. 项目结构与运行链路

主要目录和文件：

| 路径 | 作用 |
| --- | --- |
| `_config.yml` | 站点身份、域名、功能开关、第三方依赖配置 |
| `_pages/` | 固定页面，如首页、工作坊、陶艺笔记、作品、生活和我们 |
| `_works/` | 作品内容 |
| `_workshops/` | 工作坊和活动通知 |
| `_data/` | 首页社交入口和生活画廊的结构化数据 |
| `_layouts/`、`_includes/` | Liquid 页面模板和组件 |
| `_sass/`、`assets/` | 样式、脚本、图片、字体和其他静态资源 |
| `_plugins/` | 自定义 Jekyll Ruby 插件 |
| `Gemfile`、`Gemfile.lock` | Ruby/Jekyll 依赖及锁定版本 |
| `Dockerfile`、`docker-compose.yml` | 容器开发环境 |
| `package.json` | 仅用于 Prettier 格式检查，不是站点运行依赖 |

运行链路：

```text
Markdown / YAML / Liquid / SCSS
                    ↓
             Jekyll 构建
                    ↓
                _site/
                    ↓
       静态 HTTP 服务或 GitHub Pages
```

## 3. 部署前检查

### 3.1 当前项目的版本基线

项目 CI 使用以下版本：

- Ruby 3.3.5
- Bundler 2.6.9
- Python 3.13
- ImageMagick
- `nbconvert`

本地不要求 Python 必须精确为 3.13，但建议与 CI 保持一致。Node.js 只在格式检查或 PurgeCSS 时需要。

### 3.2 正式站点配置

项目当前部署到 GitHub Pages 项目站点：

```text
https://luffythink.github.io/crypto-clay-network/
```

当前 `_config.yml` 使用：

```yaml
url: https://luffythink.github.io
baseurl: /crypto-clay-network
lang: zh-CN
```

本地开发无需把 `url` 改成 localhost。Jekyll 仍通过 `http://0.0.0.0:8080/` 提供预览；`url` 主要用于生成 canonical、Open Graph、robots 和 sitemap 等正式地址。

第一阶段必须保留 `/crypto-clay-network` 子路径。第二阶段启用 `yunfuyao.art` 时，再把 `url` 改为自定义域名并清空 `baseurl`。

Google Analytics 和搜索引擎验证当前保持关闭。获取正式 ID 后，再同时填写对应 ID 并启用功能开关。

GitHub Pages 和第二阶段自定义域名的完整操作见：

```text
GITHUB_PAGES_DEPLOYMENT.md
```

## 4. 方案 A：Docker Compose（推荐）

### 4.1 环境要求

- Docker Desktop，或可用的 Docker Engine
- Docker Compose v2+
- 首次运行时能访问 Docker Hub

先确认 Docker 守护进程已启动：

```bash
docker info
docker compose version
```

如果 `docker info` 提示无法连接 socket，应先启动 Docker Desktop，而不是继续排查项目代码。

### 4.2 标准启动方式

```bash
docker compose pull
docker compose up
```

Compose 已明确设置：

- 工作目录为 `/srv/jekyll`。
- 执行宿主项目中挂载的 `bin/entry_point.sh`，而不是镜像内置的旧入口。
- 项目目录挂载到 `/srv/jekyll`。

浏览器访问：

```text
http://localhost:8080
```

停止服务：

```bash
docker compose down
```

日志与容器状态：

```bash
docker compose ps
docker compose logs -f jekyll
```

### 4.3 ZIP、复制目录或无 `.git/` 时的说明

当前工作目录没有可用的 Git 元数据。项目入口脚本已调整为：无论目录是否包含 `.git/`，都保留现有 `Gemfile.lock`，因此可以直接使用标准启动方式。

如需绕过入口脚本进行一次性诊断，也可以使用：

```bash
docker compose run --rm --service-ports jekyll \
  bundle exec jekyll serve \
  --watch \
  --port=8080 \
  --host=0.0.0.0 \
  --livereload \
  --force_polling
```

按 `Ctrl+C` 停止。

### 4.4 使用 Slim 镜像

完整 Git 仓库中可使用：

```bash
docker compose -f docker-compose-slim.yml pull
docker compose -f docker-compose-slim.yml up
```

Slim 镜像更小，但排错工具更少。首次部署和插件调试优先使用标准镜像。

### 4.5 使用本地 Dockerfile 构建

仅在修改了 `Gemfile`、`Gemfile.lock`、`Dockerfile` 或容器系统依赖时使用：

```bash
docker compose build --pull
docker compose up
```

项目同时声明了 `image` 和 `build`。普通内容编辑不需要反复构建镜像，重新构建只会增加等待和缓存成本。

## 5. 方案 B：原生 Ruby 环境

### 5.1 不要使用 macOS 系统 Ruby

macOS 自带 Ruby 通常版本过旧且受系统保护。项目要求 Bundler 2.6.9，CI 使用 Ruby 3.3.5。应使用 `mise`、`rbenv` 或其他版本管理器安装独立 Ruby。

下面以 `mise` 为例：

```bash
mise install ruby@3.3.5
mise install python@3.13
mise install node@22
mise use ruby@3.3.5 python@3.13 node@22
```

确认当前 shell 没有落回 `/usr/bin/ruby`：

```bash
which ruby
ruby --version
```

安装 Bundler 和系统依赖：

```bash
gem install bundler -v 2.6.9
brew install imagemagick
python3 -m pip install --upgrade nbconvert
```

Linux 上需使用对应包管理器安装编译工具、ImageMagick、Python、Git 和 zlib 开发包。Windows 建议使用 WSL2，不建议直接在原生 Windows Ruby 环境中处理该项目。

### 5.2 安装依赖

```bash
bundle _2.6.9_ install
```

可选的格式检查依赖：

```bash
npm ci
```

RubyGems、npm 或 Docker 镜像首次安装都需要网络。如果处于代理或受限网络，应先配置代理或使用组织内部镜像源。

### 5.3 启动开发服务器

```bash
JEKYLL_ENV=development \
bundle exec jekyll serve \
  --host 0.0.0.0 \
  --port 8080 \
  --livereload
```

访问：

```text
http://localhost:8080
```

若文件变更不能触发重建，追加：

```bash
--force_polling
```

## 6. 生产构建与本地验收

### 6.1 原生环境构建

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

### 6.2 Docker 构建

为避免执行默认入口脚本：

```bash
docker compose run --rm jekyll \
  bash -lc 'JEKYLL_ENV=production bundle exec jekyll build'
```

构建结果位于：

```text
_site/
```

### 6.3 预览生产产物

不要直接双击 `_site/index.html`。部分绝对路径、模块脚本和浏览器安全策略在 `file://` 下行为不同。

使用 HTTP 服务：

```bash
python3 -m http.server 8000 --directory _site
```

访问：

```text
http://localhost:8000
```

### 6.4 最小验收清单

命令检查：

```bash
curl -I http://localhost:8080/
curl -I http://localhost:8080/projects/
curl -I http://localhost:8080/publications/
curl -I http://localhost:8080/gallery/
```

页面检查：

- 首页、导航和页脚无旧站点身份信息。
- 图片、WebP 响应式图片和字体正常加载。
- Projects、Publications、Gallery、CV 页面可打开。
- 浏览器控制台没有持续报错。
- 浅色/深色模式切换正常。
- sitemap、feed 和 canonical URL 使用目标域名。
- 关闭本地开发服务后，生产 `_site/` 仍能独立预览。

格式检查：

```bash
npx prettier . --check
```

注意：Prettier 通过不代表 Jekyll 能构建；最终验收标准始终是 `jekyll build` 成功和关键页面可访问。

## 7. 常见故障

### Docker 无法连接

现象：

```text
failed to connect to the docker API
```

处理：

1. 启动 Docker Desktop。
2. 等待状态变为 Running。
3. 再执行 `docker info`。

### Bundler 版本不匹配

现象：

```text
Could not find 'bundler' (2.6.9)
```

处理：

```bash
gem install bundler -v 2.6.9
bundle _2.6.9_ install
```

如果命令仍调用 `/usr/bin/ruby`，先修正 Ruby 版本管理器的 PATH。

### `Gemfile.lock` 缺失

处理：

1. 从当前 Docker 镜像恢复锁文件：

   ```bash
   docker run --rm --entrypoint cat \
     amirpourmand/al-folio:v0.14.6 \
     /srv/jekyll/Gemfile.lock > Gemfile.lock
   ```

2. 确认使用的是已修正的 `bin/entry_point.sh`。
3. 重新启动容器。

不要直接执行 `bundle update` 重新生成全部依赖版本，这会扩大变更范围并降低与 CI、Docker 镜像的一致性。

### ImageMagick 报错或图片未生成

确认：

```bash
magick -version
```

当前配置启用了 `jekyll-imagemagick`，会把 JPG、JPEG、PNG、TIFF 转换为多个宽度的 WebP。首次构建可能明显慢于后续构建。

临时排查时可将 `_config.yml` 中：

```yaml
imagemagick:
  enabled: false
```

这只适合定位问题，不建议作为最终发布配置。

### 端口被占用

查找占用 8080 的进程，或改用其他端口：

```bash
bundle exec jekyll serve --host 0.0.0.0 --port 8081
```

Docker 方案则将 Compose 中的宿主机端口从 `8080:8080` 改为 `8081:8080`。

### 页面能打开，但样式或脚本不完整

检查：

- `baseurl` 是否与访问路径一致。
- 浏览器是否能访问 jsDelivr、Google Fonts、Cloudflare 等第三方资源。
- 是否直接用 `file://` 打开 `_site/index.html`。
- 浏览器控制台是否有 CSP、SRI、404 或跨域错误。

## 8. 离线部署限制

当前配置：

```yaml
third_party_libraries:
  download: false
```

这意味着构建后的页面仍会从互联网加载多项资源。评论、仓库卡片、引用徽章、分析和部分页面组件也依赖外部服务。

如果目标是断网可用或局域网正式部署，应追加以下工作：

1. 将 `third_party_libraries.download` 改为 `true`，联网执行一次完整构建并检查 `assets/libs/`。
2. 关闭 Google Analytics、Giscus、Google Search Console 校验。
3. 移除或替换 GitHub Readme Stats、GitHub Trophy、Altmetric、Dimensions、Google Scholar 等远程组件。
4. 检查 `_includes/`、`_layouts/` 和页面中的硬编码 CDN URL。
5. 将所有必要字体、脚本、样式和图片纳入本地资产。
6. 在真正断网的浏览器环境中重新验收，而不是只看构建是否成功。

仅执行 `jekyll build` 并不能证明站点可离线运行。

## 9. 当前项目的部署风险与改进优先级

### P0：启动和数据安全

- 当前目录无 `.git/`；入口脚本已修正为保留 `Gemfile.lock`。
- Docker Desktop 当前未启动时，任何 Compose 命令都无法运行。
- 系统 Ruby 版本过旧，直接使用会失败。

### P1：身份和发布配置

- 当前发布地址为 `https://luffythink.github.io/crypto-clay-network/`，Analytics 和搜索引擎验证保持关闭。
- Giscus 尚未配置 `repo_id` 和 `category_id`，因此评论功能暂不启用。
- `_works/` 和未导航页面中仍可能存在不准备公开的模板或旧内容，首次推送公开仓库前必须完成内容审查。
- 隐藏导航不等于停止公开；未排除的页面仍可能进入 sitemap。

### P2：可复现性

- 仓库没有 `.ruby-version`、`.tool-versions` 或 `mise.toml`，本地 Ruby 版本依赖口头约定。
- CI 中部分工作流使用 Ruby 3.2.2，部署工作流使用 Ruby 3.3.5，版本基线不完全统一。
- Docker 开发镜像与 GitHub Actions 环境不是同一套工具链。

建议后续补充版本清单文件，并统一 CI、Docker 和开发环境版本。

### P3：离线和性能

- 站点运行时依赖多个第三方 CDN 与动态徽章服务。
- 仓库约 100 MB，其中 `assets/` 约 93 MB；图片、GIF 和视频会增加克隆、构建和发布成本。
- ImageMagick 会为多种宽度生成 WebP，首次构建耗时和磁盘占用较高。

## 10. 本次环境验证结果

已验证：

- Docker Compose 配置可正常解析。
- 项目锁定 Bundler 2.6.9。
- GitHub Pages 部署工作流使用 Ruby 3.3.5、Python 3.13、ImageMagick 和 GitHub 官方 Pages Actions。
- 正式地址、canonical 和 sitemap 的生产配置指向 GitHub Pages 项目站点。
- `Gemfile.lock` 不再被 `.gitignore` 排除。
- 本机存在 Docker CLI、Compose、Homebrew Ruby、Node.js、Python 和 ImageMagick。
- 当前系统默认 Ruby 2.6.10 不满足项目要求。

本地 Docker 开发预览已可访问。GitHub Pages 的最终生产构建需要在代码推送到仓库后，通过 `Deploy GitHub Pages` 工作流完成首次端到端验证。
