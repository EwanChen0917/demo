import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';

export function useDemandOperation() {
  const loading = ref(false);

  const buildPayloadByType = (type: string, formData: Record<string, any>) => {
    const base = {
      demandCode: formData.demandCode,
      demandModule: 'brand_research', // 保持为 'brand_research'
      operateType: type,
    };
    switch (type) {
      case 'add_comment':
        return { ...base, comment: formData.comment };

      case 'save_and_approved':
      case 'resubmit': { // 使用代码块确保变量作用域
        // 这些字段直接作为 demandSaveReq 的属性，与原 submitForm 的 payload 顶层结构对应
        const demandSaveReqPayload: Record<string, any> = {
          demandModule:'brand_research',
          demandTitle: formData.demandTitle,
          demandDesc: formData.demandDesc,
          expectFinishTime: formData.expectFinishTime,
          relMemberCodeList: formData.relMemberCodeList,
          demandBackground: formData.demandBackground,
          demandProperty: formData.demandProperty, // 新增：来自原 submitForm 的顶层 payload
          productName: formData.productName,     // 新增：来自原 submitForm 的顶层 payload
          // demandFileList 的映射逻辑与原 submitForm 保持一致
          demandFileList: formData.demandFile.map((item) => ({
            fileCode: item.fileCode,
            fileKey: item.ossKey,
            fileName: item.name,
            extType: item.name.split('.').pop() || '',
            fileSize: item.size || 0,
          })),
        };

        const brandReq: Record<string, any> = {
          // brandReq 中媒体和专家场景共有的字段
          resourceType: formData.resourceType,
          estimatedBudget: formData.estimatedBudget,
          demandContent: formData.demandContent, // 根据原 submitForm 逻辑，此字段应在 brandReq 中

          // intentionResource 是字符串，需要根据原 submitForm 逻辑拆分为数组
          intentionResource: typeof formData.intentionResource === 'string' && formData.intentionResource
            ? formData.intentionResource.split('; ')
            : [],
          
          // 列表字段的映射：将数组中的对象映射为特定值的数组
          demandTypeList: Array.isArray(formData.demandTypeList)
            ? formData.demandTypeList.map((item) => item.demandType)
            : [],
          cooperationTypeList: Array.isArray(formData.cooperationTypeList)
            ? formData.cooperationTypeList.map((item) => item.cooperationType)
            : [],
          
          // 日期范围字段的处理：拆分为 Start 和 End
          productOnlineTimeStart: formData.productOnlineTime?.[0] ?? '',
          productOnlineTimeEnd: formData.productOnlineTime?.[1] ?? '',
          sampleDeliveryTimeStart: formData.sampleDeliveryTime?.[0] ?? '',
          sampleDeliveryTimeEnd: formData.sampleDeliveryTime?.[1] ?? '',

          categoryCode: formData.categoryCode, // 此字段在两个场景的 brandReq 中都存在
          // productNameList：假设 API 在这里直接接受产品代码或名称列表
          productNameList: Array.isArray(formData.productNameList) ? formData.productNameList : [], 
          
        };

        // 根据 resourceType (场景) 有条件地添加字段
        if (formData.resourceType === 'media_resource') {
          Object.assign(brandReq, {
            brandCodeList: formData.brandCodeList ?? undefined, // 媒体场景，通常是品牌代码数组
            countryCode: formData.countryCode,
            mediaCategoryList: formData.mediaCategoryList,
          });
        } else if (formData.resourceType === 'expert_resource') {
          Object.assign(brandReq, {
            // 专家场景特有的字段，来源于原 submitForm 中的 expert_req
            demandContact: formData.demandContact,
            mainProductLink: formData.mainProductLink,
            countryCode: formData.countryCode, // 专家场景中，国家代码在 brandReq 内
            expectedCooperationStartDate: formData.expectedCooperationDate?.[0] ?? '',
            expectedCooperationEndDate: formData.expectedCooperationDate?.[1] ?? '',
            cooperationPeriodStartDate: formData.cooperationPeriodDate?.[0] ?? '',
            cooperationPeriodEndDate: formData.cooperationPeriodDate?.[1] ?? '',
            cooperationType: formData.cooperationType, // 专家场景特有的合作类型
            expertTypeList: formData.expertTypeList, // 专家类型列表
            cooperationDesc: formData.cooperationDesc,
            // 专家场景下，brandCodeList 无论是否已是数组，都需被封装成数组
            brandCodeList: Array.isArray(formData.brandCodeList) ? formData.brandCodeList : [formData.brandCodeList],
            contactDeptId: formData.contactDeptId,
            contactDeptName: formData.contactDeptName,
          });
        }

        // 将构建好的 brandReq 赋值给 demandSaveReqPayload
        demandSaveReqPayload.brandReq = brandReq;

        return {
          ...base,
          remark: formData.remark,
          demandSaveReq: demandSaveReqPayload,
        };
      }
      case 'approved':
      case 'rejected':
        return {
          ...base,
          approveInfo: {
            operator: formData.operator,
            planFinishDate: formData.planFinishDate,
            planStartDate: formData.planStartDate,
            remark: formData.reason,
          },
        };
      
      default:
        return base;
    }
  };

  const submitOperation = async (type: string, formData: Record<string, any>) => {
    const payload = buildPayloadByType(type, formData);
    console.log('[操作提交] payload:', JSON.stringify(payload, null, 2));
    try {
      loading.value = true;
      const res = await platformApi.platformDemandOperate(payload);
      // ElMessage.success('操作成功'); // 保持原 hook 中的注释状态
      return res;
    } catch (error) {
      console.error('操作失败', error);
      // ElMessage.error('操作失败'); // 保持原 hook 中的注释状态
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    submitOperation,
    buildPayloadByType,
  };
}