import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';

dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" style={{ width: '100%',margin: '40px 0 !important'}} />;
});

function mixin(app,models,component){
    return dynamic({app, models:()=>models, component: component});
}

function RouterConfig({app, history }) {

    const others = {
        app,
        mixin
    };

    const Login = mixin(app,[import('./models/login')],()=>import('./routes/login'));

    const GeneralLayout = mixin(app,[import('./models/login')],()=>import('./layouts/general.layout'));

    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path='/login' render={props => <Login {...props} {...others}/>} />
                    <Route path='/' render={props => <GeneralLayout {...props} {...others}/>} />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
