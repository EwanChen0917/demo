const step = 50;
export const useDistributed = () => {
  return {
    distribute: (data: any, reactData: any) => {
      let idx = 0;
      let result: any = {};
      let originalData = JSON.parse(JSON.stringify(data));
      let keys = Object.keys(originalData).filter(
        (key) => Array.isArray(originalData[key]) && originalData[key].length > 0
      );

      const slicer = () => {
        idx++;
        keys = keys.filter((key) => originalData[key].length > step * (idx - 1));
        keys.forEach((key) => {
          if (!result[key]) {
            result[key] = new Array<any>();
          }
          result[key].push(...originalData[key].slice(step * (idx - 1), step * idx));
        });
      };
      requestIdleCallback(function processChunk() {
        if (keys.length > 0) {
          slicer();
          reactData.value = { ...result };
          // requestIdleCallback(processChunk);
        } else {
          result = null;
          originalData = null;
        }
      });
    },
  };
};
export default {};
