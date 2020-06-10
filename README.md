<p align="center">
  <img width="400" src="https://user-images.githubusercontent.com/18499887/84124201-79369980-aa6d-11ea-8986-666905aca3bf.png" />
  <h2 align="center">Code::Stats Box</h2>
  <p align="center">更新 Code::Stats 数据到 Gist 。</p>
</p>

--- 

> 📌✨ 更多像这样的 Pinned Gist 项目请访问：https://github.com/matchai/awesome-pinned-gists


## 基本原理

提供三个环境变量：
| 变量 | 含义 |
|---|---|
| GIST_ID | Gist ID |
| GITHUB_TOKEN | GitHub Token |
| CODESTATS_USER | CODESTATS ID |

执行 CLI 时会读取环境变量，抓取指定 [Code::Stats](https://codestats.net/)用户的主页，更新对应的 Gist，若无报错则说明更新成功。

```js
npm run start
```

可以通过 GitHub Actions 实现定时更新的功能。

## 使用
### 1. 创建 Gist
Gist 中新建名为 `📊 Yesterday Codestats` 的文件，并从 URL 中得到 Gist ID。

### 2. 创建 GitHub Token
访问 [Personal Access Tokens](https://github.com/settings/tokens) 创建更新 Gist 专用的 Token，需要勾选 `gist - Create gists` 权限，记住新生成的 Token。

### 3. 通过 GitHub Actions 自动更新 Gist
- 创建一个 Repo 并启用 GitHub Actions，可以参考本项目的 [.github/workflows/nodejs.yml](https://github.com/Ancientwood/codestats-box/blob/master/.github/workflows/node.js.yml) 文件。

- 修改 `GIST_ID` 和 `CODESTATS_USER` 为刚刚所得到的 Gist ID 和 Code::Stats 的 ID。  

- 为了不暴露自己的 GitHub Token ，在项目的 `Settings -> Secrets` 中创建两个变量 `TOKEN` 填入 GitHub Token 。  

之后每次 `push` 和每日 18:00 UTC+8 时会触发更新 Gist，如果需要修改触发时机可以调整刚刚的 GitHub Actions 配置文件。
