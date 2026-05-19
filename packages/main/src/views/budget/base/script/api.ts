import { financeSystemApi } from '@/api';
import { ElMessage } from 'element-plus';
import { useStore } from '@/store/modules/useStore';
import { financeBudgetRefresh, stopFinanceBudgetRefresh } from '@/worker/controls/notice';
import useTask from '@/store/modules/task';
import { refreshType } from '@/views/budget/base/enums/enums';

const user = useStore();
const store = useTask();
export async function handleRefresh(type) {
  console.log(store.taskMap);
  console.log(store.taskMap[type]);
  if (store.taskMap[type].apiSync) {
    return;
  }
  await financeSystemApi.financeBasicRefreshJobData({
    jobHandle: type,
  });
  // ElMessage.success('操作成功');
  store.taskMap[type].apiSync = true;
  financeBudgetRefresh(user.token as string, type as string);
}
