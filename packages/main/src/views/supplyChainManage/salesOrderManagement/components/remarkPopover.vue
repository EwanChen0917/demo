<!-- remarkPopover.vue - 方案B：只关心业务逻辑 -->
<template>
    <BasePopover ref="basePopoverRef" @close="handleClose">
        <template #content>
            <div class="customer-remark-popover">
                <header class="header">{{ title }}</header>
                <el-input 
                    v-model="localRemark" 
                    type="textarea" 
                    :rows="6" 
                    placeholder="请输入备注信息..."
                    maxlength="200"
                />
                <footer class="footer">
                    <el-button size="small" class="left" @click.stop="handleClear">
                        清空
                    </el-button>
                    <el-space :size="8">
                        <el-button size="small" @click="handleCancel">取消</el-button>
                        <el-button type="primary" size="small" @click="handleConfirm">
                            确定
                        </el-button>
                    </el-space>
                </footer>
            </div>
        </template>
    </BasePopover>
</template>

<script setup>
import { ref } from 'vue'
import BasePopover from './BasePopover.vue'

const emit = defineEmits(['confirm'])
const props = defineProps({
    title: {
        type: String,
        default: '客服备注'
    },
})
const basePopoverRef = ref(null)
const localRemark = ref('')
const extensionData = ref(null)

/**
 * 打开弹窗（外部调用）
 * remarkPopover 只关心"显示什么"，不关心"如何显示"
 * 
 * @param {HTMLElement} trigger - 触发元素的 DOM 引用
 * @param {Object} data - 额外数据
 * @param {String} remark - 当前备注内容
 */
const open = (trigger, data, remark = '') => {
    // 第一步：设置业务数据（remarkPopover 的职责）
    extensionData.value = data
    localRemark.value = remark + ''
    // 第二步：委托 BasePopover 处理显示（BasePopover 的职责）
    basePopoverRef.value?.open(trigger)
}

/**
 * 取消操作
 */
const handleCancel = () => {
    // 直接调用 BasePopover 的 close 方法
    basePopoverRef.value?.close()
}

/**
 * 关闭回调 - 清理业务数据释放内存
 * 注意：这个方法由 BasePopover 的 @close 事件触发
 * 此时 BasePopover 已经处理完关闭逻辑，这里只需清理业务数据
 */
const handleClose = () => {
    localRemark.value = ''
    extensionData.value = null
}

/**
 * 清空输入
 */
const handleClear = () => {
    localRemark.value = ''
}

/**
 * 确认保存
 */
const handleConfirm = () => {
    emit('confirm', {
        remark: localRemark.value,
        extensionData: extensionData.value,
    })
    // 委托 BasePopover 关闭
    basePopoverRef.value?.close()
}

// 只暴露 open 方法给父组件
// close 方法不需要暴露，因为用户操作会自动关闭
defineExpose({
    open
})
</script>

<style lang="scss">
.customer-remark-popover {
    width: 282px;
    padding: 12px 16px 10px 16px;
    background: #ffffff;
    border-radius: 6px;
    border: none;
    box-shadow: 0 6px 36px 0 rgba(6, 8, 27, 0.08);

    .header {
        font-family: 'PingFang SC Medium', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #1f1f1f;
        margin-bottom: 10px;
    }

    .footer {
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;

        .left {
            margin-right: auto;
        }
    }
}
</style>