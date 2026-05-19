import { cloneDeep } from 'lodash-es';
import { configList, BaseModel } from '..';
import { getTransFormer } from './register';
// 序列化数据
export const SerializaData = (data: configList[], model: any) => {
  if (!data || !data.length || !model) return;
  const params = cloneDeep(model);
  const allModels = data.flatMap((item) => item.model || []).filter((item) => item.show);
  if (!allModels.length) return;
  const result: BaseModel[] = [];
  allModels.forEach((item) => {
    if (!item.serializeType || !item.key) return;
    const transformer = getTransFormer(item.serializeType);
    const baseObj = params[item.key];
    // 检查 baseObj 是否存在
    if (!baseObj) {
      console.warn(`baseObj not found for key: ${item.key}`);
      return;
    }
    // 邮编类型特殊处理
    if ((item.serializeType as string) === 'postcode') {
      // 如果是 exist（为空），返回一个对象
      if (baseObj.operator === 'exist') {
        result.push({
          operator: 'exist',
          leftSide: baseObj.leftSide,
          rightSides: [{ value: '0', desc: '为空' }],
        });
      }
      // 如果是 notExist（不为空），解构 rightSides 里的三个对象
      else if (baseObj.operator === 'notExist') {
        const rs = transformer.toSubmit(baseObj.rightSides);
        if (Array.isArray(rs) && rs.length > 0) {
          result.push(...rs);
        }
      }
    } else {
      const rs = transformer.toSubmit(baseObj.rightSides);
      if (!rs) return;
      baseObj.rightSides = rs;
      result.push(baseObj);
    }
  });

  return result;
};
// 反向序列化数据
export const DeserializeData = (data: BaseModel[], config) => {
  const result = {};
  const allModels = config.flatMap((item) => item.model || []);

  // 用于收集邮编相关的多个规则
  const postcodeRules: BaseModel[] = [];

  data.forEach((item: BaseModel) => {
    const fieldName = item.leftSide?.name;
    if (!fieldName) return;
    // 特殊处理：邮编字段可能有多个规则，需要合并（包括"收货邮编"、"指定邮编"、"排除邮编"）
    if (fieldName === '收货邮编' || fieldName === '指定邮编' || fieldName === '排除邮编') {
      postcodeRules.push(item);
      return;
    }
    const model = allModels.find((item: any) => item.label === fieldName);
    if (!model) return;
    model.show = true;
    const fieldKey = model.key;
    const type = model.serializeType;
    if (!fieldKey || !type) return;
    result[fieldKey] = item;
    const transformer = getTransFormer(type);
    const rs = transformer.toView(item.rightSides);
    result[fieldKey].rightSides = rs;
    result[fieldKey].operator = item.operator;
  });

  // 处理邮编规则
  if (postcodeRules.length > 0) {
    const postcodeModel = allModels.find((item: any) => item.serializeType === 'postcode');
    if (postcodeModel) {
      postcodeModel.show = true;
      const fieldKey = postcodeModel.key;

      // 检查是否为空
      const emptyRule = postcodeRules.find(
        (r) => r.operator === 'exist' && r.rightSides?.[0]?.desc === '为空'
      );
      if (emptyRule) {
        result[fieldKey] = emptyRule;
      } else {
        // 合并多个邮编规则到统一结构
        const prefixRule = postcodeRules.find((r) => {
          const name = r.leftSide?.name;
          return name === '收货邮编' && (r.operator === 'and' || r.operator === 'or');
        });
        const specifyRule = postcodeRules.find((r) => r.leftSide?.name === '指定邮编');
        const excludeRule = postcodeRules.find((r) => r.leftSide?.name === '排除邮编');

        result[fieldKey] = {
          operator: 'notExist',
          leftSide: {
            name: '收货邮编',
            innerType: 'string',
            ref: 'order.receivePostalCode',
          },
          rightSides: [
            prefixRule || {
              leftSide: { name: '收货邮编', ref: 'order.receivePostalCode' },
              operator: 'and',
              subOp: 'prefix',
              rightSides: [
                { value: '', subOp: 'headRegex' },
                { value: '', subOp: 'regex' },
              ],
            },
            specifyRule || {
              leftSide: { name: '指定邮编', innerType: 'string', ref: 'order.receivePostalCode' },
              operator: 'in',
              rightSides: [{ value: '' }],
            },
            excludeRule || {
              leftSide: { name: '排除邮编', innerType: 'string', ref: 'order.receivePostalCode' },
              operator: '!in',
              rightSides: [{ value: '' }],
            },
          ],
        };
      }
    }
  }

  return {
    result,
    allModels,
  };
};
