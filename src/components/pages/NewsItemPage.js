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

    const [isLoading, toggleLoading] = useState(false);
    const [isUpdatingComments, toggleUpdatingComments] = useState(false);

    const [storyData, setData] = useState({
        id: itemId,
        author: null,
        comments: null,
        date: null,
        rating: 0,
        title: null,
        url: null
    })


    const getStoryData = () => {
        toggleLoading(true);
        toggleUpdatingComments(true);
        apiService.getStory(itemId)
            .then(data => {
                setData({
                    id: data.id,
                    author: data.author,
                    comments: data.comments,
                    date: data.date,
                    rating: data.rating,
                    title: data.title,
                    url: data.url 
                })
                toggleLoading(false);
                toggleUpdatingComments(false);
            })
    };

    const updComments = () => {
        toggleUpdatingComments(true);
        apiService.getStory(itemId)
            .then(data => {
                setData(storyData => {
                    return {
                    ...storyData,
                    comments: data.comments, 
                }})
                toggleUpdatingComments(false);
                
            })
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

    
    
    
    

    const RenderView = () => {
        return (
        <>
            <StoryItem storyData={storyData}/>
            <ItemComments commentsIds={storyData.comments}/>
        </>)
    }
    
    const PreloaderView = () => {
        return (isLoading? <span>Loading</span> : <RenderView />)
    }

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
                <PreloaderView />
            </div>
        </div>
    )
} 