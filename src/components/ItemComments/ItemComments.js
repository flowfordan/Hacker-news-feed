import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { Comment } from './Comment/Comment';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props.commentsIds;
    console.log(commentsIds)
    const [comments, setComments] = useState(null)


    //get apiService for parent comments
    //when mounting - load comments
    

    useEffect(
        () => {
            if(commentsIds){
                console.log('comments IDS', commentsIds)
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


    const onAnswersShow = (parentId, childrenIds) => {
        console.log('show childs:', childrenIds)
        Promise.all(
            childrenIds.map(id => {return apiService.getRootComment(id)})
        ).then(data => {
            //find parent id
            const parentIdx = comments.findIndex(el => el.id === parentId)
            //setComments(data)
            setComments(prevData => [...prevData, comments[parentIdx].answers = data])
            console.log(comments[parentIdx])
            console.log('from Promise all', data)
        })
        
    } 


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
                <Comment data={item} onAnswersShow={onAnswersShow}/>
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