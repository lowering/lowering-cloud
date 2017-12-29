import React from 'react';
import {Motion, spring} from 'react-motion';
import Header from './header';
import styles from './index.less';

class Drawer extends React.PureComponent {

    render () {
        const { start = -1000, width = 1000, end = 0, children , title , extra, close = ()=>{} } = this.props;
        return (

            <Motion defaultStyle={{x: start}} style={{x: spring(end)}}>
                {
                    value => {
                        const hide = value.x === start;
                        let classes = [styles["drawer-mask"]];
                        if (start === end) {
                            classes.push(styles.hide);
                        }
                        const ele = (
                            <div className={styles.drawer}>
                                <div className={classes.join(' ')} onClick={close }></div>
                                <div className={styles["drawer-content"]} style={{width: `${width}px`,right:`${value.x}px`}}>
                                    <Header title={title} extra={extra} close={close}/>
                                    <div className={styles["drawer-body"]}>
                                        { children }
                                    </div>
                                </div>
                            </div>
                        );
                        return  ele;
                    }
                }
            </Motion>
        );
    }
}

export default Drawer;
