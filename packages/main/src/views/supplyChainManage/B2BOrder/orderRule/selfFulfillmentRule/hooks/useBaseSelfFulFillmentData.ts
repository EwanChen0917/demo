import { useTabs } from '@/hooks/tabs';
import { ElMessage } from 'element-plus';
import { cloneDeep } from 'lodash-es';

/**
 * 1. TagInput 转换函数
 * 用途：将 formModel 中的 { value, subOp }[] 转换为 TagInput 需要的 string[]
 * 使用场景：receiverProvince, receiverCity, receiverCode, orderMSKU 等
 */
export function tagInputRightSidesToArray(rightSides: any[]): string[] {
  if (!Array.isArray(rightSides)) return [];
  return rightSides
    .map((item) => {
      if (typeof item === 'string') return item;
      return item?.value || item;
    })
    .filter(Boolean);
}

/**
 * 将 TagInput 的 string[] 转换回 formModel 需要的 { value, subOp }[]
 */
export function arrayToTagInputRightSides(
  values: string[],
  originalRightSides?: any[]
): Array<{ value: string; subOp: string | null }> {
  if (!Array.isArray(values)) return [];

  return values.map((v, index) => {
    // 如果原数据存在，尝试保留 subOp
    const original = originalRightSides?.[index];
    return {
      value: String(v),
      subOp: original?.subOp || null,
    };
  });
}

/**
 * 3. Select 转换函数（如果需要数据清洗）
 * 用途：确保 el-select 使用的 { value, desc }[] 格式正确
 * 使用场景：orderPlatform, orderStore, orderCountry, receiverCountry 等
 */
export function normalizeSelectRightSides(
  rightSides: any[]
): Array<{ value: string; desc: string }> {
  if (!Array.isArray(rightSides)) return [];

  return rightSides
    .map((item) => {
      if (typeof item === 'string') {
        return { value: item, desc: item };
      }
      return {
        value: item?.value || '',
        desc: item?.desc || item?.value || '',
      };
    })
    .filter((item) => item.value);
}

/**
 * 将exist的单选格式转换为数组
 * @param rightSides
 * @returns
 */
export function existInRightSides(rightSides: any): Array<{ value: string; desc: string }> {
  console.log(`rightSides`, rightSides);
  if (typeof rightSides !== 'string') return [{ value: '0', desc: '否' }];
  return [
    {
      value: rightSides,
      desc: rightSides === '1' ? '是' : '否',
    },
  ];
}
/**
 * 将exist的rightSides转换为字符串
 * @param rightSides
 * @returns
 */
export function existReverse(rightSides: any[]): string {
  if (!Array.isArray(rightSides) || rightSides.length === 0) {
    return '0'; // 默认返回 '否'
  }
  // 取第一个元素的 value，确保返回字符串
  const firstItem = rightSides[0];
  if (firstItem?.value !== undefined) {
    return String(firstItem.value);
  }

  // 如果直接是字符串，直接返回
  if (typeof firstItem === 'string') {
    return firstItem;
  }

  // 兜底返回默认值
  return '0';
}
export const useBaseSelfFulFillmentdata = () => {
  /**
   * 记录了数据应该用何种数据处理的对象
   */
  const fieldConfigMap: Record<string, { key: string; name: string; type: string }> = {
    orderPlatform: { key: 'orderPlatform', name: '订单平台', type: undefined as any },
    orderStore: { key: 'orderStore', name: '订单店铺', type: undefined as any },
    receiverCountry: { key: 'receiverCountry', name: '收货国家/地区', type: undefined as any },
    receiverProvince: { key: 'receiverProvince', name: '收货省/州', type: 'double' },
    receiverCity: { key: 'receiverCity', name: '收货城市', type: 'double' },
    receiverCode: { key: 'receiverCode', name: '收货邮编', type: undefined as any },
    orderMSKU: { key: 'orderMSKU', name: '订单MSKU', type: 'double' },
    orderRiskMark: { key: 'orderRiskMark', name: '订单风险标识', type: undefined as any },
    CODOrder: { key: 'CODOrder', name: 'COD订单', type: undefined as any },
    blacklistFlag: { key: 'blacklistFlag', name: '订单是否存在黑名单', type: undefined as any },
    tagList: { key: 'tagList', name: '平台标签', type: 'double' },
    receiverPhone: { key: 'receiverPhone', name: '电话号/手机号', type: undefined as any },
  };
  /**
   * 通过 name 查找 key 的映射（用于回显）
   */
  const nameToKeyMap: Record<string, string> = Object.values(fieldConfigMap).reduce((acc, item) => {
    acc[item.name] = item.key;
    return acc;
  }, {} as Record<string, string>);
  /**
   * 记录了应该被塞入最终config数组里的配置项
   */
  const selfFulFillmentConfigList = [
    'orderPlatform',
    'orderStore',
    'receiverCountry',
    'receiverProvince',
    'receiverCity',
    'receiverCode',
    'orderMSKU',
    'orderRiskMark',
    'blacklistFlag',
    'CODOrder',
    'tagList',
    'receiverPhone',
  ];
  const customSave = (param: any, selectedFields?: Record<string, boolean>) => {
    if (!param) return;
    const params = cloneDeep(param);
    const shouldProcessField = (key: string) => {
      if (!selectedFields) return true; // 兼容旧逻辑
      return selectedFields[key] === true;
    };
    Object.keys(params).forEach((key) => {
      if (!shouldProcessField(key) && selfFulFillmentConfigList.includes(key)) {
        // 未选中的字段，从 params 中删除，避免被处理
        delete params[key];
        return;
      }
      const type = fieldConfigMap[key]?.type;
      if (!type) return;
      if (type === 'tag') {
        params[key].rightSides = normalizeSelectRightSides(params[key].rightSides);
      } else if (type === 'double') {
        const rs: any = params[key]?.rightSides;
        if (key === 'orderDeliveryTime') {
          params[key].rightSides = (Array.isArray(rs) ? rs : []).map((item: any, idx: number) => ({
            subOp: item?.subOp ?? (idx === 0 ? '>=' : '<='),
            value: String(item?.value ?? (idx === 0 ? item?.min : item?.max) ?? ''),
          }));
        } else {
          params[key].rightSides = arrayToTagInputRightSides(rs);
        }
      } else if (type === 'exist') {
        params[key].rightSides = existInRightSides(params[key].rightSides);
      }
    });
    unCustomOperator(params);
    params.conditions = [];
    console.log(`123params`,params)
    Object.keys(params).forEach((key) => {
      if (selfFulFillmentConfigList.includes(key) && shouldProcessField(key) && params[key]) {
        params.conditions.push(params[key]);
      }
    });
    // 处理 receiverCode 的平铺数据
    if (params['__receiverCodeExpanded']) {
      params.conditions.push(...params['__receiverCodeExpanded']);
      delete params['__receiverCodeExpanded'];
    }
    // 将 lableList 转换为 labelCode 数组（后端只接受 code 数组）
    if (params?.actionParams?.lableList && Array.isArray(params.actionParams.lableList)) {
      params.actionParams.lableList = params.actionParams.lableList
        .map((item: any) => {
          // 如果是对象，提取 labelCode；如果是字符串，直接使用
          return typeof item === 'string' ? item : item.labelCode;
        })
        .filter(Boolean); // 过滤掉空值
    } else {
      params.actionParams.lableList = [];
    }
    return params;
  };
  /**
   * 将接受到的数据转换成简单的数组格式，需要注意有些值需要区别对待
   * @param param
   */
  const customGetDetail = (param: any) => {
    // console.log(`param`,param)
    if (!param || !param.conditions) return;
    
    // 收集邮编相关的规则
    const postcodeRules: any[] = [];
    const otherConditions: any[] = [];
    param.conditions.forEach((item: any) => {
      const fieldName = item?.leftSide?.name;
      // 识别邮编相关的规则
      if (fieldName === '收货邮编' || fieldName === '指定邮编' || fieldName === '排除邮编') {
        postcodeRules.push(item);
      } else {
        otherConditions.push(item);
      }
    });
    // 组装 receiverCode
    if (postcodeRules.length > 0) {
      const emptyRule = postcodeRules.find((r: any) => 
        r.operator === 'exist' && r.rightSides?.[0]?.desc === '为空'
      );
      if (emptyRule) {
        param.receiverCode = emptyRule;
      } else {
        const prefixRule = postcodeRules.find((r: any) => {
          const name = r.leftSide?.name;
          return name === '收货邮编' && (r.operator === 'and' || r.operator === 'or');
        });
        const specifyRule = postcodeRules.find((r: any) => r.leftSide?.name === '指定邮编');
        const excludeRule = postcodeRules.find((r: any) => r.leftSide?.name === '排除邮编');
        
        param.receiverCode = {
          operator: 'notExist',
          leftSide: {
            name: '收货邮编',
            innerType: 'string',
            ref: 'receivePostalCode'
          },
          rightSides: [
            prefixRule || {
              leftSide: { name: '收货邮编', ref: 'receivePostalCode' },
              operator: 'and',
              subOp: 'prefix',
              rightSides: [{ value: '', subOp: 'headRegex' }, { value: '', subOp: 'regex' }]
            },
            specifyRule || {
              leftSide: { name: '指定邮编', innerType: 'string', ref: 'receivePostalCode' },
              operator: 'in',
              rightSides: [{ value: '' }]
            },
            excludeRule || {
              leftSide: { name: '排除邮编', innerType: 'string', ref: 'receivePostalCode' },
              operator: 'in',
              rightSides: [{ value: '' }]
            }
          ]
        };
      }
    }
    
    // 处理其他字段
    otherConditions.forEach((item: any) => {
      const fieldName = item?.leftSide?.name;
      const fieldPhone = item?.complexCondition?.type;
      if (!fieldName) {
        if (!fieldPhone) return;
        param.receiverPhone = item;
        return;
      }
      const fieldKey = nameToKeyMap[fieldName];
      if (!fieldKey) return;
      // item.rightSides = tagInputRightSidesToArray(item.rightSides)
      const type = fieldConfigMap[fieldKey]?.type;
      if (type === 'tag') {
        item.rightSides = tagInputRightSidesToArray(item.rightSides);
      } else if (type === 'double' && fieldKey !== 'orderDeliveryTime') {
        item.rightSides = tagInputRightSidesToArray(item.rightSides);
      } else if (type === 'exist') {
        item.rightSides = existReverse(item.rightSides);
      }
      param[fieldKey] = item;
      console.log(`param`, param[fieldKey]);
    });
    //一些不规则的数据在最后进行处理
    reverseUncustomOperator(param);
    param.conditions.length = 0;

    return param;
  };
  const unCustomOperator = (params: any) => {
    Object.keys(params).forEach((key) => {
      if (key === 'orderRiskMark') {
        params[key].rightSides = params[key].rightSides.map((item) => {
          return {
            desc: 'shopify',
            value: item,
          };
        });
      }
      if (key === 'receiverPhone') {
        params[key] = {
          complexCondition: {
            desc: '手机号/电话号 其中一项不为空',
            type: params[key].rightSides,
            exp: '%s || %s',
            conditions: [
              {
                operator: 'exist',
                leftSide: {
                  name: '电话号',
                  innerType: '',
                  ref: 'receivePhone',
                },
                rightSides: [
                  {
                    value: params[key].rightSides === '0' ? '0' : '1',
                    desc: params[key].rightSides === '0' ? '否' : '是',
                  },
                ],
              },
              {
                operator: 'exist',
                leftSide: {
                  name: '手机号',
                  innerType: '',
                  ref: 'receiveMobile',
                },
                rightSides: [
                  {
                    value: params[key].rightSides === '0' ? '0' : '1',
                    desc: params[key].rightSides === '0' ? '否' : '是',
                  },
                ],
              },
            ],
          },
        };
      }
      if (key === 'receiverCode') {
        const data = params[key];
        
        // 检查数据是否存在
        if (!data) return;
        
        // 如果是 exist（为空），保持原样
        if (data.operator === 'exist') {
          params[key] = {
            operator: 'exist',
            leftSide: data.leftSide,
            rightSides: [{ value: '0', desc: '为空' }]
          };
        } 
        // 如果是 notExist（不为空），平铺三个对象
        else {
          // 检查 rightSides 是否为数组
          if (!Array.isArray(data.rightSides)) {
            console.warn('receiverCode.rightSides is not an array:', data.rightSides);
            return;
          }
          
          // 过滤掉空数据
          const validRules = data.rightSides.filter((item: any) => {
            if (!item.rightSides || !Array.isArray(item.rightSides)) return false;
            return item.rightSides.some((rs: any) => rs.value);
          });
          
          // 存储平铺后的数据到特殊字段
          params['__receiverCodeExpanded'] = validRules;
          // 删除原字段，避免被 push 到 conditions
          delete params[key];
        }
      }
    });
  };
  const reverseUncustomOperator = (params: any) => {
    Object.keys(params).forEach((key) => {
      if (key === 'orderRiskMark') {
        params[key].rightSides = params[key].rightSides.map((item) => {
          return item.value;
        });
      }
      if (key === 'receiverPhone') {
        params[key] = {
          operator: 'in',
          leftSide: {
            name: '电话号/手机号',
            innerType: 'string',
            ref: 'forder.phone',
          },
          rightSides: params[key]?.complexCondition?.type,
        };
      }
    });
  };
  return {
    customSave,
    customGetDetail,
  };
};
