import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import GenericLayout from './layouts/generic.layout';
import NotFound from './routes/exception/404';

function RouterConfig({app, history }) {

    return (
        <LocaleProvider locale={zhCN}>
            <Router history={history}>
                <Switch>
                    <Route path="/" component={GenericLayout} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
