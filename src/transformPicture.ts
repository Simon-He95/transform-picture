import Jspdf from 'jspdf'

export async function transformPicture(src: string, threshold = 30, backgroundSample = true) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const { data } = imgData

      // 自动检测背景色（采样四个角的像素）
      let bgColor = { r: 255, g: 255, b: 255 } // 默认白色
      if (backgroundSample) {
        // 获取四个角的像素平均值作为背景色
        const corners = [
          { x: 0, y: 0 }, // 左上
          { x: canvas.width - 1, y: 0 }, // 右上
          { x: 0, y: canvas.height - 1 }, // 左下
          { x: canvas.width - 1, y: canvas.height - 1 }, // 右下
        ]

        let rSum = 0; let gSum = 0; let bSum = 0
        corners.forEach((corner) => {
          const idx = (corner.y * canvas.width + corner.x) * 4
          rSum += data[idx]
          gSum += data[idx + 1]
          bSum += data[idx + 2]
        })

        bgColor = {
          r: rSum / 4,
          g: gSum / 4,
          b: bSum / 4,
        }
      }

      // 处理每个像素
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // 计算当前像素与背景色的差异
        const diff = Math.sqrt(
          (r - bgColor.r) ** 2
          + (g - bgColor.g) ** 2
          + (b - bgColor.b) ** 2,
        )

        // 根据差异设置透明度
        if (diff < threshold) {
          // 差异小于阈值，设置透明度
          const alpha = (diff / threshold) * 255
          data[i + 3] = Math.min(alpha, data[i + 3])
        }
      }

      ctx?.putImageData(imgData, 0, 0)
      resolve(canvas)
    }
  })
}

export function toPDF(canvas: HTMLCanvasElement, filename: string) {
  const pdfX = (canvas.width + 10) / 2 * 0.75
  const pdfY = (canvas.height + 10) / 2 * 0.75
  const imgX = pdfX
  const imgY = (canvas.height / 2 * 0.75)
  const PDF = new Jspdf('p', 'pt', [pdfX, pdfY])
  PDF.addImage(canvas.toDataURL('image/png', 1.0), 'png', 0, 0, imgX, imgY)
  PDF.save(`${filename}.pdf`)
}
