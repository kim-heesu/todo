import {combineReducers} from '@reduxjs/toolkit';
// slice 추가
// 예시
// import couterReducer from '../featrues/counter/conuterSlice';

const rootReducer = combineReducers({
    // 임포트한 슬라이스 이름 추가
    // 예시
    // counter: counterReducer,
});

export default rootReducer;