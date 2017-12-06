import React from 'react';
import mixin from '../../utils/mixin';
import { connect } from 'dva';

import PageLayout from '../../layouts/page.layout';


class Dashboard extends React.Component{

    render () {
        return (
            <PageLayout>
                <div>dashboard</div>
            </PageLayout>
        );
    }
}
export default mixin([],Dashboard);