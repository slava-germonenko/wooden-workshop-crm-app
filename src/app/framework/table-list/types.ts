import { ItemAction } from './item-action';

export type CellType = 'text' | 'tag';

export type ActionsProvider<TItem> = (entry: TItem) => ItemAction[];
