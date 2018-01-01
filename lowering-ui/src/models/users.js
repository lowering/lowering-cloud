import {
    findAll,
    findOne
} from '../services/users.service';

export default {

    namespace: 'users',

    state: {
        users:[],
        details: undefined,
        detailsLoading:false
    },

    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        *findAll({ payload }, { call, put }) {
            let data = yield call(findAll);
            yield put({
                type:'findAllSuccess',
                payload:{
                    users: data
                }
            })
        },
        *findOne({payload}, { call, put }){
            yield put({type:'findOneLoading',payload:{detailsLoading:true}});
            const { id } = payload;
            let data = yield call(findOne,id);
            yield put({type:'findOneLoading',payload:{detailsLoading:false}});
            yield put({
                type:'findOneSuccess',
                payload:{
                    details: data
                }
            })
        }
    },

    reducers: {
        findAllSuccess(state, action) {
            return { ...state, ...action.payload };
        },
        findOneSuccess(state, action) {
            return { ...state, ...action.payload };
        },
        findOneLoading(state, action) {
            return { ...state, ...action.payload }
        }
    },

};
