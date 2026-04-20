export const getCurCheckedArr = (customFieldList, title) => {
  const curInfo = customFieldList?.find((item) => item?.title === title);
  return curInfo?.checkedArr || [];
};

export const getCurCustomFields = (customFieldList, title) => {
  const curInfo = customFieldList?.find((item) => item?.title === title);
  return curInfo?.propertyArr?.filter((k) => {
    return curInfo?.checkedArr?.includes(k?.key);
  });
};
