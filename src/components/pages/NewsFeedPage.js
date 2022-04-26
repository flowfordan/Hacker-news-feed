import { useEffect, useState } from 'react';
import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem';
import styles from './NewsFeedPage.module.css';
import { APIService } from '../../services/apiService';




export const NewsFeedPage = () => {

    const apiService = new APIService();


    

    const myList = [
        {id: 1, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 2, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 3, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 4, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 5, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
    ]


    


    const [storiesIds, setIds] = useState(null)
    const [isLoading, toggleLoading] = useState(false)
    console.log(storiesIds)


    useEffect(
        () => {

            apiService.getStoriesList()
            .then(data => {
                console.log(data)
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
        <NewsFeedItem key={idx} storyId={item}/>
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