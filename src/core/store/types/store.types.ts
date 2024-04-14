import type { AppSlice } from '../slices/app/app.types';
import type { SessionSlice } from '../slices/session';

export type StoreState = AppSlice & SessionSlice;
