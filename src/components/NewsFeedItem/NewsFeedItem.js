import styles from './NewsFeedItem.module.css'


export const NewsFeedItem = (props) => {


    const {data} = props
    console.log(props.data)
    


    return(
        <div className={styles.cardWrapper}>
            <span className={styles.title}>{data.title}</span>
            <span className={styles.rate}>{data.rating}</span>
            <span className={styles.link}>{data.link}</span>
            <span className={styles.author}>{data.author}</span>
            <span className={styles.date}>{data.date}</span>
            
        </div>
    )
} 