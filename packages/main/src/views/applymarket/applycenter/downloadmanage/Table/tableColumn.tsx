import { ElTag } from 'element-plus'
const getStatusDesc = (val: any) => {
  const status_map = {
    0: '失败',
    1: '处理中',
    2: '成功',
  };

  return status_map[val] || '--';
};

const getStatusColor = (val: any) => {
  const status_map = {
    0: 'danger',
    1: 'normal',
    2: 'success',
  };

  return status_map[val] || '--';
};

export const columns = [
  {
    prop: 'fileName',
    label: '文件信息',
    align: 'left',
    headerAlign: 'left',
    render: ({ row }) => {
      const queryParam = row.queryParam ? JSON.parse(row.queryParam) : {};
      const keys = Object.keys(queryParam);
      return (
        <div>
          <div>{row.fileName || '--'}</div>
          <div>
            {keys &&
              keys.map((key) => {
                return <div>&nbsp;&nbsp;&nbsp;&nbsp;{`${key}：${queryParam[key] || '--'}`}</div>;
              })}
          </div>
        </div>
      );
    },
  },
  {
    prop: 'unitPrice',
    label: '状态',
    align: 'left',
    headerAlign: 'left',
    render: ({ row }) => {
      return (
        <ElTag effect="dark" type={getStatusColor(row.status)}>
          {getStatusDesc(row.status)}
        </ElTag>
      );
    },
  },
  {
    prop: 'creator',
    label: '创建人',
    align: 'left',
    headerAlign: 'left',
    render: ({ row }) => {
      return <span>{row.creator || '--'}</span>;
    },
  },
  {
    prop: 'updateTime',
    label: '操作时间',
    align: 'left',
    headerAlign: 'left',
    render: ({ row }) => {
      return <span>{row.updateTime || '--'}</span>;
    },
  },

  {
    prop: 'address',
    label: '操作',
    headerAlign: 'left',
    align: 'left',
    width: 100,
    render: ({ row }) => {
      return (
        <a class="action_item menu-link menu-gray-600 fs-8" href={row.resultPath} target="_blank">
          下载
        </a>
      );
    },
  },
];
