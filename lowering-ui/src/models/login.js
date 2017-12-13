import { login } from '../services/users.service';
import { isToken } from '../utils';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'login',
    state: {
        status: undefined,
        submitting: false
    },
    effects: {
        * login({payload},{call,put}){
            console.log(payload);
            yield put({
                type: 'changeSubmitting',
                payload: {
                    submitting: true
                },
            });
            //登录
            const data = yield call(login,payload);
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: isToken(data['access_token'])?'ok':'error'
                },
            });
            //登录成功
            if (isToken(data['access_token'])) {
                yield put(routerRedux.push('/'));
            }
        },
        * logout(){

        }
    },
    reducers: {

        changeLoginStatus(state, { payload }) {
            return {
                ...state,
                status: payload.status,
                submitting: false,
            };
        },

        changeSubmitting(state,action){
            return {...state,...action.payload};
        }
    }
}
