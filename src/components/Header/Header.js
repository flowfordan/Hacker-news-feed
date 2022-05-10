import styles from './Header.module.css';


export const Header = () => {



  
  
  return (
    <div className={styles.headWrapper}>
        <span className={styles.logo}>Hacker News</span>
        <span className={styles.stories}>latest stories</span>
        <span className={styles.credit}>flowfordan</span>
    </div>
  );
};
