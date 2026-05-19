import { h } from 'vue';
import { ElTable } from 'element-plus';
import EmptyAnimation from '@/components/EmptyAnimation/index.vue';

export default {
  install(app) {
    // 获取原始 el-table 组件定义
    const originalSetup = ElTable?.setup;
    // 重写 setup 方法，注入默认 empty 插槽
    ElTable.setup = (props, context) => {
      // 如果用户没有提供 #empty 插槽，则注入默认内容
      if (!context.slots.empty) {
        context.slots.empty = () => [
          h(
            'div',
            {
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              },
            },
            [
              h(EmptyAnimation, {
                name: 'listEmpty',
                width: 128,
                height: 128,
              }),
              h(
                'div',
                { style: { height: '28px', lineHeight: '28px', fontSize: '12px' } },
                '暂未搜到相关数据'
              ),
            ]
          ),
        ];
      }

      // 调用原始 setup
      return originalSetup ? originalSetup(props, context) : undefined;
    };

    // 替换全局组件（这样所有使用 el-table 的地方都会应用新的行为）
    app.component('ElTable', ElTable);
  },
};
