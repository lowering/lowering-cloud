import React from 'react';
import classNames from 'classnames';
import { Row } from 'antd';
import styles from './index.less';

export default ({ className, title, col = 3, layout = 'horizontal', gutter = 32, children, size, ...rest }) => {
    const classes = classNames(styles['descriptions'], styles[layout], className, {
        [styles['descriptions-small']]: size === 'small',
        [styles['descriptions-large']]: size === 'large',
    });
    const column = col > 4 ? 4 : col;
    return (
        <div className={classes} {...rest}>
            {title ? <div className={styles.title}>{title}</div> : null}
            <Row gutter={gutter}>
                {React.Children.map(children, child => React.cloneElement(child, { column }))}
            </Row>
        </div>
    );
};
