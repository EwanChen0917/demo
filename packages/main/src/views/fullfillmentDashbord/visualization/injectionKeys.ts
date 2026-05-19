import type { InjectionKey, Ref } from 'vue';
import type { baseOptions } from './hooks/baseUseVisualizationOptions';

export const fulfillmentDashboardYearKey: InjectionKey<Ref<number>> = Symbol(
  'fulfillmentDashboardYear'
);
export const channelListKey: InjectionKey<Ref<baseOptions[]>> = Symbol('channelList');
