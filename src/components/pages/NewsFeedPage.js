import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';
import { Link } from 'react-router-dom';

const apiService = new APIService();



export const NewsFeedPage = () => {

    const [storiesIds, setIds] = useState(null);
    const [isLoading, toggleLoading] = useState(false);
    
    const loadStoriesIds = () => {
        toggleLoading(true) 
        apiService.getStoriesIds()
        .then(data => {
            setIds(data)
            toggleLoading(false) 
        })
    }


    useEffect(
        () => {
            loadStoriesIds();
            let refreshTimer = setInterval(() => loadStoriesIds(), 60000);

            //on unmounting
            return () => {
                console.log('unmount feed')
                clearInterval(refreshTimer);
                apiService.feedItemController.abort()  
            };
        }, 
        []
    )

    useEffect(
        () => {
            if(!storiesIds){
                toggleLoading(true)
            }else{
                toggleLoading(false) 
            }
        },
        [storiesIds]
    )
        
    let renderList
    if(storiesIds){
    const lazyList = storiesIds.slice(0, 20)
    renderList = lazyList.map(item => {
        return (
        <Link key={item} to={`/story/${item}`}>
            <NewsFeedItem  storyId={item}/>
        </Link>
        )
    })}
    
    //view when we dont have ANY news yet
    const PreloaderView = () => {
        return (isLoading && !storiesIds? <span>Preparing stories</span> : null)
    }
   

    return(
        <div className={styles.feedWrapper}>
            <div className={styles.refreshWrap}>
                <div className={styles.refreshSticky}>
                    <button className={styles.refreshBtn}
                    onClick={loadStoriesIds}>
                        Refresh
                    </button>
                    <div>{isLoading? 'fetch': null}</div>

                </div>
                
            </div>
            <ul className={styles.newsList}>
                <PreloaderView />
                {renderList}
            </ul>
        </div>
    )
} 