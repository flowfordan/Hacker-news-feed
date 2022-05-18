import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';


export const NewsFeedPage = (props) => {
    
    let renderList;

    const {
        storiesIds, 
        isLoading, 
        loadStoriesIds, 
        storiesType, 
        currentPage, 
        maxItems} = props;

    if(storiesIds){
    renderList = storiesIds.map(item => {
        return (
        <Link key={item} to={`/story/${item}`}>
            <NewsFeedItem  storyId={item}/>
        </Link>
        )
    })}
    
    //view when we dont have ANY news yet
    const preloaderView = isLoading && !storiesIds? <span className={styles.loaderWrap}>Preparing stories</span> : null;
    //loader for scrolling
    const listScrollLoader = isLoading? <span className={styles.loaderWrap}><Spinner type={'large'}/></span> : null;

    return(
        <div className={styles.feedWrapper}>
            <div className={styles.refreshWrap}>
                <div className={styles.refreshSticky}>
                    
                    <div className={styles.btnWrap}>
                    <Button appearance={'primary'} 
                    arrow={'none'} 
                    onClick={() => loadStoriesIds(storiesType, currentPage)} 
                    isLoading={isLoading} disabled={isLoading}>
                        Refresh Feed
                    </Button>
                    </div>
                    
                </div>
                
            </div>
            <div className={styles.newsList} >
                {preloaderView}
                {renderList}
                {listScrollLoader}
                {storiesIds && storiesIds.length === maxItems? 
                <div>That's all for now</div>: null}

            </div>
        </div>
    )
} 