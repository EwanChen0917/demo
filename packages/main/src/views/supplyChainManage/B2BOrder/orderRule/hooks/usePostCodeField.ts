/**
 * 邮编字段处理 Hook
 * 用于处理邮编字段的提交和回显
 * 
 * 使用示例：
 * const { collectPostCodeRules, distributePostCodeRules } = usePostCodeField(conditionList, schema)
 */
export const usePostCodeField = (conditionList: any, schema: any) => {
  
  /**
   * 收集邮编字段数据（提交时使用）
   * 自动过滤空数组
   * 
   * @returns 邮编规则数组
   */
  const collectPostCodeRules = (): any[] => {
    const rules = []
    
    // 前缀邮编
    if (conditionList.receivePostalCode_prefix?.rightSides?.length > 0) {
      rules.push(conditionList.receivePostalCode_prefix)
    }
    
    // 指定邮编
    if (conditionList.receivePostalCode_specify?.rightSides?.length > 0) {
      rules.push(conditionList.receivePostalCode_specify)
    }
    
    // 排除邮编
    if (conditionList.receivePostalCode_exclude?.rightSides?.length > 0) {
      rules.push(conditionList.receivePostalCode_exclude)
    }
    
    return rules
  }
  
  /**
   * 分发邮编回显数据（回显时使用）
   * 处理不完整返回（后端可能只返回部分规则）
   * 
   * @param allRules - 所有后端规则
   * @returns 不包含邮编的其他规则
   */
  const distributePostCodeRules = (allRules: any[]): any[] => {
    const otherRules: any[] = []
    let hasPostCodeRule = false
    
    allRules.forEach(rule => {
      const name = rule.leftSide?.name
      
      // 识别邮编规则并分发到对应字段
      if (name === '收货邮编' && rule.operator === 'and') {
        conditionList.receivePostalCode_prefix = rule
        hasPostCodeRule = true
      } else if (name === '指定邮编') {
        conditionList.receivePostalCode_specify = rule
        hasPostCodeRule = true
      } else if (name === '排除邮编') {
        conditionList.receivePostalCode_exclude = rule
        hasPostCodeRule = true
      } else {
        // 不是邮编规则，保留到其他规则中
        otherRules.push(rule)
      }
    })
    
    // 如果有邮编规则，显示邮编字段
    if (hasPostCodeRule) {
      const storageGroup = schema.find((g: any) => g.key === 'storage')
      const postCodeModel = storageGroup?.model.find((m: any) => m.key === 'receivePostalCode')
      if (postCodeModel) {
        postCodeModel.show = true
      }
    }
    
    return otherRules
  }
  
  return {
    collectPostCodeRules,
    distributePostCodeRules
  }
}

