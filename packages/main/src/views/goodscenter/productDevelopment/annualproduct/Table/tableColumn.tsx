import EleAvator from '@/components/EleAvator/index.vue';
import EleLetter from '@/components/EleAvator/letter.vue';
import { template } from 'lodash-es';
import GoodsInfo from '@/components/GoodsInfo/index.vue';
import { useStore } from '@/store/modules/useStore';
import OverflowTooltip from '@/components/overflowTooltip/index.vue';
const { getInfo } = useStore();
const userInfo = getInfo;

let emit: any = null;
export const sendEmit = (_emit: any) => {
  emit = _emit;
};

export const columns = [
  {
    type: 'selection',
    reserveSelection: true,
    width: 50,
    fixed: 'left',
  },
  {
    prop: 'productName',
    label: '产品',
    minWidth: 160,
    fixed: 'left',
    render: ({ row }) => {
      return (
        <div>
          <span
            class={'cursor-pointer text-primary'}
            onClick={() => {
              emit('tableBtnAction', 'view', toRaw(row));
            }}
          >
            {row.productName || '--'}
          </span>
          <div
            v-show={row.productSpu?.includes('SPU')}
            class={'cursor-pointer text-primary'}
            style="font-size: 12px"
            onClick={() => {
              emit('tableBtnAction', 'detail', toRaw(row));
            }}
          >
            {row.productSpu}
          </div>
        </div>
      );
    },
  },
  {
    prop: 'productProperty',
    label: '开发方式',
    render: ({ row }) => {
      return <span>{row.productProperty || '--'}</span>;
    },
  },
  {
    prop: 'productLevel',
    label: '产品级别',
    render: ({ row }) => {
      return <span>{row.productLevel || '--'}</span>;
    },
  },
  {
    prop: 'productLineName',
    label: '产品品线',
    render: ({ row }) => {
      return <span>{row.productLineName || '--'}</span>;
    },
  },
  {
    prop: 'brandName',
    label: '品牌',
    render: ({ row }) => {
      return <span>{row.brandName || '--'}</span>;
    },
  },
  {
    prop: 'fourCategoryName',
    label: '分类',
    width: 160,
    render: ({ row }) => {
      return (
        <span>
          {row.fourCategoryName
            ? [
                row.topCategoryName,
                row.twoCategoryName,
                row.threeCategoryName,
                row.fourCategoryName,
              ]
                .map((val) => val || '--')
                .join(' > ')
            : '--'}
        </span>
      );
    },
  },
  // {
  //   prop: 'productOwner',
  //   label: '产品经理',
  //   render: ({ row }) => {
  //     return <span>{row.productOwner || '--'}</span>;
  //   },
  // },
  {
    prop: 'year',
    label: '年规年份',
    render: ({ row }) => {
      return <span>{row.planYear || '--'}</span>;
    },
  },
  {
    prop: 'planFlagDesc',
    label: '是否年规',
    render: ({ row }) => {
      return <span>{row.planFlagDesc || '--'}</span>;
    },
  },
  /* {
    prop: 'month',
    label: '年规月份',
    render: ({ row }) => {
      return <span>{row.planMonth || '--'}</span>;
    },
  },
  {
    prop: 'planTime',
    label: '年规时间',
    width: 100,
    render: ({ row }) => {
      return <span>{row.planTime || '--'}</span>;
    },
  }, */
  // {
  //   prop: 'listingTime',
  //   label: '预计上架时间',
  //   width: 100,
  //   render: ({ row }) => {
  //     return <span>{row.listingTime || '--'}</span>;
  //   },
  // },
  // {
  //   prop: 'actualListingTime',
  //   label: '实际上架时间',
  //   width: 100,
  //   render: ({ row }) => {
  //     return <span>{row.actualListingTime || '--'}</span>;
  //   },
  // },
  // {
  //   prop: 'stockTime',
  //   label: '中仓入库时间',
  //   width: 100,
  //   render: ({ row }) => {
  //     return <span>{row.stockTime || '--'}</span>;
  //   },
  // },
  {
    prop: 'stockTime',
    label: '预计企划至下单',
    width: 240,
    render: ({ row }) => {
      return (
        <>
          <div>概念评审：{row.conceptReviewTime || '--'}</div>
          <div>立项评审：{row.projectReviewTime || '--'}</div>
          <div>下单评审：{row.orderReviewTime || '--'}</div>
          <div>预计立项启动时间：{row.projStartEstDate || '--'}</div>
          <div>预计charter时间：{row.charterEstDate || '--'}</div>
          <div>预计计划评审时间：{row.planRevEstDate || '--'}</div>
          <div>预计可获得性决策时间：{row.decisionEstDate || '--'}</div>
        </>
      );
    },
  },
  {
    prop: 'stockTime',
    label: '实际企划至下单',
    width: 240,
    render: ({ row }) => {
      return (
        <>
          <div>概念评审：{row.actualConceptReviewTime || '--'}</div>
          <div>立项评审：{row.actualProjectReviewTime || '--'}</div>
          <div>下单评审：{row.actualOrderReviewTime || '--'}</div>
          <div>实际立项启动时间：{row.projStartActDate || '--'}</div>
          <div>实际charter时间：{row.charterActDate || '--'}</div>
          <div>实际计划评审时间：{row.planRevActDate || '--'}</div>
          <div>实际可获得性决策时间：{row.decisionActDate || '--'}</div>
        </>
      );
    },
  },
  {
    prop: 'stockTime',
    label: '入库至上架日期',
    width: 200,
    render: ({ row }) => {
      return (
        <>
          <div>预计中仓入库：{row.planStockTime || '--'}</div>
          <div>实际中仓入库：{row.stockTime || '--'}</div>
          <div>预计上架：{row.listingTime || '--'}</div>
          <div>实际上架：{row.actualListingTime || '--'}</div>
        </>
      );
    },
  },
  {
    prop: 'star',
    label: '评分',
    render: ({ row }) => {
      return <span>{row.star || '--'}</span>;
    },
  },
  {
    prop: 'projectOwnerName',
    label: '干系人',
    width: 160,
    render: ({ row }) => {
      return (
        <>
          <div>项目经理：{row.projectOwnerName || '--'}</div>
          <div>产品经理：{row.productOwner || '--'}</div>
        </>
      );
    },
  },
  {
    prop: 'planDevelopDay',
    label: '计划开发周期',
    width: 120,
    render: ({ row }) => {
      return <span>{row.planDevelopDay || '--'}</span>;
    },
  },
  {
    prop: 'actualDevelopDay',
    label: '实际开发周期',
    width: 120,
    render: ({ row }) => {
      return <span>{row.actualDevelopDay || '--'}</span>;
    },
  },
  {
    prop: 'developPeriodRate',
    label: '开发周期缩短',
    width: 120,
    render: ({ row }) => {
      return <span>{row.developPeriodRate || '--'}</span>;
    },
  },
  {
    prop: 'listingDelayDay',
    label: '上架延期时间',
    width: 120,
    render: ({ row }) => {
      return <span>{row.listingDelayDay || '--'}</span>;
    },
  },
  {
    prop: 'stockDelayDay',
    label: '入中仓延期时间',
    width: 120,
    render: ({ row }) => {
      return <span>{row.stockDelayDay || '--'}</span>;
    },
  },
  {
    prop: 'stockStatusDesc',
    label: '入中仓状态',
    width: 120,
    render: ({ row }) => {
      return <span>{row.stockStatusDesc || '--'}</span>;
    },
  },
  {
    prop: 'firstDeliveryQuantity',
    label: 'MPC目标-首单交付数量',
    width: 120,
    render: ({ row }) => {
      return <span>{row.firstDeliveryQuantity || '--'}</span>;
    },
  },
  {
    prop: 'firstOrderActualQuantity',
    label: '首单实际下单量',
    width: 120,
    render: ({ row }) => {
      return <span>{row.firstOrderActualQuantity || '--'}</span>;
    },
  },
  {
    prop: 'firstOrderDeliveryCount',
    label: '实际-首单按时交付达成总数',
    width: 120,
    render: ({ row }) => {
      return <span>{row.firstOrderDeliveryCount || '--'}</span>;
    },
  },
  {
    prop: 'firstOrderDeliveryDetail',
    label: '实际-首单按时交付达成明细',
    width: 120,
    render: ({ row }) => {
      return (
        <OverflowTooltip content={row.firstOrderDeliveryDetail || '--'} line={3}>
          <span>{row.firstOrderDeliveryDetail || '--'}</span>
        </OverflowTooltip>
      );
    },
  },
  {
    prop: 'firstDeliveryPlan',
    label: 'MPC-首单交付计划',
    width: 120,
    render: ({ row }) => {
      return <span>{row.firstDeliveryPlan || '--'}</span>;
    },
  },
  {
    prop: 'firstOrderStatusDesc',
    label: '首单交付达成状态',
    width: 120,
    render: ({ row }) => {
      return <span>{row.firstOrderStatusDesc || '--'}</span>;
    },
  },
  {
    prop: 'productStatusDesc',
    label: '进度',
    render: ({ row }) => {
      return (
        <div>
          <span
            class="badge badge-success badge-status badge-bold"
            v-show={row.productStatus == 0}
            style="color: #fff; font-size: 0.85rem;line-height: 1;"
          >
            {row?.productStatusDesc}
          </span>
          <span
            class="badge badge-warning badge-status badge-bold"
            v-show={row.productStatus == 1}
            style="color: #fff; font-size: 0.85rem;line-height: 1;"
          >
            {row?.productStatusDesc}
          </span>
          <span
            class="badge badge-danger badge-status badge-bold"
            v-show={row.productStatus == 2}
            style="color: #fff; font-size: 0.85rem;line-height: 1;"
          >
            {row?.productStatusDesc}
          </span>
          <span
            class="badge badge-primary badge-status badge-bold"
            v-show={row.productStatus == 3}
            style="color: #fff; font-size: 0.85rem;line-height: 1;"
          >
            {row?.productStatusDesc}
          </span>
          <span
            class="badge badge-info badge-status badge-bold"
            v-show={row.productStatus == 4}
            style="color: #fff; font-size: 0.85rem;line-height: 1;"
          >
            {row?.productStatusDesc}
          </span>
        </div>
      );
    },
  },
  {
    prop: 'remark',
    label: '备注',
    width: 150,
    render: ({ row }) => {
      return <span>{row.remark || '--'}</span>;
    },
  },
  {
    prop: 'address',
    label: '操作',
    fixed: 'right',
    width: 110,
    render: ({ row }) => {
      return (
        <div class="action_wrap" v-show={row.productStatus !== 2 && row.month !== '待定'}>
          <span
            v-permission="annualproductEdit"
            class="action_item menu-link menu-gray-600 fs-8 text-primary "
            onClick={() => {
              emit(
                'tableBtnAction',
                'edit',
                toRaw({ ...row, planYear: row?.planYear?.toString(), updateTypeList: [] })
              );
            }}
          >
            编辑
          </span>
          <span
            v-permission="annualproductUpdate"
            class="action_item menu-link menu-gray-600 fs-8 text-primary "
            onClick={() => {
              emit('tableBtnAction', 'update', toRaw({ ...row, updateTypeList: [] }));
            }}
          >
            更新申请
          </span>
          <span
            v-permission="annualproductUpdateLog"
            class="action_item menu-link menu-gray-600 fs-8 text-primary "
            onClick={() => {
              emit('tableBtnAction', 'log', toRaw(row));
            }}
          >
            操作日志
          </span>
          <span
            v-permission="annualproductCancel"
            class="action_item menu-link menu-gray-600 fs-8 text-primary"
            onClick={() => {
              emit('tableBtnAction', 'cancel', toRaw(row));
            }}
          >
            取消上架申请
          </span>
          <span
            v-permission="annualproductUpdateStar"
            class="action_item menu-link menu-gray-600 fs-8 text-primary"
            onClick={() => {
              emit('tableBtnAction', 'updateStar', toRaw(row));
            }}
          >
            修改评分
          </span>
          {filterAnnualproductTarget(row.productSpu) && (
            <span
              v-permission="annualproductTarget"
              class="action_item menu-link menu-gray-600 fs-8 text-primary"
              onClick={() => {
                emit('tableBtnAction', 'salesTarget', toRaw(row));
              }}
            >
              销售目标
            </span>
          )}
          <span
            class="action_item menu-link menu-gray-600 fs-8 text-danger"
            onClick={() => {
              emit('tableBtnAction', 'delete', toRaw(row));
            }}
          >
            删除
          </span>
        </div>
      );
    },
  },
];

function filterAnnualproductTarget(spu: string) {
  const regex = /^SPU/;
  const result = regex.test(spu);
  console.log(result);
  return result;
}
