import { NewsFeedItem } from '../NewsFeedItem/NewsFeedItem'
import styles from './NewsFeedPage.module.css'


export const NewsFeedPage = () => {


    const myList = [
        {id: 1, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 2, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 3, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 4, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
        {id: 5, title: 'hello', rating: 6, author: 'Boris', date: 'today'},
    ]


    const renderList = myList.map((item, idx) => {
        return (
        <NewsFeedItem data={item} key={idx}/>
        )
    })


    return(
        <div className={styles.feedWrapper}>
            <ul className={styles.newsList}>
                {renderList}
            </ul>
        </div>
    )
} 