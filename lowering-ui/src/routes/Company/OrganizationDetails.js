import React from 'react';
import BaseDetails from '../../components/BaseDetails';

class OrganizationDetails extends React.PureComponent {

    render () {

        const { id, text } = this.props;

        return (
            <BaseDetails text={text} title={text}>
                {id}
            </BaseDetails>
        );
    }
}

export default OrganizationDetails;
