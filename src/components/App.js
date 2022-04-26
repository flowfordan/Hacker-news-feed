import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import { NewsFeedPage } from './pages/NewsFeedPage';
import { NewsItemPage } from './pages/NewsItemPage';

function App() {
  
  return (
    <div className={styles.appWrapper}>
      <div className={styles.appHeader}>
        Head
      </div>
      <div className={styles.appBody}>
        <Routes>
          <Route path='/' element={<NewsFeedPage />}/>
          <Route path='/news/:newId' element={<NewsItemPage />}/>
          <Route path='*' element={<div>404</div>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
