<template>
  <el-dialog
    :title="`【${titleName}】${titleData}`"
    width="1000px"
    :model-value="visible"
    :close-on-click-modal="false"
    @close="handleFormCancel"
    label-position="left"
    class="set-model-height"
  >
    <div class="content-list">
      <div class="list-item bor-ra-l">
        <h5 class="list-title">目录树</h5>
        <div class="checkbox-box2 ps-4">
          <el-tree
            ref="treeRef"
            :data="deptTree"
            :props="defaultProps"
            :highlight-current="true"
            node-key="value"
            :default-expanded-keys="[1]"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
      <div class="list-item border-tb">
        <h5 class="list-title">备选框</h5>
        <el-input
          v-model="keyword"
          placeholder="名称"
          clearable
          v-if="titleData !== '分发部门'"
          class="mb-2"
        >
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          :disabled="!selectData.length"
          @change="handleCheckAllChange"
          class="ps-4"
          v-if="titleData == '分发部门' || (keyword == '' && !singleSelect)"
        >
          全选
        </el-checkbox>
        <div class="checkbox-box ps-4" :class="{ height390: titleData !== '分发部门' }">
          <el-radio-group v-model="targetMemberCode" v-if="singleSelect">
            <el-radio
              v-for="item in selectData"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-radio-group>
          <el-checkbox-group v-model="checkedData" @change="handleCheckedCitiesChange" v-else>
            <el-checkbox
              v-for="item in selectData"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-checkbox-group>
        </div>

        <el-button
          type="primary"
          class="ms-4"
          @click="sureData"
          :disabled="
            (!checkedData.length && !singleSelect) || (targetMemberCode == '' && singleSelect)
          "
        >
          确定选择
        </el-button>
      </div>
      <div class="list-item bor-ra-r">
        <h5 class="list-title">已选框</h5>
        <el-checkbox
          v-model="checkAllSure"
          :indeterminate="isIndeterminateSure"
          :disabled="!selectDataSure.length"
          @change="handleCheckAllChangeSure"
          class="ps-4"
          v-if="!singleSelect"
        >
          全选
        </el-checkbox>
        <div class="checkbox-box ps-4">
          <el-checkbox-group
            v-model="checkedDataSure"
            @change="handleCheckedCitiesChangeSure"
            v-if="!singleSelect"
          >
            <el-checkbox
              v-for="item in selectDataSure"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-checkbox-group>
          <el-radio-group v-model="targetMemberCodeVal" v-if="targetMemberCodeVal && singleSelect">
            <el-radio
              v-for="item in [targetMemberCodeVal]"
              :key="item.value"
              :label="item.label"
              :value="item"
            />
          </el-radio-group>
        </div>
        <el-button
          type="primary"
          class="ms-4"
          @click="removeData"
          :disabled="!checkedDataSure.length"
          v-if="!singleSelect"
        >
          移除
        </el-button>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleFormCancel">取消</el-button>
        <el-button type="primary" @click="handleFormSubmit" :loading="saveLoading">完成</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { budgetApi, BudgetApi, erpApi, memberApi } from '@/api/index';
  import { ElMessage, FormInstance } from 'element-plus';
  import type { CheckboxValueType } from 'element-plus';
  import * as swal from '@/utils/swal';

  const visible = ref(false);
  const form = ref({
    gtmPlCode: '',
    name: '',
  });

  const emit = defineEmits<{
    (event: 'close', reload?: boolean): void;
    (event: 'success', reload?: boolean): void;
  }>();
  const deptTreeData = ref([]);
  const selectData = ref([]);
  const selectDataSure = ref([]);
  const selectDataSureOld = ref([]);
  const checkedData = ref([]);
  const checkedDataSure = ref([]);
  const checkAll = ref(false);
  const checkAllSure = ref(false);
  const isIndeterminate = ref(false);
  const isIndeterminateSure = ref(false);
  const schemeCode = ref(''); // 预算方案编码
  const compilationCode = ref(''); // 预算表编码
  const budgetDeptId = ref(''); // 预算分发部门
  const budgetDeptName = ref(''); // 预算分发部门名称
  const requestEntrance = ref(0);
  const keyword = ref('');
  const targetMemberCode = ref('');
  const targetMemberCodeVal = ref('');
  const selectDataTotal = ref([]);
  const defaultProps = {
    children: 'children',
    label: 'label',
    // isLeaf: true,
  };
  // 已经分发的部门
  const getDistributionDeptList = async () => {
    if (schemeCode.value) {
      const res = await budgetApi.financeBudgetPresentationQueryDistributionDeptList({
        code: requestEntrance.value == 1 ? compilationCode.value : schemeCode.value, // 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码
        requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
      });
      if (res && res?.recordList) {
        selectDataSure.value = res.recordList.map((item) => {
          return {
            label: item.deptName,
            value: item.deptId,
            fill: item.fill,
          };
        });
        selectDataSure.value = uniqueArray(selectDataSure.value);
        selectDataSureOld.value = JSON.parse(JSON.stringify(selectDataSure.value));
      }
    }
  };
  // 已经分发的员工
  const getDistributionMemberList = async () => {
    if (compilationCode.value) {
      const res = await budgetApi.financeBudgetPresentationQueryDistributionMemberList({
        code: compilationCode.value,
      });
      if (res && res?.recordList) {
        selectDataSure.value = res.recordList.map((item) => {
          return {
            label: item.name,
            value: item.memberCode,
            fill: item.fill,
          };
        });
        selectDataSure.value = uniqueArray(selectDataSure.value);
        selectDataSureOld.value = JSON.parse(JSON.stringify(selectDataSure.value));
      }
    }
  };
  // 已经数据共享的员工
  const getPresentationQuerySharedUserList = async () => {
    const res = await budgetApi.financeBudgetPresentationQuerySharedUserList({
      requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
      code: requestEntrance.value == 1 ? compilationCode.value : schemeCode.value, // 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码
    });
    if (res && res?.sharedUserList) {
      selectDataSure.value = res.sharedUserList.map((item) => {
        return {
          label: item.memberName,
          value: item.memberCode,
          fill: false,
        };
      });
      selectDataSure.value = uniqueArray(selectDataSure.value);
      selectDataSureOld.value = JSON.parse(JSON.stringify(selectDataSure.value));
    }
  };
  // 已委托人
  const getPresentationQueryTrustee = async () => {
    if (compilationCode.value) {
      const res = await budgetApi.financeBudgetPresentationQueryTrustee({
        code: compilationCode.value,
        requestEntrance: 1, // 请求入口 0-预算方案 1-预算编制
      });
      console.log(res);
      if (res && res.memberName) {
        targetMemberCodeVal.value = {
          label: res.memberName,
          value: res.memberCode,
          fill: false,
        };
      }
    }
  };
  // 去重
  const uniqueArray = (arr) => {
    const map = new Map();
    return arr.filter(
      (item) => !map.has(JSON.stringify(item)) && map.set(JSON.stringify(item), true)
    );
  };
  const queryDeptTree = async () => {
    const deptId = budgetDeptId.value ? budgetDeptId.value : null;
    const res = await memberApi.luteosMemberQueryDeptTree({ deptId });
    if (budgetDeptId.value) {
      deptTreeData.value = [
        {
          deptName: budgetDeptName.value,
          deptId: budgetDeptId.value,
          children: res.deptInfoList,
        },
      ];
    } else {
      deptTreeData.value = [
        {
          deptName: '深圳路特',
          deptId: 1,
          children: res.deptInfoList,
        },
      ];
    }
  };
  // 部门所在的人员
  const queryMemberList = async (deptId) => {
    const res = await erpApi.luteosErpMemberQueryDeptMemberList({ deptId });
    selectData.value = res.memberList?.map((item) => {
      return {
        label: item.name,
        value: item.memberCode,
        fill: false,
      };
    });
    selectDataTotal.value = JSON.parse(JSON.stringify(selectData.value));
  };

  const deptTree = computed(() => {
    const mapNode = (item, level = 0) => ({
      value: item.deptId,
      label: item.deptName,
      fill: false,
      leaf: !item.children?.length,
      children: item.children?.map((subItem) => mapNode(subItem, level + 1)),
      level,
    });
    const arr = deptTreeData.value?.map((item) => mapNode(item));
    if (arr.length) {
      handleNodeClick(arr[0]);
    }
    return arr;
  });

  // 树结构点击
  const handleNodeClick = async (nodeData) => {
    console.log(nodeData);
    if (titleData.value == '分发部门') {
      checkedData.value = [];
      selectData.value = nodeData.children;
    } else {
      queryMemberList(nodeData.value);
    }
    checkAll.value = false;
    isIndeterminate.value = false;
  };
  const handleCheckAllChange = (val: CheckboxValueType) => {
    checkedData.value = val ? selectData.value : [];
    isIndeterminate.value = false;
  };
  const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === selectData.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < selectData.value.length;
  };
  const handleCheckAllChangeSure = (val: CheckboxValueType) => {
    checkedDataSure.value = val ? selectDataSure.value : [];
    isIndeterminateSure.value = false;
  };
  const handleCheckedCitiesChangeSure = (value: CheckboxValueType[]) => {
    const checkedCountSure = value.length;
    checkAllSure.value = checkedCountSure === selectDataSure.value.length;
    isIndeterminateSure.value =
      checkedCountSure > 0 && checkedCountSure < selectDataSure.value.length;
  };
  // 确定选择
  const sureData = () => {
    checkedData.value.forEach((item) => {
      const find = selectDataSure.value.find((i) => i.value == item.value);
      if (!find) {
        selectDataSure.value.push(item);
      }
    });
    selectDataSure.value = uniqueArray(selectDataSure.value);
    selectData.value = selectData.value.filter(
      (item) =>
        !checkedData.value.find((i) => {
          return i.value == item.value;
        })
    );
    if (titleData.value == '分发执行人') {
      selectDataTotal.value = selectDataTotal.value.filter(
        (item) =>
          !checkedData.value.find((i) => {
            return i.value == item.value;
          })
      );
      keyword.value = '';
    }
    if (singleSelect.value) {
      targetMemberCodeVal.value = targetMemberCode.value;
    }
    checkedData.value = [];
    checkAll.value = false;
    isIndeterminate.value = false;
  };
  // 移除
  const removeData = () => {
    selectDataSure.value = selectDataSure.value.filter(
      (item) => !checkedDataSure.value.includes(item)
    );
    checkedDataSure.value = [];
    checkAllSure.value = false;
    isIndeterminateSure.value = false;
  };
  const saveLoading = ref(false);
  // 提交操作
  const handleFormSubmit = async () => {
    let text = `是否确认${
      titleData.value == '移交执行人' ? '移交' : '分发'
    }？选择"确认"将根据右侧已选框的${
      titleData.value == '分发部门' ? '部门' : '执行人'
    }分发相关预算表`;
    if (titleData.value == '数据共享') {
      text = '是否确认共享？选择"确认"将根据右侧已选框的用户分发相关预算表查看权限';
    }
    if (titleData.value == '委托负责人') {
      text = '是否确认委托？选择"确认"将根据右侧已选框的执行人委托相关预算表';
    }
    const confirm = await swal.confirm(text);
    if (confirm) {
      saveLoading.value = true;
      if (titleData.value == '移交执行人') {
        const params = {
          code: compilationCode.value, // 预算编制编码
          targetMemberCode: targetMemberCodeVal.value.value, // 移交目标员工编码
        };
        const target = await budgetApi.financeBudgetPresentationTransfer(params).catch(() => {
          saveLoading.value = false;
        });
        if (target) {
          saveLoading.value = false;
          ElMessage.success('操作成功');
          emit('success', true);
          handleFormCancel();
        }
        return;
      }
      if (titleData.value == '委托负责人') {
        const params = {
          code: compilationCode.value, // 预算编制编码
          addMemberCode: targetMemberCodeVal.value.value, // 委托目标员工编码
        };
        const target = await budgetApi.financeBudgetPresentationSaveTrustee(params).catch(() => {
          saveLoading.value = false;
        });
        if (target) {
          saveLoading.value = false;
          ElMessage.success('操作成功');
          emit('success', true);
          handleFormCancel();
        }
        return;
      }

      let addArr = [];
      const delArr = [];
      if (selectDataSureOld.value.length) {
        // 存在历史值
        selectDataSure.value.forEach((item) => {
          const find = selectDataSureOld.value.findIndex((i) => {
            return titleData.value == '分发部门'
              ? Number(i.value) == Number(item.value)
              : i.value == item.value;
          });
          if (find == -1) {
            addArr.push(item.value);
          }
        });
        selectDataSureOld.value.forEach((item) => {
          const find2 = selectDataSure.value.findIndex((i) => {
            return titleData.value == '分发部门'
              ? Number(i.value) == Number(item.value)
              : i.value == item.value;
          });
          if (find2 == -1) {
            delArr.push(item.value);
          }
        });
      } else {
        addArr = selectDataSure.value.map((item) => item.value);
      }
      if (titleData.value == '分发部门') {
        const param = {
          addDeptIdList: addArr, // 新增分发部门列表
          deleteDeptIdList: delArr, // 删除分发部门列表
          requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
          schemeCode: schemeCode.value, // 预算方案编码
        };
        const res = await budgetApi.financeBudgetPresentationDistributionDept(param).catch(() => {
          getDistributionDeptList();
          saveLoading.value = false;
        });
        getDistributionDeptList();
        if (res) {
          saveLoading.value = false;
          ElMessage.success('操作成功');
          emit('success', true);
          handleFormCancel();
        }
      }
      if (titleData.value == '分发执行人') {
        const params = {
          addMemberCodeList: addArr, // 新增分发执行人列表
          code: compilationCode.value, // 预算编制编码
          deleteMemberCodeList: delArr, // 删除分发执行人列表
        };
        const resMember = await budgetApi
          .financeBudgetPresentationDistributionMember(params)
          .catch(() => {
            getDistributionMemberList();
            saveLoading.value = false;
          });
        if (resMember) {
          if (resMember == true) {
            ElMessage.success('操作成功');
            emit('success', true);
            handleFormCancel();
            return;
          }
          getDistributionMemberList();
          ElMessage.error(resMember);
          saveLoading.value = false;
        }
      }
      if (titleData.value == '数据共享') {
        const params = {
          addMemberCode: addArr, // 新增数据共享人列表
          requestEntrance: requestEntrance.value, // 请求入口 0-预算方案 1-预算编制
          code: requestEntrance.value == 1 ? compilationCode.value : schemeCode.value, // 编码,预算方案入口传预算方案编码,预算编制入口传预算编制编码
          delMemberCode: delArr, // 删除数据共享人列表
        };
        const resMember = await budgetApi
          .financeBudgetPresentationSaveSharedUsers(params)
          .catch(() => {
            getDistributionDeptList();
            saveLoading.value = false;
          });
        if (resMember) {
          if (resMember == true) {
            ElMessage.success('操作成功');
            emit('success', true);
            handleFormCancel();
            return;
          }
          getPresentationQuerySharedUserList();
          ElMessage.error(resMember);
          saveLoading.value = false;
        }
      }
      emit('close', true);
    }
  };

  // 取消操作
  const handleFormCancel = async () => {
    visible.value = false;
    emit('close');
  };
  const titleData = ref('分发部门');
  const titleName = ref('');
  const singleSelect = ref(false); // 单选模式
  const open = async (title, code, type, compilation, deptId, deptName, tableName) => {
    console.log(title, code, type, compilation, deptId);
    if (compilation) {
      compilationCode.value = compilation;
    }
    if (deptId) {
      budgetDeptId.value = deptId;
    }
    if (deptName) {
      budgetDeptName.value = deptName;
    }
    if (tableName) {
      titleName.value = tableName;
    }
    queryDeptTree();
    selectDataSure.value = [];
    selectDataSureOld.value = [];
    selectData.value = [];
    checkedData.value = [];
    checkAll.value = false;
    isIndeterminate.value = false;
    checkedDataSure.value = [];
    checkAllSure.value = false;
    isIndeterminateSure.value = false;
    targetMemberCode.value = '';
    targetMemberCodeVal.value = '';
    keyword.value = '';
    if (title) {
      titleData.value = title;
      schemeCode.value = code;
      requestEntrance.value = type;
      if (titleData.value == '分发部门') {
        singleSelect.value = false;
        getDistributionDeptList();
      }
      if (titleData.value == '分发执行人') {
        singleSelect.value = false;
        getDistributionMemberList();
      }
      if (titleData.value == '数据共享') {
        singleSelect.value = false;
        getPresentationQuerySharedUserList();
      }
      if (titleData.value == '委托负责人') {
        singleSelect.value = true;
        getPresentationQueryTrustee();
      }
      if (titleData.value == '移交执行人') {
        singleSelect.value = true;
      }
    }
    visible.value = true;
  };

  watch(keyword, () => {
    selectData.value = selectDataTotal.value.filter((res) => {
      return res.label.includes(keyword.value);
    });
  });

  defineExpose({
    open,
  });
</script>

<style scoped lang="scss">
  .content-list {
    display: flex;
    .list-item {
      width: 33%;
      height: 550px;
      overflow-y: auto;
      background-color: #fff;
      border: 1px solid #ededed;
      .list-title {
        line-height: 40px;
        text-align: center;
        background-color: #f7f7f7;
      }
      .checkbox-box {
        height: 430px;
        overflow-y: auto;
      }
      .height390 {
        height: 390px;
      }
      .checkbox-box2 {
        height: 500px;
        overflow-y: auto;
      }
    }
    .bor-ra-l {
      border-radius: 5px 0 0 5px;
    }
    .bor-ra-r {
      border-radius: 0 5px 5px 0;
    }
    .border-tb {
      border-right: 0;
      border-left: 0;
    }
  }
  :deep(.el-checkbox) {
    display: block;
  }
  :deep(.el-radio) {
    width: 100%;
  }
</style>

<style>
  .keen-ui .el-dialog:not(.custom-dialog).set-model-height .el-dialog__body {
    max-height: 600px;
  }
</style>
