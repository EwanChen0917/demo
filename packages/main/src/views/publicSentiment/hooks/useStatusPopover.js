import { debounce } from 'lodash-es';

export const useStatusPopover = (options = {}) => {
  const { showDelay = 250, hideDelay = 150 } = options;
  const popoverVisibleMap = reactive({});

  const showStatusPopover = debounce((ticketId) => {
    Object.keys(popoverVisibleMap).forEach((key) => {
      popoverVisibleMap[key] = false;
    });
    popoverVisibleMap[ticketId] = true;
  }, showDelay);

  const hideStatusPopover = debounce((ticketId) => {
    popoverVisibleMap[ticketId] = false;
  }, hideDelay);

  const handleStatusEnter = (ticketId) => {
    hideStatusPopover.cancel();
    showStatusPopover(ticketId);
  };

  const handleStatusLeave = (ticketId) => {
    showStatusPopover.cancel();
    hideStatusPopover(ticketId);
  };

  const closeStatusPopover = (ticketId) => {
    showStatusPopover.cancel();
    hideStatusPopover.cancel();
    if (ticketId) {
      popoverVisibleMap[ticketId] = false;
      return;
    }
    Object.keys(popoverVisibleMap).forEach((key) => {
      popoverVisibleMap[key] = false;
    });
  };

  return {
    popoverVisibleMap,
    handleStatusEnter,
    handleStatusLeave,
    closeStatusPopover,
  };
};
