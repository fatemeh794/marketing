import {AggregationFunction, ComponentType, DataFormat, DataType} from '../enums/datatype';

export interface GridOption {
  ColumnDefinitions: Array<ColumnDefinition>;
  showCheckbox?: boolean;
  filterable?: boolean;
  paging?: Paging;
  alternateColor?: AlternateColor;
}
export interface ColumnType {
  dataType: DataType;
  component: ComponentType;
  formatting?: DataFormat;
}
export interface Paging {
  recordsOfPage: number;
}
export interface AlternateColor {
  color: string;
}

export interface ColumnDefinition {
  category?: string;
  headerName: string;
  field: string;
  type: ColumnType;
  sortable: boolean;
  aggregationFunction?: AggregationFunction;
}




