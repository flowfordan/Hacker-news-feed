import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';
import { Link } from 'react-router-dom';

const apiService = new APIService();



export const NewsFeedPage = () => {
    
    const startPage = 1;
    const loadStep = 20;
    const maxItems = 100;
    let scroll = 0;
    const [storiesIds, setIds] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [currentPage, setPage] = useState(startPage);
    
    

    const handleScroll = (e) => {
        if(
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ){
            console.log('bottom');
            setPage(prevPage => prevPage + 1)
            
            
            // loadStoriesIds(currentPage, loadStep);
        }
    }

    useEffect(() => {
        loadStoriesIds(currentPage, loadStep)
        console.log(currentPage)
    }
        
    ,[currentPage])


    const loadStoriesIds = (page, step) => {
        if(page <= maxItems/loadStep){
           console.log('call LOAD page', page)
            toggleLoading(true) 
            apiService.getStoriesIds(page, step)
            .then(data => {
                console.log(data)
                console.log('current page', page)
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
    );

        
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
    const PreloaderView = () => {
        return (isLoading && !storiesIds? <span>Preparing stories</span> : null)
    }
   

    return(
        <div className={styles.feedWrapper}>
            <div className={styles.refreshWrap}>
                <div className={styles.refreshSticky}>
                    <button className={styles.refreshBtn}
                    onClick={() => loadStoriesIds(currentPage, loadStep)}>
                        Refresh
                    </button>
                    <div>{isLoading? 'fetch': null}</div>

                </div>
                
            </div>
            <div className={styles.newsList} >
                <PreloaderView />
                {renderList}
                {isLoading? <div>Preparing stories</div> : null}

            </div>
        </div>
    )
} 