import { routerRedux } from 'dva/router';
import { routes } from '../routes';
import { isAuthenticated } from "../utils";

export default {
    namespace: 'global',
    state: {
        collapsed: false,
        menus: routes,
        authentication: {
            name: '管理员',
            avatar: ''
        }

    },
    subscriptions: {
        step({ dispatch, history }){
            history.listen(({ pathname, search }) => {
                if (!isAuthenticated()){
                    if (pathname !== '/login'){
                        dispatch(routerRedux.push({pathname:'/login'}));
                    }
                }
            });
        }
    },

    effects: {

    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload.collapsed,
            };
        },
    }
}
