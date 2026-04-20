import clipboard3 from 'vue-clipboard3';
import { ElMessage } from 'element-plus';

const { toClipboard } = clipboard3();
export const copyFn = async (str: string, desc: string) => {
  try {
    await toClipboard(str);
    ElMessage({
      type: 'success',
      message: `复制${desc}成功`,
      duration: 1 * 1000,
    });
  } catch (error) {}
};
