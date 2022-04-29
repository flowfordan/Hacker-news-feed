import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { Comment } from './Comment/Comment';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props.commentsIds;
    const [comments, setComments] = useState(null)


    //get apiService for parent comments
    //when mounting - load comments
    

    useEffect(
        () => {
            if(commentsIds){
                Promise.all(
                    commentsIds.map(id => {return apiService.getRootComment(id)})
                ).then(data => {
                    setComments(data)
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


    


    let renderComments

    console.log(comments)

    if(comments){

    //sort by dateRaw
    //const sortedComments = [...comments]
    //.sort((a ,b) => {return b.dateRaw - a.dateRaw})
    //console.log(sortedComments)
    renderComments = comments.map(item => {
        return(
            
            <div key={item.id} className={styles.commentWrapper}>
                <Comment data={item}/>
            </div>
            
        )
    })
    }
        

    if(!commentsIds){

        return(
            <div>There are no comments yet</div>
        )
    }

    return(
        <div>
            <div>{`Comments (${7})`}</div>
            {renderComments}
            <div>end</div>
        </div>
    )
}