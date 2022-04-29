import styles from './Comment.module.css';
import { useEffect, useState } from 'react';
import { unstable_composeClasses } from '@mui/material';
import { APIService } from '../../../services/apiService';

const apiService = new APIService();



export const Comment = (props) => {

    const {id, author, date, text, children} = props.data
    
    const [childs, setChilds] = useState([])
    const [showChilds, toggleShowChilds] = useState(false)

    const onAnswersShow = (childrenIds) => {

            console.log('show childs:', childrenIds)
            Promise.all(
                childrenIds.map(id => {return apiService.getRootComment(id)})
            ).then(data => {
                setChilds(data)
                console.log('from Promise all', data)
            })
    }

    useEffect(
        () => {
            if(showChilds){
                onAnswersShow(children)
            }
        }
        ,
        [showChilds])


    console.log(children)
    console.log(showChilds)

    return(
        <div className={styles.commentWrapper}>

                    <div className={styles.comment}>
                        <div>{author}</div>
                        <div dangerouslySetInnerHTML={{ __html: text}}></div>
                        <div>{date}</div>
                            {children? <button onClick={() => toggleShowChilds(!showChilds)}
                        className={styles.showAnswers}>{`show answers (${children.length})`}</button> 
                            : null}
                    
                    </div>

                    <div className={styles.children}>
                        {showChilds? childs.map(child => {
                            return(
                                <div key={child.id} className={styles.child}>
                                    <div>{child.author}</div>
                                    <div dangerouslySetInnerHTML={{ __html: child.text}}></div>
                                    <div>{child.date}</div>
                                </div>
                            )
                        }) : null}
                    </div>

                </div>
    )
}