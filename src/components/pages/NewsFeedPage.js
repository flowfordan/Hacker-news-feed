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
        <li key={idx}>
            <span>{item.title}</span>
            <span>{item.rating}</span>
            <span>{item.author}</span>
            <span>{item.date}</span>
        </li>
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