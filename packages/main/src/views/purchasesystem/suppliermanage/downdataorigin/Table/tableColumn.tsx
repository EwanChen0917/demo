let emit: any = null;
export const sendEmit = (_emit: any) => {
  emit = _emit;
};

import USIMG from '../../../../../assets/images/country/united_states.svg';
import ChinaIMG from '../../../../../assets/images/country/china.svg';
import CANIMG from '../../../../../assets/images/country/canada.svg';
import UKIMG from '../../../../../assets/images/country/uk.svg';
import defaultIMG from '../../../../../assets/images/country/afghanistan.svg';

const enmus = { US: USIMG, UK: UKIMG, CHINA: ChinaIMG, CAN: CANIMG, default: defaultIMG };

export const columns = [
  {
    type: 'selection',
    width: 50,
    fixed: 'left'
  },
  {
    prop: 'label',
    label: '名字',
    minWidth: 180,
    render: ({ row }) => {
      return <div>{row.label || '--'}</div>;
    }
  },
  {
    prop: 'type',
    label: '类型',
    width: 180,
    render: ({ row }) => {
      return <div>{row.type || '--'}</div>;
    }
  },
  {
    prop: 'explain',
    label: '说明',
    minWidth: 180,
    render: ({ row }) => {
      return <div>{row.explain || '--'}</div>;
    }
  },
  {
    prop: 'address',
    label: '操作',
    headerAlign: 'right',
    align: 'right',
    width: 40,
    render: ({ row }) => {
      return (
        <div>
          <span
            class="action_item menu-link menu-gray-600 fs-8 text-primary"
            onClick={() => {
              emit('tableBtnAction', 'down', toRaw(row));
            }}
          >
            下载
          </span>
        </div>
      );
    }
  }
];
