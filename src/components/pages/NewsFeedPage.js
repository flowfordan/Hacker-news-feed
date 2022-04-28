import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';
import { Link } from 'react-router-dom';

const apiService = new APIService();



export const NewsFeedPage = () => {

    const [storiesIds, setIds] = useState(null)
    const [isLoading, toggleLoading] = useState(false)



    const loadStoriesIds = () => {
        toggleLoading(true) 
        apiService.getStoriesList()
        .then(data => {
            setIds(data)
            toggleLoading(false) 
        })
    }


    useEffect(
        () => {
            loadStoriesIds()
        }, 
        []
    )

    //on unmount
    useEffect(() => () => {
        return () => {
            apiService.listController.abort()
        }
    }, [])

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
    renderList = storiesIds.map((item, idx) => {
        return (
        <Link key={item} to={`/story/${item}`}>
            <NewsFeedItem  storyId={item} extended={false}/>
        </Link>
        )
    })}
    

    const PreloaderView = () => {
        return (isLoading? <span>Loading stories</span> : null)
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