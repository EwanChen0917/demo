import { platformApi, officeApi } from '@/api';
import { logMock } from '../utils/debugLogger';
import {
  mockDebugDevice,
  mockQueryDeviceDetail,
  mockQueryDeviceLedgerList,
  mockQueryDeviceSelectList,
  mockQueryMeetingRoomSelectList,
  mockSyncThirdPartyDevices,
  type DeviceLedgerListItem,
  type DeviceLedgerOnlineStatus,
  type QueryDeviceLedgerListParams,
} from './mock';

export const SMART_MEETING_ROOM_MOCK_STORAGE_KEY = 'lute_smartMeetingRoom_mock';

export const isSmartMeetingRoomMockEnabled = () => {
  const queryEnabled = new URLSearchParams(window.location.search).get('mock') === '1';
  const storageEnabled = window.localStorage.getItem(SMART_MEETING_ROOM_MOCK_STORAGE_KEY) === '1';
  return queryEnabled || storageEnabled;
};

export type DeviceLedgerApi = {
  queryDeviceLedgerList: (params: QueryDeviceLedgerListParams) => Promise<{
    total: number;
    deviceLedgerList: DeviceLedgerListItem[];
  }>;
  queryDeviceSelectList: (params: { keyword?: string }) => Promise<{
    deviceList: { label: string; value: string }[];
  }>;
  queryMeetingRoomSelectList: (params: { keyword?: string }) => Promise<{
    roomList: { label: string; value: string }[];
  }>;
  syncThirdPartyDevices: () => Promise<{ success: boolean }>;
  debugDevice: (deviceCode: string, currentStatus: 'ON' | 'OFF') => Promise<{ success: boolean }>;
  queryDeviceDetail: (deviceCode: string) => Promise<any>;
};

type MeetingDeviceListQueryReq = {
  keyword?: string;
  onlineStatus?: 'online' | 'offline';
  pageNum: number;
  pageSize: number;
  roomId?: string;
};

type MeetingDeviceBean = {
  deviceCode?: string;
  name?: string;
  deviceType?: string;
  deviceTypeDesc?: string;
  macAddress?: string;
  meetingRoomList?: { roomId?: string; roomName?: string }[];
  state?: 'on' | 'off';
  onlineStatus?: 'online' | 'offline' | 'unknown';
  lastSeen?: string;
};

type MeetingDeviceListQueryResp = {
  meetingDeviceList?: MeetingDeviceBean[];
  total?: number;
};

const mapOnlineStatusToApi = (list: DeviceLedgerOnlineStatus[]) => {
  if (list.length !== 1) return undefined;
  const value = list[0];
  if (value === '在线') return 'online' as const;
  if (value === '离线') return 'offline' as const;
  return undefined;
};

const mapOnlineStatusToUi = (value?: string): DeviceLedgerOnlineStatus => {
  if (value === 'online') return '在线';
  if (value === 'offline') return '离线';
  return '未知';
};

const mapStateToUi = (value?: string) => {
  if (value === 'on') return 'ON' as const;
  return 'OFF' as const;
};

const mapMeetingDeviceToLedgerRow = (item: MeetingDeviceBean): DeviceLedgerListItem => {
  const roomName = (item.meetingRoomList ?? [])
    .map((x) => x.roomName)
    .filter((x): x is string => !!x)
    .join('、');

  return {
    deviceCode: item.deviceCode ?? '-',
    deviceName: item.name ?? '-',
    deviceTypeName: item.deviceTypeDesc ?? item.deviceType ?? '-',
    roomCode: item.meetingRoomList?.[0]?.roomId ?? '',
    roomName: roomName || '-',
    macAddress: item.macAddress ?? '-',
    currentStatus: mapStateToUi(item.state),
    onlineStatus: mapOnlineStatusToUi(item.onlineStatus),
    lastOnlineAt: item.lastSeen ?? '-',
  };
};

export const getDeviceLedgerApi = (): DeviceLedgerApi => {
  if (isSmartMeetingRoomMockEnabled()) {
    return {
      queryDeviceLedgerList: async (params) => {
        logMock('deviceLedger.queryDeviceLedgerList', params);
        return mockQueryDeviceLedgerList(params as any) as any;
      },
      queryDeviceSelectList: async (params) => {
        logMock('deviceLedger.queryDeviceSelectList', params);
        return mockQueryDeviceSelectList(params as any) as any;
      },
      queryMeetingRoomSelectList: async (params) => {
        logMock('deviceLedger.queryMeetingRoomSelectList', params);
        return mockQueryMeetingRoomSelectList(params as any) as any;
      },
      syncThirdPartyDevices: async () => {
        logMock('deviceLedger.syncThirdPartyDevices', {});
        return mockSyncThirdPartyDevices as any;
      },
      debugDevice: async (deviceCode, currentStatus) => {
        const operate = currentStatus === 'ON' ? 'turn_on' : 'turn_off';
        const body = { deviceCode, operate };
        logMock('deviceLedger.debugDevice', body);
        return mockDebugDevice(deviceCode as any, currentStatus as any) as any;
      },
      queryDeviceDetail: async (deviceCode: string) => {
        logMock('deviceLedger.queryDeviceDetail', { deviceCode });
        return mockQueryDeviceDetail(deviceCode as any) as any;
      },
    };
  }

  const api = platformApi as any;
  return {
    queryDeviceLedgerList: async (params) => {
      const req: MeetingDeviceListQueryReq = {
        keyword: params.keyword?.trim() || undefined,
        roomId: params.roomCode || undefined,
        onlineStatus: mapOnlineStatusToApi(params.onlineStatusList ?? []),
        pageNum: params.pageNum,
        pageSize: params.pageSize,
      };
      logMock('deviceLedger.queryDeviceLedgerList', req);

      const res = (await officeApi.officeMeetingDeviceQueryMeetingDeviceList(req)) as MeetingDeviceListQueryResp;

      return {
        total: res.total ?? 0,
        deviceLedgerList: (res.meetingDeviceList ?? []).map(mapMeetingDeviceToLedgerRow),
      };
    },
    queryDeviceSelectList: async ({ keyword }) => {
      const body = {
        keyword: keyword?.trim() || undefined,
        pageNum: 1,
        pageSize: 50,
      } satisfies MeetingDeviceListQueryReq;
      logMock('deviceLedger.queryDeviceSelectList', body);
      const res = await officeApi.officeMeetingDeviceQueryMeetingDeviceList(body);

      const deviceList = (res.meetingDeviceList ?? [])
        .map((x) => ({
          label: `${x.name ?? '-'}（${x.deviceCode ?? '-'}）`,
          value: x.deviceCode ?? '',
        }))
        .filter((x) => !!x.value);

      return { deviceList };
    },
    queryMeetingRoomSelectList: async ({ keyword }) => {
      const query = {
        roomCategory: undefined,
        keyword: keyword?.trim() || undefined,
        pageNum: 1,
        pageSize: 100,
      };
      logMock('deviceLedger.queryMeetingRoomSelectList', query);
      const res = await platformApi.platformMeetingQueryRoomList(query);

      const roomList = (res.meetingRoomList ?? [])
        .map((x: any) => ({
          label: x.roomName ?? '-',
          value: x.roomCode ?? '',
        }))
        .filter((x: any) => !!x.value);

      return { roomList };
    },
    syncThirdPartyDevices: async () => {
      logMock('deviceLedger.syncThirdPartyDevices', {});
      await officeApi.officeMeetingDeviceReflashDevice();
      return { success: true };
    },
    debugDevice: async (deviceCode, currentStatus) => {
      const operate = currentStatus === 'ON' ? 'turn_on' : 'turn_off';
      const body = { deviceCode, operate };
      logMock('deviceLedger.debugDevice', body);
      const res = await officeApi.officeMeetingDeviceControlDevice(body as any);

      if (res?.success === false) {
        return Promise.reject(new Error(res?.message || '指令执行失败'));
      }

      return { success: true };
    },
    queryDeviceDetail: (deviceCode: string) => {
      logMock('deviceLedger.queryDeviceDetail', { deviceCode });
      return officeApi.officeMeetingDeviceQueryMeetingDeviceDetail({ deviceCode });
    },
  };
};
