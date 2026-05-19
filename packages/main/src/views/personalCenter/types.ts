export interface IndicatorType {
  title: string;
  data: {
    current: number;
    last: number;
    yoy: number;
  };
  unit: string;
}
