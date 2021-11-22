import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { deleteBucket ,updateBucket } from './redux/modules/bucket';


const Details = (props) => {
    const params = useParams();
    const bucket_index = params.index;
   //data를 가지고 올때는 useSelector 이용
   const bucket_list = useSelector((state) => state.bucket.list);
   const dispatch = useDispatch();

   const history = useHistory();

//    console.log (bucket_list);
//    console.log(bucket_list[bucket_index]);
    return (
        <div> 
            <h1>{bucket_list[bucket_index].text}</h1>
            <button onClick={()=>{
                dispatch(updateBucket(bucket_index));
                history.goBack();
            }}>완료하기</button>
            <button onClick ={()=>{ 
                console.log('삭제하기 버튼 누르기');
                dispatch(deleteBucket(bucket_index));
                history.goBack();
            }}>삭제하기</button>
        </div>
       


    );
}
export default Details;