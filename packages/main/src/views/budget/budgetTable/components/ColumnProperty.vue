<template>
  <el-drawer
    v-model="isShow"
    direction="rtl"
    size="700"
    close-on-click-modal
    modal-class="budget-column-props-panel"
  >
    <template #header>
      <h4>属性</h4>
    </template>
    <template #default>
      <h3></h3>
      <el-descriptions :column="1" border label-width="150">
        <el-descriptions-item label="字段名称">
          <span style="font-weight: bolder; font-size: 1.2em">
            {{ (column?.cellCnName || '').toString().replace(/\s+/g, '') }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="字段编码">{{ column?.cellFieldName }}</el-descriptions-item>
        <el-descriptions-item label="模板名称">
          {{ tableHeader }}
        </el-descriptions-item>
        <el-descriptions-item label="模板编码">
          {{ column?.templateFiledCode }}
        </el-descriptions-item>
        <el-descriptions-item label="列标签">
          {{ column.columnShowTag }}/{{ column?.cellTag }}
        </el-descriptions-item>
        <el-descriptions-item label="类型">{{ column?.cellTypeDesc }}</el-descriptions-item>
        <el-descriptions-item label="📐格式">
          {{
            column.cellDisplayFormat === '0' || column.cellDisplayFormat === 0
              ? '整数'
              : column.cellDisplayFormat > 0
              ? '保留 ' + column.cellDisplayFormat + ' 位小数'
              : column.cellDisplayFormat
          }}
        </el-descriptions-item>
        <el-descriptions-item label="❌验证">
          {{ column.cellValidationRule }}
        </el-descriptions-item>
        <el-descriptions-item label="验证提示">
          {{ column.cellValidationMessage }}
        </el-descriptions-item>
        <el-descriptions-item label="⚠️ 是否必填 ">
          {{ { '0': '非必填', '1': '必填' }[column?.mustFill] || column?.mustFill || '-' }}
        </el-descriptions-item>

        <el-descriptions-item label="✏️ 是否可编辑 ">
          {{ { 0: '不可编辑', 1: '可编辑' }[column?.canEdit] || column?.canEdit || '-' }}
        </el-descriptions-item>

        <el-descriptions-item label="👁️ 是否可查看 ">
          {{ { 0: '不可查看', 1: '可查看' }[column?.canView] || column?.canView || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="💾 默认值 ">
          {{ column?.defaultValue || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="排序">{{ column?.sort }}</el-descriptions-item>
        <el-descriptions-item label="关联枚举ID">
          {{ column?.cellDropDownEnum || '-' }}
          <el-button type="primary" text @click="showAboutEnum">关联枚举</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="级联" v-if="cascadeList.isHave">
          <div v-if="cascadeList.parent.length">上级：{{ cascadeList.parent.join(' > ') }}</div>
          <div v-if="cascadeList.children.length">下级：{{ cascadeList.children.join(' , ') }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="公式类型" v-if="false">
          {{ column?.cellFieldFormulaType }}
        </el-descriptions-item>
        <el-descriptions-item label="公式表达式">
          {{ column?.cellFieldFormula }}
          <el-button v-if="column?.cellFieldFormula" type="primary" text @click="showDepsMap">依赖树</el-button>
        </el-descriptions-item>
        <el-descriptions-item label="下拉过滤公式">
          {{ column?.enumsFilter }}
        </el-descriptions-item>
        <el-descriptions-item label="列聚合">{{ column?.statistics || '-' }}</el-descriptions-item>
        <el-descriptions-item label="列过滤" v-if="isLocalhost">
          {{ column?.filter ? '支持过滤' : '不支持过滤' }}
        </el-descriptions-item>
        <el-descriptions-item label="列描述">{{ column?.desc || '-' }}</el-descriptions-item>
      </el-descriptions>
      <!--        <el-descriptions-item label="创建时间">{{ column?.createTime }}</el-descriptions-item>-->
      <!--        <el-descriptions-item label="更新时间">{{ column?.updateTime }}</el-descriptions-item>-->
      <h3></h3>
      <el-descriptions :column="1" border label-width="150">
        <el-descriptions-item label="单元格计算值">{{ cell.cellValue }}</el-descriptions-item>
        <el-descriptions-item label="行Code">
          {{ cell.rowCode }}
        </el-descriptions-item>
        <el-descriptions-item label="原始行Code">
          {{ cell.originRowCode }}
        </el-descriptions-item>
      </el-descriptions>
      <h3></h3>
      <el-descriptions :column="1" border label-width="150">
        <el-descriptions-item label="* 公式计算路径" v-if="showLines.length && isWebDev">
          <div style="width: 400px; overflow: auto">
            <div v-for="item in showLines" style="word-break: keep-all; white-space: nowrap">
              {{ item.join(' <- ') }}
            </div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="* 其他">
          <div style="color: #999">
            <el-descriptions-item label="单元格代码坐标">
              ({{ cell.row + ', ' + cell.col }})
            </el-descriptions-item>
            ● 前端可编辑：{{ column?.canEditReal || '-' }}
            <br />
            ● 前端必填项：{{
              { '0': '非必填', '1': '必填' }[column?.mustFill] || column?.mustFill || '-'
            }}
            <br />
            ● 列默认值：{{ column?.defaultValue || '-' }}
            <br />
            ● 单元格代码坐标：({{ cell.row + ', ' + cell.col }})
            <br />
            ● 依赖项：{{
              column?.cellFieldFormulaTempDeps
                ?.map?.((x) => `${x}-${getTagName(x)}`)
                ?.join?.(', ') || '-'
            }}
            <br />
            ● 公式下标：{{ column.__formulaIndex }}
            <br />
            ● 公式标签：{{ column.__formulaTag }}
            <br />
            ● 显示下标：{{ column.columnShowIndex }}
            <br />
            ● 显示标签：{{ column.columnShowTag }}
            <br />
            ● 视觉下标：{{ column.__visualIndex }}
            <br />
            ● 视觉标签：{{ column.__visualTag }}
            <br />
            ● 公式：{{ column.cellFieldFormula }}
            <br />
            ● 编译公式：= {{ column.cellFieldFormula_formulaText }}
            <br />
            ● 公式依赖列TAG：{{
              column.cellFieldFormula_tags?.map?.((x, i) => `[${i + 1}] ${x}`).join(', ')
            }}
            <br />
            ● 公式依赖列Field：{{
              column.cellFieldFormula_deps?.map?.((x, i) => `[${i + 1}] ${x}`).join(', ')
            }}
            <br />
            ● 公式依赖列名称：{{
              column.cellFieldFormula_depColumns
                ?.map?.((x, i) => `[${i + 1}] (${x.cellTag})${x.cellCnName}`)
                .join(', ')
            }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template #footer>
      <el-button @click="isShow = false">关闭</el-button>
    </template>
  </el-drawer>
  <AboutEnum ref="aboutEnum" />
  <DepsMap ref="depsMap" />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import 'vxe-table/lib/style.css';
  import { useBudgetStore } from '@/views/budget/budgetTable/script/budgetStore';
  import { isLocalhost, isWebDev } from '@/views/budget/budgetTable/script/variable';
  import AboutEnum from '@/views/budget/budgetTable/components/AboutEnum.vue';
  import DepsMap from '@/views/budget/budgetTable/components/DepsMap.vue';

  const isShow = ref(false);
  const code = ref('');
  const column = ref(null);
  const cell = ref(null);
  const tableHeader = ref(null);
  const lines = ref([]);
  const showDrawer = (_code, _column, _cell, _extCell) => {
    if (!_column?.cellFieldName) {
      _column = {};
    }
    isShow.value = true;
    code.value = _code;
    column.value = _column;
    cell.value = _cell;

    const store = useBudgetStore(code.value);

    lines.value =
      store.getHotInstance().simpleFormula.getDepsLines(_column.cellTag, 'cellFieldFormula')
        ?.lines || [];

    tableHeader.value = store?.detail?.tableHeader || store?.detail?.templateName || '';
  };
  const closeDrawer = () => {
    isShow.value = false;
  };
  // 暴露方法给父组件
  defineExpose({
    showDrawer,
  });

  const showLines = computed(() => {
    if (!isShow.value) {
      return [];
    }
    return lines.value.map((line) => {
      return line.map((x) => {
        return `[${x.cellTag}]${x.cellCnName}`;
      });
    });
  });
  const cascadeList = computed(() => {
    let root = column.value;
    const parentNames = [];
    while (root.parentColumn) {
      root = root.parentColumn;
      parentNames.push(root.cellCnName);
    }
    const childrenNames = column.value.childrenColumns?.map?.((x) => x.cellCnName) || [];
    return {
      parent: parentNames.reverse(),
      children: childrenNames,
      isHave: parentNames.length > 1 || childrenNames?.length > 0,
    };
  });

  const getTagName = (index) => {
    const store = useBudgetStore(code.value);
    return store.tableData.columns[index]?.columnShowTag;
  };

  const aboutEnum = ref(null);
  const showAboutEnum = () => {
    aboutEnum.value.showDrawer(code.value, column.value);
  };

  const depsMap = ref(null);
  const showDepsMap = () => {
    depsMap.value.showDrawer(code.value, column.value);
  };
</script>

<style lang="scss">
  .budget-column-props-panel {
    .el-drawer__header {
      margin-bottom: 0;
    }

    .el-drawer__body {
      padding-bottom: 0;
    }
  }
</style>

<style scoped lang="scss">
  :deep(.vxe-table) {
    margin-top: 10px;
    font-size: 16px;
  }

  :deep(.el-descriptions__content) {
    word-break: break-all;
    white-space: break-spaces;
  }

  :deep(.el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell) {
    padding-top: 2px;
    padding-bottom: 2px;
  }
</style>
