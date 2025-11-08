import type { AppSlice } from '../slices/app/app.types';
import type { RatingSlice } from '../slices/rating';
import type { SessionSlice } from '../slices/session';

export type StoreState = AppSlice & SessionSlice & RatingSlice;
