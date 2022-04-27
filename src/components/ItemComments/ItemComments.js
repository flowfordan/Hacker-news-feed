import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { unstable_composeClasses } from '@mui/material';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props


    const [comments, setComments] = useState([])


    //get apiService for parent comments
    //when mounting - load comments
    const commentArr = []
    useEffect(
        () => {
            if(commentsIds){
                console.log('comments IDS', commentsIds)
                const emptyList = []
                Promise.all(
                    commentsIds.map(id => {return apiService.getRootComment(id)})
                ).then(data => {
                    setComments(data)
                    console.log('from Promise all', data)
                })
            }
        }
        ,[commentsIds])


  
    let renderComments

        
        if(comments.length > 0){

        renderComments = comments.map(item => {
            return(
                <div key={item.id} className={styles.commentWrapper}>
                    <div>{item.author}</div>
                    <div>{item.text}</div>
                    <div>{item.date}</div>
                    <div></div>
                </div>
            )
        })
        }
        
        
    
    //onClick get api Service forr kids comments
    
    


    if(!commentsIds){

        return(
            <div>There are no comments yet</div>
        )
    }

    return(
        <div>
            <div>Comments</div>
            {renderComments}
            <div>end</div>
        </div>
    )
}