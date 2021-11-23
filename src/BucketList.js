import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const BucketList = (props) => {
    let history = useHistory();
    //console.log(props);
    //const my_lists = props.list;
    //지금까지는 app.js 에서 주는 props , 그 props 중에 list 를 가져다가 아래에서 map 을 돌렸음.
    //이제는 리덕스에서 데이터를 가지고 오는걸을 할거임 -> 1. 리덕스 임포트 하기

    //2. data 라는 상수를 지정 후 리덕스가 가지고있는 모든 데이터를 가지고 온다. useSelector안에 화살표 함수 쓰기
    //state 는 이 스토어가 가지고 있는 전체 데이터 , => 중괄호 없이 쓰면 리턴되는 값.
    const my_lists = useSelector((state) => state.bucket.list);


    return (
        <ListStyle>
            { my_lists && my_lists.map((list, index) => {
                    return (
                        <ItemStyle completed={list.completed} className="list_item" key={index} onClick={() => {
                            history.push('/detail/'+index);
                        }}>
                            {list.text}
                        </ItemStyle>
                    );
                })}
        </ListStyle>
    );
    
};

const ListStyle = styled.div `
    
    display: flex;
    flex-direction: column;
   
    overflow-x: hidden;
    overflow-y: auto;
`;

const ItemStyle = styled.div `
    padding: 16px;
    margin: 8px;
    background-color: ${(props)=>props.completed? 'orange': "aliceblue"};

`;

export default BucketList;