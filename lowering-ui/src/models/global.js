import { routerRedux } from 'dva/router';
import { isAuthenticated } from '../utils';

export default {

    namespace: 'global',

    state: {
        collapsed: false
    },

    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({pathname})=>{
                if (!isAuthenticated()){
                    if (pathname !== '/login'){
                        dispatch(routerRedux.push({pathname:'/login'}));
                    }
                }
            })
        },
    },

    effects: {

    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {...state, collapsed: payload};
        },
    },

};
