import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

class Drawer extends React.PureComponent {

    computed = (type = 'right',size = 200,open = false)=>{
        let inline;
        switch (type) {
            case 'left':
                inline = {
                    'width': `${size}px`,
                    'height': '100%',
                    'transform': `translate(-${open?0:size+10}px, 0px)`
                };
                break;
            case 'top':
                inline = {
                    'width': '100%',
                    'height': `${size}px`,
                    'transform': `translate(0px, -${open?0:size+10}px)`
                };
                break;
            case 'bottom':
                inline = {
                    'width': '100%',
                    'height': `${size}px`,
                    'transform': `translate(0px, ${open?0:size+10}px)`
                };
                break;
            default:
                inline = {
                    'width': `${size}px`,
                    'height': '100%',
                    'transform': `translate(${open?0:size+10}px, 0px)`
                };
                break;
        }

        return inline;
    };

    toggle = () => {
        const {
            open,
            onChange = (open)=>{},
            onDone = ()=>{}
        } = this.props;

        onChange(open);
        setTimeout(()=>{onDone(open)},450);
    };

    render () {

        const {
            type = 'right',
            size = 200,
            open = false,
            mask = true,
            children,
            disabled = false,
        } = this.props;

        if (disabled) return null;

        if (open) {
            document.body.style.overflow='hidden';
        } else {
            document.body.style.overflow='auto';
        }

        const computed = this.computed(type,size,open);

        return (
            <div className={styles.drawer}>
                {
                    mask ? <div className={[styles["drawer-mask"],open?styles["drawer-mask--show"]:styles["drawer-mask--hide"]].join(' ')} onClick={this.toggle}/> : null
                }
                <div className={[styles["drawer-content"],styles[`drawer-content--${type}`]].join(' ')} style={{...computed}}>
                    { children }
                </div>
            </div>
        );
    }

}

Drawer.propTypes = {
    type: PropTypes.oneOf(['left','top','right','bottom']),
    size: PropTypes.number,
    open: PropTypes.bool,
    mask: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
};

export default Drawer;
