import styles from './Spinner.module.css';
import spinnerAnim from './spinner.svg';

export const Spinner = (props) => {

    const {type} = props

    return (
        <div className={styles.wrapper}>
            <img src={spinnerAnim} alt='spinner' 
            className={type === 'large'? styles.imgLarge : styles.img}></img>
            
        </div>
    );
    
};