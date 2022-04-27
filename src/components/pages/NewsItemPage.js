import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ItemComments } from '../ItemComments/ItemComments';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
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
        <div>
            <NewsFeedItem storyId={itemId} extended={true}/>
            <ItemComments />
        </div>
    )
} 