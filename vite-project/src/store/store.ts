import {configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //LocalStorage 사용


const persistConfig = {
    key: 'root',
    storage,
    whitelist:['userDTO'] // 스토리지에 저장할 슬라이스 선택
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// configureStore로 store 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;