import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';
import { Link } from 'react-router-dom';

const apiService = new APIService();



export const NewsFeedPage = () => {

    
    const myList = [
        {id: 1, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 2, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 3, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 4, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 5, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
    ]

    const [storiesIds, setIds] = useState(null)
    const [isLoading, toggleLoading] = useState(false)


    useEffect(
        () => {

            apiService.getStoriesList()
            .then(data => {
                setIds(data)
            })
           
        }, 
        []
    )

    useEffect(
        () => {
            if(!storiesIds){
                toggleLoading(true)
            }else{
                toggleLoading(false) 
            }
        },
        [storiesIds]
    )
        
    
    let renderList
    if(storiesIds){
    renderList = storiesIds.map((item, idx) => {
        return (
        <Link key={item} to={`/story/${item}`}>
            <NewsFeedItem  storyId={item} extended={false}/>
        </Link>
        )
    })}
    

    const PreloaderView = () => {
        return isLoading? <span>Loading</span> : null
    }
    
    

    return(
        <div className={styles.feedWrapper}>
            <ul className={styles.newsList}>
                <PreloaderView />
                {renderList}
            </ul>
        </div>
    )
} 