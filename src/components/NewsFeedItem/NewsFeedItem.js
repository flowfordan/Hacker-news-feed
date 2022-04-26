import styles from './NewsFeedItem.module.css'


export const NewsFeedItem = (props) => {


    //first it gets id from list component
    //sets id
    //makes api query to get data(title, author etc)
    const {storyId} = props
    console.log(storyId)
    


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