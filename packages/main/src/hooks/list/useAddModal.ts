import useList from './useList';

const useAddModal = ({ refreshList }: Pick<ReturnType<typeof useList>, 'refreshList'>) => {
  const addModalVisible = ref(false);
  const handleAdd = () => {
    addModalVisible.value = true;
  };
  const handleAddModalClose = (reload = false) => {
    addModalVisible.value = false;
    if (reload) {
      refreshList();
    }
  };

  return {
    addModalVisible,
    handleAdd,
    handleAddModalClose,
  };
};

export default useAddModal;
