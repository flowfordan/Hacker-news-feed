import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import { unstable_composeClasses } from '@mui/material';
import { APIService } from '../../../services/apiService';

const apiService = new APIService();



export const Comment = (props) => {

    const {id, author, date, text, children, answers} = props.data
    const {commentId} = props;

    const [commentData, setCommentData] = useState({})




    //const {author, date, text, id, children} = commentData

    return(
        <div className={styles.commentWrapper}>

                    <div className={styles.comment}>
                        <div>{author}</div>
                        <div dangerouslySetInnerHTML={{ __html: text}}></div>
                        <div>{date}</div>
                        <div 
                        onClick={() => {props.onAnswersShow(id, children)}}
                        className={styles.showAnswers}>
                            {children? 'show answers': null}
                        </div>
                    </div>

                    {/* <div className={styles.children}>
                        {answers? answers.map(child => {
                            return(
                                <div key={child.id}>
                                    <div>{child.author}</div>
                                    <div dangerouslySetInnerHTML={{ __html: child.text}}></div>
                                    <div>{child.date}</div>
                                </div>
                            )
                        }) : null}
                    </div> */}

                </div>
    )
}