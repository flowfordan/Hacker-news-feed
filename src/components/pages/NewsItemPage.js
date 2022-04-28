import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { APIService } from '../../services/apiService';
import { ItemComments } from '../ItemComments/ItemComments';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import { StoryItem } from '../StoryItem/StoryItem';
import styles from './NewsItemPage.module.css';

const apiService = new APIService();



export const NewsItemPage = () => {

    //get id from url
    const itemId = useParams().storyId

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
                
            })
    };

    const updComments = () => {
        apiService.getStory(itemId)
            .then(data => {
                setData(storyData => {
                    return {
                    ...storyData,
                    comments: data.comments, 
                }})
                
            })
    }

    useEffect(
        () => {
            getStoryData();
            let refreshTimer = setInterval(() => updComments(), 60000);

            //on unmount
            return () => {
                clearInterval(refreshTimer);  
            };
        },
        [])

    

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
                </div>
            </div>
            <div className={styles.itemWrapper}>
                <StoryItem storyData={storyData}/>
                <ItemComments commentsIds={storyData.comments}/>
            </div>
        </div>
    )
} 