<template>
  <div style="text-align: center">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight" style="display: none;" />
    <el-button type="primary" @click="generateCertificate">下载证书</el-button>
  </div>
</template>

<script setup>
import { knowledgeApi } from '@/api';
import dayjs from 'dayjs';
const props = defineProps({
  companyName: { type: String, required: true, default: '深圳市路特创新科技有限公司｜人力行政中心' },
  message: { type: String, required: true, default: '恭喜你顺利完成全部试用期学习任务，在试用期期间，你以积极的态度和出色的学习能力，投入到公司组织的各项培训与学习任务中，期待在未来的工作中，能与你继续共同成长。同时愿你在路特的平台上继续绽放光彩！' },
  templateSrc: { type: String, default: () => new URL('@/assets/lute-os/images/home/结业证书.png', import.meta.url).href },
  taskCode: { type: String, required: true },
})

const canvasRef = ref(null)
const canvasWidth = 2814
const canvasHeight = 2058

// 自动换行
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const lines = []
  let line = ''
  for (const word of text) {
    const testLine = line + word
    const { width } = ctx.measureText(testLine)
    if (width > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = testLine
    }
  }
  lines.push(line)
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight))
}

async function generateCertificate() {
  const { endTime, name } = await knowledgeApi.luteosKnowledgeQueryCredentials({ taskCode: props.taskCode })
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const img = new Image()
  img.src = props.templateSrc

  img.onload = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight)
    // 都进行了3x的缩放
    // 姓名
    ctx.font = 'bold 72px "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText(`${name}同学`, 375, 1086)


    // 正文段落
    ctx.font = '48px "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'left'
    wrapText(ctx, props.message, 375, 1236, 2064, 90)

    // 公司 & 日期
    ctx.font = '42px "PingFang SC", "Microsoft YaHei", sans-serif'
    ctx.textAlign = 'right'
    ctx.fillText(props.companyName, 2442, 1692)
    ctx.fillText(dayjs(endTime).format('YYYY年MM月DD日'), 2442, 1764)


    const link = document.createElement('a')
    link.download = '结业证书.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }
}
</script>