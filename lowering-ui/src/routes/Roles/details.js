import React from 'react';
import BaseDetails from '../../components/BaseDetails';

class Details extends React.PureComponent {


    render () {
        const { text } = this.props;
        return (
            <BaseDetails id={'123123'} text={text} title={<span>{text}</span>}>
                <div>Role {text} Details</div>
            </BaseDetails>
        );
    }
}

export default Details;
