<template>
  <el-form
    :model="formModel"
    ref="formRef"
    label-width="160px"
    label-position="top"
    :rules="rules"
    scroll-to-error
    style="width: 100%"
    :disabled="mode === 'detail'"
  >
    <el-row :gutter="24">
      <el-col :lg="24" :md="24" :sm="24" :offset="0">
        <div class="rule-info-container">
          <el-form-item label="规则名称" prop="name" class="custom-form-item">
            <el-input
              style="width: 100%"
              v-model="formModel.name"
              word-limit="10"
              maxlength="10"
              show-word-limit
              placeholder="请输入"
              clearabled
            />
          </el-form-item>
          <el-form-item label="规则状态" class="custom-form-item" prop="status">
            <el-radio-group v-model="formModel.status" style="width: 100%">
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级" class="custom-form-item" prop="priority">
            <div class="w-100 d-flex gap-3 align-items-center">
              <NumberInput v-model="formModel.priority" :precision="0" :min="0" />
              <el-tooltip content="数字越小，优先级越高" effect="light" placement="top">
                <el-icon size="18" color="#3e97ff">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </div>
          </el-form-item>
          <el-form-item label="生效时间" prop="effectiveTimeBegin" class="custom-form-item">
            <el-date-picker
              v-model="formModel.effectiveTimeBegin"
              type="date"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="规则描述" prop="description" class="custom-form-item">
            <el-input
              class="w-300px"
              v-model="formModel.description"
              word-limit="500"
              maxlength="500"
              show-word-limit
              placeholder="请输入"
              clearabled
              style="width: 100%"
            />
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-left: 0 !important; background: white">
      <EditLayout
        :formModel="conditionList"
        :schema="schema"
        ref="editLayoutRef"
        :isDetail="mode === 'detail'"
      >
        <template #custom-receiveCode="{ model, formModel }">
          <el-form-item :label="model.label" required prop="receiveCode">
            <renderPostCode v-model="formModel.receiveCode" :disabled="mode === 'detail'" />
          </el-form-item>
        </template>
        <template #actions>
          <span>设定动作</span>
          <el-form-item label="检测库存" label-width="190px" inline required>
            <el-radio-group
              v-model="formModel.actionParams.checkInventory"
              :disabled="mode === 'detail'"
            >
              <el-radio :value="1">是</el-radio>
              <el-radio :value="0">否</el-radio>
            </el-radio-group>
            <div class="tips padl15">
              一品多供发货的产品，一个仓库匹配到多个SKU，按库存最大优先发货
            </div>
          </el-form-item>
          <el-form-item
            label="发货仓"
            label-width="190px"
            inline
            :rules="[{ required: true, message: '请选择发货仓', trigger: 'blur' }]"
          >
            <div class="shipping">
              <div class="shipping-left" v-if="mode !== 'detail'">
                <el-input
                  v-model="filterText"
                  class="pdl15"
                  style="padding: 0 20px; margin-bottom: 10px"
                  placeholder="请输入仓库名称"
                  clearable
                />
                <el-tree
                  ref="treeRef"
                  :data="warehouseList"
                  :props="treeProps"
                  node-key="warehouseCode"
                  empty-text="请选择"
                  show-checkbox
                  :filter-node-method="filterNode"
                  @check="handleWarehouseChange"
                />
              </div>
              <div class="shipping-right">
                <div class="shipping-right-title">
                  已选仓库 {{ currentKey?.length }}
                  <span class="tips" v-if="mode !== 'detail'">可拖拽设定仓库优先级顺序</span>
                </div>
                <el-tree
                  ref="treeRef2"
                  :data="currentKey"
                  :props="treeProps2"
                  node-key="value"
                  empty-text=""
                  :draggable="mode !== 'detail'"
                  :allow-drop="allowDrop"
                  @node-drop="handleDrop"
                />
              </div>
            </div>
            <!-- <div v-else class="text-gray-600">请先选择发货仓</div> -->
          </el-form-item>
          <el-form-item
            label="物流渠道"
            :rules="[{ required: true, message: '请选择物流渠道', trigger: 'blur' }]"
          >
            <div class="w-100">
              <div class="shipping" v-if="currentKey?.length">
                <!--                  <el-input v-model="query" placeholder="请输入渠道名称" @input="onQueryChanged" />-->
                <div class="shipping-left" v-if="mode !== 'detail'">
                  <!-- node-key="shippingCode" -->
                  <!-- default-expand-all -->
                  <el-tree
                    ref="treeRef3"
                    :data="shippingList"
                    :props="treeProps3"
                    default-expand-all
                    node-key="code"
                    empty-text=""
                    style="height: 325px"
                    @check="handleTreeCheck"
                  >
                    <template #default="{ node }">
                      <!-- 移除 v-model，使用 :checked 绑定 -->
                      <!-- @change="(val) => handleShippingChange(val, node)" -->
                      <el-checkbox
                        v-if="node.level === 3"
                        :model-value="isNodeChecked(node)"
                        :label="node.label"
                        @change="(val) => handleLevel3CheckboxChange(val, node)"
                        @click.stop
                      />
                      <span v-else>{{ node.label }}</span>
                    </template>
                  </el-tree>
                </div>
                <div class="shipping-right">
                  <div class="shipping-right-title">已选渠道 {{ checkedKeys?.length }}</div>
                  <div
                    class="shipping-right-item"
                    v-for="select in formModel.actionParams.warehouseList"
                    :key="select?.shippingCode"
                    style="padding-left: 20px"
                  >
                    <div>{{ select?.shippingName }}</div>
                    <div class="w-50 d-flex align-items-center gap-2">
                      <div class="flex-grow-1">
                        <OverflowTooltip :content="select?.warehouseName" :line="1" />
                      </div>
                      <el-icon
                        class="cursor-pointer"
                        @click="handleClearCheck(select)"
                        v-if="mode !== 'detail'"
                      >
                        <Close />
                      </el-icon>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else class="text-gray-600">请先选择发货仓</div>
            </div>
          </el-form-item>
        </template>
      </EditLayout>
    </el-row>
  </el-form>
  <div class="card-footer d-flex justify-content-end py-6 px-9">
    <el-space>
      <el-button @click="cancel">取消</el-button>
      <el-button @click="submitForm" :disabled="mode === 'detail'" type="primary">确定</el-button>
    </el-space>
  </div>
</template>

<script setup lang="ts">
  import { ElMessage } from 'element-plus/es';
  import { omsApi } from '@/api/index';
  import EditLayout from '../components/EditLayout.vue';
  import { useRoute } from 'vue-router';
  import { useWarehouseRuleData } from './hooks/useWarehouseRuleData';
  import { QuestionFilled } from '@element-plus/icons-vue';
  import { useTabs } from '@/hooks/tabs';
  import { cloneDeep } from 'lodash-es';
  const { formModel, schema, conditionList } = useWarehouseRuleData();
  const { closeTabAndRefresh, closeCurrentTab } = useTabs();
  import renderPostCode from '@/views/supplyChainManage/B2BOrder/orderRule/renderCom/renderPostCode.vue';

  const rules = reactive({
    name: [{ required: true, message: '请输入规则名称', trigger: 'blur' }],
    status: [{ required: true, message: '请选择规则状态', trigger: 'blur' }],
    priority: [{ required: true, message: '请输入优先级', trigger: 'blur' }],
    effectiveTimeBegin: [{ required: true, message: '请选择生效时间', trigger: 'blur' }],
    description: [{ required: false, message: '请输入规则描述', trigger: 'blur' }],
    warehouseArr: [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
    'actionParams.warehouseList': [{ required: true, message: '请选择物流渠道', trigger: 'blur' }],
  });

  const editLayoutRef = ref<any>(null);
  const route = useRoute();
  interface RuleActionsProps {
    mode: 'add' | 'detail' | 'edit';
  }
  const props = defineProps<RuleActionsProps>();
  // const isEdit = computed(() => props.mode === 'edit');
  const isEdit = computed(() => {
    return route.fullPath.includes('/edit');
  });
  const formRef = ref<any>(null);
  const saveLoading = ref(false);

  const warehouseList = ref([]);
  const filterText = ref('');
  const treeRef: any = ref(null);
  const treeRef3: any = ref(null);
  const filterNode = (value: string, data: any) => {
    if (!value) return true;
    // console.log('filterNode', data);
    return data?.label.includes(value);
  };
  watch(filterText, (val) => {
    treeRef.value!.filter(val);
  });
  const treeProps = {
    value: 'value',
    label: 'warehouseName',
    children: null,
  };
  const treeProps2 = {
    value: 'warehouseCode',
    label: 'warehouseName',
    children: null,
  };
  const treeProps3 = {
    value: 'value',
    label: 'label',
    children: 'children',
  };
  const queryWarehouseShipList = async () => {
    // 启用状态 0-禁用 1-启用
    // const res: any = await erpApi.luteosErpOrderShipmentQueryWarehouseShipList({
    // 切换 todo----------
    const res: any = await omsApi.omsCommonWarehouseQueryWarehouseShipList({
      pageNum: 1,
      pageSize: 10000,
    });
    // console.log('获取仓库', res);
    // warehouseList.value = res?.warehouseShipList;
    warehouseList.value = res?.warehouseShipList?.map((item) => {
      // console.log(item);
      if (item.spInfos?.length) {
        for (let index = 0; index < item.spInfos.length; index += 1) {
          const spInfo = item.spInfos[index];
          spInfo.label = spInfo.spName;
          spInfo.value = { spCode: spInfo.spCode, spName: spInfo.spName };
          // spInfo.code = spInfo.spCode;
          spInfo.code = `${item.warehouseCode}-${spInfo.spCode}`;
          spInfo.children = spInfo.shipInfos;
          for (let j = 0; j < spInfo.shipInfos.length; j += 1) {
            const shipItem = spInfo.shipInfos[j];
            shipItem.label = shipItem.smNameCn;
            shipItem.code = `${item.warehouseCode}-${shipItem.spCode}-${shipItem.smCode}`;
            shipItem.value = {
              shippingCode: shipItem.smCode,
              shippingName: shipItem.smNameCn,
              spCode: shipItem.spCode,
              spName: shipItem.spName,
              warehouseCode: item.warehouseCode,
              warehouseName: item.warehouseName,
            };
            // shipItem.value = shipItem.smCode;
          }
        }
      }
      return {
        ...item,
        label: item.warehouseName,
        code: item.warehouseCode,
        value: { warehouseCode: item.warehouseCode, warehouseName: item.warehouseName },
        children: item.spInfos,
      };
    });
    // console.log(warehouseList.value);
    if (route.query.code) {
      const arr = formModel.actionParams.warehouseList?.map((item: any) => item.warehouseCode);
      const arr2 = formModel.actionParams.warehouseList?.map((item: any) => {
        return { warehouseCode: item.warehouseCode, warehouseName: item.warehouseName };
      });
      currentKey.value = arr2;
      // const arr3 = formModel.actionParams.warehouseList?.map((item: any) => item.shippingCode);
      const arr3 = formModel.actionParams.warehouseList?.map(
        (item: any) => `${item.warehouseCode}-${item.spCode}-${item.shippingCode}`
      );
      // console.log('设置选中:', arr, arr2, arr3);
      treeRef.value!.setCheckedKeys(arr, false);
      // setCheckedKeys(arr3);
      setCheckedKeys(arr3);
    }
  };
  queryWarehouseShipList();

  const handleDrop = () => {
    // currentKey.value = currentKey.value.map((item, index) => Object.assign(item, { index }));
    console.log('tree drop:', currentKey.value);
  };
  // 缓存选中状态 todo--------------------!!!!!!!!!!!!!!!!!!!
  const shippingList = computed(() => {
    const codeArr = currentKey.value.map((item: any) => item.warehouseCode);
    const list = warehouseList.value?.filter((item) => codeArr.includes(item.warehouseCode));
    // console.log('shippingList', list);
    // let list2 = <any>[];
    // for (let i = 0; i < currentKey.value.length; i++) {
    //   const citem: any = currentKey.value[i];
    //   console.log(citem);
    //   for (let j = 0; j < warehouseList.value.length; j++) {
    //     const warehouse: any = warehouseList.value[j];
    //     // console.log(warehouse);
    //     if (warehouse?.warehouseCode === citem?.warehouseCode) {
    //       warehouse.index = i;
    //       list2.push(warehouse);
    //       break;
    //     }
    //   }
    // }
    // console.log(list2);
    return list;
  });
  const allowDrop = (draggingNode, dropNode, type) => {
    // type: 'prev' | 'inner' | 'next'
    // 禁止拖拽到节点内部（改变层级）
    if (type === 'inner') {
      return false;
    }
    // 只允许在同一层级拖拽
    const draggingParent = draggingNode.parent;
    const dropParent = dropNode.parent;
    // 如果父节点不同，禁止拖拽
    if (draggingParent !== dropParent) {
      return false;
    }
    return true;
  };

  const currentKey = ref<any>([]); // 初始化当前选中节点 key
  const handleWarehouseChange = async (val, node) => {
    //   console.log('val:', val);
    //   console.log('node:', node);
    // console.log('currentKey.value?.length', currentKey.value?.length);
    if (currentKey.value?.length === 0) {
      const firstOne = { warehouseCode: val.warehouseCode, warehouseName: val.warehouseName };
      currentKey.value.push(firstOne);
    } else {
      const index = currentKey.value.findIndex((item) => item.warehouseCode === val.warehouseCode);
      // console.log('下标 ---', index);
      if (index > -1) {
        // console.log('已选中的仓库 取消选择');
        // 已选中的仓库 取消选择
        currentKey.value.splice(index, 1);
      } else {
        // console.log('选中仓库');
        currentKey.value.push({
          warehouseCode: val.warehouseCode,
          warehouseName: val.warehouseName,
        });
      }
    }

    // currentKey.value = treeRef.value.getCheckedKeys(false);
    // currentKey.value = node.checkedNodes.map((item) => {
    //   return { warehouseCode: item.warehouseCode, warehouseName: item.warehouseName };
    // });
    // console.log('选中仓库 ', currentKey.value);
  };

  // 受控的选中 keys
  const checkedKeys = ref([]);
  // 受控的选中 仓库
  const checkWarehouse = ref([]);
  // 判断是否是 相同的物流渠道
  const hasSameShipping = (node) => {
    const warehouseArr = formModel.actionParams.warehouseList.map(
      (item: any) => item.warehouseCode
    );
    // console.log('hasSameShipping', warehouseArr, node);
    if (warehouseArr.includes(node?.warehouseCode)) {
      return true;
    }
    return false;
  };

  // 判断节点是否被选中
  const isNodeChecked = (node) => {
    return checkedKeys.value.includes(node.key);
  };
  // 处理第三级复选框变化
  const handleLevel3CheckboxChange = (val, node) => {
    // console.log('nodeKey', node.key);
    // console.log('node.data.value---------', node.data.value);
    // console.log('val', val);
    if (val) {
      // 选中节点
      // if (!checkedKeys.value.includes(node.key)) {
      if (!hasSameShipping(node.data.value)) {
        checkedKeys.value.push(node.key);
        formModel.actionParams.warehouseList.push(node.data.value);
      } else {
        ElMessage.warning('每个发货仓只能选择一个物流渠道');
      }
    } else {
      // 取消选中
      const index = checkedKeys.value.indexOf(node.key);
      const index2 = formModel.actionParams.warehouseList.findIndex(
        (item) =>
          item.warehouseCode === node.data.value.warehouseCode &&
          item.spCode === node.data.value.spCode &&
          item.shippingCode === node.data.value.shippingCode
      );
      // console.log(index, index2, index === index2);
      if (index > -1) {
        checkedKeys.value.splice(index, 1);
      }
      if (index2 > -1) {
        formModel.actionParams.warehouseList.splice(index2, 1);
      }
    }
    // console.log('选中:', checkedKeys.value);
    // console.log('选中仓库:', formModel.actionParams.warehouseList);
  };

  // 处理 el-tree 的 check 事件
  const handleTreeCheck = (data, { checkedKeys: keys }) => {
    console.log('handleTreeCheck', keys);
    // 同步到受控状态
    checkedKeys.value = keys;
  };

  // 从树中获取所有第三级节点的 key
  const getLevel3KeysFromTree = () => {
    const level3Keys = [];

    const traverse = (nodes, level = 1) => {
      nodes.forEach((node) => {
        if (level === 3) {
          level3Keys.push(node.value);
        }
        if (node.children) {
          traverse(node.children, level + 1);
        }
      });
    };

    traverse(shippingList.value);
    return level3Keys;
  };

  // 设置选中 - 现在会生效
  const setCheckedKeys = (keys) => {
    checkedKeys.value = keys;
    // 如果需要，也可以调用 treeRef3.value.setCheckedKeys(keys)
  };

  // 获取选中
  const getCheckedKeys = () => {
    return checkedKeys.value;
  };
  const handleClearCheck = async (val) => {
    clearChecked(val);
    // treeRef3.value.setCheckedKeys([], false);
  };
  // 清空选中
  const clearChecked = (val) => {
    // console.log(checkedKeys.value, formModel.actionParams.warehouseList);
    // const index = checkedKeys.value.indexOf(val.shippingCode);
    const key: any = `${val.warehouseCode}-${val.spCode}-${val.shippingCode}`;
    // console.log('clearChecked key', key);
    const index = checkedKeys.value.indexOf(key);
    if (index > -1) {
      checkedKeys.value.splice(index, 1);
      // console.log('已清空选中', val);
    }
    const index2 = formModel.actionParams.warehouseList.indexOf(val);
    // console.log('index', index);
    // console.log('index2', index2);
    if (index2 > -1) {
      formModel.actionParams.warehouseList.splice(index2, 1);
    }
    // checkedKeys.value = [];
  };
  const router = useRouter();
  const cancel = () => {
    closeCurrentTab();
    router.push({
      name: 'orderRule',
    });
  };

  const areArraysEqualIgnoringOrder = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every((value) => arr2.includes(value));
  };
  // 提交数据
  const submitForm = async () => {
    saveLoading.value = true;
    try {
      if (!editLayoutRef.value) return;
      const valid = await formRef.value?.validate();
      if (!valid) return;
      const result = await editLayoutRef.value.submitForm();
      if (!result.result) return;
      // console.log(currentKey.value, currentKey.value.length);
      if (currentKey.value.length === 0) {
        ElMessage.warning('请选择发货仓');
        return;
      }
      // formModel.actionParams.warehouseList = checkedKeys.value;
      if (formModel.actionParams.warehouseList.length === 0) {
        ElMessage.warning('请选择物流渠道');
        return;
      }
      if (currentKey.value.length !== formModel.actionParams.warehouseList.length) {
        ElMessage.warning('发货仓与物流渠道不匹配');
        return;
      }
      const warehouseArr = currentKey.value.map((item) => item.warehouseCode);
      const shippingArr = formModel.actionParams.warehouseList.map(
        (item: any) => item.warehouseCode
      );
      if (!areArraysEqualIgnoringOrder(warehouseArr, shippingArr)) {
        ElMessage.warning('发货仓与物流渠道不匹配');
        return;
      }
      const params = cloneDeep(formModel);
      params.conditions = result.data;
      // console.log('params ', params, currentKey.value);
      const sortArr = currentKey.value.map((item) => {
        const index = params.actionParams.warehouseList.findIndex(
          (item2: any) => item2.warehouseCode === item.warehouseCode
        );
        return params.actionParams.warehouseList[index];
      });
      // console.log('sortArr ', sortArr);
      params.actionParams.warehouseList = sortArr;
      if (isEdit.value) {
        await omsApi.omsRuleUpdate(params as any);
      } else {
        await omsApi.omsRuleAdd(params as any);
      }
      ElMessage.success('操作成功');
      closeTabAndRefresh('orderRule');
      cancel();
    } catch (error) {
      console.log(`error`, error);
    } finally {
      saveLoading.value = false;
    }
  };
  // 回显数据
  const initForm = async () => {
    const res: any = await omsApi.omsRuleQueryDetail({
      ruleNo: (route.query.code as string) || (route.params?.code as string),
    });
    const conditions = res.conditions;
    if (!editLayoutRef.value) return;
    editLayoutRef.value.initForm(conditions);
    formModel.conditions = [];
    Object.keys(formModel).forEach((key: any) => {
      if (!res[key] && res[key] !== 0) return;
      formModel[key] = res[key];
      // console.log('key', key);
      if (key === 'orderPrice') {
        console.log(formModel[key], res[key]);
      }
    });
    // console.log(`formModel`, formModel);
  };
  onMounted(() => {
    // console.log(`ruleActions onMounted`, isEdit.value);
    if (route.query.code || (route.params.type === 'copy' && route.params?.code)) {
      initForm();
    }
  });
</script>

<style lang="scss">
  .delay-condition-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    flex-wrap: wrap;

    .delay-label {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-unit {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
    }

    .delay-formula {
      font-size: 12px;
      color: #606266;
      white-space: nowrap;
      margin-left: 8px;
    }

    .delay-operator {
      font-size: 16px;
      color: #606266;
      font-weight: 500;
      margin: 0 4px;
    }

    .delay-info-icon {
      cursor: pointer;
      margin-left: 4px;
    }
  }
</style>

<style scoped lang="scss">
  .shipping {
    width: 100%;
    border: 1px solid #e5e6eb;
    border-radius: 4px;
    padding: 15px 0;
    display: flex;
    max-height: 360px;
    gap: 16px;
    &-left {
      width: 45%;
      overflow: auto;
      flex-shrink: 0;
    }
    &-right {
      width: 55%;
      padding-right: 10px;
      &-title {
        color: #1d2129;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        // font-weight: 600;
        line-height: 26px;
        padding-left: 10px;
      }
      &-item {
        line-height: 26px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #4e5969;
        &:hover {
          background-color: #f5f7fa;
        }
      }
    }
  }
  .flex-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .full-row {
    flex-grow: 1;
    flex-basis: 100%;
    /* 或者 width: 100%; */
  }

  .flex-row {
    display: flex;
    /* 接下来的行是弹性布局 */
  }

  .flex-row > div {
    flex: 1;
    /* 让子项也弹性分布 */
  }

  .formItem {
    margin-bottom: 12px;
  }

  .w100 {
    width: 100%;
  }

  .tips {
    width: auto;
    flex-shrink: 0;
    color: #999999;
    line-height: 32px;
  }

  .padl15 {
    padding-left: 15px;
  }

  .tips {
    font-size: 12px;
  }

  .marl4 {
    margin-left: 4px;
  }

  .mar4 {
    margin: 0 4px;
  }

  .padl6 {
    padding-left: 6px;
  }

  .padl10 {
    padding-left: 10px;
  }

  .padb20 {
    padding-bottom: 20px;
  }

  .field-item {
    margin-bottom: 5px;
    width: 50%;
    display: inline-block;
    font-size: 12px !important;
  }

  .custom-form-item {
    display: flex;
    flex-direction: column;
  }

  .rule-info-container {
    padding-top: 20px;
    display: flex;
    width: 100%;
    background: white;
    gap: 20px;
    justify-content: center;
    padding: 20px 30px;
  }
</style>
