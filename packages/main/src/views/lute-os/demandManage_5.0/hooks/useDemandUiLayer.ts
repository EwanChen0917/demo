import { createGlobalState, useStorage } from '@vueuse/core';
import { isNil, merge } from 'lodash-es';

type SurveyPosition = {
  top: number;
  left: number | null;
  right: number | null;
};

const createUiLayerState = () => {
  const surveyVisible = ref(true);
  const defaultSurveyPosition: SurveyPosition = {
    top: 100,
    left: null,
    right: 8,
  };
  const surveyPosition = useStorage<SurveyPosition>('demand-manage-5-survey-position', defaultSurveyPosition);

  const toggleSurvey = (visible?: boolean) => {
    if (isNil(visible)) {
      surveyVisible.value = !surveyVisible.value;
      return;
    }
    surveyVisible.value = visible;
  };

  const setSurveyPosition = (position: Partial<SurveyPosition>) => {
    surveyPosition.value = merge({}, defaultSurveyPosition, surveyPosition.value, position);
  };

  return {
    surveyVisible,
    surveyPosition,
    toggleSurvey,
    setSurveyPosition,
  };
};

export const useDemandUiLayer = createGlobalState(createUiLayerState);

