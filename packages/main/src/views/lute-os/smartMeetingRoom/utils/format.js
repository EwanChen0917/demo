import { categoryMap, categoryNameMap } from '../constants';

export const getRoomCategoryKey = (category) => categoryMap[category] ?? categoryMap[0];

export const getRoomCategoryName = (category) => categoryNameMap[category] ?? categoryNameMap[0];
