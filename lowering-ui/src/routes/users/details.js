import React from 'react';
import Drawer from '../../components/drawer';

class Details extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

    toggle = ()=> {
        this.setState({show:!this.state.show})
    };

    render () {
        const { id, username } = this.props.data;
        const { show } = this.state;
        return (
            <div>
                <a href="javascript:void(0);" onClick={this.toggle}>{username}</a>
                <Drawer
                    end={ show ? 0 : -1000 }
                    close={ this.toggle }
                    title={ <span>{username}</span> }
                    extra={ <div>{username}的详细信息</div> }
                />
            </div>

        );
    }

}
export default Details;
