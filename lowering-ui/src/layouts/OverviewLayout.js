import React from 'react';
import { Link } from 'dva/router';
import Overview from '../components/Overview';
import styles from './OverviewLayout.less';

export default ({ children, wrapperClassName, top, ...restProps }) => (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
        {top}
        <Overview {...restProps} linkElement={Link} />
        {children ? <div className={styles.content}>{children}</div> : null}
    </div>
);
