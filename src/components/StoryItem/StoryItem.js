import styles from './StoryItem.module.css';

export const StoryItem = (props) => {
    
    const {storyData} = props
    
    const { url, author, date, rating, title, commentsNum} = storyData
    return(
        <div className={styles.cardWrapper}>
            <span className={styles.title}>{title}</span>
            <span className={styles.link}>
                <a href={url}>{url}</a>
            </span>
            <span className={styles.rating}>{rating}</span>
            <span className={styles.author}>{author}</span>
            
            <span className={styles.date}>{date}</span>
            <span className={styles.commentsCount}>
                {`${commentsNum} replies`}
            </span>    
        </div>
    )
}