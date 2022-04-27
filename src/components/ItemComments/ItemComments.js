import styles from './ItemComments.module.css';
import { APIService } from '../../services/apiService';
import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { unstable_composeClasses } from '@mui/material';

const apiService = new APIService();

export const ItemComments = (props) => {
    
    const {commentsIds} = props


    const [comments, setComments] = useState([])
    const [answers, setAnswers] = useState([])


    //get apiService for parent comments
    //when mounting - load comments
    const commentArr = []
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

    const ChildrenView = () => {
        return(
            <div>
                Answers
            </div>
        )
    }

    let renderComments

        
        if(comments.length > 0){

        //sort by dateRaw
        const sortedComments = [...comments].sort((a ,b) => {return b.dateRaw - a.dateRaw})
        console.log(sortedComments)
        renderComments = sortedComments.map(item => {
            return(
                <>
                <div key={item.id} className={styles.commentWrapper}>
                    <div className={styles.comment}>
                        <div>{item.author}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.text}}></div>
                        <div>{item.date}</div>
                        <div 
                        onClick={() => {onAnswersShow(item.id, item.children)}}
                        className={styles.showAnswers}>
                            {item.children? 'show answers': null}
                        </div>
                    </div>
                    <div className={styles.children}>
                        {item.answers? item.answers.map(child => {
                            return(
                                <div>
                                    <div>{child.author}</div>
                                    <div dangerouslySetInnerHTML={{ __html: child.text}}></div>
                                    <div>{child.date}</div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
                </>
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
            <div>{`Comments (${7})`}</div>
            {renderComments}
            <div>end</div>
        </div>
    )
}