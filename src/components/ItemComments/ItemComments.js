import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { Comment } from './Comment/Comment';
import { Spinner } from '../Spinner/Spinner';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props.commentsIds;
    const [comments, setComments] = useState(null);
    const [isLoading, toggleLoad] = useState(false);
    let renderComments;


    //get apiService for parent comments
    //when mounting - load comments
    

    useEffect(
        () => {
            if(commentsIds){
                toggleLoad(true)
                Promise.all(
                    commentsIds.map(id => {return apiService.getRootComment(id)})
                ).then(data => {
                    setComments(data);
                    toggleLoad(false)
                })
            }
        }
        ,[commentsIds])

        useEffect(() => {
            //on unmounting
            return () => {
                console.log('UNMOUNT!!!!') 
            };
        },
        [])


    


    

    if(comments){

    //sort by dateRaw
    const sortedComments = [...comments]
    .sort((a ,b) => {return b.dateRaw - a.dateRaw})
    //console.log(sortedComments)
    renderComments = sortedComments.map(item => {
        if(item.deleted || item.dead){
            return null
        }
        else{ return(
            <div key={item.id} className={styles.commentWrapper}>
                <Comment data={item} />
            </div>
        )}
    })
    }
    
    

    const loadingView = isLoading && !comments? <span className={styles.loaderWrap}><Spinner type={'large'}/></span> : null;

    if(!commentsIds){
        return(
            <div className={styles.commentWrapper}>There are no comments yet</div>
        )
    }

    return(
        <div>
            {loadingView}
            {renderComments}
        </div>
    )
}