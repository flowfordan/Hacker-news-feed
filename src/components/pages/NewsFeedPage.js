import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';

const apiService = new APIService();



export const NewsFeedPage = () => {
    
    const startPage = 1;
    const loadStep = 20;
    const maxItems = 100;
    const maxPage = maxItems/loadStep;
    const [storiesIds, setIds] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [currentPage, setPage] = useState(startPage);
    

    const handleScroll = (e) => {
        if(
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ){
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        if(currentPage <= maxPage){
            loadStoriesIds(currentPage, loadStep) 
        }
    }
    ,[currentPage, maxPage])


    const loadStoriesIds = (page, step) => {
        if(page > maxItems/loadStep){
            page = maxItems/loadStep
        }
        if(page <= maxItems/loadStep){
            toggleLoading(true) 
            apiService.getStoriesIds(page, step)
            .then(data => {
                setIds(data);
                toggleLoading(false);  
            }) 
        }
        
    }


    //on mounting
    useEffect(
        () => {
            loadStoriesIds(startPage, loadStep);
            let refreshTimer = setInterval(() => loadStoriesIds(currentPage, loadStep), 60000);
            window.addEventListener("scroll", handleScroll);

            //on unmounting
            return () => {
                clearInterval(refreshTimer);
                apiService.feedItemController.abort();
                document.removeEventListener("scroll", handleScroll);
            };
        }, 
        []
    )

        
    let renderList
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
    const listScrollLoader = isLoading? <span className={styles.loaderWrap}><Spinner type={'large'}/></span> : null;
    
    
    
   

    return(
        <div className={styles.feedWrapper}>
            <div className={styles.refreshWrap}>
                <div className={styles.refreshSticky}>
                    
                    <div className={styles.btnWrap}>
                    <Button appearance={'primary'} 
                    arrow={'none'} 
                    onClick={() => loadStoriesIds(currentPage, loadStep)} 
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