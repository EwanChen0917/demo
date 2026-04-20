import { ref } from 'vue';

interface HookProp {
  pageSize?: number;
  pageNum?: number;
}

const usePagination = (props?: HookProp) => {
  const current = ref(props?.pageNum ?? 1);
  const pageSizeOption = ref([10, 20, 50, 100]);
  const pageSize = ref(props?.pageSize ?? 10);

  const handlePageSizeChange = (value: number) => {
    pageSize.value = value;
  };

  const handleCurrentChange = (value: number) => {
    current.value = value;
  };

  return {
    current,
    pageSize,
    pageSizeOption,
    handlePageSizeChange,
    handleCurrentChange,
  };
};

export default usePagination;
