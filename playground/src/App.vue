<script setup lang="ts">
import { toPDF, transformPicture } from '../../src'
let baseURL = $ref('')
let output = $ref('')
let filename = $ref('')
let src = $ref('')
function submitPic(e) {
  const reads = new FileReader()
  const f = document.getElementById('file').files[0]
  filename = f.name.slice(0, f.name.lastIndexOf('.'))
  reads.readAsDataURL(f)
  reads.onload = (e) => {
    src = baseURL = e.target.result
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
  <main font-sans p="y-10" text="center gray-700 dark:gray-200">
    <vivid-typing content="Transform Picture" text-4xl font-bold />
    <input
      id="file"
      type="file"
      name="file"
      hidden
      accept="image/*"
      @change="submitPic"
    >
    <button
      btn
      flex="~ gap-1"
      justify-center
      items-center
      m-t-10
      m-b-5
      ma
      @click="upload"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        class="iconify iconify--fa"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 1664 1600"
        w-4
      >
        <path
          fill="currentColor"
          d="M1280 1408q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19H704q-26 0-45-19t-19-45V576H384q-42 0-59-40q-17-39 14-69L787 19q18-19 45-19t45 19l448 448q31 30 14 69z"
        /></svg>上传图片
    </button>
    <div flex="~ gap-1" justify-center items-center>
      <span text-xs font-bold>图片名：</span>
      <input
        v-model="filename"
        type="text"
        color-dark
        indent-5
        border-1
        border-yellow
        border-rd-1
        min-w-50
      >
    </div>
    <vivid-typing
      content="支持修改图片名"
      color-amber
      :stable="true"
      :infinity="true"
      text-sm
      :interval="200"
    />
    <div w-50 min-h-30 ma relative :class="!src && 'bg-gray-300:30'" border-rd-1 m-y-5>
      <img v-if="src" id="img" :src="src" w-full alt="上传图片" ma>
      <img
        v-else
        src="/photo.png"
        alt="empty"
        absolute
        style="left: 50%; top: 50%; transform: translate(-50%, -50%)"
      >
    </div>
    <div inline-flex gap-2 m-y-5>
      <button
        btn
        :disabled="!output"
        flex="~ gap-1"
        justify-center
        items-center
        ma
        @click="download('png')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--fa"
          w-4
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1664 1536"
        >
          <path
            fill="currentColor"
            d="M1280 1344q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70q17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"
          /></svg>PNG
      </button>

      <button
        btn
        :disabled="!output"
        flex="~ gap-1"
        justify-center
        items-center
        ma
        @click="download('jpg')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--fa"
          w-4
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1664 1536"
        >
          <path
            fill="currentColor"
            d="M1280 1344q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70q17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"
          /></svg>JPG
      </button>
      <button
        btn
        :disabled="!output"
        flex="~ gap-1"
        justify-center
        items-center
        ma
        @click="download('jpeg')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--fa"
          w-4
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1664 1536"
        >
          <path
            fill="currentColor"
            d="M1280 1344q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70q17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"
          /></svg>JPEG
      </button>
      <button
        btn
        :disabled="!output"
        flex="~ gap-1"
        justify-center
        items-center
        ma
        @click="download('pdf')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--fa"
          w-4
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1664 1536"
        >
          <path
            fill="currentColor"
            d="M1280 1344q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm256 0q0-26-19-45t-45-19t-45 19t-19 45t19 45t45 19t45-19t19-45zm128-224v320q0 40-28 68t-68 28H96q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zm-325-569q17 41-14 70l-448 448q-18 19-45 19t-45-19L339 621q-31-29-14-70q17-39 59-39h256V64q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z"
          /></svg>PDF
      </button>
    </div>

    <img id="outImg" width="200" ma>
    <Footer />
  </main>
</template>
