import React from 'react';
import { Layout } from 'antd';

import styles from './index.less';

export default ({className,links,copyright}) => {

    return (
        <Layout.Footer style={{padding:0}}>
            <div className={[styles.footer,className].join(' ')}>
                {
                    links && (
                        <div className={styles.links}>
                            {links.map(link => (
                                <a
                                    key={link.title}
                                    target={link.target || '_self'}
                                    href={link.href}
                                >
                                    {link.title}
                                </a>
                            ))}
                        </div>
                    )
                }
                {copyright && <div className={styles.copyright}>{copyright}</div>}
            </div>
        </Layout.Footer>
    );
}
