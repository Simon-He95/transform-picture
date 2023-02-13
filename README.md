## transform-picture
[live demo](https://transform-image.netlify.app/)

  将上传图片消除白色背景，并转换为png | jpg | jpeg | pdf 格式 下载到本地


## 安装
```bash
npm install transform-picture

import { toPDF, transformPicture } from '../../src'


async function transformPic() {
  if (!baseURL)
    return
  output = await transformPicture(baseURL)
  document.getElementById('outImg').src = output.toDataURL()
}

function download(type) {
  if (!output) return;
  if (type === "pdf") return toPDF(output, filename);
  const a = document.createElement("a");
  a.href = output.toDataURL(`image/${type}`);
  a.download = `${filename}.${type}`;
  a.click();
}
```

## 依赖
`vue`

`jspdf`


