import EleAvator from '@/components/EleAvator/index.vue';
import EleLetter from '@/components/EleAvator/letter.vue';

let emit: any = null;
export const sendEmit = (_emit: any) => {
  emit = _emit;
};

export const columns = [
  {
    type: 'selection',
    width: 50,
    fixed: 'left'
  },
  {
    prop: 'name',
    label: '成员名称',
    render: ({ row }) => {
      return (
        <div class="avator_wrap">
          <div class="avator_left">
            {row.avatar ? (
              <EleAvator url={row.avatar}></EleAvator>
            ) : (
              <EleLetter name={row.name}></EleLetter>
            )}
          </div>
          <div class="avator_right">
            <div class="avator_name">{row.name}</div>
            <div class="avator_desc">{row.date}</div>
          </div>
        </div>
      );
    }
  },
  {
    prop: 'nickname',
    label: '昵称',
    render: ({ row }) => {
      return <span>{row.nickname || row.name}</span>;
    }
  },
  {
    prop: 'jobNumber',
    label: '工号',
    render: ({ row }) => {
      return <span>{row.jobNumber || '--'}</span>;
    }
  },
  {
    prop: 'mobile',
    label: '手机号',
    render: ({ row }) => {
      return <span>{row.mobile || '--'}</span>;
    }
  },
  {
    prop: 'title',
    label: '职称',
    render: ({ row }) => {
      return <span>{row.title || '--'}</span>;
    }
  }
  // {
  //   prop: 'address',
  //   label: 'ACTIONS',
  //   headerAlign: 'right',
  //   align: 'right',
  //   width: 150,
  //   render: ({ row }) => {
  //     return '';
  //   }
  // }
];
