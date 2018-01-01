import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon, Button } from 'antd';
import Drawer from '../Drawer/index';
import styles from './index.less';

class BaseDetails extends React.PureComponent {

    state = {
        open: false,
        done: true
    };

    toggle = ()=>{
        const { open } = this.state;
        this.setState({open:!open});
        if (!open){
            const { onClick = ()=>{} } = this.props;
            onClick();
        }
    };

    render () {

        const { text, title, extra, children, loading = false } = this.props;
        const { open } = this.state;
        return (
            <div>
                <a href="javascript:" onClick={this.toggle}>{text}</a>
                <Drawer
                    open={open}
                    size={600}
                    onChange={this.toggle}
                >
                    {
                       open && <div className={styles.details}>
                            {
                                loading ? <div className={styles["details--loading"]}><Spin indicator={<Icon type="loading" style={{fontSize: 50}} spin />}/></div> : (
                                    <div style={{height: '100%'}}>
                                        <div className={styles["details-header"]}>
                                            <div className={styles["details-title"]}>{title}</div>
                                            { extra ? <div className={styles["details-extra"]}>{extra}</div> : null }
                                            <div className={styles["drawer-close"]}>
                                                <Button shape="circle" icon='close' onClick={this.toggle} />
                                            </div>
                                        </div>
                                        <div className={styles["details--body"]} style={{top: `${extra ? 126 : 62}px`}}>
                                            { children }
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    }

                </Drawer>
            </div>
        );
    }
}

BaseDetails.propTypes = {
    text: PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.element.isRequired]),
    title: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
    extra: PropTypes.oneOfType([PropTypes.string,PropTypes.element]),
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default BaseDetails;
