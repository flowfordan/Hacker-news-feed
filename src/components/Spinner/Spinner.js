import styles from './Spinner.module.css';
import spinnerAnim from './spinner.svg';

export const Spinner = () => {

    return (
        <div className={styles.wrapper}>
            <img src={spinnerAnim} alt='spinner' className={styles.img}></img>
            
        </div>
    );
    
};