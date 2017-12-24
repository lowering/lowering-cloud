import React from 'react';
import styles from './index.less';

export default ({children}) => {

    return (
        <div className={styles.wrapper} style={{display: 'none'}}>
            { children || null }
        </div>
    );
}
