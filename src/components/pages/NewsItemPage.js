import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APIService } from '../../services/apiService';
import { ItemComments } from '../ItemComments/ItemComments';
import { StoryItem } from '../StoryItem/StoryItem';
import styles from './NewsItemPage.module.css';

const apiService = new APIService();


export const NewsItemPage = () => {

    //get id from url
    const itemId = useParams().storyId;
    console.log(itemId)

    const [isLoading, toggleLoading] = useState(false);
    const [isUpdatingComments, toggleUpdatingComments] = useState(false);

    const [storyData, setData] = useState({
        id: itemId,
        author: null,
        date: null,
        rating: 0,
        title: null,
        url: null,
        commentsNum: 0
    })

    const [commentsIdsData, setCommentsIdsData] = useState([])


    const getStoryData = () => {
        toggleLoading(true);
        toggleUpdatingComments(true);
        apiService.getStory(itemId)
            .then(data => {
                setData({
                    id: data.id,
                    author: data.author,
                    date: data.date,
                    rating: data.rating,
                    title: data.title,
                    url: data.url,
                    commentsNum: data.commentsNum 
                });
                setCommentsIdsData({commentsIds: data.commentsIds})
                toggleLoading(false);
                toggleUpdatingComments(false);
            })
    };

    const updComments = () => {
        toggleUpdatingComments(true);
        apiService.getStory(itemId)
            .then(data => {
                setCommentsIdsData({commentsIds: data.commentsIds})
                toggleUpdatingComments(false);  
            }
            )
                    
    }

    useEffect(
        () => {
            getStoryData();
            let refreshTimer = setInterval(() => updComments(), 60000);

            //on unmount
            return () => {
                //clear timer, clear comments api request
                clearInterval(refreshTimer);  
            };
        },
        [])

    
    
    
    

    const renderView = 
        <>
            <StoryItem storyData={storyData}/>
            <ItemComments commentsIds={commentsIdsData}/>
        </>
    
    
    const preloaderView = isLoading? <span>Loading</span> : null
    

    return(
        <div className={styles.pageWrapper}>
            <div className={styles.deskWrapper}>
                <div className={styles.desk}>
                <Link to='/'>
                    <button>
                        Back
                    </button>
                </Link>
                <button onClick={updComments}>Update comments</button>
                <div>{isUpdatingComments? 'updating...' : null}</div>
                </div>
            </div>
            <div className={styles.itemWrapper}>
                {preloaderView}
                {renderView}
            </div>
        </div>
    )
} 