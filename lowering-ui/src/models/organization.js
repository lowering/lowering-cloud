import { findAll } from '../services/OrganizationService';

export default {

    namespace: 'organization',

    state: {
        organizations:[]
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
                    organizations: data
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
