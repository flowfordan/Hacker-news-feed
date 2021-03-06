import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import { NewsItemPage } from './pages/NewsItemPage';
import { Header } from './Header/Header';
import { APIService } from '../services/apiService';
import { APIServiceContext } from '../context/apiContext';
import { NewsFeedPageContainer } from './pages/NewsFeedPageContainer';


const apiService = new APIService();

const App = () => {
  //topstories, /beststories, newstories
  return (
    <APIServiceContext.Provider value={apiService}>
    <div className={styles.appWrapper}>
      <div className={styles.appHeader}>
        <Header />
      </div>
      <div className={styles.appBody}>
        <Routes>
          <Route path='/' element={<NewsFeedPageContainer />}/>
          <Route path='/:storiesType' element={<NewsFeedPageContainer />}/>
          <Route path='/story/:storyId' element={<NewsItemPage />}/>
          <Route path='*' element={<div>404</div>}/>
        </Routes>
      </div>
    </div>
    </APIServiceContext.Provider>
  );
}

export default App;
