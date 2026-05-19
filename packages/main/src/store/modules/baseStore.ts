import { defineStore } from 'pinia';

type braedInfoType = {
  firstMenu: string;
  secondMenu: string;
  thirdMenu: string;
};
type comStoreState = {
  breadInfo: braedInfoType;
  tableLoading: boolean;
};

type baseStoreGetters = {
  getBreadInfo?: (state: comStoreState) => any;
};

type baseStoreActions = {
  setBreadInfo: (data: braedInfoType) => void;
  setTableLoading: (data: boolean) => void;
};

export const baseStore = defineStore<string, comStoreState, baseStoreGetters, baseStoreActions>(
  'baseStoreId',
  {
    state: () => {
      return {
        breadInfo: {
          firstMenu: '',
          secondMenu: '',
          thirdMenu: ''
        },
        tableLoading: false
      };
    },
    getters: {
      getBreadInfo: (state) => {
        return state.breadInfo;
      }
    },
    actions: {
      setBreadInfo(data: braedInfoType) {
        this.breadInfo = { ...data };
      },
      setTableLoading(val: boolean) {
        this.tableLoading = val;
      }
    },
    // 开启数据缓存
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'system_base',
          storage: localStorage,
          paths: ['breadInfo']
        }
      ]
    }
  }
);
