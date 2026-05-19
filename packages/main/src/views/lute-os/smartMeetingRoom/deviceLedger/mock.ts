import dayjs from 'dayjs';

type DeviceOnlineStatus = '在线' | '离线';
type DeviceCurrentStatus = 'ON' | 'OFF';

export type DeviceLedgerOnlineStatus = DeviceOnlineStatus | '未知';

export type DeviceLedgerListItem = {
  deviceCode: string;
  deviceName: string;
  deviceTypeName: string;
  roomCode: string;
  roomName: string;
  macAddress: string;
  currentStatus: DeviceCurrentStatus;
  onlineStatus: DeviceLedgerOnlineStatus;
  lastOnlineAt: string;
};

export type QueryDeviceLedgerListParams = {
  keyword?: string;
  roomCode?: string;
  onlineStatusList?: DeviceLedgerOnlineStatus[];
  pageNum: number;
  pageSize: number;
};

export type QueryDeviceSelectListParams = {
  keyword?: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

const roomNames = ['[1001]知行合一', '[1002]求真务实', '[1003]见微知著', '[1004]精益求精'];
const deviceTypeNames = ['灯光', '空调', '电视', '窗帘', '智能灯光', '人在传感器'];

const getMacAddressByIndex = (index: number) => {
  const hex = index.toString(16).padStart(6, '0').slice(-6);
  return `00:11:22:${hex.slice(0, 2)}:${hex.slice(2, 4)}:${hex.slice(4, 6)}`;
};

let seed = 0;
const nextSeed = () => {
  seed = (seed + 7) % 100;
  return seed;
};

let deviceLedgerList: DeviceLedgerListItem[] = Array.from({ length: 57 }).map((_, index) => {
  const idx = index + 1;
  const roomName = roomNames[index % roomNames.length];
  const deviceTypeName = deviceTypeNames[index % deviceTypeNames.length];
  const onlineStatus = index % 7 === 0 ? '未知' : index % 3 === 0 ? '离线' : '在线';
  const currentStatus = index % 4 === 0 ? 'OFF' : 'ON';
  const minutesAgo = 10 + index * 6;
  return {
    deviceCode: `DEV${dayjs().format('YYYYMMDD')}${idx.toString().padStart(4, '0')}`,
    deviceName: `${roomName.replace(/^\[[^\]]+\]/, '').trim()}${deviceTypeName}${idx}`,
    deviceTypeName,
    roomCode: `ROOM${(index % roomNames.length) + 1}`,
    roomName,
    macAddress: getMacAddressByIndex(idx),
    currentStatus,
    onlineStatus,
    lastOnlineAt: dayjs().subtract(minutesAgo, 'minute').format('YYYY-MM-DD HH:mm:ss'),
  };
});

export const mockQueryDeviceLedgerList = async (params: QueryDeviceLedgerListParams) => {
  const { keyword, roomCode, onlineStatusList, pageNum, pageSize } = params;
  const normalizedKeyword = keyword?.trim();
  const filtered = deviceLedgerList.filter((item) => {
    const keywordOk = !normalizedKeyword
      ? true
      : item.deviceName.includes(normalizedKeyword) || item.deviceCode.includes(normalizedKeyword);
    const roomOk = roomCode ? item.roomCode === roomCode : true;
    const onlineOk = onlineStatusList?.length ? onlineStatusList.includes(item.onlineStatus) : true;
    return keywordOk && roomOk && onlineOk;
  });

  const total = filtered.length;
  const start = (pageNum - 1) * pageSize;
  const list = filtered.slice(start, start + pageSize);
  return Promise.resolve({ total, deviceLedgerList: list });
};

export const mockQueryDeviceSelectList = async (params: QueryDeviceSelectListParams) => {
  const normalizedKeyword = params.keyword?.trim();
  const list = deviceLedgerList
    .filter((item) => {
      if (!normalizedKeyword) return true;
      return item.deviceName.includes(normalizedKeyword) || item.deviceCode.includes(normalizedKeyword);
    })
    .slice(0, 200)
    .map((item) => ({ label: `${item.deviceName}（${item.deviceCode}）`, value: item.deviceCode }));

  return Promise.resolve({ deviceList: list });
};

export const mockQueryMeetingRoomSelectList = async (params: QueryDeviceSelectListParams) => {
  const normalizedKeyword = params.keyword?.trim();
  const list = roomNames
    .filter((name) => (!normalizedKeyword ? true : name.includes(normalizedKeyword)))
    .map((name, idx) => ({ label: name, value: `ROOM${idx + 1}` }));
  return Promise.resolve({ roomList: list });
};

export const mockSyncThirdPartyDevices = async () => {
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const shouldFail = nextSeed() % 9 === 0;
  if (shouldFail) {
    return Promise.reject(new Error('第三方接口异常，请稍后重试'));
  }
  deviceLedgerList = deviceLedgerList.map((item, index) => {
    if (index % 5 === 0) {
      return {
        ...item,
        onlineStatus: item.onlineStatus === '在线' ? '离线' : '在线',
        lastOnlineAt: now,
      };
    }
    return item;
  });
  return Promise.resolve({ success: true });
};

export const mockDebugDevice = async (deviceCode: string, currentStatus: DeviceCurrentStatus) => {
  const shouldFail = nextSeed() % 7 === 0;
  if (shouldFail) {
    return Promise.reject(new Error('参数不合法/设备离线/指令执行失败'));
  }

  deviceLedgerList = deviceLedgerList.map((item) =>
    item.deviceCode === deviceCode
      ? {
          ...item,
          currentStatus,
          lastOnlineAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        }
      : item
  );

  return Promise.resolve({ success: true });
};

export const mockQueryDeviceDetail = async (deviceCode: string) => {
  const device = deviceLedgerList.find((item) => item.deviceCode === deviceCode);
  if (!device) {
    return Promise.reject(new Error('设备不存在'));
  }

  // 模拟详细数据结构
  return Promise.resolve({
    deviceCode: device.deviceCode,
    name: device.deviceName,
    deviceTypeDesc: device.deviceTypeName,
    macAddress: device.macAddress,
    onlineStatusDesc: device.onlineStatus,
    state: device.currentStatus,
    lastSeen: device.lastOnlineAt,
    meetingRoomList: [
      {
        roomCode: device.roomCode,
        roomName: device.roomName,
      },
    ],
  });
};


