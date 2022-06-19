<script setup lang="ts">
import { toPDF, transformPicture } from '../../src'
let baseURL = $ref('')
let output = $ref('')
let filename = $ref('')
function submitPic(e) {
  const reads = new FileReader()
  const f = document.getElementById('file').files[0]
  filename = f.name.slice(0, f.name.lastIndexOf('.'))
  reads.readAsDataURL(f)
  reads.onload = (e) => {
    document.getElementById('img').src = baseURL = e.target.result
    transformPic()
  }
}

async function transformPic() {
  if (!baseURL)
    return
  output = await transformPicture(baseURL)
  document.getElementById('outImg').src = output.toDataURL()
}

function download(type) {
  if (!output)
    return
  if (type === 'pdf')
    return toPDF(output, filename)
  const a = document.createElement('a')
  a.href = output.toDataURL(`image/${type}`)
  a.download = `${filename}.${type}`
  a.click()
}

function upload() {
  file.click()
}
</script>

<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <input id="file" type="file" name="file" hidden @change="submitPic">
    <button btn m-y-5 @click="upload">
      上传图片
    </button>
    <div flex="~ gap-1" justify-center items-center @click="edit">
      <span text-xs font-bold>文件名：</span>
      <input v-model="filename" type="text">
    </div>
    <img id="img" width="200" height="200" ma>
    <div flex="~ gap-5" justify-center m-y-5>
      <button btn @click="download('png')">
        PNG
      </button>
      <button btn @click="download('jpg')">
        JPG
      </button>
      <button btn @click="download('jpeg')">
        JPEG
      </button>
      <button btn @click="download('pdf')">
        PDF
      </button>
    </div>

    <img id="outImg" width="200" height="200" ma>
    <Footer />
  </main>
</template>
