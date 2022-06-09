import { NbComponentStatus } from '@nebular/theme';

import { CellType } from './types';

export interface ColumnDescriptor<TData> {
  name: string;
  label: string;
  cellType: CellType;
  getValue (entry: TData): string | number | Date | null;
  getStatus?(entry: TData): NbComponentStatus;
}
