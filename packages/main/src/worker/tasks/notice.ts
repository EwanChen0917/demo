const taskMap = {
  sampleorderCanRefresh: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/luteos/meta/v3/sampleorder/can/refresh', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result) {
          postMessage({
            event: 'stop-sampleorderRefresh',
            result: data.result,
          });
        } else if (taskMap.sampleorderCanRefresh.timer) {
          setTimeout(() => {
            taskMap.sampleorderCanRefresh.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.sampleorderCanRefresh.timer) {
          setTimeout(() => {
            taskMap.sampleorderCanRefresh.fn(token);
          }, 10000);
        }
      }
    },
  },
  turnoverSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/luteos/erp/plan/turnover/can/refresh', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result) {
          postMessage({
            event: 'stop-turnoverRefresh',
            result: data.result,
          });
          taskMap.turnoverSync.timer = false;
        } else if (taskMap.turnoverSync.timer) {
          setTimeout(() => {
            taskMap.turnoverSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.turnoverSync.timer) {
          setTimeout(() => {
            taskMap.turnoverSync.fn(token);
          }, 10000);
        }
      }
    },
  },
  supplierSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/platform/can/refresh?modelCode=SUPPLIER_INIT', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result) {
          postMessage({
            event: 'stop-supplierRefresh',
            result: data.result,
          });
          taskMap.supplierSync.timer = false;
        } else if (taskMap.supplierSync.timer) {
          setTimeout(() => {
            taskMap.supplierSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.supplierSync.timer) {
          setTimeout(() => {
            taskMap.supplierSync.fn(token);
          }, 10000);
        }
      }
    },
  },
  B2BOrderSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/platform/can/lastRefresh?modelCode=ERP_ORDER', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result.canFlag) {
          postMessage({
            event: 'stop-B2BOrderRefresh',
            result: data.result,
          });
          taskMap.B2BOrderSync.timer = false;
        } else if (taskMap.B2BOrderSync.timer) {
          setTimeout(() => {
            taskMap.B2BOrderSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.B2BOrderSync.timer) {
          setTimeout(() => {
            taskMap.B2BOrderSync.fn(token);
          }, 10000);
        }
      }
    },
  },
  fbaSendSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/platform/can/lastRefresh?modelCode=FBA_SHIP', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result.canFlag) {
          postMessage({
            event: 'stop-fbaSendRefresh',
            result: data.result,
          });
          taskMap.fbaSendSync.timer = false;
        } else if (taskMap.fbaSendSync.timer) {
          setTimeout(() => {
            taskMap.fbaSendSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.fbaSendSync.timer) {
          setTimeout(() => {
            taskMap.fbaSendSync.fn(token);
          }, 10000);
        }
      }
    },
  },
  customsDeclarationPlanSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch(
          '/api/platform/can/lastRefresh?modelCode=customs_declaration_plan',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if ((+data.code === 200 && data.result.canFlag) || +data.code === 500) {
          postMessage({
            event: 'stop-customsDeclarationPlanRefresh',
            result: data.result,
            message: data.message,
          });
          taskMap.customsDeclarationPlanSync.timer = false;
        } else if (taskMap.customsDeclarationPlanSync.timer) {
          setTimeout(() => {
            taskMap.customsDeclarationPlanSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.customsDeclarationPlanSync.timer) {
          setTimeout(() => {
            taskMap.customsDeclarationPlanSync.fn(token);
          }, 10000);
        }
      }
    },
  },
  financeBudgetSync: {
    timer: true,
    async fn(token: string, type: string) {
      try {
        const res = await fetch(`/api/platform/can/lastRefresh?modelCode=${type}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if ((+data.code === 200 && data.result.canFlag) || +data.code === 500) {
          postMessage({
            event: 'stop-financeBudgetSync',
            result: data.result,
            message: data.message,
            type: type,
          });
          taskMap.financeBudgetSync.timer = false;
        } else if (taskMap.financeBudgetSync.timer) {
          setTimeout(() => {
            taskMap.financeBudgetSync.fn(token, type);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.financeBudgetSync.timer) {
          setTimeout(() => {
            taskMap.financeBudgetSync.fn(token, type);
          }, 10000);
        }
      }
    },
  },
  overSeaSendSync: {
    timer: true,
    async fn(token: string) {
      try {
        const res = await fetch('/api/platform/can/lastRefresh?modelCode=OVER_SEA_SHIP', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (+data.code === 200 && data.result.canFlag) {
          postMessage({
            event: 'stop-overSeaSendRefresh',
            result: data.result,
          });
          taskMap.overSeaSendSync.timer = false;
        } else if (taskMap.overSeaSendSync.timer) {
          setTimeout(() => {
            taskMap.overSeaSendSync.fn(token);
          }, 10000);
        }
      } catch (error) {
        if (taskMap.overSeaSendSync.timer) {
          setTimeout(() => {
            taskMap.overSeaSendSync.fn(token);
          }, 10000);
        }
      }
    },
  },
};
onmessage = (ev: any) => {
  const { data } = ev;
  if (data.event === 'sampleorderCanRefresh-start') {
    taskMap.sampleorderCanRefresh.timer = true;
    taskMap.sampleorderCanRefresh.fn(data.token);
  } else if (data.event === 'sampleorderCanRefresh-end') {
    taskMap.sampleorderCanRefresh.timer = false;
  } else if (data.event === 'turnoverSync-start') {
    taskMap.turnoverSync.timer = true;
    taskMap.turnoverSync.fn(data.token);
  } else if (data.event === 'turnoverSync-end') {
    taskMap.turnoverSync.timer = false;
  } else if (data.event === 'supplierSync-start') {
    taskMap.supplierSync.timer = true;
    taskMap.supplierSync.fn(data.token);
  } else if (data.event === 'supplierSync-end') {
    taskMap.supplierSync.timer = false;
  } else if (data.event === 'B2BOrderSync-start') {
    taskMap.B2BOrderSync.timer = true;
    taskMap.B2BOrderSync.fn(data.token);
  } else if (data.event === 'B2BOrderSync-end') {
    taskMap.B2BOrderSync.timer = false;
  } else if (data.event === 'fbaSendSync-start') {
    taskMap.fbaSendSync.timer = true;
    taskMap.fbaSendSync.fn(data.token);
  } else if (data.event === 'fbaSendSync-end') {
    taskMap.fbaSendSync.timer = false;
  } else if (data.event === 'customsDeclarationPlanSync-start') {
    taskMap.customsDeclarationPlanSync.timer = true;
    taskMap.customsDeclarationPlanSync.fn(data.token);
  } else if (data.event === 'customsDeclarationPlanSync-end') {
    taskMap.customsDeclarationPlanSync.timer = false;
  } else if (data.event === 'financeBudgetSync-start') {
    taskMap.financeBudgetSync.timer = true;
    taskMap.financeBudgetSync.fn(data.token, data.type);
  } else if (data.event === 'financeBudgetSync-end') {
    taskMap.financeBudgetSync.timer = false;
  } else if (data.event === 'overSeaSendSync-start') {
    taskMap.overSeaSendSync.timer = true;
    taskMap.overSeaSendSync.fn(data.token);
  } else if (data.event === 'overSeaSendSync-end') {
    taskMap.overSeaSendSync.timer = false;
  } else {
    Object.keys(taskMap).forEach((taskName) => {
      taskMap[taskName].timer = false;
    });
  }
};
