import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import bucket from './modules/bucket';
//rootReducer => 리듀서들을 묶은 것
const middlewares = [thunk];
const rootReducer = combineReducers({bucket});
const enhancer = applyMiddleware(...middlewares);


const store = createStore(rootReducer, enhancer);

export default store;

//여기까지가 스토어 만들기!
//이제 컴포넌트와 리덕트를 연결하는게 필요함!
//index.js 로 이동!


