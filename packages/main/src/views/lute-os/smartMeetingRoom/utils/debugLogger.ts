import { isSmartMeetingRoomMockEnabled } from '../deviceLedger/api';

const TAG_STYLE = 'color:#02b96b;font-weight:700;background:#00211a;padding:2px 6px;border-radius:4px;';
const API_STYLE = 'color:#fff;font-weight:700;background:#5e2ced;padding:2px 6px;border-radius:4px;margin-left:6px;';
const PAYLOAD_STYLE = 'color:#111;font-weight:600;';

export const logMock = (api: string, payload: unknown) => {
  if (!isSmartMeetingRoomMockEnabled()) return;
  // eslint-disable-next-line no-console
  console.info('%c[SMR-MOCK]%c ' + api, TAG_STYLE, API_STYLE, {
    payload,
    at: new Date().toISOString(),
  });
};
