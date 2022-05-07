import styles from './Button.module.css';
import arrowIcon from './arrow-icon.svg';
import cn from 'classnames';

export const Button = (props) => {

    const {appearance, children, arrow} = props

    return (
        <button className={cn(styles.button, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost',
        })}
        {...props}>
            {children}
            {arrow !== 'none' && <span className={cn(styles.arrow, {
                [styles.down]: arrow === 'down'
            })}> <img src={arrowIcon} alt='arrow' className={styles.img}></img>
                </span>}
        </button>
    );
    
};