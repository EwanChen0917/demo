import { createApp } from 'vue'
import DrawerModal from './drawerModal.vue'
interface DrawerOptions {
  title?: string,
  subTitle?: string,
  content?: string
  width?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm?: () => void
  onCancel?: () => void
  onClose?: () => void
  onClosed?: () => void
}

// createDrawer 函数：创建并显示对话框，返回一个 Promise
export function createDrawer(options: DrawerOptions = {}): Promise<'confirm' | 'cancel'> {
  return new Promise((resolve) => {
    // 创建一个 DOM 容器用于挂载组件
    const container = document.createElement('div')
    document.body.appendChild(container)

    // 提取配置项或使用默认值
    const {
      title = '',
      subTitle = '',
      content = '',
      width = '520px',
      confirmButtonText = '确定',
      cancelButtonText = '取消'
    } = options

    // 创建 Vue 应用实例
    const app = createApp(DrawerModal, {
      title,
      subTitle,
      content,
      width,
      confirmButtonText,
      cancelButtonText,
      // 定义回调：确认时解析 Promise，结果标记为 'confirm'
      onConfirm: () => resolveResult('confirm'),
      // 取消或关闭时解析 Promise，结果标记为 'cancel'
      onCancel: () => resolveResult('cancel'),
      onClose: () => resolveResult('cancel'),
      // 当对话框完全关闭后（动画结束），卸载组件并移除 DOM
      onClosed: () => {
        app.unmount()
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      }
    })

    // 挂载组件到新创建的 DOM 上
    app.mount(container)

    // 内部辅助函数：保证 Promise 只解析一次，并执行清理
    let resolved = false
    function resolveResult(action: 'confirm' | 'cancel') {
      if (!resolved) {
        resolved = true
        resolve(action)
      }
    }
  })
}
