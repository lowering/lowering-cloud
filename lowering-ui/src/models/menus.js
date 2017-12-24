import {findAll} from '../services/menus.service';

export default {

    namespace: 'menu',

    state: {
        menus:[]
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
                    menus: data
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
