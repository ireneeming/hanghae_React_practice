import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Progress = (props)=>{

    const bucket_list = useSelector((state)=> state.bucket.list);
    let count = 0 ;

    bucket_list && bucket_list.map((b,idx) => {
        if(b.completed){
            count++;
        }
    });
    return (
        <PrgBar>
            <HightLight width={(count / bucket_list.length )*100 + '%'}>
             <Circle />
            </HightLight>
        </PrgBar>
    );
}


const PrgBar = styled.div`
width:100%;
height:20px; 
background:#eee;
border-radius:10px;

`;

const HightLight = styled.div`
width:${(props)=> props.width};
height:20px; 
border-radius:10px;
background:orange;
transition:width .5s ;
position:relative;
`;

const Circle = styled.div`
    width:30px; 
    height:30px; 
    border-radius:50%;
    background:#fff;
    border:5px solid orange;
    box-sizing:border-box;
    
    position:absolute;
    right:-18px;
    top:-4px;

`;


export default Progress;