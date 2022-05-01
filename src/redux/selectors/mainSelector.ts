import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const mainSelector = (state: RootState) => {
  const { main } = state;

  return main;
};

export const userDataSelector = createSelector(mainSelector, ({ data }) => data);
