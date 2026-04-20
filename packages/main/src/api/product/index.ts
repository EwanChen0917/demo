export * from './Api';
export { Api as ApiRouteTypes } from './ApiRoute';
export * from './data-contracts';
export * from './http-client';

import { Api } from './Api';
import { wrapperApi } from '../wrapperApi';

export const api = wrapperApi<InstanceType<typeof Api>>(Api);
