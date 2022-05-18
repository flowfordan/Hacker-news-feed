import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';


export const Header = () => {



  
  
  return (
    <div className={styles.headWrapper}>
        <span className={styles.logo}>Hacker News</span>
        
        <span className={styles.stories}>
          <NavLink to={`/newstories`} 
          className={ ({ isActive }) => (isActive ? styles.storiesLinkActive : styles.storiesLink)}>
            <span>latest stories</span>
          </NavLink>
          <NavLink to={`/topstories`} 
          className={ ({ isActive }) => (isActive ? styles.storiesLinkActive : styles.storiesLink)}>
            <span>top stories</span>
          </NavLink>
          <NavLink to={`/beststories`} 
          className={ ({ isActive }) => (isActive ? styles.storiesLinkActive : styles.storiesLink)}>
            <span>best stories</span>
          </NavLink>
        </span>
        
        <span className={styles.credit}>flowfordan</span>
    </div>
  );
};
