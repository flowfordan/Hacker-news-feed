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

    useEffect(
        () => {
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
                <button>Refresh comments</button>
                </div>
            </div>
            <div className={styles.itemWrapper}>
                <StoryItem storyData={storyData}/>
                <ItemComments commentsIds={storyData.comments}/>
            </div>
        </div>
    )
} 