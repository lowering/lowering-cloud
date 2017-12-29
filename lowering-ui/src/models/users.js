import {findAll} from '../services/users.service';

export default {

    namespace: 'users',

    state: {
        users:[],
        details: undefined
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

        }
    },

    reducers: {
        findAllSuccess(state, action) {
            return { ...state, ...action.payload };
        },
        findOneSuccess(state, action) {
            return { ...state, ...action.payload };
        }
    },

};
