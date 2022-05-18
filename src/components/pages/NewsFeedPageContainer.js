import { useCallback, useContext, useEffect, useState , useRef} from 'react';
import { APIServiceContext } from '../../context/apiContext';
import { useParams } from 'react-router-dom';
import { NewsFeedPage } from './NewsFeedPage';


export const NewsFeedPageContainer = () => {
    
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


    const [storiesIds, setIds] = useState([]);
    const [isLoading, toggleLoading] = useState(false);
    const [currentPage, setPage] = useState(startPage);
        
    const getStoriesData = (type, page) => {
        return apiService.getStoriesIds(type, page, loadStep)
        
    };

    const loadStoriesIds = useCallback(
        (type, page) => {
            let pageToLoad = page;
            if(pageToLoad > maxPage){
                pageToLoad = maxPage;
            }
            if(pageToLoad <= maxPage){
                toggleLoading(true);
                console.log('loadStories ids', pageToLoad) 
                getStoriesData(type, pageToLoad)
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
            setPage(prevPage => prevPage >= maxPage? prevPage : prevPage + 1);
        }
    };

    useEffect(() => {
        console.log('START', currentPage, maxPage, storiesType)
        if(currentPage <= maxPage){
            loadStoriesIds(storiesType, currentPage) 
        }
    }
    ,[currentPage, maxPage, loadStoriesIds, storiesType]);



    const intervalRef1 = useRef(null);
    const intervalRef2 = useRef(null);
 
    useEffect(() => {
        setPage(startPage)
        if(intervalRef1.current){
            clearInterval(intervalRef1.current);
            clearInterval(intervalRef2.current);
            intervalRef2.current = setInterval(() => loadStoriesIds(storiesType, currentPage), 60000);
        }
        else if(!intervalRef1.current && !intervalRef2.current){
            intervalRef1.current = setInterval(() => loadStoriesIds(storiesType, currentPage), 60000);
        }

        //on unmounting
        return () => {
            clearInterval(intervalRef1.current);
            clearInterval(intervalRef2.current);
        };
    },
    [storiesType])


    //on mounting
    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll);

            //on unmounting
            return () => {
                //apiService.feedItemController.abort();
                document.removeEventListener("scroll", handleScroll);
            };
        }, 
        []
    )

    return(
        <NewsFeedPage 
        storiesIds={storiesIds} 
        isLoading={isLoading} 
        loadStoriesIds={loadStoriesIds} 
        storiesType={storiesType}
        currentPage={currentPage} 
        maxItems={maxItems}/>
    )
} 