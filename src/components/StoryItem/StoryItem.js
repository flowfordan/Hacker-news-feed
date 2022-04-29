import styles from './StoryItem.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const apiService = new APIService();

export const StoryItem = (props) => {

    
    const {storyData} = props
    console.log('item', storyData)
    
    const [isLoading, toggleLoading] = useState(true)


    const { url, author, date, rating, title} = storyData
    return(
        <div className={styles.cardWrapper}>
            <span className={styles.title}>{title}</span>
            <span className={styles.rate}>{rating}</span>
            <span className={styles.author}>{author}</span>
            <span className={styles.author}>{url}</span>
            <span className={styles.date}>{date}</span>    
        </div>
    )
}