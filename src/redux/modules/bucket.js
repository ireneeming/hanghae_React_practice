// bucket.js


// Actions 타입을 정해주는 부분
//const LOAD = 'my-app/widgets/LOAD'; 서버에서 가져오는 용
// const CREATE = 'my-app/widgets/CREATE';
// const UPDATE = 'my-app/widgets/UPDATE';
// const REMOVE = 'my-app/widgets/REMOVE';

//bucket에서 필요한 타입이 무엇인지 파악하고 적어주기
const CREATE = 'bucket/CREATE';
//action type 지정하기
const UPDATE = 'bucket/UPDATE';
const DELETE = 'bucket/DELETE'; 



//초기 값 정해주는 부분, 딕셔너리 형태로 저장
const initialState ={
    // list: ["영화관 가기", "매일 책읽기", "수영 배우기", "코딩 배우기"],
    list: [
        { text: "영화관 가기", completed: false },
        { text: "매일 책읽기", completed: false },
        { text: "수영 배우기", completed: false },
        { text: "코딩 배우기", completed: false },
    ],
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


// Reducer
//state={} 파라미터에 기본값을 준다.빈 딕셔너라로 기본 값을 주지 않으면  undefined 로 되어버림
export default function reducer(state = initialState, action = {}) {
    //switch 로 어떨때 ~ 해 라고 명령하기
    switch (action.type) {
            // do reducer stuff
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