import { reconciliationApi } from '@/api';
import { computed, reactive } from 'vue';

export const useSourceSystemTypes = ({
  formReactive,
  sourceCodeProp,
  sourceTypeProp,
  targetCodeProp,
  targetTypeProp,
}) => {
  const configMap = ref([]);

  const sourceTypeOptions = computed(() => {
    const selectedItems = Array.isArray(formReactive[sourceCodeProp])
      ? formReactive[sourceCodeProp]
      : [formReactive[sourceCodeProp]];
    let sourceType = configMap.value.filter((item) => selectedItems.includes(item.key));
    return {
      current: sourceType,
      children: sourceType
        .map((x) => {
          return x.children;
        })
        .flat(2),
      options: sourceType
        .map((x) => {
          return x.children.map((x) => {
            return {
              label: x.value,
              value: x.key,
            };
          });
        })
        .flat(2),
    };
  });
  const targetCodeOptions = computed(() => {
    const selectedItems = Array.isArray(formReactive[sourceTypeProp])
      ? formReactive[sourceTypeProp]
      : [formReactive[sourceTypeProp]];
    const sourceCode = sourceTypeOptions.value.children.filter((item) =>
      selectedItems.includes(item.key)
    );
    return {
      current: sourceCode,
      children: sourceCode
        .map((x) => {
          return x.children;
        })
        .flat(2),
      options: sourceCode
        .map((x) => {
          return x.children.map((x) => {
            return {
              label: x.value,
              value: x.key,
            };
          });
        })
        .flat(2),
    };
  });
  const targetTypeOptions = computed(() => {
    const selectedItems = Array.isArray(formReactive[targetCodeProp])
      ? formReactive[targetCodeProp]
      : [formReactive[targetCodeProp]];
    const targetType = targetCodeOptions.value.children.filter((item) =>
      selectedItems.includes(item.key)
    );
    return {
      current: targetType,
      children: targetType
        .map((x) => {
          return x.children || [];
        })
        .flat(2),
      options: targetType
        .map((x) => {
          return x.children.map((x) => {
            return {
              label: x.value,
              value: x.key,
            };
          });
        })
        .flat(2),
    };
  });

  const handleSourceCodeChange = (isMultiple = true) => {
    if (isMultiple) {
      formReactive[sourceTypeProp] = [];
      formReactive[targetTypeProp] = [];
      formReactive[targetCodeProp] = [];
    } else {
      formReactive[sourceTypeProp] = '';
      formReactive[targetTypeProp] = '';
      formReactive[targetCodeProp] = '';
    }
  };
  const handleSourceTypeChange = (isMultiple = true) => {
    if (isMultiple) {
      formReactive[targetCodeProp] = [];
      formReactive[targetTypeProp] = [];
    } else {
      formReactive[targetCodeProp] = '';
      formReactive[targetTypeProp] = '';
    }
  };
  const handleTargetCodeChange = (isMultiple = true) => {
    if (isMultiple) {
      formReactive[targetTypeProp] = [];
    } else {
      formReactive[targetTypeProp] = '';
    }
  };
  const handleQueryConfig = async () => {
    const res = await reconciliationApi.reconciliationMonitorQueryCfgMap({
      supportPlatform: 'finance',
    });

    configMap.value = res?.sourceSystemList || [];
    // const { sourceSystemMap } = res || {};
    // const matchKeyValue = (str) => {
    //   const matchResult = /^DictBean\((value=(?<value>.+)\s*,\s*key=(?<key>[^,)]+))/.exec(str);
    //   if (!matchResult) {
    //     return {};
    //   }
    //   return {
    //     value: matchResult.groups.value,
    //     key: matchResult.groups.key,
    //   };
    // };
    //
    // for (const prop in sourceSystemMap) {
    //   const { value, key } = matchKeyValue(prop);
    //   if (!key || !value) {
    //     continue;
    //   }
    //
    //   console.log('cubs', sourceSystemMap[prop]);
    //   let sourceCodeConfig = {
    //     key,
    //     value,
    //     children: [],
    //   };
    //
    //   for (const item of sourceSystemMap[prop]) {
    //     let sourceTypeConfig = {
    //       key: item.key,
    //       value: item.value,
    //       children: [],
    //     };
    //
    //     for (let prop in item.dictBeanListMap || {}) {
    //       let { key, value } = matchKeyValue(prop);
    //
    //       let targetCodeConfig = {
    //         key,
    //         value,
    //         children: [],
    //       };
    //
    //       for (let subItem of item.dictBeanListMap[prop] || []) {
    //         let targetTypeConfig = {
    //           key: subItem.key,
    //           value: subItem.value,
    //         };
    //         targetCodeConfig.children.push(targetTypeConfig);
    //       }
    //
    //       sourceTypeConfig.children.push(targetCodeConfig);
    //     }
    //     sourceCodeConfig.children.push(sourceTypeConfig);
    //   }
    //   configMap.value.push(sourceCodeConfig);
    // }

    // console.log('result', configMap);
    // console.log('result', JSON.stringify(configMap, null, 2));
  };

  handleQueryConfig();

  return {
    sourceTypeOptions,
    targetCodeOptions,
    targetTypeOptions,
    handleSourceTypeChange,
    handleSourceCodeChange,
    handleTargetCodeChange,
  };
};