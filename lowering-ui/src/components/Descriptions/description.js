import React from 'react';
import classNames from 'classnames';
import { Col } from 'antd';
import styles from './index.less';
import responsive from './responsive';

const Description = ({ term, column, className, children, ...rest }) => {
    const classes = classNames(styles.description, className);
    return (
        <Col className={classes} {...responsive[column]} {...rest}>
            {term && <div className={styles.term}>{term}</div>}
            {children && <div className={styles.detail}>{children}</div>}
        </Col>
    );
};

export default Description;
