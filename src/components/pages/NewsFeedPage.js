import { useCallback, useContext, useEffect, useState , useRef} from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Spinner } from '../Spinner/Spinner';
import { APIServiceContext } from '../../context/apiContext';
import { useParams } from 'react-router-dom';


export const NewsFeedPage = () => {
    
    //get url
    //4 types: home, new, top, best
    //depending on page - assign 
    const {storiesType} = useParams();
    console.log('render')
    const apiService = useContext(APIServiceContext)
    const startPage = 1;
    const loadStep = 20;
    const maxItems = 100;
    const maxPage = maxItems/loadStep;

    let renderList;

    const [storiesIds, setIds] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [currentPage, setPage] = useState(startPage);
        
    const getStoriesData = (type, pageToLoad, step) => {
        return apiService.getStoriesIds(type, pageToLoad, step)
        
    };

    const loadStoriesIds = useCallback(
        (type, page, step) => {
            let pageToLoad = page;
            if(pageToLoad > maxPage){
                pageToLoad = maxPage;
            }
            if(pageToLoad <= maxPage){
                toggleLoading(true);
                console.log('loadStories ids', pageToLoad) 
                getStoriesData(type, pageToLoad, step)
                .then(data => {
                    setIds(data);
                    toggleLoading(false);  
                }) 
            }
        },
        [currentPage]
    )

   

    const handleScroll = (e) => {
        if(
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ){
            setPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        console.log('START', currentPage, maxPage, loadStoriesIds)
        if(currentPage <= maxPage){
            loadStoriesIds(storiesType, currentPage, loadStep) 
        }
    }
    ,[currentPage, maxPage, loadStoriesIds, storiesType]);



    const intervalRef1 = useRef(null);
    const intervalRef2 = useRef(null);
    console.log(intervalRef1.current)
    useEffect(() => {
        //start timer 2
        //if timer 1 - clear
        console.log(intervalRef1)
        console.log(intervalRef2)
        if(intervalRef1.current){
            clearInterval(intervalRef1.current);
            clearInterval(intervalRef2.current);
            intervalRef2.current = setInterval(() => loadStoriesIds(storiesType, currentPage, loadStep), 60000);
            // intervalRef2.current = timer2
        }
        // else if(intervalRef2.current){
        //     clearInterval(intervalRef2.current);
        //     clearInterval(intervalRef1.current);
        //     intervalRef1.current = setInterval(() => console.log('timer1', storiesType), 2000);
        // }
        else if(!intervalRef1.current && !intervalRef2.current){
            intervalRef1.current = setInterval(() => loadStoriesIds(storiesType, currentPage, loadStep), 60000);
        }
    },
    [storiesType])


    //on mounting
    useEffect(
        () => {
            let refreshTimer = setInterval(() => loadStoriesIds(storiesType, currentPage, loadStep), 60000);
            window.addEventListener("scroll", handleScroll);

            //on unmounting
            return () => {
                clearInterval(refreshTimer);
                //apiService.feedItemController.abort();
                document.removeEventListener("scroll", handleScroll);
            };
        }, 
        []
    )

        
    
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
                    onClick={() => loadStoriesIds(storiesType, currentPage, loadStep)} 
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