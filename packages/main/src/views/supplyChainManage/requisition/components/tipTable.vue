<template>
  <el-table max-height="500px" :data="tipTable" :span-method="spanMethod">
    <el-table-column label="分组" prop="group" min-width="130" />
    <el-table-column label="人员调整" prop="member" min-width="120" />
    <el-table-column label="品线工作任务" prop="task" min-width="200" />
  </el-table>
</template>

<script setup lang="ts">
  const tipTable = ref([
    {
      group: '自研吸奶器',
      member: '陈梅玲',
      task: 'S/V/Air',
    },
    {
      group: '自研吸奶器',
      member: '许云剑',
      task: 'M5/新项目量产之前的对接/整体交付/统筹',
    },
    {
      group: '自研吸奶器',
      member: '唐娟',
      task: 'M6/M9',
    },
    {
      group: '喂哺电器',
      member: '黄佩燕',
      task: '喂哺电器/paruu',
    },
    {
      group: '护理电器',
      member: '唐娟',
      task: '护理电器',
    },
    {
      group: '家居家纺',
      member: '山昌祥',
      task: '家居家纺：巾类、凉感被、背带、腰凳、挂包、婴装',
    },
    {
      group: '家居家纺',
      member: '黎桃',
      task: '家居家纺：枕头类，门栏，运动垫、音乐毯、储奶壶冻奶壶、辅食袋、风扇',
    },
    {
      group: '内衣品线',
      member: '刘蓉',
      task: '内衣-申江',
    },
    {
      group: '内衣品线',
      member: '池丽环',
      task: 'YN08内衣/哺乳巾/压力袜/家居套装/孕妇内裤/哺乳内衣+系统维护支持',
    },
    {
      group: '内衣品线',
      member: '邹文婷',
      task: '其余的内衣部分、新品以及交付跟进',
    },
    {
      group: '快消品线',
      member: '段璐',
      task: '快消/VC',
    },
    {
      group: '线下渠道+中国区',
      member: '刘维',
      task: '线下需求管理,新平台CN的需求管理，进销存数据管理，库存管理',
    },
    {
      group: '新平台/独立站/亚马逊',
      member: '侯金秀',
      task: '美客多/Shein需求管理/数据建模/数据输出接口',
    },
  ]);

  // 合并单元格
  const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if (columnIndex === 0) {
      if ([0, 5, 7].includes(rowIndex)) {
        // 如果是第一行，检查下面的行是否与当前行的 group 相同
        let count = 1;
        for (let i = rowIndex + 1; i < tipTable.value.length; i++) {
          if (tipTable.value[i].group === tipTable.value[rowIndex].group) {
            count++;
          } else {
            break;
          }
        }
        return {
          rowspan: count,
          colspan: 1,
        };
      }
      // 如果不是第一行，检查当前行的 group 是否与上面的行相同
      if (row.group === tipTable.value[rowIndex - 1].group) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    }
    return {
      rowspan: 1,
      colspan: 1,
    };
  };
</script>

<style scoped lang="scss"></style>
