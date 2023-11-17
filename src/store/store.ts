import { create } from 'zustand';
import { produce } from 'immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { data } from '../data/data';

export const useStore = create(
  persist(
    (set, get) => ({
      DataList: data,
      FavoriteList: [],
      CartList: [],
      OrderHistoryList: [],
      CartPrice: 0,
    }),
    { name: 'data', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
