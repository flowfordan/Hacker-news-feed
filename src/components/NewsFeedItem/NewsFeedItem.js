import styles from './NewsFeedItem.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';

const apiService = new APIService();

export const NewsFeedItem = (props) => {

    const {storyId} = props
    console.log(storyId)
    
    //first it gets id from list component
    //sets id
    //makes api query to get data(title, author etc)
    const [storyData, setData] = useState(0)
    
    useEffect(
        () => {
            apiService.getStoryData(storyId)
            .then(data => {
                console.log(data)
            })
        },
        [])
    


    return(
        <div className={styles.cardWrapper}>
            <span>{storyId}</span>
            {/* <span className={styles.title}>{data.title}</span>
            <span className={styles.rate}>{data.rating}</span>
            <span className={styles.link}>{data.link}</span>
            <span className={styles.author}>{data.author}</span>
            <span className={styles.date}>{data.date}</span> */}
            
        </div>
    )
} 