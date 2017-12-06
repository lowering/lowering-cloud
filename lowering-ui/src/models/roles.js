import {findAll} from '../services/roles.service';

export default {

    namespace: 'roles',

    state: {
        roles:[]
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
                    roles: data.data
                }
            })
        },
    },

    reducers: {
        findAllSuccess(state, action) {
            return { ...state, ...action.payload };
        }
    },

};
