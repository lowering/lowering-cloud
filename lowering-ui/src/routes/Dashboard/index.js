import React from 'react';
import OverviewLayout from '../../layouts/overview.layout';
import Drawer from '../../components/Drawer/index';

export default class Dashboard extends React.PureComponent {

    render () {
        return (
            <OverviewLayout title="Dashboard">
                <div>Dashboard</div>
            </OverviewLayout>
        );
    }

}
