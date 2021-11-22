import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/configStore';


ReactDOM.render(
     <Provider store={store}>  
     {/* //Provider 컴포넌트랑 store 가지고 와서 감싸주면 끝이라는데? 이게 컴포넌트랑 리덕스 연결하기임 */}
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,

    document.getElementById(
        'root'
    )
);

// If you want to start measuring performance in your app, pass a function to
// log results (for example: reportWebVitals(console.log)) or send to an
// analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
