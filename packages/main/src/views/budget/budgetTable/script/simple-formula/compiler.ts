import { tokenize } from 'excel-formula-tokenizer';
import { buildTree } from 'excel-formula-ast';
import { isLocalhost } from '@/views/budget/budgetTable/script/variable';
import { visitBuild } from './visit';

const isDev = isLocalhost && false;

/*
 * 公式编译器：将 Excel 公式转换为 js 函数，并将公式结果保存在 列信息 中
 * @param columns 表格列信息
 * @param formulaMap 列依赖映射
 * @param formulaProp 公式属性名称
 */
export const compilerFormula = (columns, formulaMap, formulaProp, isValue, formulaFieldConfig) => {
  // tag -> col
  const colTagFieldMap = {};
  // field -> col
  const colFieldNameMap = {};
  // tag -> enumId
  const colTagEnumMap = {};
  columns.forEach((col) => {
    colTagFieldMap[col.cellTag] = col;
    colFieldNameMap[col.cellFieldName] = col;
    colTagEnumMap[col.cellTag] = col.cellDropDownEnum;
  });

  // 公式字符串的转换
  columns.forEach((col) => {
    // 公式字符串
    const formula = col[formulaProp];
    try {
      if (!formula) {
        return;
      }
      if (typeof formula !== 'string') {
        return;
      }
      if (!formula.startsWith('=')) {
        return;
      }
      // 异步公式：需要调接口查询
      // 格式为： ={{{ queryName ? paramKey1 = paramValue1 & paramKey2 = paramValue1 #  colKey1 = result1 & colKey2 = result2 }}}
      // 其中：
      //    queryName 是接口名称，调用时需要 挂在到 this 上
      //    paramKey 是接口的参数名称
      //    paramValue 是：列名称或者列标签，例如 row.fieldName  row['fieldName']  A[]   B[]
      //    colKey 是列标签或者列名称， 例如 row.fieldName  A[]   B[]
      //    result 是接口返回对象，支持js表达式，例如：result.fieldNameA      result.fieldNameA * 10
      if (formula.startsWith('={{{') && formula.endsWith('}}}')) {
        const formulaText = formula.substring(4, formula.length - 3);

        const [queryName, other] = formulaText.split('?');
        let [queryParamList, queryResultList] = (other && other.split('#')) || [];
        queryParamList =
          (queryParamList &&
            queryParamList.split('&').map((x) => {
              const [key, value] = x.split('=');
              return {
                key,
                value,
              };
            })) ||
          [];
        // 将 XXX[] 转为 row.field
        queryParamList.forEach((x) => {
          if (x.value.includes('[]')) {
            const tag = x.value.split('[]')[0].toUpperCase();
            const field = colTagFieldMap[tag].cellFieldName;
            x.value = '';
            x.colField = field;
          } else if (x.value.startsWith('row.')) {
            x.colField = x.value.replace('row.', '');
            x.value = '';
          } else {
            const m =
              x.value.match(/row\['(?<key>.*)'\]/)?.groups?.key ||
              x.value.match(/row\["(?<key>.*)"\]/)?.groups?.key;
            // console.log('m=', x.value, m);
            if (m) {
              x.colField = m;
              x.value = '';
            } else {
              let { value } = x;
              if (typeof value === 'string') {
                // 移除前后的 ' " `
                value = value.replace(/^['"`]/, '').replace(/['"`]$/, '');
              }
              x.colField = null;
              x.value = value;
            }
          }
        });

        queryResultList =
          (queryResultList && queryResultList.split('&').map((x) => x.split('='))) || [];
        // 将 XXX[] 转为 field
        queryResultList.forEach((x) => {
          if (x[0].includes('[]')) {
            const tag = x[0].split('[]')[0].toUpperCase();
            const field = colTagFieldMap[tag].cellFieldName;
            x[0] = field || '_';
          } else {
            x[0] = x[0].replace('row.', '');
          }
        });

        const deps = queryParamList.filter((x) => x.colField).map((x) => x.colField);

        col[`${formulaProp}_deps`] = deps;

        const functionMap = {};
        col[`${formulaProp}_func`] = function (row, ...args) {
          if (args.length) {
            const isHaveEmpty = args.some(
              (x) => x === undefined || x === null || x === '' || Number.isNaN(x)
            );
            if (isHaveEmpty) {
              return;
            }
          }
          const params = {};
          const argsMap = {};
          args.forEach((x, index) => {
            argsMap[deps[index]] = x;
          });
          queryParamList.forEach(({ key, colField, value }) => {
            params[key] = value;
            if (colField) {
              params[key] = argsMap[colField];
            }
          });
          // console.log('queryName=', queryName, row, col, params);
          this.syncQueryApi(queryName, row, col, params).then((result) => {
            // console.log('api result=', queryName,row,col, paramsObj, result);
            let list;
            if (!result) {
              list = queryResultList.map((x) => {
                const key = x[0];
                return { row, key, value: '' };
              });
            } else {
              // const cells = [];
              list = queryResultList.map((x) => {
                const key = x[0];
                const funcStr = x[1];
                const funSignature = `${funcStr}(result)`;
                let fun = functionMap[funSignature];
                if (!fun) {
                  fun = new Function('result', `return (${funcStr})`);
                  functionMap[funSignature] = fun;
                }
                const value = fun(result);
                if (
                  value === undefined ||
                  value === null ||
                  (typeof value !== 'number' &&
                    typeof value !== 'string' &&
                    typeof value !== 'boolean')
                ) {
                  return { row, key, value: '' };
                }
                return {
                  row,
                  key,
                  value,
                };
              });
            }
            this.syncQueryApiCallback?.(list, queryName, row, col, params, queryResultList);
          });
        };
      } else {
        let formulaText = formula.slice(1);
        const originalFormula = formulaText;

        const jsCodeMap = {};
        let jsCodeId = 1;
        // 将 {{}} 替换为 js_id
        formulaText = formulaText.replace(/\{\{(.*?)}}/g, (match, code) => {
          const id = jsCodeId++;

          // 将 XXX[] 替换为 {XXX}
          code = code.replace(/([a-zA-Z]+)\[\]/g, (_, tag) => {
            return `#${tag.toUpperCase()}#`;
          });

          // 考虑到读取属性可能会报错：因此将 以下代码 都改为 ?. 的访问方式
          // value[key] 和
          // value.key 和
          // #.key
          // #[]
          // ][key]
          // ].key
          code = code
            .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\[/g, (_, name) => `${name}?.[`)
            .replace(
              /([a-zA-Z_$][a-zA-Z0-9_$]*)\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
              (_, name, key) => `${name}?.${key}`
            )
            .replace(/#\./g, () => `#?.`)
            .replace(/#\[/g, () => `#?.[`)
            .replace(/]\[/g, () => `]?.[`)
            .replace(/]\./g, () => `]?.`);

          // 特殊语法转换
          // 将 #A#?.prop 或者 #A#?.[prop] 中的 #A# 转换为 enums[enumId][#A#]
          code = code.replace(/#([A-Z]+)#\?\./g, (_, tag) => {
            return `enums[\`__enum_of_${tag}__\`]?.[#${tag}#]?.`;
            // ${colTagEnumMap[tag]}
          });

          jsCodeMap[id] = code;

          return `js_${id}`;
        });

        // 公式中不能包含 \t \n \r。
        formulaText = formulaText.replace(/\t|\n|\r/g, '');

        const tokens = tokenize(formulaText);
        const tree = buildTree(tokens);
        let str = visitBuild(tree);

        if (typeof str === 'number') {
          str = str.toString();
        }

        let newFormulaText = str.replace(/#js_(\d+)#/g, (_, id) => {
          return `( ${jsCodeMap[id]} )`;
        });

        const depCells = new Set();
        // 匹配 所有的 #XXX# ，并搜集到 depCells 中
        newFormulaText = newFormulaText.replace(/#([A-Z]+)#/g, (_, tag) => {
          depCells.add(tag);
          return `_${tag}`;
        });

        // 替换全局变量 'BaseInfo', 'enums', 'userInfo' 为 this.BaseInfo, this.enums, this.userInfo
        newFormulaText = newFormulaText.replace(/BaseInfo|enums|userInfo/g, (match) => {
          return `this.${match}`;
        });

        // 替换原始字符串 __enum_of_${tag}__  替换为 ${colTagEnumMap[tag]}
        newFormulaText = newFormulaText.replace(/__enum_of_([A-Za-z]+)__/g, (_, tag) => {
          return colTagEnumMap[tag];
        });

        // console.log("newFormulaText=", newFormulaText)
        try {
          col[`${formulaProp}_formulaText`] = newFormulaText;
          col[`${formulaProp}_tags`] = Array.from(depCells);
          col[`${formulaProp}_deps`] = col[`${formulaProp}_tags`].map((tag) => {
            return colTagFieldMap[tag].cellFieldName;
          });
          const argsNames = [...col[`${formulaProp}_tags`].map((x) => `_${x}`)];
          const funBody = isDev
            ? `
                    let result = ${newFormulaText};
                    console.log("formula", \`${newFormulaText.replace(/`/g, '^')}\`);
                    ${argsNames.map((x) => `console.log('${x}=',${x})`).join(';\n')}
                    console.log('result  ${col.cellTag}=',result)
                    return result;
                `
            : `return (${newFormulaText});`;

          // console.log('funBody=', funBody);

          col[`${formulaProp}_func`] = new Function(
            'row',
            ...formulaFieldConfig.extendArgsNames,
            ...argsNames,
            funBody
          );
        } catch (e) {
          // throw new Error(`公式错误：${originalFormula}`);
          console.error(`公式错误：${originalFormula}`, newFormulaText, col, formulaProp, e);
        }
      }

      if (col[`${formulaProp}_deps`]?.length) {
        col[`${formulaProp}_depColumns`] = col[`${formulaProp}_deps`].map((field) => {
          return colFieldNameMap[field];
        });
        col[`${formulaProp}_deps`].forEach((field) => {
          if (!col[`${formulaProp}_level`]) {
            col[`${formulaProp}_level`] = 1;
          }

          const parentColumn = colFieldNameMap[field];

          if (parentColumn) {
            parentColumn[`${formulaProp}_level`] = Math.max(
              parentColumn[`${formulaProp}_level`] || 1,
              col[`${formulaProp}_level`] + 1
            );
            parentColumn[`${formulaProp}_children`] = parentColumn[`${formulaProp}_children`] || [];
            if (!parentColumn[`${formulaProp}_children`].includes(col)) {
              parentColumn[`${formulaProp}_children`].push(col);
            }
          }
        });
      }
    } catch (e) {
      console.error(`公式错误`, formula, col, formulaProp, e);
    }
  });
  if (isValue) {
    // 自顶向下的依赖传播
    const setDeps = (columns, parentDeps) => {
      columns.forEach((col) => {
        const deps = col[`${formulaProp}_deps`];
        if (!deps?.length) {
          return;
        }
        if (!col[`${formulaProp}_allDeps`]) {
          col[`${formulaProp}_allDeps`] = [...deps];
        }
        col[`${formulaProp}_allDeps`].push(...parentDeps);

        const children = col[`${formulaProp}_children`];
        if (col[`${formulaProp}_allDeps`]?.length && children?.length) {
          setDeps(children, [...new Set([...col[`${formulaProp}_allDeps`], col.cellFieldName])]);
        }
      });
    };
    setDeps(columns, []);
  } else {
    // 收集 value 依赖
    const valueDepsMap = {};
    columns.forEach((col) => {
      valueDepsMap[col.cellFieldName] = col.cellFieldFormula_allDeps;
    });
    columns.forEach((col) => {
      const deps = col[`${formulaProp}_deps`] || [];
      if (!deps?.length) {
        return;
      }
      col[`${formulaProp}_allDeps`] = [
        ...deps.map((x) => valueDepsMap[x]).flat(Infinity),
        ...deps,
      ].filter((x) => x);
    });
  }

  columns.forEach((col) => {
    col[`${formulaProp}_allDeps`] = [...new Set(col[`${formulaProp}_allDeps`])];
    col[`${formulaProp}_allTags`] = col[`${formulaProp}_allDeps`].map((x) => {
      return colFieldNameMap[x].cellTag;
    });
    col[`${formulaProp}_allDepsColumns`] = col[`${formulaProp}_allDeps`].map((field) => {
      return colFieldNameMap[field];
    });
    col[`${formulaProp}_allDeps`].forEach((field) => {
      if (!formulaMap[field]) {
        formulaMap[field] = [];
      }
      formulaMap[field].push(col);
    });
  });

  const setLevels = (col) => {
    if (!col?.[`${formulaProp}_allDeps`]) {
      return;
    }
    if (!col[`${formulaProp}_level`]) {
      col[`${formulaProp}_level`] = 1;
    }
    col[`${formulaProp}_allDeps`].forEach((field) => {
      const parentColumn = colFieldNameMap[field];
      if (parentColumn) {
        parentColumn[`${formulaProp}_level`] = Math.max(
          parentColumn[`${formulaProp}_level`] || 0,
          col[`${formulaProp}_level`] + 1
        );
        setLevels(parentColumn);
      }
    });
  };

  columns.forEach((col) => {
    setLevels(col);
  });

  // 根据 simpleDepTreeLevel 调整 formulaMap 的计算顺序
  for (const key in formulaMap) {
    let cols = formulaMap[key];
    cols = [...new Set(cols)];
    // 从大到小排序
    cols.sort((a, b) => {
      return b[`${formulaProp}_level`] - a[`${formulaProp}_level`];
    });
    formulaMap[key] = cols;
  }
};
