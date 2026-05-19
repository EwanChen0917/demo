<template>
  <div
    :class="[
      'card',
      'card-flush',
      !isTaskTodo ? 'card-width' : '',
      !isTaskTodo && search.itemType > 5 ? 'new-card-width' : '',
      !isTaskTodo && search.itemType == 0 ? 'new-card-width' : '',
    ]"
  >
    <el-space class="btn-tab" v-if="!isTaskTodo">
      <template v-for="(project, index) in projectList" :key="index">
        <template v-if="project.tips">
          <el-tooltip
            popper-class="action_tool_tip text-gray-600"
            placement="top-start"
            effect="light"
            :content="project.tips"
          >
            <el-button
              v-if="project.permissionCode"
              v-permission="project.permissionCode"
              :type="project.type === +search.itemType ? 'primary' : ''"
              @click="handleProjectClick(project)"
              class="btn-txt"
            >
              {{ project.text }}
            </el-button>
            <el-button
              v-else
              :type="project.type === +search.itemType ? 'primary' : ''"
              @click="handleProjectClick(project)"
              class="btn-txt"
            >
              {{ project.text }}
            </el-button>
          </el-tooltip>
        </template>
        <template v-else>
          <el-button
            v-if="project.permissionCode"
            v-permission="project.permissionCode"
            :type="project.type === +search.itemType ? 'primary' : ''"
            @click="handleProjectClick(project)"
            class="btn-txt"
          >
            {{ project.text }}
          </el-button>
          <el-button
            v-else
            :type="project.type === +search.itemType ? 'primary' : ''"
            @click="handleProjectClick(project)"
            class="btn-txt"
          >
            {{ project.text }}
          </el-button>
        </template>
      </template>
      <!-- 任务日历按钮 -->
      <!-- <el-button
        @click="showCalendarDialog"
        type="primary"
        plain
        class="calendar-btn"
        v-if="isDesignNewType"
      >
        任务日历
      </el-button> -->
    </el-space>
    <el-space class="btn-tab designer-nav" v-if="isTaskPool">
      <ul class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
        <template v-if="groupList.length">
          <li
            :class="['nav-item', nav.name?.trim() ? '' : 'nav-item-disabled']"
            v-for="(nav, index) in groupList"
            :key="index"
            @click="handleNavClick(nav.operatorGroupCode, index, nav)"
          >
            <span
              :class="[
                'nav-link',
                'text-active-primary',
                'py-5',
                'me-6',
                deptId === nav.deptId ? 'active' : '',
              ]"
            >
              {{ nav.name }}
            </span>
          </li>
        </template>
        <li style="height: 56px" v-else></li>
      </ul>
    </el-space>

    <div class="card-header py-5 flex-wrap justify-content-between">
      <div class="card-title align-items-start gap-5">
        <!-- <el-input
          v-model="currentItem.name"
          :placeholder="+search.itemType < 6 ? '任务名称' : '任务名称/项目标签'"
          @input="runQuery"
        > -->
        <el-input v-model="currentItem.name" placeholder="任务名称" @input="runQuery">
          <template #prefix>
            <SvgIconSearch />
          </template>
        </el-input>
      </div>
      <div class="card-toolbar flex-root flex-wrap justify-content-end row-gap-8">
        <el-space wrap>
          <el-date-picker
            v-model="currentItem.startDate"
            type="date"
            placeholder="请选择开始时间"
            value-format="YYYY-MM-DD"
            @change="runQuery"
          />
          <el-date-picker
            v-model="currentItem.endDate"
            type="date"
            placeholder="请选择截止时间"
            value-format="YYYY-MM-DD"
            @change="runQuery"
          />
          <el-select
            v-model="currentItem.initiatorList"
            multiple
            clearable
            filterable
            placeholder="请选择创建人"
            :remote="true"
            :remote-method="queryMemberList"
            remote-show-suffix
            @change="runQuery"
          >
            <el-option
              v-for="item in memberList"
              :key="item.memberCode"
              :label="item.name"
              :value="item.memberCode"
            />
          </el-select>
          <el-select
            v-if="isTaskPool"
            v-model="currentItem.designerCodeList"
            multiple
            clearable
            filterable
            placeholder="请选择设计师"
            remote-show-suffix
            @change="runQuery"
          >
            <el-option
              v-for="item in designerMemberList"
              :key="item.designer"
              :label="item.designerDesc"
              :value="item.designer"
            />
          </el-select>
          <el-select
            v-model="currentItem.productLevelList"
            multiple
            clearable
            filterable
            :placeholder="+search.itemType < 6 ? '请选择产品等级' : '请选择项目等级'"
            @change="runQuery"
          >
            <el-option
              v-for="item in pdtLevelList"
              :key="item.designPdtLevelCode"
              :label="item.name"
              :value="item.designPdtLevelCode"
            />
          </el-select>
        </el-space>
        <el-space wrap>
          <el-button class="button" type="primary" @click="runQuery" style="margin-left: 10px">
            查询
          </el-button>
          <el-button class="button" type="primary" @click="reset">重置</el-button>
        </el-space>
      </div>
    </div>
    <template v-if="designerDescList.length">
      <el-tooltip
        popper-class="action_tool_tip text-gray-600"
        placement="top-start"
        effect="light"
        :content="`当前分类下分配的设计师：${designerDescList.join('、')}`"
      >
        <div class="designer-list">当前分类下分配的设计师：{{ designerDescList.join('、') }}</div>
      </el-tooltip>
    </template>
    <div class="tab-content">
      <div id="kt_project_targets_card_pane" class="tab-pane fade show active" role="tabpanel">
        <div class="row g-9">
          <template v-for="status in taskList" :key="status">
            <div class="col-xl-2" v-if="status === 2 ? ![12, 15].includes(search.itemType) : true">
              <!-- 任务标题 -->
              <div class="mb-9">
                <div class="d-flex flex-stack">
                  <div class="fw-bold fs-4">
                    {{ taskStatusInfo[status].text }}
                    <span class="fs-6 text-gray-400 ms-2">
                      （{{ taskStatusInfo[status].num || 0 }}）
                    </span>
                  </div>
                </div>
                <div :class="['h-3px', 'w-100', `bg-${taskStatusInfo[status].color}`]"></div>
              </div>
              <!-- 任务内容 -->
              <template v-if="loading">
                <div
                  v-for="i in Math.min(taskStatusInfo[status].list.length || 1, 3)"
                  :key="i"
                  class="card mb-6 mb-xl-9 card-pane"
                  style="background: #f4f6fa; border: none; padding: 2rem"
                >
                  <el-skeleton animated>
                    <template #template>
                      <el-skeleton-item variant="h3" style="width: 80%; margin-bottom: 0.5rem" />
                      <el-skeleton-item variant="text" style="width: 50%; margin-bottom: 1.5rem" />
                      <el-skeleton-item
                        variant="rect"
                        style="width: 40%; height: 24px; margin-bottom: 1.5rem; border-radius: 4px"
                      />
                      <el-skeleton-item variant="text" style="width: 60%; margin-bottom: 0.5rem" />
                      <el-skeleton-item variant="text" style="width: 40%" />
                    </template>
                  </el-skeleton>
                </div>
              </template>
              <template v-else>
                <div
                  class="card mb-6 mb-xl-9 card-pane task-item"
                  v-for="(item, index) in taskStatusInfo[status]?.list"
                  :key="index"
                  @click="editTask(item)"
                >
                  <div class="card-body">
                    <div :class="['mb-2', item.tip ? 'title-width' : '']">
                      <span class="fs-4 fw-bold mb-1 text-gray-900 text-hover-primary">
                        {{ item.name }}
                      </span>
                    </div>
                    <div class="fs-6 fw-semibold text-gray-600 mb-10 text-red">
                      {{ item.endDate }} 截止
                    </div>
                    <ElTooltip
                      popper-class="action_tool_tip text-gray-600"
                      placement="top"
                      effect="light"
                      :content="item.itemTag"
                    >
                      <Tag size="large" color="blue" class="mb-10 tag-overflow" v-if="item.itemTag">
                        {{ item.itemTag }}
                      </Tag>
                    </ElTooltip>
                    <div class="fs-6 fw-semibold text-gray-600 mb-10">
                      创建人 {{ item.initiatorDesc }}
                    </div>
                    <div
                      class="fs-6 fw-semibold text-gray-600 mb-10"
                      v-if="item.designerCodeList && item.designerCodeList.length"
                    >
                      设计师 {{ item.designerCodeList.join('、') }}
                    </div>
                    <div class="fs-6 fw-semibold text-gray-600 mb-10" v-else-if="item.designerDesc">
                      设计师 {{ item.designerDesc }}
                    </div>

                    <el-rate
                      v-if="item.status === 7 && item.acceptScore"
                      v-model="item.acceptScore"
                      disabled
                      allow-half
                    />
                  </div>
                  <Tag v-if="item.tip" type="basic" size="large" color="red" class="busy-task">
                    {{ item.tip === 1 ? '加急' : '转让中' }}
                  </Tag>
                  <Tag
                    v-if="item.changeNum > 0"
                    type="basic"
                    size="large"
                    color="#f59a23"
                    class="modify-number"
                  >
                    {{ item.changeNum }}
                  </Tag>
                </div>
              </template>
              <el-space
                v-if="
                  isTaskPool &&
                  createFlag &&
                  +status === 1 &&
                  search.operatorGroupCode &&
                  isDesignNewType
                "
              >
                <el-button type="primary" @click="addTask" style="margin-bottom: 20px">
                  创建任务
                </el-button>
              </el-space>
            </div>
          </template>
          <KeenPagination
            :current="currentItem.current"
            :page-size="currentItem.pageSize"
            :page-size-option="pageSizeOption"
            :total="total"
            @size-change="handlePageSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="designtasktodo">
  import { memberApi, designApi, platformApi } from '@/api/index';
  import { openWindow } from '@/utils';
  import { keyBy, partition } from 'lodash-es';
  import { itemTypeList } from '../config/index.ts';

  // 展示任务日历弹窗
  const showCalendarDialog = async () => {
    openWindow(
      'https://alidocs.dingtalk.com/i/nodes/Qnp9zOoBVBe233N9uyzZxaEGW1DK0g6l?utm_scene=team_space'
    );
  };

  const route = useRoute();

  const pageSizeOption = ref([10, 20, 50, 100]);
  const total = ref(0);
  const loading = ref(false);

  const selectItem = ref({
    type: '',
    conditionType: '',
  });
  const selectTypeList = ref([
    {
      text: '我的任务',
      type: 2,
      path: '/designtasklist',
      conditionType: 'my_designTask',
    },
    {
      text: '任务池',
      type: 1,
      path: '/designtaskpool',
      conditionType: 'all_designTask',
    },
    {
      text: '待办中心',
      type: 3,
      path: '/designtasktodo',
      conditionType: 'todo_designTask',
    },
  ]);

  const projectList = ref([...itemTypeList]);
  const baseItemTypeList = itemTypeList.map((item) => ({ ...item }));
  const itemTypeTextMap = ref<Record<number, string>>({});

  const today = new Date();
  const today1 = new Date();

  // 计算上个月前的日期
  today.setMonth(today1.getMonth() - 1);
  // 计算下个月后的日期
  today1.setMonth(today1.getMonth() + 2);

  // 检查是否需要调整年份
  if (today.getMonth() < new Date().getMonth()) {
    today.setFullYear(today.getFullYear());
  }
  // 检查是否需要调整年份
  if (today1.getMonth() < new Date().getMonth()) {
    today1.setFullYear(today1.getFullYear());
  }
  // const lastMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // const nextMonth = new Date(today1.getFullYear(), today1.getMonth(), today1.getDate());
  // // 格式化日期
  // function formatDate(date) {
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1; // 月份从0开始，所以要加1
  //   const day = date.getDate();
  //   return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  // }
  // const searchCurrentDate = formatDate(lastMonth);
  // const searchEndDate = formatDate(nextMonth);
  const searchCurrentDate = '';
  const searchEndDate = '';

  // 当前配置
  const operationGroupList = ref<any[]>([]);
  const taskPageSize = 50;
  // 当前配置
  const currentItem = computed(() => {
    const data: any = {};
    return (
      operationGroupList.value.find((item) => {
        return item.operatorGroupCode === search.value.operatorGroupCode;
      }) || data
    );
  });

  const search = ref({
    selectType: '',
    operatorGroupCode: '',
    itemType: 0,
    operatorGroupCodeList: undefined,
  });
  const deptId = ref(0);
  const memberList = ref([]);
  const queryMemberList = (keyword) => {
    memberApi
      .luteosMemberQueryMemberList({
        keyword: keyword || '',
        pageNum: 1,
        pageSize: 100,
        status: 1,
      })
      .then((res: any) => {
        memberList.value = res.memberList || [];
      });
  };
  queryMemberList('');

  // 查询设计师
  const designerMemberList = ref<any[]>([]);
  const queryDesignerList = () => {
    designApi
      .luteosDesignQueryDesignerList({
        itemType: search.value.itemType === 99 ? undefined : search.value.itemType,
      })
      .then((res) => {
        designerMemberList.value = res.designerList || [];
      });
  };

  queryDesignerList();

  const pdtLevelList = ref([]);
  const queryPdtLevelList = () => {
    if (+search.value.itemType > 5) {
      designApi
        .luteosDesignQueryDesignLevelDict({
          itemType: search.value.itemType === 99 ? undefined : search.value.itemType,
        })
        .then((res: any) => {
          const list: any = res.dictMap.product_level || [];
          pdtLevelList.value = list.map((item) => {
            return {
              designPdtLevelCode: item.value,
              name: item.desc,
            };
          });
        });
    } else {
      designApi.luteosDesignLevelQueryDesignPdtLevelList().then((res: any) => {
        pdtLevelList.value = res.designPdtLevelList || [];
      });
    }
  };
  queryPdtLevelList();

  watch(
    () => search.value.itemType,
    async () => {
      if (+search.value.itemType > 5) {
        taskStatusInfo.value[4].text = '待认领';
        taskStatusInfo.value[6].text = '待需求方验收';
      } else {
        taskStatusInfo.value[4].text = '已提交';
        taskStatusInfo.value[6].text = '已完成';
      }
    }
  );

  // 项目类型切换
  const handleProjectClick = async (item) => {
    if (+item.type === +search.value.itemType) {
      return;
    }
    search.value.itemType = +item.type;
    saveCondition(item);
    // 清空部门
    search.value.operatorGroupCode = '';
    deptId.value = 0;
    await queryGroupList();
    queryDesignerList();
    queryPdtLevelList();
    runQuery();
  };
  // 保存搜索条件
  const saveCondition = (item) => {
    platformApi
      .platformSearchSaveCondition({
        conditionCode: window.localStorage[`${selectItem.value.conditionType}_conditionCode`],
        conditionName: item.text,
        itemType: selectItem.value.conditionType,
        moduleType: 'designTask',
        platform: 'design',
        searchCondition: JSON.stringify({
          itemType: item.type,
          itemTypeName: item.text,
        }),
      })
      .then((res) => {
        window.localStorage[`${selectItem.value.conditionType}_conditionCode`] = res.conditionCode;
      });
  };
  const handleNavClick = (code, index, nav) => {
    deptId.value = nav.deptId;
    if (search.value.itemType === 99) {
      if (nav.operatorGroupCodeList) {
        search.value.operatorGroupCodeList = nav.operatorGroupCodeList;
      } else {
        search.value.operatorGroupCodeList = undefined;
      }
    } else {
      search.value.operatorGroupCode = code;
    }
    runQuery();
  };

  // 查询部门
  const groupList = ref<any[]>([]);
  const queryGroupList = () => {
    const data: any = {
      operatorGroupCode: '',
      name: '全部',
      deptId: 0,
    };
    groupList.value = [data];
    // console.log('luteosDesignQueryDesignTaskOperationGroupList param', search.value);
    return designApi
      .luteosDesignQueryDesignTaskOperationGroupList({
        itemType: search.value.itemType === 99 ? undefined : search.value.itemType,
      })
      .then((res: any) => {
        const [filledGroupList, emptyGroupList] = partition(res.operationGroupList || [], (item) =>
          item.name?.trim()
        );
        groupList.value = [...groupList.value, ...filledGroupList, ...emptyGroupList] || [];

        operationGroupList.value = [];
        designerDescList.value = [];

        groupList.value.forEach((item) => {
          operationGroupList.value.push({
            operatorGroupCode: item.operatorGroupCode,
            pageSize: taskPageSize,
            current: 1,
            name: '',
            designerCodeList: [],
            initiatorList: [],
            productLevelList: [],
            startDate: searchCurrentDate,
            endDate: searchEndDate,
          });
        });
      });
  };
  // 各个状态的信息
  const taskStatusInfo = ref({
    1: {
      color: 'primary',
      text: '待提交',
      num: 0,
      list: [],
    },
    2: {
      color: 'info',
      text: '审批中',
      num: 0,
      list: [],
    },
    3: {
      color: 'info',
      text: '待指派',
      num: 0,
      list: [],
    },
    4: {
      color: 'warning',
      text: '待认领',
      num: 0,
      list: [],
    },
    5: {
      color: 'success',
      text: '设计中',
      num: 0,
      list: [],
    },
    9: {
      color: 'warning',
      text: '待内部验收',
      num: 0,
      list: [],
    },
    6: {
      color: 'secondary',
      text: '待需求方验收',
      num: 0,
      list: [],
    },
    7: {
      color: 'secondary',
      text: '已验收',
      num: 0,
      list: [],
    },
    8: {
      color: 'danger',
      text: '回收站',
      num: 0,
      list: [],
    },
  });
  // 各个状态的数据
  const taskInfo = ref({
    1: [], // 待提交
    2: [], // 审批中
    3: [], // 待指派
    4: [], // 已提交
    5: [], // 设计中
    6: [], // 已完成
    7: [], // 已验收
    8: [], // 回收站
  });
  const isTaskPool = ref(false);
  const isTaskTodo = ref(false);
  const isTaskList = ref(false);
  const hasSecondStageItemTypeAuth = ref(true);

  const rebuildProjectList = () => {
    let nextList = baseItemTypeList.map((item) => ({
      ...item,
      text: item.type === 99 ? item.text : itemTypeTextMap.value[item.type] || item.text,
    }));
    if (!hasSecondStageItemTypeAuth.value) {
      nextList = nextList.slice(0, 4);
    }
    if (isTaskList.value) {
      nextList = nextList.slice(1);
    }
    projectList.value = nextList;
  };

  const taskList = computed(() => {
    if (isTaskPool.value || isTaskList.value) {
      // 新加 的 全部
      if (+search.value.itemType === 99) {
        return [1, 2, 4, 5, 9, 6, 7, 8];
      }
      if (+search.value.itemType < 6) {
        return [1, 2, 4, 5, 6, 7, 8];
      }
      return [1, 2, 4, 5, 9, 6, 7, 8];
    }
    return [3];
  });

  const handlePageSizeChange = (size) => {
    currentItem.value.pageSize = size;
    runQuery();
  };

  const handleCurrentChange = (current) => {
    currentItem.value.current = current;
    runQuery();
  };

  // 排序后的任务列表
  const createFlag = ref(false); // 创建权限
  const designerDescList = ref([]);

  // 查询任务列表
  const queryTaskList = () => {
    let isTaskTodoVal: any = isTaskTodo.value ? '' : search.value.itemType;
    if (isTaskTodoVal === 0) {
      isTaskTodoVal = undefined;
    }
    // itemType: isTaskTodo.value? '': search.value.itemType === 99? undefined: search.value.itemType,
    const param: any = {
      ...search.value,
      ...currentItem.value,
      pageNum: currentItem.value.current,
      itemType: isTaskTodoVal,
    };
    if (search.value.itemType === 99) {
      // console.log('删除 operatorGroupCode');
      Reflect.deleteProperty(param, 'operatorGroupCode');
      Reflect.deleteProperty(param, 'itemType');
      param.operatorGroupCodeList = search.value.operatorGroupCodeList;
    } else {
      // console.log('删除 operatorGroupCodeList');
      Reflect.deleteProperty(param, 'operatorGroupCodeList');
    }
    // console.log(param);
    loading.value = true;
    designApi.luteosDesignQueryDesignTaskList(param).then((res: any) => {
      createFlag.value = res.createFlag;
      designerDescList.value = [];
      const designList = res.designerList || [];
      total.value = res.pages * currentItem.value.pageSize;
      designList.forEach((item: any) => {
        designerDescList.value.push(item.designerDesc);
      });
      // 初始化任务状态数据
      // 各个状态的数量
      taskStatusInfo.value[1].num = res.unCommitStatusNum;
      taskStatusInfo.value[1].list = res.unCommitDesignTaskList || [];

      taskStatusInfo.value[2].num = res.approveStatusNum;
      taskStatusInfo.value[2].list = res.approveDesignTaskList || [];

      taskStatusInfo.value[3].num = res.distributeStatusNum;
      taskStatusInfo.value[3].list = res.distributeDesignTaskList || [];

      taskStatusInfo.value[4].num = res.acceptStatusNum;
      taskStatusInfo.value[4].list = res.acceptDesignTaskList || [];

      taskStatusInfo.value[5].num = res.designingStatusNum;
      taskStatusInfo.value[5].list = res.designingDesignTaskList || [];

      taskStatusInfo.value[6].num = res.finishedStatusNum;
      taskStatusInfo.value[6].list = res.finishedDesignTaskList || [];

      taskStatusInfo.value[7].num = res.checkedStatusNum;
      taskStatusInfo.value[7].list = res.checkedDesignTaskList || [];

      taskStatusInfo.value[8].num = res.deleteStatusNum;
      taskStatusInfo.value[8].list = res.deleteDesignTaskList || [];

      taskStatusInfo.value[9].num = res.waitInnerCheckedStatusNum;
      taskStatusInfo.value[9].list = res.waitInnerCheckedDesignTaskList || [];
    }).finally(() => {
      loading.value = false;
    });
  };
  const isDesignNewType = computed(() => {
    return +search.value.itemType > 5;
  });
  // 创建任务
  const addTask = () => {
    setSearchSessionStorage();
    if (isDesignNewType.value) {
      router.push(
        `/designtask/operatetype/edit?path=pool&status=1&itemType=${search.value.itemType}&groupCode=${search.value.operatorGroupCode}`
      );
    } else {
      router.push(
        `/designtask/operate/edit?path=pool&status=1&itemType=${search.value.itemType}&groupCode=${search.value.operatorGroupCode}`
      );
    }
  };
  // 操作任务
  const editTask = (task) => {
    setSearchSessionStorage();
    const path = isTaskList.value ? 'list' : isTaskPool.value ? 'pool' : 'todo';
    const effectiveItemType =
      search.value.itemType === 99 ? Number(task.itemType) || 0 : search.value.itemType;
    const isNew =
      +effectiveItemType >= 11 ? +task.oldTaskFlag === 0 : Number(effectiveItemType) > 5;
    const base = isNew ? 'operatetype' : 'operate';
    router.push({
      path: `/designtask/${base}/edit`,
      query: {
        path,
        id: task.designTaskCode,
        status: task.status,
        itemType: `${search.value.itemType}`,
        groupCode: search.value.operatorGroupCode,
      },
    });
  };
  const setSearchSessionStorage = () => {
    sessionStorage.setItem(
      'taskListSearchInfo',
      JSON.stringify({ ...search.value, ...currentItem.value, deptId: deptId.value })
    );
  };

  const reset = () => {
    search.value.operatorGroupCode = '';
    currentItem.value.name = '';
    currentItem.value.designerCodeList = [];
    currentItem.value.initiatorList = [];
    currentItem.value.productLevelList = [];
    currentItem.value.startDate = '';
    currentItem.value.endDate = '';
    initQuery(false);
  };
  const runQuery = () => {
    queryTaskList();
  };

  // 监听当前路由变化
  const router = useRouter();
  const taskListPathList = ['/designtasklist', '/designtaskpool', '/designtasktodo'];
  const lastInitPath = ref('');
  watch(
    () => route.path,
    async (path) => {
      if (!taskListPathList.includes(path)) {
        return;
      }
      loading.value = true;
      try {
        if (lastInitPath.value === path) {
          loading.value = false;
          return;
        }
        lastInitPath.value = path;
        await Promise.all([queryDesignItemTypeAuth(), queryTaskItemTypeText()]);
        // 回显条件
        const { params } = route;
        if (+params.itemType) {
          search.value.itemType = +params.itemType ?? 12;

          await queryGroupList();

          search.value.operatorGroupCode = params.operatorGroupCode || '';
          // 回显条件
          currentItem.value.operatorGroupCode = params.operatorGroupCode;
          currentItem.value.name = params.name;
          currentItem.value.designerCodeList = params.designerCodeList || [];
          currentItem.value.initiatorList = params.initiatorList || [];
          currentItem.value.productLevelList = params.productLevelList || [];
          currentItem.value.startDate = params.startDate;
          currentItem.value.endDate = params.endDate;
          await initQuery(false);
        } else {
          await initQuery();
        }
      } catch (err) {
        loading.value = false;
        console.error('Initialization failed:', err);
      }
    },
    { immediate: true }
  );

  onActivated(() => {
    if (!taskListPathList.includes(route.path) || !selectItem.value.type) {
      return;
    }
    queryDesignItemTypeAuth();
    queryTaskItemTypeText();
    queryDesignerList();
    queryPdtLevelList();
    queryTaskList();
  });

  async function queryDesignItemTypeAuth() {
    const res: any = await designApi.luteosDesignQueryDesignItemTypeAuth({});
    hasSecondStageItemTypeAuth.value = +res.secondStageItemTypeAuth !== 0;
    rebuildProjectList();
  }

  async function queryTaskItemTypeText() {
    try {
      const res: any = await designApi.luteosDesignQueryDesignTaskItemType02List({});
      const itemTypeMap = keyBy(res.itemTypeList || [], 'itemType');
      itemTypeTextMap.value = Object.keys(itemTypeMap).reduce(
        (prev, key) => ({
          ...prev,
          [Number(key)]: itemTypeMap[key].itemTypeName,
        }),
        {} as Record<number, string>
      );
    } catch {}
    rebuildProjectList();
  }
  // 查询上次搜索条件
  async function queryConditionList() {
    const res: any = await platformApi.platformSearchQueryConditionList({
      conditionCode: window.localStorage[`${selectItem.value.conditionType}_conditionCode`],
      itemType: selectItem.value.conditionType,
      moduleType: 'designTask',
      platform: 'design',
      pageNum: 1,
      pageSize: 1,
    });
    const data = (res.recordList && res.recordList[0]) || {};
    const searchCondition = JSON.parse(data.searchCondition || '{}');
    search.value.itemType = searchCondition.itemType ?? 12;
  }

  async function initQuery(isNeedQueryGroup = true) {
    loading.value = true;
    selectItem.value =
      selectTypeList.value.find((item) => {
        return route.path === item.path;
      }) || {};
    try {
      if (selectItem.value.type) {
        search.value.selectType = selectItem.value.type;
        isTaskList.value = selectItem.value.type === selectTypeList.value[0].type;
        isTaskPool.value = selectItem.value.type === selectTypeList.value[1].type;
        isTaskTodo.value = selectItem.value.type === selectTypeList.value[2].type;
        rebuildProjectList();
        //   查询搜索条件
        await queryConditionList();
        // 任务池需要查询部门
        if (isNeedQueryGroup) {
          await queryGroupList();
        }

        queryTaskList();
      } else {
        loading.value = false;
      }
    } catch (err) {
      loading.value = false;
      console.error('initQuery failed:', err);
    }
  }
</script>

<style scoped lang="scss">
  .card-width {
    width: 100%;
  }
  .new-card-width {
    width: 100%;
  }
  .col-xl-2 {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
  }
  .btn-tab {
    margin: 20px 0 0 30px;
  }
  .tab-content {
    margin: 20px 20px 0 30px;
  }
  .card-pane {
    background: #f4f6fa;
  }
  .mb-10 {
    margin-bottom: 5px !important;
  }
  .busy-task {
    position: absolute;
    top: 0;
    right: 0;
  }
  .modify-number {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f59a23;
    color: #000;
    width: 30px;
    height: 20px;
  }
  .text-red {
    color: #f1416c !important;
  }
  .margin-left {
    margin: 0 0 20px 30px;
  }
  .designer-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .designer-list {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 30px;
  }
  .nav-link,
  .task-item {
    cursor: pointer;
  }
  .nav-item-disabled {
    pointer-events: none;
  }
  .el-table__empty-text {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
  }
  .title-width {
    width: 130px;
  }
  .tag-overflow {
    display: inline-block;
    max-width: 170px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    height: 32px;
    line-height: 32px;
    margin-left: -12px;
  }
  .calendar-btn {
    position: absolute;
    right: 32px;
    top: 20px;
  }
  .btn-txt {
    height: 42px;
    padding: 8px 16px;
  }
  .nav-line-tabs .nav-link.active {
    color: #02b96b !important;
    border-bottom-color: #02b96b !important;
  }
  .nav-line-tabs .nav-link:hover:not(.disabled):not(.active) {
    color: #02b96b !important;
    border-bottom-color: #02b96b !important;
  }
</style>
