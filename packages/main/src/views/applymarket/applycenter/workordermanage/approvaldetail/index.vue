<template>
  <div class="d-flex flex-column flex-lg-row">
    <div class="w-100 flex-lg-row-auto w-lg-400px mb-7 me-7 me-lg-10">
      <!--begin::details View-->
      <div class="card mb-5 mb-xl-10">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0"># {{ workflowData?.workflowCode }}</h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">创建人</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.creatorName }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">状态</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span
                v-if="workflowData?.status === 11 || workflowData?.status === 21"
                class="badge badge-light-success"
              >
                {{ workflowData?.statusDesc }}
              </span>
              <span
                v-else-if="workflowData?.status === 0 || workflowData?.status === 1"
                class="badge badge-light-warning"
              >
                {{ workflowData?.statusDesc }}
              </span>
              <span
                v-else-if="
                  workflowData?.status === -1 ||
                  workflowData?.status === 12 ||
                  workflowData?.status === 22
                "
                class="badge badge-light-danger"
              >
                {{ workflowData?.statusDesc }}
              </span>
              <span
                v-else-if="workflowData?.status === 10 || workflowData?.status === 20"
                class="badge badge-light-primary"
              >
                {{ workflowData?.statusDesc }}
              </span>
              <span v-else class="badge badge-light-secondary">{{ workflowData?.statusDesc }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">工单名称</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.workflowSubject }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">工单类型</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.workflowTypeDesc }} - {{ workflowData?.itemTypeDesc }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">申请时间</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.createTime }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">处理人</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.operatorName }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <div class="row mb-7">
            <!--begin::Label-->
            <label class="col-lg-4 fw-semibold text-muted">处理时间</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <span class="fw-semibold text-gray-800 fs-6">
                {{ workflowData?.operationTime }}
              </span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::details View-->
    </div>

    <div class="d-flex flex-column flex-lg-row-fluid gap-7 gap-lg-10">
      <!--begin::details View-->
      <div class="card">
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">{{ workflowData?.workflowTypeDesc }}内容</h3>
          </div>
          <!--end::Card title-->
        </div>
        <!--begin::Card header-->
        <!--begin::Card body-->
        <div class="card-body p-9">
          <div
            class="mb-7"
            :key="key"
            v-for="(val, key) in workflowData?.workflowType == 1
              ? workflowData?.approveInfo.approveContent
              : workflowData?.todoInfo.todoContent"
          >
            <span>{{ key }}：</span>
            <span v-if="val?.startsWith('http')">
              <a :href="val" target="_blank">{{ val }}</a>
              <i
                v-if="val"
                class="fas fa-copy text-hover-primary cursor-pointer ms-2"
                @click.stop="copyFn(val, '')"
              ></i>
            </span>
            <span v-else>{{ val }}</span>
          </div>
          <!--          SKU信息补充时显示-->
          <div v-if="workflowData?.itemType === 11">
            <div class="mb-7">
              <span>处理：</span>
              <span class="text-primary cursor-pointer" @click="toSkuList">查看商品</span>
            </div>
            <div class="mb-7">
              <span>批量处理：</span>
              <span class="text-primary cursor-pointer" @click="download">
                下载导入模板（{{ workflowData?.todoInfo?.exportTypeDesc }}信息）
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="approvaldetail">
import { useRequest } from 'vue-request';
  import { platformApi, PlatformApi, PlatformContracts, productApi } from '@/api/index';
  import { copyFn } from '@/utils/copyFn';
  import { encryptByBase64 } from '@/utils/aesTils';
  import * as swal from '@/utils/swal';

  const route = useRoute();
  const router = useRouter();
  const { code, type } = route.query as {
    code?: string;
    type?: string;
  };

  const { loading: workflowLoading, data: workflowData } = useRequest(
    platformApi.platformWorkflowQueryWorkflowRecordDetail,
    {
      defaultParams: [
        {
          workflowCode: code!,
          workflowType: type!,
        },
      ],
    }
  );

  const toSkuList = () => {
    if (workflowData.value?.todoInfo?.todoContent?.SKU) {
      const path = router.resolve({
        name: 'skulist',
        query: {
          skuList: encryptByBase64(workflowData.value?.todoInfo?.todoContent?.SKU?.split(',')),
        },
      });
      router.push(path.href);
    }
  };

  const download = async () => {
    const res = await productApi.luteosProductSkuExportProduct({
      exportType: workflowData.value?.todoInfo?.exportType,
      codeList: workflowData.value?.todoInfo?.todoContent?.SKU?.split(','),
    });
    const isConfirmed = await swal.confirm({
      icon: 'success',
      title: '生成模板文件成功，是否立即下载？',
      confirmButtonText: '去查看',
      cancelButtonText: '知道了',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-active-light',
      },
    });
    if (!isConfirmed) return;

    await nextTick();
    router.push({
      path: '/downloadmanage',
      query: {
        app_code: res?.appCode,
        module_code: res?.moduleCode,
        record_type: 2,
      },
    });
  };
</script>
