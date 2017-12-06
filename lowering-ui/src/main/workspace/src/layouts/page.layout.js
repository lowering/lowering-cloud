import React from 'react';
import { Link } from 'dva/router';
import Header from '../components/header/page.header';

import styles from './page.layout.less';


const PageLayout = ({ children, ...others}) => {
    return (
        <div style={{ margin: '-24px -24px 0' }}>
            <Header {...others} link={Link}/>
            {children ? <div className={styles.content}>{children}</div> : null}
        </div>
    );
}

export default PageLayout;