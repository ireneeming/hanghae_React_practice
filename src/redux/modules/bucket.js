// bucket.js
import {db} from '../../firebase';
import {collection,getDoc, getDocs, addDoc, doc, updateDoc,deleteDoc} from 'firebase/firestore';


// Actions 타입을 정해주는 부분
//const LOAD = 'my-app/widgets/LOAD'; 서버에서 가져오는 용
// const CREATE = 'my-app/widgets/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';


const LOAD = 'bucket/LOAD';
//bucket에서 필요한 타입이 무엇인지 파악하고 적어주기
const CREATE = 'bucket/CREATE';
//action type 지정하기
const UPDATE = 'bucket/UPDATE';
const DELETE = 'bucket/DELETE'; 





//초기 값 정해주는 부분, 딕셔너리 형태로 저장
const initialState ={
    // list: ["영화관 가기", "매일 책읽기", "수영 배우기", "코딩 배우기"],
    list: [],
};


// Action Creators 액션 생성 함수
export function createBucket(bucket){
    //액션 객체를 리턴 하기 위해 {} 위에 bucket 은 들어올 데이터
    return {type:CREATE, bucket:bucket };
}
export function updateBucket(bucket_index){
    // console.log("지울 버킷 인덱스", bucket_index)
    return {type:UPDATE, bucket_index };
}


export function deleteBucket(bucket_index){
    // console.log("지울 버킷 인덱스", bucket_index)
    return {type:DELETE, bucket_index };
}
//firestore
export function loadBucket(bucket_fire){
    return{type:LOAD, bucket_fire};
}

//middlewares //bucket list 불러들여오기
export const loadBucketFB = () => {
    return async function(dispatch) {
        const bucket_data = await getDocs(collection(db, 'bucket'));
        //console.log(bucket_data);
        let bucket_fire =[];

        bucket_data.forEach((b)=> {
            bucket_fire.push({id:b.id, ...b.data()});
        });
        console.log(bucket_fire)

        dispatch(loadBucket(bucket_fire));
    }
}
//데이터 추가하기
export const addBucketFB = (bucket) => {
    return async function(dispatch) {
      const docRef = await addDoc(collection(db,'bucket'),bucket);
      //그냥 이렇게 콘솔로그하면 추가한 값 안나옴 console.log(docRef);
        ///getDoc 으로 가져와야 추가한 값 콘솔로 찍을 수 있음 console.log((await getDoc(docRef)).data());

        // const _bucket = await getDoc(docRef);
        // const bucket_data = {id:_bucket.id, ..._bucket.data()};

        const bucket_data = {id:docRef.id , ...bucket};
        //console.log(bucket_data);

        dispatch(createBucket(bucket_data));
      
    }

}

export const updateBucketFB = (bucket_id) => {
    return async function(dispatch, getState){
        
        //console.log(bucket_id); //bucket_id 안나오는문제 있었는데, load 가서 push 에 넣어주면 됨

        const docRef = doc(db, 'bucket', bucket_id);
        await updateDoc(docRef, {completed:true});

        console.log(getState().bucket);

        const _bucket_list = getState().bucket.list;
        const bucket_index = _bucket_list.findIndex((b)=>{
            return b.id === bucket_id;
        });
        dispatch(updateBucket(bucket_index));
    }

}

export const deleteBucketFB = (bucket_id) =>{
    return async function(dispatch, getState){
        if(!bucket_id){
            window.alert('아이디가 없네여');
            return ;
        }
        const docRef = doc(db, "bucket", bucket_id);
        await deleteDoc(docRef);
        const _bucket_list = getState().bucket.list;
        const bucket_index = _bucket_list.findIndex((b)=>{
            return b.id === bucket_id;
        }); 
        dispatch(deleteBucket(bucket_index));
    }
}
// Reducer
//state={} 파라미터에 기본값을 준다.빈 딕셔너라로 기본 값을 주지 않으면  undefined 로 되어버림
export default function reducer(state = initialState, action = {}) {
    //switch 로 어떨때 ~ 해 라고 명령하기
    switch (action.type) {
            // do reducer stuff
        case "bucket/LOAD": {
            return {list:action.bucket_fire};
        }
        case "bucket/CREATE": {
            const new_bucket_list = [...state.list, action.bucket];
            
            
            return {list : new_bucket_list};
        }
        case "bucket/UPDATE": {
            const new_bucket_list = state.list.map((l, index)=>{
                if(parseInt(action.bucket_index) === index){
                    return {...l, completed:true};
                }else{return l;}
            });
            return {list: new_bucket_list};
        }
        case "bucket/DELETE": {
            // console.log(state, action);
            //filter 함수로 클릭한 인덱스 파일 인덱스는 false 처리하기
            const new_bucket_list = state.list.filter((list,index)=>{
                return parseInt(action.bucket_index) !== index;
            })
            //state 바꿔주기
            return {list:new_bucket_list};
        }
       

        default: return state;
    }
}

//store을 만들고 component 가 store을 구독하게 만들기가 필요함
// redux  폴더 안에 configStore.js 파일 만들고 거기로 고고!