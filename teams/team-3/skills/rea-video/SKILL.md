---
name: rea-video
description: 拆解参考视频的镜头、节奏、素材和制作方式，生成复刻思路和报告。
---

# REA-Video 本地视频拆解

程序由使用者自行安装和配置。先确认本机 REA-Video 的实际可执行文件位置，再阅读该安装版本的说明和 SKILL.md；此模板没有捆绑可执行程序，也不自动安装依赖。

使用绝对路径运行工具。默认本地分析，明确传 `--no-vlm` 覆盖既有偏好；处理用户视频前按任务设置输出目录。运行 decompose 后查看 summary、storyboard 和低置信镜头，使用 review 和 apply-review 记录真实看图复核；不能确定的判断标注待确认。中文任务使用 --lang zh。报告说明未启用 VLM；OCR 及声音分离依赖是否可用应按实际结果报告。不要自动运行付费生成或读取密钥。项目来源：https://github.com/JuneYaooo/rea-video ，版本 ebf46be618274a346032369c37afbdb98ec0af0e。
