import styles from './Button.module.css';
import arrowIcon from './arrow-icon.svg';
import cn from 'classnames';
import { Spinner } from '../Spinner/Spinner';


export const Button = (props) => {

    const {appearance, children, arrow, isLoading} = props

    return (
        <button className={cn(styles.button, {
            [styles.primary]: appearance === 'primary',
            [styles.ghost]: appearance === 'ghost',
        })}
        {...props}>
            {arrow !== 'none' && <span className={cn(styles.arrow, {
                [styles.down]: arrow === 'down'
            })}> <img src={arrowIcon} alt='arrow' className={styles.img}></img>
                </span>}
            {isLoading? <Spinner /> : children}
            
        </button>
    );
    
};