import {createStore, combineReducers} from 'redux';
import bucket from './modules/bucket';

//rootReducer => 리듀서들을 묶은 것
const rootReducer = combineReducers({bucket});



const store = createStore(rootReducer);

export default store;

//여기까지가 스토어 만들기!
//이제 컴포넌트와 리덕트를 연결하는게 필요함!
//index.js 로 이동!


