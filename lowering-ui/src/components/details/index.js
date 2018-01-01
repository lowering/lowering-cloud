import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '../Drawer/index';
import styles from './index.less';

class Details extends React.PureComponent {

    state = {
        open: false,
    };

    toggle = ()=>{
        this.setState({open:!this.state.open});
    };

    render () {

        const { text, title, extra, children } = this.props;
        const { open } = this.state;

        return (
            <div>
                <a href="javascript:" onClick={this.toggle}>{text}</a>
                <Drawer
                    open={open}
                    size={600}
                    onChange={this.toggle}
                >
                    <div className={styles.details}>
                        <div className={styles["details-header"]}>
                            <div className={styles["details-title"]}>{title}</div>
                            <div className={styles["details-extra"]}>{extra}</div>
                        </div>
                        <div className={styles["details--body"]}>
                            { children }
                        </div>
                    </div>
                </Drawer>
            </div>

        );
    }
}

Details.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.element.isRequired]),
    title: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
    extra: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
    id: PropTypes.string
};

export default Details;
