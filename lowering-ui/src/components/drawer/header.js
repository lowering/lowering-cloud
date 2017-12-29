import React from 'react';
import { Button} from 'antd';
import styles from './index.less';

export default ({ title, extra, close }) => {
    return (
        <div className={styles["drawer-header"]}>
            <div className={styles["drawer-title"]}>
                { title }
            </div>
            { extra ? <div className={styles["drawer-extra"]}>{extra}</div> : null }
            <div className={styles["drawer-close"]}>
                <Button shape="circle" icon='close' onClick={close} />
            </div>
        </div>
    );
}
