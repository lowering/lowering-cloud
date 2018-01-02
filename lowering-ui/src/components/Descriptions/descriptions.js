import React from 'react';
import { Row } from 'antd';
import styles from './index.less';

export default ({ className='', title, col = 3, layout = 'horizontal', gutter = 32, children, size='small', ...rest }) => {
    const column = col > 4 ? 4 : col;
    return (
        <div className={[styles['descriptions'],styles[layout],className,styles[`descriptions-${size}`]].join(' ')} {...rest}>
            {title ? <div className={styles.title}>{title}</div> : null}
            <Row gutter={gutter}>
                {React.Children.map(children, child => React.cloneElement(child, { column }))}
            </Row>
        </div>
    );
};
