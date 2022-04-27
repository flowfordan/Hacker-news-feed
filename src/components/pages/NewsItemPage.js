import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemComments } from '../ItemComments/ItemComments';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import { StoryItem } from '../StoryItem/StoryItem';
import styles from './NewsItemPage.module.css';


export const NewsItemPage = () => {

    //get id from url
    useEffect(
        () => {
            
        }
        ,[])

    const itemId = useParams().storyId
    console.log(itemId)

    return(
        <div className={styles.itemWrapper}>
            <StoryItem storyId={itemId}/>
            <ItemComments storyId={itemId}/>
        </div>
    )
} 