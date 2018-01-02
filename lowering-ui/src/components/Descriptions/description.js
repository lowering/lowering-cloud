import React from 'react';
import { Col } from 'antd';
import styles from './index.less';
import responsive from './responsive';

const Description = ({ term, column, className = '', children, ...rest }) => {
    return (
        <Col className={[styles.description,className].join(' ')} {...responsive[column]} {...rest}>
            {term && <div className={styles.term}>{term}</div>}
            {children && <div className={styles.detail}>{children}</div>}
        </Col>
    );
};

export default Description;
