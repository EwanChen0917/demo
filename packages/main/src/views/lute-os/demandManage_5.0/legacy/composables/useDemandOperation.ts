import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';

export function useDemandOperation() {
  const loading = ref(false);

  const buildPayloadByType = (type: string, formData: Record<string, any>) => {
    const base = {
      demandCode: formData.demandCode,
      operateType: type,
    };
    switch (type) {
      case 'add_comment':
        return { ...base, comment: formData.comment };

      case 'feedback':
        return {
          ...base,
          implementFlag: formData.implementFlag,
          implementRemark: formData.implementRemark,
        };

      case 'score':
        return {
          ...base,
          score: formData.score,
          scoreReason: formData.scoreReason,
        };

      case 'save_and_approved':
      case 'resubmit':
        return {
          ...base,
          remark: formData.remark,
          demandSaveReq: {
            demandTitle: formData.demandTitle,
            demandDesc: formData.demandDesc,
            demandType: formData.demandType,
            productLine: formData.productLine,
            categoryCode: formData.categoryCode,
            demandProperty: formData.demandProperty,
            expectFinishTime: formData.expectFinishTime,
            sampleDeliveryTime: formData.sampleDeliveryTime,
            productLevel: formData.productLevel,
            relMemberCodeList: formData.relMemberCodeList,
            skuCode: formData.skuCode,
            demandBackground: formData.demandBackground,
            demandFile:
              formData.demandFile && formData.demandFile.length > 0
                ? {
                    fileCode: formData.demandFile[0].fileCode ?? '',
                    fileKey: formData.demandFile[0].ossKey,
                    fileName: formData.demandFile[0].name.replace(/\.[^/.]+$/, ''),
                    extType: formData.demandFile[0].name.split('.').pop() || '',
                    fileSize: formData.demandFile[0].size || 0,
                  }
                : null,
            demandModule: 'user_research',
          },
        };

      case 'approved':
      case 'rejected':
        return {
          ...base,
          approveInfo: {
            operatorList: formData.operatorList,
            planFinishDate: formData.planFinishDate,
            planStartDate: formData.planStartDate,
            remark: formData.reason,
          },
        };

      case 'inner_approved':
      case 'inner_rejected':
        return {
          ...base,
          innerApproveRemark: formData.innerApproveRemark,
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
      // ElMessage.success('操作成功');
      return res;
    } catch (error) {
      console.error('操作失败', error);
      // ElMessage.error('操作失败');
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
