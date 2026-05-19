<template>
  <div class="postcode-wrapper">
    <div class="postcode-header">
      <el-select v-model="emptyRule" style="width: 80px" @change="handleEmptyRuleChange" :disabled="disabled">
        <el-option value="empty" label="为空" />
        <el-option value="notEmpty" label="不为空" />
      </el-select>
      <div class="input-tips">
        <div class="tips-line">
          支持数字、字母、中划线(-)和空格;支持批量复制不同分项按逗号分隔,按回车键(enter)或点击鼠标完成输入,
        </div>
        <div class="tips-line">
          输入建议:在仅有【收货邮编】条件时,所有邮编配置项输入数量之和:纯单个邮编建议不超过2000个,纯范围邮编不超过100个。超过上述数量拆分成多个规则。如果有多个条件,酌情减少【收货邮编】输入数量。
        </div>
      </div>
    </div>
    <div class="postcode-content" v-if="emptyRule === 'notEmpty'">
      <!-- 邮编开头 -->
      <div class="postcode-section">
        <div class="section-header">
          <el-checkbox v-model="prefixEnabled" :disabled="disabled">
            <span class="section-label">
              邮编开头 (例如美国纽约的邮编开头为10,则输入10即可) 已填写{{ localPrefixList.length }}项
            </span>
          </el-checkbox>
        </div>
        <div class="section-content">
          <renderTagInput
            :disabled="disabled"
            v-model="localPrefixList"
            placeholder="按回车键(enter)或点击鼠标完成输入"
          />
        </div>
      </div>

      <!-- 邮编包含 -->
      <div class="postcode-section">
        <div class="section-header">
          <el-checkbox v-model="containsEnabled" :disabled="disabled">
            <span class="section-label">
              邮编包含 已填写{{ localContainsList.length }}项
            </span>
          </el-checkbox>
        </div>
        <div class="section-content">
          <renderTagInput
            :disabled="disabled"
            v-model="localContainsList"
            placeholder="按回车键(enter)或点击鼠标完成输入"
          />
        </div>
      </div>

      <!-- 以上两项满足其中一项 -->
      <div class="postcode-section">
        <div class="section-header">
          <el-checkbox
            v-model="eitherCondition"
            :disabled="!(prefixEnabled && containsEnabled) || disabled"
          >
            <span class="section-label">以上两项满足其中一项</span>
          </el-checkbox>
        </div>
      </div>
      <el-divider />
      
      <!-- 指定邮编 -->
      <div class="postcode-section">
        <div class="section-header">
          <el-checkbox v-model="specifyEnabled" :disabled="disabled">
            <span class="section-label">
              指定邮编 (支持设置单个邮编和邮编范围,使用"~"连接范围,范围邮编仅支持纯数字格式,0开头的邮编无法进行范围匹配) 已填写{{ localSpecifyList.length }}项
            </span>
          </el-checkbox>
        </div>
        <div  class="section-content">
          <el-radio-group v-model="specifyMatchType" class="match-type-group" :disabled="disabled">
            <el-radio value="in">精准匹配: (如:410000~417700、427700)</el-radio>
            <el-radio value="headIn">前缀匹配: (如:设置前缀范围10001~10126,则10001-1234、10002都能匹配)</el-radio>
          </el-radio-group>
          <div class="input-wrapper">
            <renderTagInput
              :disabled="disabled"
              v-model="localSpecifyList"
              placeholder="按回车键(enter)或点击鼠标完成输入"
            />
          </div>
        </div>
      </div>

      <!-- 排除邮编 -->
      <div class="postcode-section">
        <div class="section-header">
          <el-checkbox v-model="excludeEnabled" :disabled="disabled">
            <span class="section-label">
              排除邮编 (支持设置单个邮编和邮编范围,使用"~"连接范围,范围邮编仅支持纯数字格式,0开头的邮编无法进行范围匹配) 已填写{{ localExcludeList.length }}项
            </span>
          </el-checkbox>
        </div>
        <div  class="section-content">
          <el-radio-group v-model="excludeMatchType" class="match-type-group" :disabled="disabled">
            <el-radio value="!in" >精准匹配: (如:410000~417700、427700)</el-radio>
            <el-radio value="!headIn">前缀匹配: (如:设置前缀范围10001~10126,则10001-1234、10002都能匹配)</el-radio>
          </el-radio-group>
          <div class="input-wrapper">
            <renderTagInput
              :disabled="disabled"
              v-model="localExcludeList"
              placeholder="按回车键(enter)或点击鼠标完成输入"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import renderTagInput from './renderTagInput.vue'

const props = defineProps<{
  modelValue?: any
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: any]
}>()

const emptyRule = ref('notEmpty')
const prefixEnabled = ref(false)
const containsEnabled = ref(false)
const eitherCondition = ref(false)
const specifyEnabled = ref(false)
const specifyMatchType = ref('in')
const excludeEnabled = ref(false)
const excludeMatchType = ref('in')

const localPrefixList = computed({
  get: () => {
    const prefixItem = props.modelValue?.rightSides?.[0]
    if (!prefixItem?.rightSides) return []
    return prefixItem.rightSides
      .filter((item: any) => item.subOp === 'headRegex')
      .map((item: any) => item.value)
      .filter(Boolean)
  },
  set: (values: string[]) => {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    const prefixItem = rightSides[0] || {}
    const containsItems = prefixItem.rightSides?.filter((item: any) => item.subOp === 'regex') || []
    const prefixItems = values.map(v => ({ value: v, subOp: 'headRegex' }))
    
    rightSides[0] = {
      ...prefixItem,
      leftSide: { name: '收货邮编', ref: 'order.receivePostalCode' },
      operator: eitherCondition.value ? 'or' : 'and',
      subOp: 'prefix',
      rightSides: [...prefixItems, ...containsItems]
    }
    
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

const localContainsList = computed({
  get: () => {
    const prefixItem = props.modelValue?.rightSides?.[0]
    if (!prefixItem?.rightSides) return []
    return prefixItem.rightSides
      .filter((item: any) => item.subOp === 'regex')
      .map((item: any) => item.value)
      .filter(Boolean)
  },
  set: (values: string[]) => {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    const prefixItem = rightSides[0] || {}
    const prefixItems = prefixItem.rightSides?.filter((item: any) => item.subOp === 'headRegex') || []
    const containsItems = values.map(v => ({ value: v, subOp: 'regex' }))
    
    rightSides[0] = {
      ...prefixItem,
      leftSide: { name: '收货邮编', ref: 'order.receivePostalCode' },
      operator: eitherCondition.value ? 'or' : 'and',
      subOp: 'prefix',
      rightSides: [...prefixItems, ...containsItems]
    }
    
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

const localSpecifyList = computed({
  get: () => {
    const specifyItem = props.modelValue?.rightSides?.[1]
    if (!specifyItem?.rightSides) return []
    return specifyItem.rightSides
      .map((item: any) => item.value)
      .filter(Boolean)
  },
  set: (values: string[]) => {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    rightSides[1] = {
      leftSide: { name: '指定邮编', innerType: 'string', ref: 'order.receivePostalCode' },
      operator: specifyMatchType.value,
      rightSides: values.map(v => ({ value: v }))
    }
    
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

const localExcludeList = computed({
  get: () => {
    const excludeItem = props.modelValue?.rightSides?.[2]
    if (!excludeItem?.rightSides) return []
    return excludeItem.rightSides
      .map((item: any) => item.value)
      .filter(Boolean)
  },
  set: (values: string[]) => {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    rightSides[2] = {
      leftSide: { name: '排除邮编', innerType: 'string', ref: 'order.receivePostalCode' },
      operator: excludeMatchType.value,
      rightSides: values.map(v => ({ value: v }))
    }
    
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

watch(prefixEnabled, (enabled) => {
  if (!enabled) {
    localPrefixList.value = []
    eitherCondition.value = false
  }
})

watch(containsEnabled, (enabled) => {
  if (!enabled) {
    localContainsList.value = []
    eitherCondition.value = false
  }
})

watch(eitherCondition, (value) => {
  const rightSides = [...(props.modelValue?.rightSides || [])]
  const prefixItem = rightSides[0] || {}
  
  rightSides[0] = {
    ...prefixItem,
    operator: value ? 'or' : 'and'
  }
  
  emit('update:modelValue', {
    ...props.modelValue,
    rightSides
  })
})

watch(specifyEnabled, (enabled) => {
  if (!enabled) {
    localSpecifyList.value = []
  }
})

watch(excludeEnabled, (enabled) => {
  if (!enabled) {
    localExcludeList.value = []
  }
})

watch(specifyMatchType, (newType) => {
  if (specifyEnabled.value) {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    const specifyItem = rightSides[1] || {}
    rightSides[1] = {
      ...specifyItem,
      operator: newType
    }
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

watch(excludeMatchType, (newType) => {
  if (excludeEnabled.value) {
    const rightSides = [...(props.modelValue?.rightSides || [])]
    const excludeItem = rightSides[2] || {}
    rightSides[2] = {
      ...excludeItem,
      operator: newType
    }
    emit('update:modelValue', {
      ...props.modelValue,
      rightSides
    })
  }
})

const handleEmptyRuleChange = (value: string) => {
  // 只修改 operator，不清空数据
  emit('update:modelValue', {
    ...props.modelValue,
    operator: value === 'empty' ? 'exist' : 'notExist'
  })
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) return
    
    // 根据 operator 设置为空/不为空的选择
    if (newValue.operator === 'exist') {
      emptyRule.value = 'empty'
      return
    }
    
    emptyRule.value = 'notEmpty'
    
    const prefixItem = newValue.rightSides?.[0]
    if (prefixItem?.rightSides) {
      const headRegexItems = prefixItem.rightSides.filter((item: any) => item.subOp === 'headRegex' && item.value)
      const regexItems = prefixItem.rightSides.filter((item: any) => item.subOp === 'regex' && item.value)
      
      if (headRegexItems.length > 0) {
        prefixEnabled.value = true
      }
      if (regexItems.length > 0) {
        containsEnabled.value = true
      }
      if (prefixItem.operator === 'or' && headRegexItems.length > 0 && regexItems.length > 0) {
        eitherCondition.value = true
      }
    }
    
    const specifyItem = newValue.rightSides?.[1]
    if (specifyItem?.rightSides?.some((item: any) => item.value)) {
      specifyEnabled.value = true
      if (specifyItem.operator) {
        specifyMatchType.value = specifyItem.operator
      }
    }
    
    const excludeItem = newValue.rightSides?.[2]
    if (excludeItem?.rightSides?.some((item: any) => item.value)) {
      excludeEnabled.value = true
      if (excludeItem.operator) {
        excludeMatchType.value = excludeItem.operator
      }
    }
  },
  { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.postcode-wrapper {
  width: 100%;
  background: #fff;
}

.postcode-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;

  .input-tips {
    flex: 1;
    font-size: 11px;
    color: #606266;
    line-height: 1.6;
    .tips-line {
      margin-bottom: 4px;
    }
  }
}

.postcode-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px 10px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
}

.postcode-section {
  .section-header {
    margin-bottom: 6px;

    .section-label {
      font-size: 12px;
      color: #1f1f1f;
    }
  }

  .section-content {
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .match-type-group {
      display: flex;
      flex-direction: row;
      gap: 8px;

      :deep(.el-radio) {
        margin-right: 0;
        margin-bottom: 0;
      }

      :deep(.el-radio__label) {
        font-size: 11px;
        color: #606266;
      }
    }

    .input-wrapper {
      width: 100%;
    }
  }
}

:deep(.el-checkbox__label) {
  font-size: 12px;
}

:deep(.el-radio__label) {
  font-size: 11px;
}
</style>
