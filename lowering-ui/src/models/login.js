import { login } from '../services/login.service';
import { isToken,storeToken,removeToken } from '../utils';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'login',
    state: {
        status: undefined,
        submitting: false
    },
    effects: {
        * login({payload},{call,put}){
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
                storeToken(data['access_token']);
                yield put(routerRedux.push("/"));
            } else {
                removeToken();
            }
        },
        * logout(_,{put}){
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                },
            });
            removeToken();
            console.log('logout')
            yield put(routerRedux.push('/login'));
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
