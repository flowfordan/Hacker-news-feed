import styles from './NewsFeedItem.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';

const apiService = new APIService();

export const NewsFeedItem = (props) => {

    const {storyId} = props
    
    const [storyData, setData] = useState({
        id: storyId,
        author: null,
        comments: null,
        date: null,
        rating: 0,
        title: null,
        url: null,
        commentsNum: 0,
    })
    const [isLoading, toggleLoading] = useState(true)

    useEffect(
        () => {
            apiService.getStoryData(storyId)
            .then(data => {
                setData({
                    id: data.id,
                    author: data.author,
                    commentsIds: data.commentsIds,
                    date: data.date,
                    rating: data.rating,
                    title: data.title,
                    url: data.url,
                    commentsNum: data.commentsNum,
                })
                toggleLoading(false)
            })
        },
        [])
    
    
    //loading view
    if(isLoading){
        return(
            <div className={styles.cardWrapper}>
            <span className={styles.title}>title...</span>
            <span className={styles.rate}>rate...</span>
            <span className={styles.author}>author...</span>
            <span className={styles.date}>date...</span>    
        </div>
        )
    }

    
    const { author, date, rating, title, commentsIds, commentsNum} = storyData
    return(
        
        <div className={styles.cardWrapper}>
            <span className={styles.title}>{title}</span>
            <span className={styles.rate}>{rating}</span>
            <span className={styles.author}>{author}</span>
            <span className={styles.comments}>{commentsIds? commentsNum : '0'}</span>
            <span className={styles.date}>{date}</span>    
        </div>
        
    )
} 